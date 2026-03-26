
# AuthService.ts — Explicación detallada, paso a paso y para principiantes

> Senior Cat te acompaña ladrillo a ladrillo para entender cómo funciona el servicio de autenticación central de la app. Aquí tienes apuntes detallados, con ejemplos, contexto y explicaciones de cada parte del código, pensadas para quienes están aprendiendo desde cero.

---


## 1. Importaciones: ¿qué traemos y por qué?

```typescript
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user.interface';
```
**¿Por qué y para qué?**
- **HttpClient**: Permite hacer peticiones HTTP (por ejemplo, para enviar el login al servidor o pedir el perfil del usuario). Sin esto, la app no podría comunicarse con el backend.
- **HttpErrorResponse**: Nos ayuda a detectar y manejar errores que vienen del servidor (por ejemplo, si el login falla).
- **Injectable, inject**: Permiten que Angular cree y gestione este servicio automáticamente y podamos usarlo en cualquier parte de la app.
- **signal, computed**: Son herramientas de Angular para crear variables reactivas, es decir, que avisan a la app cuando cambian (muy útil para saber si el usuario está logueado o no en tiempo real).
- **Observable, tap, catchError, map, of, throwError**: Son utilidades de RxJS para trabajar con datos asíncronos (como las respuestas del servidor) y manejar errores de forma elegante.
- **Router**: Permite navegar entre páginas (por ejemplo, redirigir al usuario al login si se desloguea).
- **AuthResponse, User**: Son tipos personalizados que nos ayudan a que el código sea más claro y seguro (sabemos exactamente qué datos esperamos recibir o enviar).

---


## 2. Interfaz de credenciales: ¿qué datos necesita el login?

```typescript
interface AuthCredentials {
    nombre: string;
    password: string;
}
```
**¿Por qué y para qué?**
- Define exactamente qué datos necesita el backend para autenticar a un usuario: un nombre y una contraseña.
- Así, si intentamos enviar otros datos, TypeScript nos avisa de que estamos haciendo algo mal.
- Esto ayuda a evitar errores y hace el código más fácil de entender para cualquier persona (¡incluso para tu yo del futuro!).

---


## 3. Decorador Injectable: ¿cómo se usa este servicio?

```typescript
@Injectable({ providedIn: 'root' })
```
**¿Por qué y para qué?**
- Le dice a Angular que este servicio debe estar disponible en toda la aplicación, sin tener que crearlo manualmente.
- Así, cualquier componente puede pedir una instancia de AuthService y siempre será la misma (patrón singleton).

---


## 4. Propiedades privadas y signals: los ladrillos internos

```typescript
private readonly http = inject(HttpClient); // Cliente HTTP
private readonly router = inject(Router);   // Router para navegación
private apiURL = 'http://localhost:3000/auth'; // URL base de la API
private readonly tokenCookieName = 'api_restaurante_token'; // Nombre de la cookie JWT
private readonly token = signal<string | null>(this.readTokenCookie()); // Signal para el token
private readonly currentUserState = signal<User | null>(null); // Signal para el usuario
private readonly authReadyState = signal(false); // Signal para saber si la sesión ya se comprobó
```
**¿Por qué y para qué?**
- Estas variables son los "ladrillos" que sostienen toda la lógica de autenticación.
- `http` y `router` permiten hacer peticiones y navegar.
- `apiURL` centraliza la dirección del backend, así si cambia solo hay que modificarla aquí.
- `tokenCookieName` define el nombre de la cookie donde se guarda el JWT, para que sea fácil de encontrar y cambiar si hace falta.
- `token` es un signal reactivo: guarda el JWT en memoria y se inicializa leyendo la cookie (así, si recargas la página, la sesión persiste).
- `currentUserState` es otro signal: guarda el usuario autenticado, o null si no hay sesión.
- `authReadyState` indica si ya se comprobó la sesión (útil para mostrar un spinner o decidir si mostrar la app o el login).

---


## 5. Signals públicos y computados: lo que pueden ver los componentes

```typescript
readonly currentUser = this.currentUserState.asReadonly();
readonly authReady = this.authReadyState.asReadonly();
readonly isLoggedIn = computed(() => this.token() !== null);
```
**¿Por qué y para qué?**
- Exponen el usuario, el estado de autenticación y si hay sesión activa, pero solo para lectura.
- Así, los componentes pueden reaccionar a los cambios (por ejemplo, mostrar el menú privado si hay sesión), pero no pueden modificar el estado directamente (evita errores y hace el código más seguro).
- `isLoggedIn` es un signal computado: se actualiza automáticamente si cambia el token.

---


## 6. Constructor: restaurar sesión automáticamente

```typescript
constructor() {
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
```
**¿Por qué y para qué?**
- Cuando se crea el servicio (al arrancar la app), revisa si hay un token guardado en la cookie.
- Si hay token, intenta pedir el perfil al backend para restaurar la sesión (así el usuario no tiene que volver a loguearse cada vez que recarga la página).
- Si no hay token, marca la sesión como "lista" pero vacía (útil para mostrar el login o decidir qué mostrar en la UI).

---


## 7. Métodos principales: las herramientas de Senior Cat


### login
```typescript
login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/login`, credentials).pipe(
        tap((response) => {
            this.applyAuthResponse(response);
        }),
    );
}
```
**¿Por qué y para qué?**
- Envía las credenciales al backend usando POST (por seguridad, nunca envíes contraseñas por GET).
- Si el login es exitoso, el backend responde con un token y los datos del usuario.
- `tap` ejecuta una función secundaria: guarda el token y el usuario usando `applyAuthResponse`.
- Devuelve un Observable para que el componente pueda reaccionar al resultado (mostrar error, redirigir, etc).


### register
```typescript
register(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiURL}/register`, credentials).pipe(
        tap((response) => {
            this.applyAuthResponse(response);
        }),
    );
}
```
**¿Por qué y para qué?**
- Igual que login, pero para crear un usuario nuevo en el backend.
- Así, el flujo de registro y login es muy parecido y fácil de mantener.


### loadProfile
```typescript
loadProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/profile`).pipe(
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
```
**¿Por qué y para qué?**
- Pide al backend los datos del usuario asociado al token (si el token es válido).
- Si va bien, guarda el usuario y marca la sesión como lista.
- Si falla (token inválido, expirado, etc), limpia el usuario y marca la sesión como lista, para que la app pueda mostrar el login o un mensaje de error.


### applyAuthResponse
```typescript
private applyAuthResponse(response: AuthResponse): void {
    this.writeTokenCookie(response.access_token);
    this.token.set(response.access_token);
    this.currentUserState.set(response.user);
    this.authReadyState.set(true);
}
```
**¿Por qué y para qué?**
- Centraliza el proceso de guardar el token y el usuario tras login o registro.
- Así, si en el futuro quieres cambiar cómo se guarda el token, solo tienes que modificar este método.


### readTokenCookie
```typescript
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
```
**¿Por qué y para qué?**
- Busca la cookie del token JWT y la devuelve si existe.
- Así, aunque recargues la página, puedes restaurar la sesión leyendo la cookie.


### writeTokenCookie
```typescript
private writeTokenCookie(token: string): void {
    const maxAgeSeconds = 60 * 60 * 24 * 7;
    document.cookie = `${this.tokenCookieName}=${encodeURIComponent(token)}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
}
```
**¿Por qué y para qué?**
- Escribe la cookie del token para que dure 7 días, así el usuario no tiene que loguearse cada vez que entra.
- Usa `encodeURIComponent` para evitar problemas con caracteres especiales.


### handleSessionRestoreError
```typescript
private handleSessionRestoreError(error: unknown): void {
    if (error instanceof HttpErrorResponse && error.status === 401) {
        this.clearSession(true);
        return;
    }
    this.currentUserState.set(null);
    this.authReadyState.set(true);
}
```
**¿Por qué y para qué?**
- Si el backend responde 401 (token inválido o expirado), borra la sesión y la cookie para evitar problemas de seguridad.
- Para otros errores (por ejemplo, el servidor está caído), solo limpia el usuario y marca la sesión como lista, para que la app pueda mostrar un mensaje adecuado.


### clearSession
```typescript
private clearSession(removeCookie: boolean): void {
    if (removeCookie) {
        this.deleteTokenCookie();
    }
    this.token.set(null);
    this.currentUserState.set(null);
    this.authReadyState.set(true);
}
```
**¿Por qué y para qué?**
- Limpia todos los datos de sesión (token, usuario, estado de autenticación).
- Si se indica, borra también la cookie para que la sesión no persista.


### deleteTokenCookie
```typescript
private deleteTokenCookie(): void {
    document.cookie = `${this.tokenCookieName}=; path=/; max-age=0; samesite=lax`;
}
```
**¿Por qué y para qué?**
- Borra la cookie del token para cerrar la sesión de forma segura.


### handleUnauthorized y logout
```typescript
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
```
**¿Por qué y para qué?**
- Ambos métodos limpian la sesión y redirigen al login.
- `handleUnauthorized` se usa cuando el backend dice que el usuario ya no está autorizado (por ejemplo, token caducado).
- `logout` se usa cuando el usuario pulsa el botón de cerrar sesión.

en sureSessionReady(): Observable<boolean> {

### ensureSessionReady
```typescript
ensureSessionReady(): Observable<boolean> {
    if (this.authReady()) {
        return of(this.isLoggedIn());
    }
    if (!this.token()) {
        this.authReadyState.set(true);
        return of(false);
    }
    return this.loadProfile().pipe(
        map(() => true),
        catchError(() => of(false)),
    );
}
```
**¿Por qué y para qué?**
- Garantiza que la sesión esté validada antes de continuar (por ejemplo, antes de entrar a una ruta privada).
- Si ya se comprobó la sesión, responde enseguida.
- Si no hay token, marca como no logueado.
- Si hay token pero no se ha comprobado, pide el perfil al backend y responde según el resultado.


### getToken
```typescript
getToken(): string | null {
    return this.token();
}
```
**¿Por qué y para qué?**
- Devuelve el token actual (o null).
- Útil para enviar el token en las cabeceras de peticiones protegidas.

---


## 8. Ejemplo de uso en un componente

```typescript
// Saber si el usuario está logueado
if (this.authService.isLoggedIn()) {
    // Mostrar contenido privado
}

// Cerrar sesión
this.authService.logout();
```
**¿Por qué y para qué?**
- Así puedes mostrar u ocultar partes de la interfaz según el estado de la sesión.
- Permite cerrar sesión de forma sencilla y segura.

---

## 9. Resumen visual y metáfora de construcción

- **Cookie** = ladrillo persistente: guarda el JWT aunque recargues la página.
- **Signal** = ladrillo reactivo: permite que la app se actualice automáticamente si cambia el estado de la sesión.
- **Métodos públicos**: login, register, logout, getToken, ensureSessionReady.

Senior Cat recomienda este patrón para construir apps seguras, reactivas y fáciles de mantener. Cada línea es un ladrillo bien colocado para que tu app sea robusta, flexible y fácil de entender incluso si estás empezando en el mundo del desarrollo web.
