# CLASE11 - Detalle de Restaurante + Recetas Vinculadas (Child Routes)

**Fecha:** 2026-03-18 (estimada)
**Horario:** 16:30 - 20:30
**Receso:** 18:00 - 18:30
**Nivel:** inicial-intermedio
**Clase anterior de referencia:** jp/bitacora/CLASE10.md
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE10

En CLASE10 pusimos las tuberías: Router + HttpClient + lista de restaurantes real.
Hoy añadimos el **segundo piso**: la página de detalle con los datos del restaurante y sus recetas.
La novedad técnica es leer el parámetro de la URL (`:id`) y hacer **dos peticiones** coordinadas.

---

## Tema y objetivo del día

### Tema central

`ActivatedRoute` para leer parámetros de URL + múltiples peticiones HTTP + componentes hijo (`@Input`).

### Objetivo general

1. Página de detalle que muestra todos los datos de un restaurante.
2. Lista de recetas del restaurante (reutilizando la API de recetas que ya tienes).
3. Componente `RecetaCard` reutilizable pasando datos con `@Input`.
4. Navegación completa: lista → detalle → volver.

---

## Conceptos clave del día

### ActivatedRoute — leer parámetros de la URL

```typescript
// El parámetro :id de la ruta /restaurantes/:id lo leemos así:
import { ActivatedRoute } from "@angular/router";
import { inject } from "@angular/core";

export class RestauranteDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // paramMap es un Observable que emite cada vez que el parámetro cambia
    // Útil si el usuario navega de /restaurantes/1 a /restaurantes/2 sin recargar
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get("id"));
      this.cargarRestaurante(id);
    });

    // Alternativa más simple (snapshot): solo lee el valor una vez al cargar
    // Úsala cuando NO esperas que el parámetro cambie sin recargar el componente
    const id = Number(this.route.snapshot.paramMap.get("id"));
  }
}
```

### @Input — pasar datos de padre a hijo

```typescript
// Componente padre: tiene el array de recetas
// Componente hijo (RecetaCard): muestra UNA receta

// En el hijo — declara qué datos espera recibir:
import { Component, Input } from '@angular/core';
import { Receta } from '../../interfaces/receta';

@Component({ selector: 'app-receta-card', standalone: true, ... })
export class RecetaCardComponent {
  @Input() receta!: Receta;   // el ! dice "prometo que este valor llega"
}

// En el template del padre — pasa el dato con [propiedad]="valor":
// @for (r of recetas; track r.id) {
//   <app-receta-card [receta]="r" />
// }
```

### forkJoin — hacer dos peticiones en paralelo

```typescript
// Si necesitas datos de dos endpoints al mismo tiempo, forkJoin los lanza
// en paralelo y espera a que AMBOS terminen antes de continuar.
// Más rápido que hacerlos secuencialmente.
import { forkJoin } from "rxjs";

forkJoin({
  restaurante: this.restaurantesSvc.getById(id),
  recetas: this.recetasSvc.getPorRestaurante(id),
}).subscribe(({ restaurante, recetas }) => {
  this.restaurante = restaurante;
  this.recetas = recetas;
  this.cargando = false;
});
```

---

## Referencia rápida: comandos del día

```bash
# Componente de detalle (si no lo generaste en CLASE10)
ng g c restaurantes/restaurante-detalle

# Componente reutilizable de tarjeta de receta
ng g c recetas/receta-card

# Servicio de recetas (conecta con tu API de recetas NestJS)
ng g s servicios/recetas

# Interfaz de receta
ng g interface interfaces/receta
```

---

## Código guiado paso a paso

### Paso 1 — Interfaz Receta

```typescript
// interfaces/receta.ts
export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string[];
  tiempo: number; // minutos
  dificultad: string;
  imagen?: string;
  restauranteId?: number;
}
```

### Paso 2 — Servicio de Recetas

```typescript
// servicios/recetas.service.ts
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Receta } from "../interfaces/receta";

@Injectable({ providedIn: "root" })
export class RecetasService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000";

  // Recetas de un restaurante concreto
  getPorRestaurante(restauranteId: number): Observable<Receta[]> {
    return this.http.get<Receta[]>(
      `${this.apiUrl}/restaurants/${restauranteId}/recipes`,
    );
  }

  // Todas las recetas (para el buscador global si se implementa)
  getAll(): Observable<Receta[]> {
    return this.http.get<Receta[]>(`${this.apiUrl}/recipes`);
  }
}
```

### Paso 3 — Componente Detalle

```typescript
// restaurantes/restaurante-detalle.component.ts
import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { forkJoin } from "rxjs";
import { RestaurantesService } from "../../servicios/restaurantes.service";
import { RecetasService } from "../../servicios/recetas.service";
import { Restaurante } from "../../interfaces/restaurante";
import { Receta } from "../../interfaces/receta";
import { RecetaCardComponent } from "../../recetas/receta-card/receta-card.component";

@Component({
  selector: "app-restaurante-detalle",
  standalone: true,
  imports: [RouterLink, RecetaCardComponent],
  templateUrl: "./restaurante-detalle.component.html",
})
export class RestauranteDetalleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private restaurantesSvc = inject(RestaurantesService);
  private recetasSvc = inject(RecetasService);

  restaurante?: Restaurante;
  recetas: Receta[] = [];
  cargando = true;
  error = "";

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    // Lanzamos ambas peticiones en paralelo con forkJoin
    forkJoin({
      restaurante: this.restaurantesSvc.getById(id),
      recetas: this.recetasSvc.getPorRestaurante(id),
    }).subscribe({
      next: ({ restaurante, recetas }) => {
        this.restaurante = restaurante;
        this.recetas = recetas;
        this.cargando = false;
      },
      error: () => {
        this.error = "No se pudo cargar el restaurante";
        this.cargando = false;
      },
    });
  }
}
```

```html
<!-- restaurante-detalle.component.html -->
<a [routerLink]="['/restaurantes']">← Volver a la lista</a>

@if (cargando) {
<p>Cargando...</p>
} @if (error) {
<p class="error">{{ error }}</p>
} @if (restaurante) {
<section class="detalle-header">
  <img [src]="restaurante.imagen" [alt]="restaurante.nombre" />
  <h1>{{ restaurante.nombre }}</h1>
  <p>{{ restaurante.descripcion }}</p>
  <p>📍 {{ restaurante.direccion }}</p>
  <span class="badge">{{ restaurante.categoria }}</span>
</section>

<section class="recetas">
  <h2>Platos del restaurante</h2>

  @if (recetas.length === 0) {
  <p>Este restaurante no tiene recetas todavía.</p>
  } @for (r of recetas; track r.id) {
  <!-- Pasamos cada receta al componente hijo con @Input -->
  <app-receta-card [receta]="r" />
  }
</section>
}
```

### Paso 4 — Componente hijo RecetaCard

```typescript
// recetas/receta-card.component.ts
import { Component, Input } from "@angular/core";
import { Receta } from "../../interfaces/receta";

@Component({
  selector: "app-receta-card",
  standalone: true,
  template: `
    <div class="receta-card">
      <h3>{{ receta.nombre }}</h3>
      <p>{{ receta.descripcion }}</p>
      <small>⏱ {{ receta.tiempo }} min · {{ receta.dificultad }}</small>
    </div>
  `,
})
export class RecetaCardComponent {
  @Input() receta!: Receta;
}
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso CLASE10 + objetivo del día

- Verificar lista de restaurantes y navegación.
- Explicar el flujo: URL con `:id` → `ActivatedRoute` → dos servicios → pantalla completa.

### 16:50 - 17:30 | ActivatedRoute + primer GET de detalle

- Leer `:id` de la URL con `snapshot.paramMap`.
- Mostrar nombre y descripción del restaurante.

### 17:30 - 18:00 | forkJoin + lista de recetas

- Segundo servicio `RecetasService`.
- `forkJoin` para lanzar ambas peticiones en paralelo.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Componente RecetaCard con @Input

- Crear `RecetaCardComponent` standalone.
- Pasar datos con `[receta]="r"` y recibirlos con `@Input`.
- Renderizar lista de recetas en el detalle.

### 19:15 - 20:00 | Práctica autónoma

- Añadir puntuación media del restaurante (sin-ia: mostrar el dato; con-ia: componente de estrellas).
- Botón "Añadir a favoritos" (preparar el botón, la lógica llega en CLASE14).

### 20:00 - 20:30 | Revisión + cierre

---

## Actividades diferenciadas

### sin-ia

1. Implementar el detalle paso a paso siguiendo la guía.
2. Identificar dónde se usa `@Input` y explicar con tus palabras para qué sirve.
3. Hacer que el botón "Volver" funcione con `[routerLink]`.
4. Añadir un estado de "sin recetas" visible en pantalla.

### con-ia

1. Todo lo anterior más componente `EstrellasPuntuacion` con `@Input() valor: number` que muestre ★ según el número.
2. Pedir a la IA que optimice las peticiones usando `switchMap` en lugar de `snapshot`.
3. Añadir skeleton loader mientras carga (CSS + `@if cargando`).

**Prompt sugerido para con-ia:**

> "Tengo un componente Angular de detalle de restaurante que hace dos peticiones con forkJoin (restaurante + recetas). Genera un componente hijo `EstrellasPuntuacion` con @Input() valor que muestre estrellas llenas, medias y vacías según un número del 1 al 5. Explica la lógica."

---

## Entregables mínimos del día

- [ ] Página de detalle mostrando todos los datos del restaurante.
- [ ] Lista de recetas del restaurante renderizada.
- [ ] Componente `RecetaCard` con `@Input` funcionando.
- [ ] Navegación completa: lista → detalle → volver a lista.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Sé leer un parámetro de URL con `ActivatedRoute`.
- [ ] Entiendo para qué sirve `forkJoin` vs hacer peticiones secuenciales.
- [ ] Domino `@Input` para pasar datos de padre a hijo.
- [ ] Mi app no tiene errores en consola al navegar entre páginas.
- [ ] Autoevaluación personal (1-5).

---

## Predicción CLASE12

1. Formularios reactivos con `FormBuilder` para crear y editar restaurantes.
2. Validaciones integradas de Angular (`Validators.required`, `Validators.minLength`).
3. Conectar formulario con `POST` y `PATCH` en el servicio.
