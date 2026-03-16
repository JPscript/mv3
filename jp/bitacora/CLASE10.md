# CLASE10 - Routing + HttpClient → Lista de Restaurantes

**Fecha:** 2026-03-17 (estimada)
**Horario:** 16:30 - 20:30
**Receso:** 18:00 - 18:30
**Nivel:** inicial (segundo día con Angular)
**Clase anterior de referencia:** jp/bitacora/CLASE9.md
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE9

En CLASE9 instalamos Angular CLI, creamos la app base y completamos el tutorial oficial.
Hoy conectamos Angular con el mundo real: nuestra API NestJS de restaurantes.
Si JS vanilla era construir con ladrillos sueltos, hoy ponemos el **sistema de tuberías** (HttpClient) que alimenta cada piso del edificio.

---

## Tema y objetivo del día

### Tema central

Router de Angular + HttpClient: configurar rutas y hacer el primer `GET` real a la API.

### Objetivo general

1. Configurar `provideRouter` y `provideHttpClient` en `app.config.ts`.
2. Crear el servicio `RestaurantesService` con `GET /restaurants`.
3. Mostrar la lista de restaurantes con `@for` en `RestauranteListaComponent`.
4. Navegar al detalle de restaurante (ruta `/restaurantes/:id`, el componente puede estar vacío hoy).

---

## Conceptos clave del día

### Router de Angular — para qué sirve

El Router mapea URLs a componentes. Sin él, Angular es una sola página estática.

```typescript
// app.routes.ts — define el mapa de rutas de la app
import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "restaurantes", pathMatch: "full" },

  // Ruta simple: carga el componente directamente
  { path: "restaurantes", component: RestauranteListaComponent },

  // Ruta con parámetro: :id es dinámico (ej: /restaurantes/42)
  { path: "restaurantes/:id", component: RestauranteDetalleComponent },

  // Ruta lazy loading: el módulo solo se descarga cuando el usuario navega aquí
  // Ideal para secciones grandes que no todos visitan (admin, perfil, etc.)
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.routes").then((m) => m.ADMIN_ROUTES),
  },

  // Comodín: cualquier ruta no conocida va a 404
  { path: "**", component: PaginaNoEncontradaComponent },
];
```

### HttpClient — para qué sirve

Servicio de Angular para hacer peticiones HTTP (GET, POST, PATCH, DELETE).
Siempre devuelve un **Observable** — hay que suscribirse para obtener el dato.

```typescript
// ¿Observable vs Promise? Analogía:
// Promise: pides una pizza, te llaman UNA vez cuando llega.
// Observable: te suscribes a una serie de TV, recibes CADA capítulo nueva.
// Para HTTP básico se comportan igual, pero Observable permite cancelar, reintentar, transformar.
```

### Servicios en Angular — para qué sirven

Un servicio es una clase con `@Injectable` que contiene lógica reutilizable.
**Regla de oro:** los componentes muestran datos, los servicios los obtienen.

```typescript
// Mal: lógica HTTP dentro del componente
// Bien: componente llama al servicio, servicio llama a la API

@Injectable({ providedIn: "root" }) // 'root' = disponible en toda la app
export class RestaurantesService {
  // ...
}
```

---

## Referencia rápida: comandos del día

```bash
# Generar el servicio de restaurantes
ng g s servicios/restaurantes

# Generar el componente lista
ng g c restaurantes/restaurante-lista

# Generar el componente detalle (hoy solo el esqueleto)
ng g c restaurantes/restaurante-detalle

# Generar la interfaz del modelo de datos
ng g interface interfaces/restaurante
```

---

## Código guiado paso a paso

### Paso 1 — Configurar providers en app.config.ts

```typescript
// app.config.ts
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // activa el sistema de rutas
    provideHttpClient(), // activa HttpClient en toda la app
  ],
};
```

### Paso 2 — Interfaz Restaurante

```typescript
// interfaces/restaurante.ts
export interface Restaurante {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string;
  imagen: string;
  categoria: string;
  lat: number;
  lng: number;
  puntuacionMedia?: number; // opcional, calculada por la API
}
```

### Paso 3 — Servicio de restaurantes

```typescript
// servicios/restaurantes.service.ts
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Restaurante } from "../interfaces/restaurante";

@Injectable({ providedIn: "root" })
export class RestaurantesService {
  // inject() es la forma moderna, equivale a constructor(private http: HttpClient)
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000"; // URL base de tu API NestJS

  // Obtiene todos los restaurantes
  getAll(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.apiUrl}/restaurants`);
  }

  // Obtiene un restaurante por id
  getById(id: number): Observable<Restaurante> {
    return this.http.get<Restaurante>(`${this.apiUrl}/restaurants/${id}`);
  }
}
```

### Paso 4 — Componente lista

```typescript
// restaurantes/restaurante-lista.component.ts
import { Component, OnInit, inject } from "@angular/core";
import { RestaurantesService } from "../../servicios/restaurantes.service";
import { Restaurante } from "../../interfaces/restaurante";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-restaurante-lista",
  standalone: true,
  imports: [RouterLink], // necesario para usar [routerLink] en el template
  templateUrl: "./restaurante-lista.component.html",
})
export class RestauranteListaComponent implements OnInit {
  private svc = inject(RestaurantesService);

  restaurantes: Restaurante[] = [];
  cargando = true;
  error = "";

  ngOnInit() {
    // ngOnInit se ejecuta una vez cuando el componente se monta en el DOM
    this.svc.getAll().subscribe({
      next: (data) => {
        this.restaurantes = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = "No se pudo cargar la lista";
        this.cargando = false;
      },
    });
  }
}
```

```html
<!-- restaurante-lista.component.html -->
@if (cargando) {
<p>Cargando restaurantes...</p>
} @if (error) {
<p class="error">{{ error }}</p>
} @for (r of restaurantes; track r.id) {
<div class="card">
  <img [src]="r.imagen" [alt]="r.nombre" />
  <h2>{{ r.nombre }}</h2>
  <p>{{ r.descripcion }}</p>
  <!-- routerLink genera el href dinámicamente -->
  <a [routerLink]="['/restaurantes', r.id]">Ver detalle →</a>
</div>
}
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso CLASE9 + objetivo del día

- Verificar que todos tienen `ng serve` corriendo.
- Explicar el flujo: navegador → Router → Componente → Servicio → API NestJS.

### 16:50 - 17:30 | Configurar Router + primeras rutas

- Crear `app.routes.ts` con las rutas del proyecto.
- `<router-outlet>` en `app.component.html`.
- Navegar entre rutas con `[routerLink]`.

### 17:30 - 18:00 | Servicio + HttpClient

- Generar `RestaurantesService`.
- Primer `GET /restaurants` desde Angular.
- Ver la respuesta en consola con `.subscribe(console.log)`.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Renderizar la lista

- Conectar servicio al componente lista.
- Renderizar con `@for`, mostrar imagen, nombre, descripción.
- Gestionar estados: cargando / error / datos.

### 19:15 - 20:00 | Práctica autónoma

- Añadir filtro por categoría (sin-ia: con botones estáticos; con-ia: pipe personalizada).
- Estilizar la tarjeta básica.

### 20:00 - 20:30 | Revisión + cierre

---

## Actividades diferenciadas

### sin-ia

1. Crear el router con 3 rutas: raíz, lista y detalle (componente vacío).
2. Implementar `getAll()` en el servicio siguiendo la guía paso a paso.
3. Mostrar la lista con `@for` y `track`.
4. Añadir un `@if` para mostrar "Sin resultados" si el array está vacío.

### con-ia

1. Implementar todo lo anterior y además añadir un buscador por nombre con `signal()`.
2. Crear una `pipe` llamada `truncarTexto` que limite la descripción a N caracteres.
3. Pedir a la IA el servicio completo y luego verificar que los tipos TypeScript coinciden con tu API real.

**Prompt sugerido para con-ia:**

> "Tengo una API NestJS en `localhost:3000` con endpoint `GET /restaurants` que devuelve un array de restaurantes con los campos: id, nombre, descripcion, direccion, imagen, categoria, lat, lng. Genera el servicio Angular con HttpClient, la interfaz TypeScript y el componente lista con buscador reactivo usando signals. Explica qué hace cada parte."

---

## Entregables mínimos del día

- [ ] Router configurado con al menos 2 rutas funcionales.
- [ ] Lista de restaurantes renderizada desde la API real.
- [ ] Navegación al detalle (aunque esté vacío).
- [ ] Gestión de estado cargando/error visible en pantalla.
- [ ] Dudas registradas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Entiendo para qué sirve `provideRouter` y `provideHttpClient`.
- [ ] Sé la diferencia entre componente y servicio (y por qué importa).
- [ ] Usé `@for` con `track` correctamente.
- [ ] La app se comunica con mi API NestJS sin errores CORS.
- [ ] Autoevaluación personal (1-5).

---

## Predicción CLASE11

1. Página de detalle completa: datos del restaurante + lista de recetas del restaurante.
2. Child routes o rutas anidadas.
3. `ActivatedRoute` para leer el parámetro `:id` de la URL.
