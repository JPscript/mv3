# CLASE13 - Servicios HTTP, sesión de usuario y primer mapa en Angular

**Fecha:** 2026-03-23  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE12.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE12

CLASE12 cerró la maqueta hardcodeada y dejó el plano de conexión con `api-recetas`. Ahora llega el momento de poner tuberías reales: servicios HTTP, sesión de usuario y una primera introducción al mapa con datos todavía controlados.

---

## Tema y objetivo del día

### Tema central

Conectar Angular con la API mediante servicios, abrir una sesión de usuario y entender cómo integrar Leaflet en Angular.

### Objetivo general

1. Configurar `provideHttpClient` y crear servicios Angular.
2. Conectar login, perfil y listados principales a `api-recetas`.
3. Guardar sesión de usuario de forma sencilla.
4. Instalar Leaflet e implementar un mapa inicial con coordenadas hardcodeadas.

---

## Servicios prioritarios del día

- `AuthService`
- `RestaurantesService`
- `RecipesService` si hace falta apoyo para detalle

Comandos recomendados para generarlos con Angular moderno:

```bash
ng g s services/auth
ng g s services/restaurantes
ng g s services/recipes
ng g i interfaces/auth/login-response
ng g i interfaces/restaurante
ng g i interfaces/recipe
```

Primeras llamadas recomendadas:

- `POST /auth/login`
- `GET /auth/profile`
- `GET /restaurants`
- `GET /restaurants/:id`

---

## Sesión de usuario

La sesión de hoy no busca sofisticación máxima. Busca que el alumnado entienda el flujo completo:

1. el usuario hace login,
2. el backend devuelve token,
3. Angular guarda token y datos mínimos del usuario,
4. el header cambia según haya sesión,
5. algunas vistas empiezan a comportarse distinto según el estado del usuario.

---

## Configuración base de servicios en Angular moderno

La idea en Angular moderno, incluyendo proyectos recientes con enfoque standalone, es esta:

1. `main.ts` arranca la aplicación,
2. `app.config.ts` registra router, cliente HTTP e interceptores,
3. cada servicio se genera con `ng g s`,
4. cada servicio usa `inject(HttpClient)` o inyección por constructor,
5. los componentes consumen los servicios y ya no guardan la lógica HTTP dentro de ellos.

### `app.config.ts`

```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes),
		provideHttpClient(withInterceptors([authInterceptor])),
	],
};
```

Si el proyecto no usa interceptores todavía, el mínimo sería:

```ts
provideHttpClient()
```

### Estructura sugerida para servicios

```text
src/app/
├─ services/
│  ├─ auth.service.ts
│  ├─ restaurantes.service.ts
│  └─ recipes.service.ts
├─ interfaces/
│  ├─ restaurante.ts
│  ├─ recipe.ts
│  └─ auth/
│     └─ login-response.ts
├─ interceptors/
│  └─ auth.interceptor.ts
└─ app.config.ts
```

### Ejemplo de servicio en Angular moderno

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
}
```

### Ejemplo mínimo de `AuthService`

```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginResponse } from '../interfaces/auth/login-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
	private readonly http = inject(HttpClient);
	private readonly apiUrl = 'http://127.0.0.1:3000';

	login(nombre: string, password: string) {
		return this.http
			.post<LoginResponse>(`${this.apiUrl}/auth/login`, { nombre, password })
			.pipe(
				tap((response) => {
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

### Interceptor recomendado desde el primer día de auth

```bash
mkdir src/app/interceptors
```

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

### Regla práctica para clase

- componentes muestran y reaccionan,
- servicios llaman a la API,
- interfaces tipan respuestas,
- interceptor evita repetir headers,
- `app.config.ts` concentra la infraestructura global.

---

## Introducción a Leaflet en Angular

El objetivo del mapa hoy es pedagógico, no final:

- instalar Leaflet,
- entender dónde importar sus estilos,
- montar un componente de mapa,
- renderizar un mapa con coordenadas hardcodeadas,
- preparar el componente para que en CLASE15 use coordenadas reales.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE12 y estrategia de conexión

- Revisar qué pantallas van primero a datos reales.
- Presentar el orden lógico de conexión.

### 16:50 - 17:30 | `provideHttpClient` y primeros servicios

- Configurar cliente HTTP.
- Crear servicios Angular.
- Hacer la primera llamada a `GET /restaurants`.
- Dejar preparadas las interfaces mínimas y la URL base de la API.

### 17:30 - 18:00 | Login y sesión

- Conectar formulario de login.
- Guardar token y usuario básico.
- Reflejar sesión en la interfaz.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Leaflet en Angular

- Instalar la librería.
- Añadir estilos.
- Crear el primer mapa con coordenadas hardcodeadas.

### 19:15 - 20:00 | Integración mínima visible

- Ver restaurantes reales en home.
- Mantener algunas pantallas todavía con apoyo hardcoded si hace falta.
- Revisar qué queda por quitar en las siguientes clases.

### 20:00 - 20:30 | Cierre

---

## Actividades diferenciadas

### sin-ia

1. Conectar `HomeComponent` con `GET /restaurants`.
2. Hacer login funcional y guardar token.
3. Mostrar el nombre del usuario logueado en header o perfil.
4. Crear un mapa básico con coordenadas hardcodeadas.
5. Generar al menos dos servicios con CLI y explicar qué responsabilidad tiene cada uno.

### con-ia

1. Pedir a la IA ayuda para definir los modelos TypeScript del login y de restaurantes.
2. Pedir a la IA una propuesta de `AuthService` simple y revisarla línea a línea.
3. Pedir a la IA un componente de mapa básico con Leaflet y adaptarlo al proyecto.
4. Explicar luego qué parte sigue siendo hardcoded y qué parte ya viene de la API.
5. Pedir a la IA una propuesta de interceptor de auth y justificar si conviene usarlo ya en esta clase.

---

## Entregables mínimos del día

- [ ] Servicio HTTP configurado.
- [ ] Al menos dos servicios generados con CLI y organizados en `services/`.
- [ ] Home consumiendo restaurantes reales o en transición clara.
- [ ] Login funcional con sesión guardada.
- [ ] Primer mapa visible en Angular.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Sé crear un servicio Angular para llamar a la API.
- [ ] Entiendo qué se configura en `app.config.ts` y qué se deja dentro de cada servicio.
- [ ] Entiendo el flujo login → token → sesión.
- [ ] Sé dónde se están guardando los datos de sesión.
- [ ] Logré mostrar un mapa básico con Leaflet.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE14)

1. Quitar más datos hardcoded.
2. Conectar detalle, comentarios y ratings.
3. Empezar a dejar la app apoyada ya casi por completo en la API real.
