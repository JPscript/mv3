// Servicio de autenticación centralizado para toda la app.
// Senior Cat supervisa aquí el flujo de login, registro, sesión y cookies.
import { HttpClient, HttpErrorResponse } from '@angular/common/http'; // Importa el cliente HTTP y el tipo de error para manejar peticiones a la API y errores.
import { Injectable, computed, inject, signal } from '@angular/core'; // Importa utilidades de Angular para inyección de dependencias y reactividad.
import { Observable, catchError, map, of, tap, throwError } from 'rxjs'; // Importa operadores de RxJS para manejar flujos asíncronos y errores.
import { Router } from '@angular/router'; // Importa el router para redirecciones tras login/logout.
import { AuthResponse } from '../models/auth-response'; // Importa el tipo de respuesta esperada al autenticar.
import { User } from '../models/user.interface'; // Importa la interfaz de usuario para tipar los datos del usuario autenticado.

// Interfaz para las credenciales de login/registro
interface AuthCredentials {
  nombre: string; // El nombre de usuario que se usará para login o registro.
  password: string; // La contraseña correspondiente.
}

// Servicio singleton disponible en toda la app
@Injectable({
    providedIn: 'root' // Hace que este servicio sea único y accesible en toda la aplicación.
})

export class AuthService {
    // Inyección de dependencias modernas (Angular 16+)
    private readonly http = inject(HttpClient); // Cliente HTTP para hacer peticiones a la API.
    private readonly router = inject(Router);   // Router para navegar entre páginas tras login/logout.

    // URL base para los endpoints de autenticación (login, register, profile)
    private apiURL = 'http://localhost:3000/auth'; // Dirección base de la API de autenticación.

    // Nombre fijo de la cookie donde guardaremos el JWT en esta primera fase.
    private readonly tokenCookieName = 'api_restaurante_token'; // Nombre de la cookie donde se guarda el token JWT.

    // Signal reactivo que guarda el JWT actual (o null si no hay sesión)
    private readonly token = signal<string | null>(this.readTokenCookie()); // Signal que almacena el token JWT, inicializado leyendo la cookie.

    // Signal reactivo que guarda el usuario autenticado (o null si no hay sesión)
    private readonly currentUserState = signal<User | null>(null); // Signal que almacena el usuario autenticado.

    // Signal que indica si la comprobación de sesión ya terminó
    private readonly authReadyState = signal(false); // Signal que indica si ya se comprobó el estado de autenticación.

    // Exposición de signals como solo lectura para componentes
    readonly currentUser = this.currentUserState.asReadonly(); // Expone el usuario autenticado como solo lectura.
    readonly authReady = this.authReadyState.asReadonly(); // Expone el estado de autenticación como solo lectura.

    // Signal computado: true si hay token, false si no
    readonly isLoggedIn = computed(() => this.token() !== null); // Computa si el usuario está logueado según si hay token.

    // Al crear el servicio, intenta restaurar sesión si hay cookie
    constructor() {
        // Si hay token en cookie, intenta cargar el perfil del usuario
        if (this.token()) {
            this.loadProfile().subscribe({
                error: (error: unknown) => {
                    this.handleSessionRestoreError(error); // Si falla, maneja el error y limpia la sesión.
                },
            });
        } else {
            // Si no hay token, marca auth como lista (no hay sesión)
            this.authReadyState.set(true); // Indica que la comprobación de sesión ha terminado.
        }
    }

    // Llama al endpoint de login y guarda sesión si va bien
    login(credentials: AuthCredentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiURL}/login`, credentials).pipe(
            tap((response) => {
                this.applyAuthResponse(response); // Si el login es exitoso, guarda el token y usuario.
            }),
        );
    }

    // Llama al endpoint de registro y guarda sesión si va bien
    register(credentials: AuthCredentials): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiURL}/register`, credentials).pipe(
            tap((response) => {
                this.applyAuthResponse(response); // Si el registro es exitoso, guarda el token y usuario.
            }),
        );
    }

    // Llama al endpoint de perfil para reconstruir sesión
    loadProfile(): Observable<User> {
        return this.http.get<User>(`${this.apiURL}/profile`).pipe(
            tap((user) => {
                this.currentUserState.set(user); // Si la petición es exitosa, guarda el usuario.
                this.authReadyState.set(true); // Marca que la autenticación está lista.
            }),
            catchError((error) => {
                this.currentUserState.set(null); // Si hay error, limpia el usuario.
                this.authReadyState.set(true); // Marca que la autenticación está lista aunque haya fallado.
                return throwError(() => error); // Propaga el error para que el componente lo maneje.
            }),
        );
    }

    // Aplica la respuesta de login/registro: guarda token, usuario y marca sesión lista
    private applyAuthResponse(response: AuthResponse): void {
        // Guarda el token en la cookie para persistencia
        this.writeTokenCookie(response.access_token); // Escribe el token en la cookie.
        // Actualiza el signal del token
        this.token.set(response.access_token); // Actualiza el signal reactivo del token.
        // Actualiza el usuario autenticado
        this.currentUserState.set(response.user); // Actualiza el usuario autenticado.
        // Marca la sesión como lista
        this.authReadyState.set(true); // Indica que la autenticación está lista.
    }

    // Lee la cookie del token JWT. Devuelve el token si existe, o null si no.
    private readTokenCookie(): string | null {
        // Accede a todas las cookies del navegador como un string
        // document.cookie devuelve algo como: "cookie1=valor1; cookie2=valor2; ..."
        const cookies = document.cookie.split(';'); // Separa cada cookie individual en un array

        // Recorre todas las cookies buscando la que corresponde al token
        for (const cookie of cookies) {
            // Elimina espacios en blanco al inicio de la cookie
            const trimmedCookie = cookie.trim();
            // Prepara el prefijo que identifica la cookie del token
            const prefix = `${this.tokenCookieName}=`;

            // Comprueba si la cookie empieza por el nombre esperado seguido de '='
            if (trimmedCookie.startsWith(prefix)) {
                // Extrae el valor después del '=' y lo decodifica por si tiene caracteres especiales
                return decodeURIComponent(trimmedCookie.slice(prefix.length));
            }
        }

        // Si no se encuentra la cookie, devuelve null
        return null;
    }

    // Escribe la cookie del token JWT para mantener la sesión
    private writeTokenCookie(token: string): void {
        // Calcula el tiempo de vida de la cookie en segundos (7 días)
        const maxAgeSeconds = 60 * 60 * 24 * 7;
        // Escribe la cookie en el navegador con:
        // - nombre fijo (api_recetas_token)
        // - valor codificado (por si el token tiene caracteres especiales)
        // - path=/ para que sea válida en toda la app
        // - max-age para definir la duración
        // - samesite=lax para seguridad básica
        document.cookie = `${this.tokenCookieName}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
    }

    // Maneja errores al restaurar la sesión (por ejemplo, token inválido o expirado)
    private handleSessionRestoreError(error: unknown): void {
        if (error instanceof HttpErrorResponse && error.status === 401) {
            this.clearSession(true); // Si el error es 401 (no autorizado), limpia la sesión y borra la cookie.
            return;
        }
        this.currentUserState.set(null); // Para otros errores, limpia el usuario.
        this.authReadyState.set(true); // Marca que la autenticación está lista.
    }

    // Limpia la sesión: borra token, usuario y (opcionalmente) la cookie
    private clearSession(removeCookie: boolean): void {
        if (removeCookie) {
            this.deleteTokenCookie(); // Si se indica, borra la cookie del token.
        }
        this.token.set(null); // Limpia el signal del token.
        this.currentUserState.set(null); // Limpia el usuario autenticado.
        this.authReadyState.set(true); // Marca que la autenticación está lista.
    }

    // Borra la cookie del token JWT
    private deleteTokenCookie(): void {
        document.cookie = `${this.tokenCookieName}=; path=/; max-age=0; samesite=lax`; // Escribe la cookie con max-age=0 para eliminarla.
    }

	handleUnauthorized(navigate = true): void {
		this.clearSession(true);

		if (navigate) {
			void this.router.navigate(['/login']);
		}
	}
	logout(navigate = true): void {
		this.clearSession(true);

		if (navigate) {
			void this.router.navigate(['/login']);
		}
	}
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
	getToken(): string | null {
		return this.token();
	}

}