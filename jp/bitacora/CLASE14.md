# CLASE14 - Comentarios, Puntuación por Estrellas y Favoritos

**Fecha:** 2026-03-21 (estimada)
**Horario:** 16:30 - 20:30
**Receso:** 18:00 - 18:30
**Nivel:** intermedio
**Clase anterior de referencia:** jp/bitacora/CLASE13.md
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE13

En CLASE13 instalamos la seguridad: JWT, guards e interceptor.
Hoy es el **día de la vida social del edificio**: los usuarios pueden opinar, puntuar y guardar sus favoritos.
Todo depende del `AuthService` — solo usuarios logueados pueden interactuar.

---

## Tema y objetivo del día

### Tema central

Comentarios, puntuación con estrellas y favoritos — tres features que integran lo aprendido esta semana.

### Objetivo general

1. Listar y crear comentarios en la página de detalle de restaurante.
2. Componente de estrellas interactivo para puntuar (1-5).
3. Añadir y quitar restaurantes de favoritos con feedback inmediato.
4. Todo protegido: solo usuarios logueados pueden comentar, puntuar y guardar favoritos.

---

## Conceptos clave del día

### @Output y EventEmitter — comunicar del hijo al padre

```typescript
// Si @Input pasa datos de PADRE a HIJO,
// @Output hace lo contrario: emite eventos del HIJO hacia el PADRE.

// Ejemplo: componente EstrellasPuntuacion emite la puntuación elegida
import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-estrellas",
  standalone: true,
  template: `
    <div class="estrellas">
      @for (n of [1, 2, 3, 4, 5]; track n) {
        <span
          [class.llena]="n <= valorSeleccionado"
          [class.hover]="n <= valorHover"
          (mouseenter)="valorHover = n"
          (mouseleave)="valorHover = 0"
          (click)="seleccionar(n)"
        >
          ★
        </span>
      }
    </div>
  `,
})
export class EstrellasPuntuacionComponent {
  @Input() valorActual = 0; // puntuación existente (solo lectura si readonly)
  @Input() readonly = false; // si true, no se puede interactuar
  @Output() puntuacion = new EventEmitter<number>(); // emite el valor elegido

  valorSeleccionado = 0;
  valorHover = 0;

  ngOnInit() {
    this.valorSeleccionado = this.valorActual;
  }

  seleccionar(n: number) {
    if (this.readonly) return;
    this.valorSeleccionado = n;
    this.puntuacion.emit(n); // notifica al padre con el valor elegido
  }
}

// En el padre:
// <app-estrellas [valorActual]="restaurante.puntuacionMedia"
//                (puntuacion)="enviarPuntuacion($event)" />
// $event contiene el número emitido (1-5)
```

### Optimistic Update — actualizar la UI antes de confirmar con la API

```typescript
// Patrón muy útil para favoritos: el corazón cambia INMEDIATAMENTE al hacer clic,
// sin esperar la respuesta del servidor. Si la API falla, se revierte.
// Resultado: la app se siente instantánea.

toggleFavorito(restauranteId: number) {
  const eraFavorito = this.favoritos.includes(restauranteId);

  // 1. Actualizar UI inmediatamente (optimistic)
  if (eraFavorito) {
    this.favoritos = this.favoritos.filter(id => id !== restauranteId);
  } else {
    this.favoritos = [...this.favoritos, restauranteId];
  }

  // 2. Confirmar con la API
  const peticion = eraFavorito
    ? this.usuariosSvc.quitarFavorito(this.usuario.id, restauranteId)
    : this.usuariosSvc.agregarFavorito(this.usuario.id, restauranteId);

  peticion.subscribe({
    error: () => {
      // 3. Si falla, revertir el cambio optimista
      if (eraFavorito) {
        this.favoritos = [...this.favoritos, restauranteId];
      } else {
        this.favoritos = this.favoritos.filter(id => id !== restauranteId);
      }
    }
  });
}
```

---

## Referencia rápida: comandos del día

```bash
# Componente de estrelllas reutilizable
ng g c shared/estrellas-puntuacion

# Componente de sección de comentarios (listado + formulario)
ng g c comentarios/comentarios-seccion

# Servicio de comentarios
ng g s servicios/comentarios

# Servicio de usuarios (favoritos, perfil)
ng g s servicios/usuarios

# Interfaces necesarias
ng g interface interfaces/comentario
ng g interface interfaces/puntuacion
```

---

## Código guiado paso a paso

### Paso 1 — Interfaces

```typescript
// interfaces/comentario.ts
export interface Comentario {
  id: number;
  texto: string;
  fecha: string;
  restauranteId: number;
  usuario: { id: number; nombre: string };
}

// interfaces/puntuacion.ts
export interface PuntuacionResumen {
  promedio: number;
  total: number;
  miPuntuacion?: number; // puntuación del usuario actual (si existe)
}
```

### Paso 2 — ServicioComentarios

```typescript
// servicios/comentarios.service.ts
@Injectable({ providedIn: "root" })
export class ComentariosService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000";

  getDeRestaurante(restauranteId: number): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(
      `${this.apiUrl}/restaurants/${restauranteId}/comments`,
    );
  }

  crear(restauranteId: number, texto: string): Observable<Comentario> {
    return this.http.post<Comentario>(
      `${this.apiUrl}/restaurants/${restauranteId}/comments`,
      { texto },
    );
  }

  // Solo el autor o admin pueden eliminar
  eliminar(comentarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${comentarioId}`);
  }
}
```

### Paso 3 — ServicioUsuarios (favoritos)

```typescript
// servicios/usuarios.service.ts
@Injectable({ providedIn: "root" })
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:3000";

  getFavoritos(usuarioId: number): Observable<number[]> {
    return this.http.get<number[]>(
      `${this.apiUrl}/users/${usuarioId}/favorites`,
    );
  }

  agregarFavorito(usuarioId: number, restauranteId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/${usuarioId}/favorites`, {
      restauranteId,
    });
  }

  quitarFavorito(usuarioId: number, restauranteId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/users/${usuarioId}/favorites/${restauranteId}`,
    );
  }

  getPuntuacion(restauranteId: number): Observable<PuntuacionResumen> {
    return this.http.get<PuntuacionResumen>(
      `${this.apiUrl}/restaurants/${restauranteId}/rating`,
    );
  }

  enviarPuntuacion(restauranteId: number, valor: number): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/restaurants/${restauranteId}/rating`,
      { valor },
    );
  }
}
```

### Paso 4 — ComentariosSeccion (listado + formulario integrado)

```typescript
// comentarios/comentarios-seccion.component.ts
@Component({
  selector: "app-comentarios-seccion",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./comentarios-seccion.component.html",
})
export class ComentariosSeccionComponent implements OnInit {
  @Input() restauranteId!: number;

  auth = inject(AuthService);
  private svc = inject(ComentariosService);
  private fb = inject(FormBuilder);

  comentarios: Comentario[] = [];

  // Formulario de nuevo comentario
  form = this.fb.group({
    texto: [
      "",
      [Validators.required, Validators.minLength(5), Validators.maxLength(500)],
    ],
  });

  ngOnInit() {
    this.cargarComentarios();
  }

  cargarComentarios() {
    this.svc
      .getDeRestaurante(this.restauranteId)
      .subscribe((c) => (this.comentarios = c));
  }

  enviarComentario() {
    if (this.form.invalid) return;
    const texto = this.form.value.texto!;
    this.svc.crear(this.restauranteId, texto).subscribe((nuevo) => {
      // Añadir el nuevo comentario al array sin recargar todo
      this.comentarios = [nuevo, ...this.comentarios];
      this.form.reset();
    });
  }
}
```

```html
<!-- comentarios-seccion.component.html -->
<section class="comentarios">
  <h3>Comentarios ({{ comentarios.length }})</h3>

  @if (auth.estaLogueado()) {
  <form [formGroup]="form" (ngSubmit)="enviarComentario()">
    <textarea formControlName="texto" placeholder="¿Qué te pareció?"></textarea>
    <button type="submit" [disabled]="form.invalid">Publicar</button>
  </form>
  } @else {
  <p><a routerLink="/login">Inicia sesión</a> para dejar un comentario.</p>
  } @for (c of comentarios; track c.id) {
  <div class="comentario">
    <strong>{{ c.usuario.nombre }}</strong>
    <small>{{ c.fecha | date:'dd/MM/yyyy' }}</small>
    <p>{{ c.texto }}</p>
  </div>
  }
</section>
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso CLASE13 + objetivo del día

- Confirmar que el interceptor funciona para todos.
- Explicar los tres features: comentarios, puntuación y favoritos.

### 16:50 - 17:30 | Comentarios

- `ComentariosService` + `ComentariosSeccionComponent`.
- Listar + crear desde el detalle del restaurante.
- Mostrar solo el formulario si `auth.estaLogueado()`.

### 17:30 - 18:00 | Estrellas y puntuación

- `EstrellasPuntuacionComponent` con `@Input` y `@Output`.
- Mostrar promedio en el detalle y `miPuntuacion` si el usuario ya votó.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Favoritos con optimistic update

- `UsuariosService` con agregar/quitar.
- Botón corazón en la tarjeta de la lista y en el detalle.
- Optimistic update para feedback inmediato.

### 19:15 - 20:00 | Página de favoritos

- Componente `FavoritosComponent` (ruta protegida con guard).
- Carga la lista de restaurantes favoritos del usuario.

### 20:00 - 20:30 | Revisión + cierre

---

## Actividades diferenciadas

### sin-ia

1. Crear `ComentariosSeccion` con listado y formulario básico.
2. Botón favorito que funciona (sin optimistic update, solo con subscribe).
3. Mostrar el promedio de puntuación en el detalle (solo lectura).
4. Proteger "Mis favoritos" con `authGuard`.

### con-ia

1. Todo lo anterior + optimistic update en favoritos.
2. Componente `EstrellasPuntuacion` con hover y animación CSS.
3. Paginación de comentarios (cargar más al hacer scroll o con botón).

**Prompt sugerido para con-ia:**

> "Tengo un componente Angular de comentarios de restaurante. Genera la lógica de paginación: carga 5 comentarios al inicio y tiene un botón 'Ver más' que carga los 5 siguientes desde la API con un parámetro de página. Usa signals para el estado."

---

## Entregables mínimos del día

- [ ] Comentarios visibles y nuevo comentario funcional desde la UI.
- [ ] Puntuación media del restaurante visible en detalle.
- [ ] Botón de favorito funcional (añadir y quitar).
- [ ] Página de favoritos protegida y operativa.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Entiendo la diferencia entre `@Input` (datos al hijo) y `@Output` (eventos al padre).
- [ ] Sé qué es un optimistic update y cuándo usarlo.
- [ ] El formulario de comentarios no aparece si no hay sesión.
- [ ] La puntuación y los favoritos persisten al recargar la página.
- [ ] Autoevaluación personal (1-5).

---

## Predicción CLASE15

1. Mapa interactivo con Leaflet: mostrar la ubicación de cada restaurante.
2. Marcadores en el mapa que navegan al detalle del restaurante.
3. Revisión general del proyecto, pulido de UI y deploy en Vercel o GitHub Pages.
