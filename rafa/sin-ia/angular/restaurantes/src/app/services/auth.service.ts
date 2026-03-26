// `computed` nos permite derivar estado a partir de otros signals.
// `inject` es la forma moderna de pedir dependencias.
// `signal` guarda estado reactivo simple dentro del servicio.
import { Injectable, computed, inject, signal } from '@angular/core';
// `HttpClient` hace las peticiones al backend de auth.
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// `Router` nos sirve para redirigir en logout u otros flujos de sesion.
import { Router } from '@angular/router';
// Estas utilidades de RxJS nos ayudan a reaccionar a respuestas y errores.
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';

// Definimos una interface pequeña para las credenciales de acceso.
// Asi evitamos repetir tipos inline en varios metodos del servicio.
interface AuthCredentials {
	nombre: string;
	password: string;
}

@Injectable({
	// `root` hace que exista una unica instancia global del servicio.
	providedIn: 'root',
})
export class AuthService {
	// Angular inyecta automaticamente HttpClient y Router.
	private readonly http = inject(HttpClient);
	private readonly router = inject(Router);

	// URL base de la API para no repetir el mismo prefijo en cada metodo.
	private readonly apiUrl = 'http://127.0.0.1:3000';
	// Nombre fijo de la cookie donde guardaremos el JWT en esta primera fase.
	private readonly tokenCookieName = 'api_recetas_token';

	// Guardamos el token y el usuario actual en signals para que la UI pueda
	// reaccionar de forma sencilla cuando cambia el estado de sesion.
	// Un `signal` es una pieza de estado reactivo de Angular: guarda un valor
	// actual y permite que Angular repinte automaticamente lo que dependa de el.
	// Aqui `token()` devuelve el JWT actual o `null` si todavia no hay sesion.
	private readonly token = signal<string | null>(this.readTokenCookie());
	// `currentUserState` guarda el usuario autenticado en memoria mientras la app
	// esta abierta. Lo llamamos `...State` para diferenciarlo de la version publica
	// y de solo lectura que exponemos despues como `currentUser`.
	private readonly currentUserState = signal<User | null>(null);
	// `authReadyState` nos ayuda a distinguir entre dos situaciones:
	// 1) todavia estamos comprobando si habia sesion previa,
	// 2) ya terminamos esa comprobacion y la interfaz puede decidir que mostrar.
	private readonly authReadyState = signal(false);

	// Estas propiedades expuestas se leen como funciones en componentes:
	// `authService.isLoggedIn()` o `authService.currentUser()`.
	// `asReadonly()` permite leer el signal desde fuera pero evita que un
	// componente cualquiera pueda modificar el estado interno del servicio.
	readonly currentUser = this.currentUserState.asReadonly();
	readonly authReady = this.authReadyState.asReadonly();
	// `computed(...)` crea un valor derivado. En vez de guardar otro booleano
	// manualmente, Angular lo recalcula cada vez que cambia `token()`.
	readonly isLoggedIn = computed(() => this.token() !== null);

	// En Angular 21 el patron moderno para pedir dependencias suele ser `inject()`.
	// Aun asi, usar `constructor` sigue siendo totalmente valido.
	// Aqui lo mantenemos porque nos viene bien ejecutar logica al crear el servicio:
	// intentar reconstruir la sesion si la cookie ya existia al arrancar la app.
	constructor() {
		// Si al arrancar ya habia un token guardado en cookie, intentamos
		// recuperar el perfil para reconstruir la sesion visualmente.
		if (this.token()) {
			this.loadProfile().subscribe({
				error: (error: unknown) => {
					this.handleSessionRestoreError(error);
				},
			});
		} else {
			this.authReadyState.set(true);
		}
	}

	// `login` envia nombre y password al backend.
	// Si la API responde bien, guardamos el token y el usuario.
	// Importante: este metodo devuelve un Observable. El propio servicio no decide
	// a que pantalla ir despues; eso lo decide el componente que hace `subscribe`.
	login(credentials: AuthCredentials): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
			tap((response) => {
				this.applyAuthResponse(response);
			}),
		);
	}

	// `register` reutiliza exactamente la misma estructura del backend.
	// La API devuelve token + usuario, asi que podemos iniciar sesion al instante.
	register(credentials: AuthCredentials): Observable<AuthResponse> {
		return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials).pipe(
			tap((response) => {
				this.applyAuthResponse(response);
			}),
		);
	}

	// `loadProfile` pregunta al backend quien es el usuario autenticado.
	// Esto sirve al arrancar la app y tambien desde la pagina de perfil.
	loadProfile(): Observable<User> {
		return this.http.get<User>(`${this.apiUrl}/auth/profile`).pipe(
			// `tap` deja pasar el valor original pero nos permite reaccionar a el.
			// Aqui guardamos el usuario recibido sin transformar la respuesta.
			tap((user) => {
				this.currentUserState.set(user);
				this.authReadyState.set(true);
			}),
			catchError((error) => {
				// Si falla la carga del perfil, la sesion visual queda vacia.
				// Despues reenviamos el error para que quien se haya suscrito pueda
				// decidir si mostrar mensaje, redirigir o hacer otro tratamiento.
				this.currentUserState.set(null);
				this.authReadyState.set(true);
				return throwError(() => error);
			}),
		);
	}

	// Este metodo deja disponible el token para el interceptor.
	getToken(): string | null {
		return this.token();
	}

	// Algunos componentes pueden querer asegurarse de que ya intentamos
	// reconstruir sesion antes de decidir que mostrar en la interfaz.
	ensureSessionReady(): Observable<boolean> {
		if (this.authReady()) {
			// Si ya terminamos la comprobacion inicial, respondemos enseguida.
			return of(this.isLoggedIn());
		}

		if (!this.token()) {
			// Si ni siquiera habia token, no hace falta consultar el backend.
			this.authReadyState.set(true);
			return of(false);
		}

		return this.loadProfile().pipe(
			// Si `loadProfile()` completa bien, transformamos el usuario en `true`
			// porque para el guard solo importa si la sesion quedo validada o no.
			map(() => true),
			catchError(() => of(false)),
		);
	}

	// `logout` limpia token y usuario. Si `navigate` es true, volvemos a login.
	logout(navigate = true): void {
		this.clearSession(true);

		if (navigate) {
			void this.router.navigate(['/login']);
		}
	}

	// La usamos cuando el backend confirma que el JWT ya no es valido.
	handleUnauthorized(navigate = true): void {
		this.clearSession(true);

		if (navigate) {
			void this.router.navigate(['/login']);
		}
	}

	// Este metodo concentra la logica comun que comparten login y register.
	private applyAuthResponse(response: AuthResponse): void {
		// Aqui colocamos los ladrillos basicos de una sesion valida:
		// 1) persistimos el JWT en cookie,
		// 2) lo guardamos en el signal interno,
		// 3) guardamos el usuario publico,
		// 4) marcamos que auth ya esta lista.
		this.writeTokenCookie(response.access_token);
		this.token.set(response.access_token);
		this.currentUserState.set(response.user);
		this.authReadyState.set(true);
	}

	// Centralizamos aqui la limpieza para poder decidir si borramos o no la cookie.
	private clearSession(removeCookie: boolean): void {
		if (removeCookie) {
			this.deleteTokenCookie();
		}

		this.token.set(null);
		this.currentUserState.set(null);
		this.authReadyState.set(true);
	}

	// Un refresh no deberia expulsar al usuario por un fallo temporal de red.
	// Solo borramos la cookie si el backend realmente responde 401.
	private handleSessionRestoreError(error: unknown): void {
		if (error instanceof HttpErrorResponse && error.status === 401) {
			this.clearSession(true);
			return;
		}

		this.currentUserState.set(null);
		this.authReadyState.set(true);
	}

	// Guardamos el JWT en una cookie creada desde Angular.
	// Esta fase sirve para aprender el flujo, aunque no es tan segura como HttpOnly.
	private writeTokenCookie(token: string): void {
		const maxAgeSeconds = 60 * 60 * 24 * 7;
		document.cookie = `${this.tokenCookieName}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
	}

	// Leemos la cookie recorriendo `document.cookie`, que llega como texto plano.
	private readTokenCookie(): string | null {
		const cookies = document.cookie.split(';');

		for (const cookie of cookies) {
			const trimmedCookie = cookie.trim();
			const prefix = `${this.tokenCookieName}=`;

			if (trimmedCookie.startsWith(prefix)) {
				return decodeURIComponent(trimmedCookie.slice(prefix.length));
			}
		}

		return null;
	}

	// Para borrar una cookie, escribimos el mismo nombre con max-age 0.
	private deleteTokenCookie(): void {
		document.cookie = `${this.tokenCookieName}=; path=/; max-age=0; samesite=lax`;
	}
}