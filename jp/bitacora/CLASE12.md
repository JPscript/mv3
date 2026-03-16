# CLASE12 - Reactive Forms: Crear y Editar Restaurantes

**Fecha:** 2026-03-19 (estimada)
**Horario:** 16:30 - 20:30
**Receso:** 18:00 - 18:30
**Nivel:** inicial-intermedio
**Clase anterior de referencia:** jp/bitacora/CLASE11.md
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE11

En CLASE11 construimos el detalle del restaurante y conectamos recetas con `@Input`.
Hoy **damos escritura al proyecto**: formularios para crear y editar restaurantes.
Los Reactive Forms son el sistema eléctrico del edificio — controlan el flujo de datos entre el usuario y la API.

---

## Tema y objetivo del día

### Tema central

Reactive Forms con `FormBuilder`, validaciones, mensajes de error y conexión con `POST` / `PATCH`.

### Objetivo general

1. Formulario de creación de restaurante con validaciones.
2. Formulario de edición que carga los datos existentes.
3. Conectar formulario con `POST /restaurants` y `PATCH /restaurants/:id`.
4. Mostrar feedback visual: errores de validación, éxito, carga.

---

## Conceptos clave del día

### Template Forms vs Reactive Forms — ¿cuál usar?

|                   | Template Forms           | Reactive Forms                     |
| ----------------- | ------------------------ | ---------------------------------- |
| Configuración     | En el HTML con `ngModel` | En el TypeScript con `FormBuilder` |
| Validaciones      | en el template           | en el TypeScript                   |
| Tests             | difícil                  | fácil                              |
| Proyectos grandes | no recomendado           | **recomendado**                    |

**Para este proyecto: Reactive Forms siempre.**

### FormBuilder — construir el formulario

```typescript
// FormBuilder es un helper que simplifica la creación de FormGroup y FormControl.
// Un FormGroup agrupa controles relacionados (los campos del formulario).
// Un FormControl representa UN campo (nombre, email, etc.).

import { FormBuilder, Validators } from "@angular/forms";
import { inject } from "@angular/core";

export class RestauranteFormComponent {
  private fb = inject(FormBuilder);

  // Crear el grupo de controles
  // Cada entrada: [valorInicial, [validaciones]]
  form = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(3)]],
    descripcion: ["", [Validators.required, Validators.maxLength(500)]],
    direccion: ["", Validators.required],
    imagen: ["", Validators.required],
    categoria: ["", Validators.required],
    lat: [null as number | null, Validators.required],
    lng: [null as number | null, Validators.required],
  });
}
```

### Validators más usados

```typescript
Validators.required; // el campo no puede estar vacío
Validators.minLength(3); // mínimo 3 caracteres
Validators.maxLength(500); // máximo 500 caracteres
Validators.email; // formato de email válido
Validators.min(1); // valor numérico mínimo 1
Validators.max(5); // valor numérico máximo 5
Validators.pattern(/^\d+$/); // solo números (regex)
```

### Acceder a controles para mostrar errores

```typescript
// En el TypeScript — getter para acceso fácil en el template
get nombre() { return this.form.get('nombre'); }

// En el HTML — mostrar error solo si fue tocado Y es inválido
// @if (nombre?.invalid && nombre?.touched) {
//   @if (nombre?.errors?.['required']) {
//     <span class="error">El nombre es obligatorio</span>
//   }
//   @if (nombre?.errors?.['minlength']) {
//     <span class="error">Mínimo 3 caracteres</span>
//   }
// }
```

### Modo edición: rellenar el formulario con datos existentes

```typescript
// patchValue actualiza SOLO los campos indicados (no falla si falta alguno)
// setValue requiere TODOS los campos (falla si falta uno)
// Para edición, siempre patchValue
this.form.patchValue({
  nombre: restaurante.nombre,
  descripcion: restaurante.descripcion,
  // ... resto de campos
});
```

---

## Referencia rápida: comandos del día

```bash
# Componente form reutilizable (sirve para crear Y editar)
ng g c restaurantes/restaurante-form

# Actualizar el servicio con POST y PATCH
# (editar el servicio existente, no generar uno nuevo)
```

---

## Código guiado paso a paso

### Paso 1 — Ampliar el servicio con POST y PATCH

```typescript
// servicios/restaurantes.service.ts — añadir estos métodos
import { Restaurante } from '../interfaces/restaurante';

// Crear restaurante nuevo
crear(data: Omit<Restaurante, 'id'>): Observable<Restaurante> {
  return this.http.post<Restaurante>(`${this.apiUrl}/restaurants`, data);
}

// Editar restaurante existente (PATCH = solo envías los campos que cambian)
editar(id: number, cambios: Partial<Restaurante>): Observable<Restaurante> {
  return this.http.patch<Restaurante>(`${this.apiUrl}/restaurants/${id}`, cambios);
}

// Eliminar restaurante
eliminar(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/restaurants/${id}`);
}
```

### Paso 2 — FormComponent (crear + editar en un solo componente)

```typescript
// restaurantes/restaurante-form.component.ts
import { Component, OnInit, inject, Input } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RestaurantesService } from "../../servicios/restaurantes.service";
import { Restaurante } from "../../interfaces/restaurante";

@Component({
  selector: "app-restaurante-form",
  standalone: true,
  imports: [ReactiveFormsModule], // IMPORTANTE: importar ReactiveFormsModule
  templateUrl: "./restaurante-form.component.html",
})
export class RestauranteFormComponent implements OnInit {
  // Si recibe un restaurante = modo edición. Si no = modo creación.
  @Input() restaurante?: Restaurante;

  private fb = inject(FormBuilder);
  private svc = inject(RestaurantesService);
  private router = inject(Router);

  enviando = false;
  mensajeExito = "";
  mensajeError = "";

  form = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(3)]],
    descripcion: ["", [Validators.required, Validators.maxLength(500)]],
    direccion: ["", Validators.required],
    imagen: [""],
    categoria: ["", Validators.required],
    lat: [null as number | null],
    lng: [null as number | null],
  });

  // Getters — acceso limpio a controles desde el template
  get nombre() {
    return this.form.get("nombre");
  }
  get descripcion() {
    return this.form.get("descripcion");
  }
  get direccion() {
    return this.form.get("direccion");
  }
  get categoria() {
    return this.form.get("categoria");
  }

  ngOnInit() {
    // Si viene un restaurante, rellenamos el formulario (modo edición)
    if (this.restaurante) {
      this.form.patchValue(this.restaurante);
    }
  }

  guardar() {
    if (this.form.invalid) {
      // markAllAsTouched muestra todos los errores si el usuario intenta enviar sin rellenar
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const datos = this.form.value as Omit<Restaurante, "id">;

    const peticion = this.restaurante
      ? this.svc.editar(this.restaurante.id, datos) // modo edición
      : this.svc.crear(datos); // modo creación

    peticion.subscribe({
      next: (r) => {
        this.mensajeExito = "¡Restaurante guardado!";
        this.enviando = false;
        this.router.navigate(["/restaurantes", r.id]);
      },
      error: () => {
        this.mensajeError = "Error al guardar. Intenta de nuevo.";
        this.enviando = false;
      },
    });
  }
}
```

```html
<!-- restaurante-form.component.html -->
<form [formGroup]="form" (ngSubmit)="guardar()">
  <div class="campo">
    <label>Nombre</label>
    <input formControlName="nombre" placeholder="Nombre del restaurante" />
    @if (nombre?.invalid && nombre?.touched) { @if
    (nombre?.errors?.['required']) { <span class="error">Obligatorio</span> }
    @if (nombre?.errors?.['minlength']) {
    <span class="error">Mínimo 3 caracteres</span> } }
  </div>

  <div class="campo">
    <label>Descripción</label>
    <textarea formControlName="descripcion"></textarea>
    @if (descripcion?.invalid && descripcion?.touched) {
    <span class="error">La descripción es obligatoria</span>
    }
  </div>

  <div class="campo">
    <label>Dirección</label>
    <input formControlName="direccion" />
  </div>

  <div class="campo">
    <label>Categoría</label>
    <select formControlName="categoria">
      <option value="">Selecciona una categoría</option>
      <option value="ITALIANA">Italiana</option>
      <option value="MEXICANA">Mexicana</option>
      <option value="JAPONESA">Japonesa</option>
      <option value="ESPAÑOLA">Española</option>
    </select>
  </div>

  @if (mensajeExito) {
  <p class="exito">{{ mensajeExito }}</p>
  } @if (mensajeError) {
  <p class="error">{{ mensajeError }}</p>
  }

  <button type="submit" [disabled]="enviando">
    {{ enviando ? 'Guardando...' : (restaurante ? 'Actualizar' : 'Crear
    restaurante') }}
  </button>
</form>
```

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso CLASE11 + introducción a Reactive Forms

- Diferencia entre Template Forms y Reactive Forms.
- Analogía: el formulario es el mostrador de recepción del edificio — valida antes de dejar pasar.

### 16:50 - 17:30 | Crear formulario de nuevo restaurante

- `FormBuilder`, `FormGroup`, `Validators`.
- `ReactiveFormsModule` en imports del componente.
- Formulario básico funcionando con `ngSubmit`.

### 17:30 - 18:00 | Validaciones y mensajes de error

- Getters para acceder a controles.
- `markAllAsTouched()` al intentar enviar.
- Estilos visuales de error (clase CSS condicional).

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | POST + PATCH en el servicio

- Añadir `crear()` y `editar()` al servicio.
- Reutilizar el mismo componente form para crear y editar con `@Input`.
- Probar creación desde Angular → verificar en la API.

### 19:15 - 20:00 | Práctica autónoma

- Añadir botón "Eliminar" en el detalle con confirmación.
- Estilizar el formulario con clases dinámicas `[class.invalido]`.

### 20:00 - 20:30 | Revisión + cierre

---

## Actividades diferenciadas

### sin-ia

1. Implementar el formulario de creación con al menos 4 campos y validaciones.
2. Mostrar un mensaje de éxito o error tras el envío.
3. Explicar con tus palabras la diferencia entre `patchValue` y `setValue`.
4. Probar que el formulario no se puede enviar vacío.

### con-ia

1. Todo lo anterior + modo edición: cargar datos del restaurante al abrir el formulario.
2. Añadir validador personalizado que evite nombres duplicados (mock local).
3. Pedir a la IA que genere un componente de upload de imagen en Base64.

**Prompt sugerido para con-ia:**

> "Tengo un formulario Angular con ReactiveFormsModule para crear y editar restaurantes. Genera un validador personalizado que verifique que el campo 'imagen' sea una URL válida que empiece con http/https. También añade feedback visual en el campo con clases CSS dinámicas."

---

## Entregables mínimos del día

- [ ] Formulario de creación con mínimo 4 campos y validaciones visibles.
- [ ] POST al servidor funcionando (nuevo restaurante aparece en la lista).
- [ ] Mensaje de éxito/error tras submit.
- [ ] Botón deshabilitado mientras `enviando === true`.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Entiendo la diferencia entre `FormGroup` y `FormControl`.
- [ ] Sé cuándo usar `patchValue` vs `setValue`.
- [ ] Mis validaciones muestran mensajes solo cuando el campo fue tocado.
- [ ] El formulario funciona para crear Y para editar (con `@Input`).
- [ ] Autoevaluación personal (1-5).

---

## Predicción CLASE13

1. Autenticación: registro y login de usuarios.
2. Almacenar el token JWT en `localStorage`.
3. `AuthGuard` para proteger rutas privadas.
4. `HttpInterceptor` para enviar el token en cada petición automáticamente.
