# LOGIN HTTP ONLY en restaurantes2

## Léeme primero

Antes de leer este documento, hay que leer `LOGIN.md`.

¿Por qué?

Porque `LOGIN.md` explica el flujo actual del proyecto:

- cómo funciona hoy el login,
- cómo se guarda el token con `document.cookie`,
- cómo se usan `signal`, `subscribe`, `next`, `error`,
- cómo intervienen el interceptor, el guard y el perfil.

Este documento nuevo no empieza desde cero absoluto.

Su objetivo es este:

- tomar el flujo que ya entendiste en `LOGIN.md`,
- y explicar con lujo de detalle qué habría que cambiar en Angular si en vez de usar `document.cookie` usáramos una cookie `HttpOnly`.

Importante:

- aquí no vamos a explicar NestJS,
- no vamos a explicar cómo el backend crea la cookie,
- no vamos a explicar cómo el backend borra la cookie,
- solo vamos a explicar qué tendría que hacer Angular.

En otras palabras: este documento mira la obra desde el lado del frontend. Senior Cat sigue siendo el capataz, pero hoy está revisando solo el edificio Angular.

---

## 1. Idea principal: qué cambia mentalmente con HttpOnly

En la versión actual del proyecto, Angular hace esto:

1. recibe un `access_token`,
2. lo guarda con `document.cookie`,
3. lo vuelve a leer desde `document.cookie`,
4. lo mete en `Authorization: Bearer ...` desde el interceptor.

Con una cookie `HttpOnly`, Angular ya no podría hacer eso.

La diferencia clave es esta:

- una cookie normal puede ser leída y escrita desde JavaScript,
- una cookie `HttpOnly` no puede ser leída ni escrita desde JavaScript.

Entonces el cambio mental más importante es:

### Antes

Angular controla el token directamente.

### Después

Angular ya no controla el token directamente.

En su lugar:

- el navegador guarda la cookie por su cuenta,
- el navegador la envía automáticamente al backend cuando corresponde,
- Angular no ve el token,
- Angular solo ve los efectos de la sesión:
  - si el perfil carga, hay sesión,
  - si el perfil devuelve `401`, no hay sesión.

Esto es probablemente la idea más importante de todo el documento.

Si alguien entiende esta diferencia, ya entendió el ladrillo central del cambio.

---

## 2. Qué sí puede y qué no puede hacer Angular con HttpOnly

### Lo que Angular ya no puede hacer

Si la cookie es `HttpOnly`, Angular no puede:

- leer `document.cookie` para sacar el token,
- escribir la cookie con `document.cookie`,
- borrar la cookie con `document.cookie`,
- construir el header `Authorization: Bearer ...` a partir del token.

### Lo que Angular sí puede seguir haciendo

Angular sí puede:

- enviar el login,
- enviar el registro,
- pedir el perfil,
- saber si la sesión existe o no según la respuesta del backend,
- reaccionar al estado de sesión con `signal`,
- proteger rutas,
- mostrar u ocultar partes de la UI,
- llamar a un endpoint de logout para que el backend borre la cookie.

### Resumen corto

Con `HttpOnly`, Angular no gestiona el token.

Angular gestiona el estado visual de la sesión.

---

## 3. Qué archivos cambiarían en Angular

Si migráramos este proyecto a `HttpOnly`, a nivel Angular los archivos más importantes serían estos:

- `src/app/services/auth.service.ts`
- `src/app/interceptors/auth.interceptor.ts`
- `src/app/app.config.ts`
- `src/app/guards/auth.guard.ts`
- `src/app/components/pages/login/login.ts`
- `src/app/components/pages/registro/registro.ts`
- `src/app/components/pages/perfil/perfil.ts`
- `LOGIN.md`
- este documento `LOGIN-HTTP-ONLY.md`

Los archivos de login, registro y perfil no cambiarían tanto en la idea general, pero sí cambiaría lo que ocurre dentro del servicio y del interceptor.

---

## 4. Qué piezas desaparecen del flujo actual

En el `AuthService` actual hay varias piezas pensadas para un token visible desde Angular.

Con `HttpOnly`, estas piezas desaparecerían o cambiarían mucho:

### Desaparecería la escritura manual de cookie

Este tipo de código ya no tendría sentido:

```ts
document.cookie = `${this.tokenCookieName}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
```

### Desaparecería la lectura manual de cookie

Esto también dejaría de tener sentido:

```ts
const cookies = document.cookie.split(';');
```

Porque una cookie `HttpOnly` no se expone a JavaScript.

### Desaparecería el signal `token`

Ahora mismo guardamos algo así:

```ts
private readonly token = signal<string | null>(this.readTokenCookie());
```

Con `HttpOnly`, Angular no puede leer el token.

Por tanto, no podría existir un `signal` con el JWT real.

### Desaparecería `getToken()`

Este método también dejaría de ser útil:

```ts
getToken(): string | null {
  return this.token();
}
```

Porque ya no habría token disponible en el frontend.

### Desaparecería el Bearer token del interceptor

Este patrón actual:

```ts
headers: request.headers.set('Authorization', `Bearer ${token}`)
```

ya no existiría.

Con `HttpOnly`, el navegador se encarga de mandar la cookie automáticamente.

---

## 5. Qué piezas nuevas pasan a ser importantes

Cuando Angular deja de ver el token, otras piezas se vuelven más importantes:

### `withCredentials`

Esta opción indica que la request debe viajar con credenciales del navegador, incluyendo cookies.

Ejemplo:

```ts
this.http.get('/auth/profile', { withCredentials: true })
```

Sin esto, aunque el navegador tenga la cookie, puede ocurrir que la request no la mande.

### `currentUserState`

Si ya no podemos guardar el token, el estado importante pasa a ser sobre todo el usuario actual.

La app ya no piensa:

- “tengo token o no tengo token”

sino más bien:

- “ya pregunté al backend por el perfil o todavía no”
- “el backend me reconoció como usuario o no”

### `loadProfile()` al arrancar

Como Angular no puede leer la cookie para saber si existe sesión, la forma de averiguarlo pasa a ser otra:

1. arrancar la app,
2. pedir `GET /auth/profile` con `withCredentials: true`,
3. si responde bien, hay sesión,
4. si responde `401`, no hay sesión.

Esa sería la nueva comprobación base.

---

## 6. Nuevo flujo mental del login con HttpOnly

Con `HttpOnly`, el flujo mental sería este:

1. Angular manda `POST /auth/login` con `withCredentials: true`
2. el navegador recibe la respuesta
3. el navegador guarda la cookie `HttpOnly`
4. Angular no puede leer esa cookie
5. Angular llama a `loadProfile()` o usa el usuario que ya venga en la respuesta
6. Angular guarda el usuario en un `signal`
7. el interceptor ya no añade Bearer, solo asegura `withCredentials`
8. el guard decide según si el usuario está cargado o si el perfil responde bien

La idea clave es esta:

### Antes

`login correcto -> guardo token -> uso token`

### Después

`login correcto -> el navegador guarda cookie -> Angular valida sesión preguntando por el perfil`

---

## 7. Cómo quedaría `auth.service.ts`

Este es el archivo más importante del cambio.

### Objetivo del nuevo servicio

El nuevo `AuthService` ya no tendría que:

- escribir cookies,
- leer cookies,
- devolver tokens,
- borrar cookies por JavaScript.

En cambio, tendría que:

- llamar a login y registro con `withCredentials: true`,
- pedir perfil con `withCredentials: true`,
- guardar el usuario actual,
- mantener `authReadyState`,
- llamar a logout para que el backend limpie la cookie,
- reconstruir sesión preguntando por el perfil al arrancar.

### Ejemplo completo de servicio orientado a HttpOnly

```ts
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
import { User } from '../interfaces/user';

interface AuthCredentials {
  nombre: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl = 'http://127.0.0.1:3000';

  // Ya no guardamos el token porque Angular no puede leer una cookie HttpOnly.
  // El estado importante pasa a ser el usuario actual y si la auth ya fue comprobada.
  private readonly currentUserState = signal<User | null>(null);
  private readonly authReadyState = signal(false);

  readonly currentUser = this.currentUserState.asReadonly();
  readonly authReady = this.authReadyState.asReadonly();
  readonly isLoggedIn = computed(() => this.currentUser() !== null);

  constructor() {
    // Como Angular no puede leer la cookie HttpOnly, la forma de saber si hay
    // sesion es preguntarselo al backend cargando el perfil al arrancar.
    this.loadProfile().subscribe({
      error: (error: unknown) => {
        this.handleSessionRestoreError(error);
      },
    });
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true,
    }).pipe(
      tap((response) => {
        this.applyAuthResponse(response);
      }),
    );
  }

  register(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials, {
      withCredentials: true,
    }).pipe(
      tap((response) => {
        this.applyAuthResponse(response);
      }),
    );
  }

  loadProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`, {
      withCredentials: true,
    }).pipe(
      tap((user) => {
        this.currentUserState.set(user);
        this.authReadyState.set(true);
      }),
      catchError((error) => {
        this.currentUserState.set(null);
        this.authReadyState.set(true);
        return throwError(() => error);
      }),
    );
  }

  ensureSessionReady(): Observable<boolean> {
    if (this.authReady()) {
      return of(this.isLoggedIn());
    }

    return this.loadProfile().pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  logout(navigate = true): void {
    // En HttpOnly, Angular no puede borrar la cookie por su cuenta.
    // Debe llamar a un endpoint de logout para que el backend la invalide.
    this.http.post(`${this.apiUrl}/auth/logout`, {}, {
      withCredentials: true,
    }).subscribe({
      next: () => {
        this.clearSession();
        if (navigate) {
          void this.router.navigate(['/login']);
        }
      },
      error: () => {
        // Aunque el logout falle, muchas apps limpian el estado visual local
        // para no dejar al usuario en una sesion incoherente.
        this.clearSession();
        if (navigate) {
          void this.router.navigate(['/login']);
        }
      },
    });
  }

  handleUnauthorized(navigate = true): void {
    this.clearSession();

    if (navigate) {
      void this.router.navigate(['/login']);
    }
  }

  private applyAuthResponse(response: AuthResponse): void {
    // Si el backend ya devuelve el usuario en login/register, podemos usarlo
    // para actualizar la UI inmediatamente sin esperar otra llamada extra.
    this.currentUserState.set(response.user);
    this.authReadyState.set(true);
  }

  private clearSession(): void {
    this.currentUserState.set(null);
    this.authReadyState.set(true);
  }

  private handleSessionRestoreError(error: unknown): void {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.clearSession();
      return;
    }

    this.currentUserState.set(null);
    this.authReadyState.set(true);
  }
}
```

### Qué aprender de este código

Las ideas importantes son estas:

1. ya no existe `token`
2. ya no existe `getToken()`
3. ya no existe `writeTokenCookie()`
4. ya no existe `readTokenCookie()`
5. ya no existe `deleteTokenCookie()`
6. `withCredentials: true` aparece en las requests importantes
7. el estado de sesión se apoya en `currentUserState`
8. el `constructor` ya no pregunta por una cookie, sino por el perfil

---

## 8. Cómo cambiaría el interceptor

### Qué hace hoy

Hoy el interceptor hace esto:

- pregunta si hay token,
- si lo hay, añade `Authorization: Bearer ...`.

### Qué haría con HttpOnly

Con `HttpOnly`, el interceptor ya no puede montar `Authorization`.

Su nueva tarea sería otra:

- asegurarse de que las requests viajen con `withCredentials: true`,
- seguir detectando `401`,
- avisar al `AuthService` para limpiar estado local si la sesión caducó.

### Ejemplo de interceptor para HttpOnly

```ts
import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

const AUTH_LOGIN_URL = '/auth/login';
const AUTH_REGISTER_URL = '/auth/register';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);

  // En vez de añadir Authorization, pedimos que el navegador incluya cookies.
  const requestWithCredentials = request.clone({
    withCredentials: true,
  });

  return next(requestWithCredentials).pipe(
    catchError((error: unknown) => {
      const isUnauthorized = error instanceof HttpErrorResponse && error.status === 401;
      const isAuthFormRequest =
        request.url.includes(AUTH_LOGIN_URL) ||
        request.url.includes(AUTH_REGISTER_URL);

      if (isUnauthorized && !isAuthFormRequest) {
        authService.handleUnauthorized();
      }

      return throwError(() => error);
    }),
  );
};
```

### Qué aprender de este interceptor

1. sigue existiendo interceptor
2. pero cambia completamente su trabajo
3. antes añadía Bearer token
4. ahora delega en el navegador el envío de cookies
5. `401` sigue siendo importante para detectar sesión vencida

---

## 9. Cómo cambiaría `app.config.ts`

Este archivo casi no cambiaría.

Seguiríamos registrando `HttpClient` y el interceptor.

### Ejemplo

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
```

### Qué cambia realmente aquí

No cambia el archivo en sí.

Lo que cambia es el comportamiento del interceptor que estamos registrando.

---

## 10. Cómo cambiaría el guard

La buena noticia es que el guard no tendría que cambiar demasiado.

La idea sigue siendo la misma:

- esperar a que auth esté lista,
- comprobar si hay sesión,
- dejar pasar o redirigir.

### Ejemplo

```ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.ensureSessionReady().pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      }

      return router.createUrlTree(['/login']);
    }),
  );
};
```

### Qué cambia mentalmente

Antes `isLoggedIn()` estaba muy ligado al token.

Con HttpOnly, `isLoggedIn()` estaría más ligado al usuario cargado correctamente desde el backend.

---

## 11. Cómo cambiaría `login.ts`

`login.ts` no necesita saber si el token vino por JSON, si se guardó en cookie o si la cookie es `HttpOnly`.

Eso es una gran ventaja de tener el flujo bien separado en capas.

El componente seguiría pensando casi igual:

1. recoger formulario,
2. llamar al servicio,
3. entrar en `next` si todo va bien,
4. entrar en `error` si algo falla,
5. navegar a `/restaurantes` cuando el login fue correcto.

### Ejemplo prácticamente igual al actual

```ts
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  nombre = '';
  password = '';
  errorMessage = '';
  isSubmitting = false;

  submitLogin(): void {
    this.errorMessage = '';

    if (!this.nombre.trim() || !this.password.trim()) {
      this.errorMessage = 'Debes completar nombre y contraseña.';
      return;
    }

    this.isSubmitting = true;

    this.authService.login({
      nombre: this.nombre.trim(),
      password: this.password,
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        void this.router.navigate(['/restaurantes']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'No se pudo iniciar sesión. Revisa tus credenciales.';
        this.changeDetectorRef.detectChanges();
      },
    });
  }
}
```

### Qué hay que entender aquí

El componente no necesita saber si el backend devolvió un JWT visible o una cookie `HttpOnly`.

Su contrato sigue siendo:

- si `authService.login()` resuelve bien, navego,
- si falla, muestro error.

Eso es buen diseño.

---

## 12. Cómo cambiaría `registro.ts`

`registro.ts` seguiría casi la misma idea que `login.ts`.

La diferencia principal volvería a estar en el servicio, no en el componente.

El componente seguiría:

- validando campos,
- llamando a `authService.register(...)`,
- reaccionando a `next` y `error`.

Lo importante es que `register()` también viajaría con `withCredentials: true`.

---

## 13. Cómo cambiaría `perfil.ts`

`perfil.ts` también cambiaría poco en su idea general.

Seguiría cargando el perfil del usuario autenticado.

La gran diferencia es que esa autenticación ya no dependería de un Bearer token montado por Angular, sino de la cookie `HttpOnly` enviada automáticamente por el navegador.

### Idea importante

Si `perfil` carga bien, eso ya es una prueba de que la cookie está funcionando.

Es decir:

- `perfil` se convierte en una prueba visual de que la sesión `HttpOnly` está viva.

---

## 14. Cómo cambia la restauración de sesión al recargar

Este es uno de los puntos más importantes del cambio.

### Con `document.cookie`

Hoy hacemos algo así:

1. leo la cookie con JavaScript,
2. saco el token,
3. si existe, llamo a `loadProfile()`.

### Con `HttpOnly`

Eso ya no se puede.

Entonces la restauración pasaría a ser:

1. arranca la app,
2. Angular crea `AuthService`,
3. el `constructor` llama a `loadProfile()` con `withCredentials: true`,
4. el navegador decide si manda cookie,
5. si el backend responde con perfil válido, hay sesión,
6. si responde `401`, no hay sesión.

### Idea pedagógica clave

Con `HttpOnly`, Angular no comprueba la cookie.

Angular comprueba la sesión preguntando al backend.

---

## 15. Cómo cambia el logout

Este punto es muy importante para no confundirse.

### Con `document.cookie`

Ahora mismo Angular puede hacer esto:

```ts
document.cookie = `api_recetas_token=; path=/; max-age=0; samesite=lax`;
```

### Con `HttpOnly`

Angular ya no puede borrar la cookie directamente.

Entonces, desde el punto de vista del frontend, el flujo correcto sería:

1. llamar a un endpoint `/auth/logout` con `withCredentials: true`,
2. esperar a que el backend invalide o limpie la cookie,
3. limpiar el estado visual local,
4. redirigir a `/login`.

### Idea importante para alguien principiante

Con `HttpOnly`, Angular no “desloguea” destruyendo la cookie.

Angular “desloguea” pidiendo al servidor que la invalide y luego limpiando su propio estado interno.

---

## 16. Flujo visual nuevo: login con HttpOnly

Aquí va el flujo visual con la nueva lógica.

1. `login.html` recoge `nombre` y `password`
2. `login.ts` llama a `submitLogin()`
3. `submitLogin()` llama a `authService.login(...)`
4. `auth.service.ts` manda `POST /auth/login` con `withCredentials: true`
5. el navegador recibe la respuesta y guarda la cookie `HttpOnly`
6. Angular no puede leer esa cookie
7. `applyAuthResponse(...)` guarda el usuario en `currentUserState`
8. `next` navega a `/restaurantes`
9. el interceptor manda futuras requests con `withCredentials: true`
10. el navegador adjunta la cookie automáticamente
11. el guard usa `ensureSessionReady()` para validar acceso
12. `perfil.ts` llama a `/auth/profile`
13. si el perfil carga, la sesión sigue viva
14. si llega `401`, Angular limpia su estado visual y redirige

---

## 17. Qué ventajas tiene este enfoque desde Angular

A nivel Angular, aunque el backend haga más trabajo, hay varias ventajas conceptuales:

1. el frontend deja de manejar el token directamente
2. se elimina el código manual para leer y escribir cookies
3. el interceptor se simplifica en intención
4. la sesión se valida de una forma más real: preguntando por el perfil
5. `currentUserState` pasa a ser el centro del estado de sesión visible

---

## 18. Qué cosas debe recordar alguien principiante

Si alguien está empezando, estas son las frases que debe retener:

1. `HttpOnly` significa que JavaScript no puede tocar la cookie.
2. Si Angular no puede tocar la cookie, no puede leer el token.
3. Si Angular no puede leer el token, no puede montar `Authorization: Bearer ...`.
4. Entonces Angular debe confiar en `withCredentials` y en el navegador.
5. La sesión ya no se detecta leyendo cookie, sino cargando `/auth/profile`.
6. El estado importante en Angular deja de ser “token” y pasa a ser “usuario actual”.
7. Logout ya no es borrar cookie desde Angular, sino pedir al backend que la quite.

---

## 19. Orden recomendado para migrar el proyecto actual a HttpOnly

Si alguien quisiera transformar el proyecto actual paso a paso, el orden más claro sería este:

1. leer `LOGIN.md`
2. entender qué partes actuales dependen de `document.cookie`
3. eliminar del `AuthService` la lógica de lectura y escritura manual de cookies
4. eliminar el `signal` del token
5. rehacer `isLoggedIn` para depender del usuario cargado
6. cambiar `login`, `register` y `loadProfile` para usar `withCredentials: true`
7. rehacer el `constructor` para intentar `loadProfile()` al arrancar
8. rehacer el interceptor para usar `withCredentials` en vez de `Authorization`
9. adaptar `logout()` para llamar a un endpoint y no borrar cookies desde Angular
10. probar login
11. probar refresh
12. probar perfil
13. probar rutas protegidas
14. probar logout

Ese sería un orden de construcción sólido, ladrillo a ladrillo.

---

## 20. Resumen final

La migración a `HttpOnly` no consiste en “cambiar una línea de cookie”.

Consiste en cambiar la filosofía del frontend:

- antes Angular leía y controlaba el token,
- después Angular ya no ve el token,
- el navegador gestiona la cookie,
- Angular solo gestiona el estado visible de la sesión.

Si alguien entiende estas cuatro ideas, ya tiene la base correcta para implementar la versión `HttpOnly` desde Angular.