# CLASE9-TUTORIAL-ANGULAR - Referencia extra de Angular y Angular CLI

**Uso:** documento de apoyo para repasar fuera de clase.  
**Propósito:** tener una caja de herramientas de Angular sin mezclarla con la secuencia real del proyecto.  
**Mentor de referencia:** Senior Cat 🐱

---

## Para qué sirve este documento

Este archivo no representa una clase separada del calendario principal. Es un extra para el grupo Ladrillos: una guía de consulta rápida para recordar cómo crear piezas Angular, cómo arrancar un proyecto y cómo preparar servicios y routing en Angular moderno.

---

## Tutorial oficial recomendado

Referencia principal:

- https://angular.dev/tutorials/learn-angular

Si quieres repasar desde cero, sigue el tutorial oficial y compáralo con tu proyecto real.

---

## Comandos base de Angular CLI

```bash
ng new nombre-del-proyecto
ng serve
ng serve --open
ng build
ng version
ng test
ng lint
```

Qué hace cada uno:

- `ng new`: crea una app Angular nueva.
- `ng serve`: arranca el servidor de desarrollo.
- `ng serve --open`: arranca y abre navegador.
- `ng build`: compila la app.
- `ng version`: muestra versiones de Angular y del entorno.
- `ng test`: corre tests.
- `ng lint`: revisa calidad del código.

---

## Crear piezas del proyecto con CLI

### Componentes

```bash
ng g c nombre-del-componente
ng g c components/pages/home
ng g c components/layout/header
```

Úsalo para:

- páginas,
- layout,
- tarjetas reutilizables,
- formularios,
- bloques visuales.

### Servicios

```bash
ng g s services/auth
ng g s services/restaurantes
ng g s services/recipes
```

Úsalo para:

- llamadas HTTP,
- sesión de usuario,
- lógica reutilizable,
- separación entre vista y acceso a datos.

### Guards

```bash
ng g guard guards/auth
```

Úsalo para:

- proteger rutas,
- bloquear acceso a páginas privadas,
- redirigir a login.

### Interfaces

```bash
ng g i interfaces/restaurante
ng g i interfaces/recipe
ng g i interfaces/auth/login-response
```

Úsalo para:

- tipar respuestas del backend,
- describir estructuras de datos,
- mejorar autocompletado y control de errores.

### Pipes

```bash
ng g pipe pipes/truncar-texto
```

Úsalo para:

- formatear texto,
- transformar fechas,
- representar datos en templates.

### Enums

```bash
ng g enum enums/categoria-restaurante
```

Úsalo para:

- valores fijos,
- categorías,
- estados o tipos cerrados.

---

## Estructura sugerida para proyectos del curso

```text
src/app/
├─ components/
│  ├─ layout/
│  └─ pages/
├─ services/
├─ interfaces/
├─ guards/
├─ interceptors/
├─ app.config.ts
├─ app.routes.ts
└─ app.ts o app.component.ts
```

Metáfora del grupo: primero se levantan los muros visibles (`components`), luego las tuberías (`services`), luego la seguridad (`guards` e `interceptors`) y al final se remata la experiencia completa.

---

## Router en Angular moderno

### Archivo de rutas

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./components/pages/home/home').then(m => m.Home) },
  { path: '**', redirectTo: 'home' },
];
```

### Registro en `app.config.ts`

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
```

### Estructura base del layout

```html
<app-header></app-header>
<main>
  <router-outlet></router-outlet>
</main>
<app-footer></app-footer>
```

---

## Servicios en Angular moderno

### Configuración global

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

provideHttpClient(withInterceptors([authInterceptor]))
```

Si todavía no hay auth:

```ts
provideHttpClient()
```

### Ejemplo mínimo de servicio

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../interfaces/restaurante';

@Injectable({ providedIn: 'root' })
export class RestaurantesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:3000';

  getAll(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants`);
  }

  getById(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurants/${id}`);
  }

  create(data: Partial<Restaurante>) {
    return this.http.post(`${this.apiUrl}/restaurants`, data);
  }

  update(id: number, data: Partial<Restaurante>) {
    return this.http.patch(`${this.apiUrl}/restaurants/${id}`, data);
  }

  remove(id: number) {
    return this.http.delete(`${this.apiUrl}/restaurants/${id}`);
  }
}
```

### Ejemplo mínimo de auth

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://127.0.0.1:3000';

  login(nombre: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { nombre, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
```

---

## Interceptor recomendado

```ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );
};
```

---

## Checklist rápida para montar servicios

- [ ] Crear interfaces primero.
- [ ] Generar servicio con CLI.
- [ ] Definir `apiUrl`.
- [ ] Añadir métodos `get`, `post`, `patch` y `delete`.
- [ ] Registrar `provideHttpClient` en `app.config.ts`.
- [ ] Añadir interceptor si hay token.
- [ ] Consumir el servicio desde componentes, no al revés.

---

## Regla práctica de Senior Cat

- componente: pinta y reacciona,
- servicio: trae y envía datos,
- interfaz: tipa,
- router: mueve la app,
- interceptor: automatiza,
- guard: protege.

Así el edificio queda ordenado ladrillo a ladrillo y no se convierte en una obra caótica.
