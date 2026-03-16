# CLASE13 - Autenticación: Registro, Login, Guards e Interceptor JWT

**Fecha:** 2026-03-20 (estimada)
**Horario:** 16:30 - 20:30
**Receso:** 18:00 - 18:30
**Nivel:** intermedio
**Clase anterior de referencia:** jp/bitacora/CLASE12.md
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE12

En CLASE12 dimos escritura al proyecto: formularios, validaciones, POST y PATCH.
Hoy instalamos la **puerta de seguridad del edificio**: solo usuarios autenticados pueden crear, editar y ver favoritos.
Los tres pilares de hoy: `AuthService` (gestiona sesión), `AuthGuard` (controla acceso), `Interceptor` (automatiza el token).

---

## Tema y objetivo del día

### Tema central

JWT, `AuthService` con signals, `CanActivateFn` guard y `HttpInterceptorFn` para envío automático del token.

### Objetivo general

1. Formularios de registro y login conectados con la API.
2. Token JWT guardado en `localStorage`.
3. Guard que bloquea rutas privadas si no hay sesión.
4. Interceptor que añade el header `Authorization: Bearer <token>` automáticamente.
5. Menú que cambia según si hay sesión activa o no.

---

## Conceptos clave del día

### ¿Qué es JWT?

```
JSON Web Token — un token firmado que el servidor entrega al loguearse.
Estructura: HEADER.PAYLOAD.SIGNATURE (tres partes separadas por punto)

- HEADER: algoritmo de firma
- PAYLOAD: datos del usuario (id, email, rol) — NO guardes contraseñas aquí
- SIGNATURE: garantiza que el token no fue alterado

El cliente guarda el token y lo envía en cada petición:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

El servidor verifica la firma y sabe quién eres sin consultar la DB cada vez.
```

### AuthService — gestión de sesión con signals

```typescript
// servicios/auth.service.ts
import { Injectable, inject, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

interface LoginResponse {
  access_token: string;
  usuario: { id: number; email: string; nombre: string };
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000";

  // signal = valor reactivo. Cuando cambia, Angular actualiza el template automáticamente.
  // Diferencia con una variable normal: Angular "escucha" el signal.
  private _usuario = signal<LoginResponse["usuario"] | null>(null);

  // computed = valor calculado que depende de otro signal
  usuario = this._usuario.asReadonly();
  estaLogueado = computed(() => this._usuario() !== null);

  constructor() {
    // Al iniciar la app, restaurar sesión si hay token guardado
    this.restaurarSesion();
  }

  registro(datos: { nombre: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/users/register`, datos);
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        // tap ejecuta un efecto secundario sin modificar el valor del Observable
        tap((res) => {
          localStorage.setItem("token", res.access_token);
          this._usuario.set(res.usuario);
        }),
      );
  }

  logout() {
    localStorage.removeItem("token");
    this._usuario.set(null);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  private restaurarSesion() {
    const token = this.getToken();
    if (token) {
      // Opcional: decodificar el payload del JWT para restaurar el usuario
      // Sin llamar a la API (el token ya tiene los datos del usuario en el payload)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // Verificar que el token no ha expirado
        if (payload.exp * 1000 > Date.now()) {
          this._usuario.set({
            id: payload.sub,
            email: payload.email,
            nombre: payload.nombre,
          });
        } else {
          // Token expirado: limpiar
          this.logout();
        }
      } catch {
        this.logout();
      }
    }
  }
}
```

### AuthGuard — proteger rutas

```typescript
// guards/auth.guard.ts
// CanActivateFn es la forma moderna (funcional) de los guards en Angular 16+
// No necesita clase, es solo una función.
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../servicios/auth.service";

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaLogueado()) {
    return true; // permite el acceso
  }

  // Si no está logueado, redirige al login
  return router.createUrlTree(["/login"]);
};

// Cómo usarlo en las rutas:
// { path: 'favoritos', component: FavoritosComponent, canActivate: [authGuard] }
```

### HttpInterceptor — enviar el token automáticamente

```typescript
// interceptors/auth.interceptor.ts
// El interceptor es como un guardia en la puerta de salida:
// revisa CADA petición HTTP y añade el token si existe.
// Así no tienes que añadirlo manualmente en cada servicio.
import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../servicios/auth.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  if (token) {
    // clone() crea una copia inmutable de la petición con las modificaciones
    // Las peticiones HTTP son inmutables — no se pueden modificar directamente
    const reqConToken = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(reqConToken);
  }

  // Sin token: pasa la petición original sin modificar
  return next(req);
};

// Registrarlo en app.config.ts:
// provideHttpClient(withInterceptors([authInterceptor]))
```

---

## Referencia rápida: comandos del día

```bash
# Guard funcional
ng g guard guards/auth

# Los interceptores se crean manualmente (no hay schematic oficial para funcionales)
# Crear el archivo: interceptors/auth.interceptor.ts
```

---

## Código guiado: rutas protegidas y menú dinámico

### Rutas con guard en app.routes.ts

```typescript
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "restaurantes", component: RestauranteListaComponent },
  { path: "restaurantes/:id", component: RestauranteDetalleComponent },
  {
    path: "restaurantes/nuevo",
    component: RestauranteFormComponent,
    canActivate: [authGuard],
  },
  {
    path: "favoritos",
    component: FavoritosComponent,
    canActivate: [authGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegistroComponent },
  { path: "", redirectTo: "restaurantes", pathMatch: "full" },
  { path: "**", redirectTo: "restaurantes" },
];
```

### Menú dinámico según sesión

```html
<!-- nav.component.html -->
<nav>
  <a [routerLink]="['/restaurantes']">Restaurantes</a>

  @if (auth.estaLogueado()) {
  <!-- Solo visible si hay sesión -->
  <a [routerLink]="['/favoritos']">Mis favoritos</a>
  <a [routerLink]="['/restaurantes/nuevo']">+ Añadir</a>
  <span>Hola, {{ auth.usuario()?.nombre }}</span>
  <button (click)="auth.logout()">Cerrar sesión</button>
  } @else {
  <a [routerLink]="['/login']">Iniciar sesión</a>
  <a [routerLink]="['/registro']">Registrarse</a>
  }
</nav>
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso CLASE12 + concepto JWT

- ¿Qué problema resuelve JWT?
- Estructura del token (mostrar un token real en jwt.io).
- Flujo completo: registro → login → token → peticiones autenticadas.

### 16:50 - 17:30 | AuthService + formularios de login/registro

- `AuthService` con signals.
- Componentes `LoginComponent` y `RegistroComponent` con Reactive Forms.
- Probar login: token en `localStorage`.

### 17:30 - 18:00 | AuthGuard

- Crear y configurar `authGuard`.
- Probar: intentar acceder a `/restaurantes/nuevo` sin estar logueado.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Interceptor JWT

- Crear `authInterceptor`.
- Registrarlo con `withInterceptors([authInterceptor])`.
- Verificar en DevTools → Network que el header llega a la API.

### 19:15 - 20:00 | Práctica autónoma

- Menú dinámico (logueado / sin sesión).
- Redirigir al login al cerrar sesión.
- sin-ia: menú estático con condición; con-ia: signal de sesión reactivo.

### 20:00 - 20:30 | Revisión + cierre

---

## Actividades diferenciadas

### sin-ia

1. Formulario de login conectado a la API que guarda el token en `localStorage`.
2. Guard que redirige a `/login` si no hay token.
3. Menú con `@if (auth.estaLogueado())` para mostrar opciones según sesión.
4. Probar el interceptor viendo el header en DevTools → Network.

### con-ia

1. Todo lo anterior + `AuthService` con signal reactivo.
2. Pedir a la IA que implemente el refresco automático del token cuando expira.
3. Añadir un guard de rol: solo usuarios con `rol: 'admin'` pueden crear restaurantes.

**Prompt sugerido para con-ia:**

> "Tengo un AuthService en Angular con signals que guarda el JWT en localStorage. Genera un interceptor que detecte respuestas con error 401 (token expirado) y llame automáticamente a un endpoint de refresh token antes de reintentar la petición original. Explica el operador RxJS que necesitas."

---

## Entregables mínimos del día

- [ ] Login funcional guardando JWT en `localStorage`.
- [ ] Rutas privadas bloqueadas sin sesión.
- [ ] Interceptor añadiendo `Authorization: Bearer` en cada petición.
- [ ] Menú que cambia según estado de sesión.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Entiendo qué es un JWT y qué contiene el payload.
- [ ] Sé cuándo usar `signal()` vs una variable normal.
- [ ] Mi guard redirige correctamente a `/login` cuando no hay sesión.
- [ ] Comprobé en DevTools que el header `Authorization` llega a la API.
- [ ] Autoevaluación personal (1-5).

---

## Predicción CLASE14

1. Comentarios por restaurante: listar, crear y moderar.
2. Sistema de puntuación de estrellas (1-5) por usuario.
3. Favoritos: añadir y quitar restaurantes de la lista personal.
4. Integrar todo con el estado de sesión del `AuthService`.
