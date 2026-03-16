# CLASE9 - Introducción a Angular: Tutorial oficial + arranque del proyecto Guía de Restaurantes

**Fecha:** 2026-03-16  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** inicial (primer contacto con Angular)  
**Clase anterior de referencia:** jp/bitacora/CLASE8.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Nota de continuidad con CLASE8

En CLASE8 se consolidó el modelo mental de HTTP (URL, método, headers, body, respuesta) y se dejó pendiente implementar `update` con `PATCH`. Ese ladrillo queda como **tarea de práctica autónoma** — hoy el andamio se traslada a un nuevo piso: Angular. Todo lo aprendido en JS vanilla y NestJS es la cimentación que sostiene este nuevo nivel.

---

## Tema y objetivo del día

### Tema central

Primer contacto con Angular: instalación, estructura del proyecto, tutorial oficial y planificación del proyecto final **Guía de Restaurantes**.

### Objetivo general

Que el alumnado:

1. Tenga Angular CLI instalado y una app corriendo en `localhost:4200`.
2. Complete el tutorial oficial de Angular (o avance hasta componentes y routing).
3. Entienda el mapa completo del proyecto que construirán en los próximos 6 días.
4. Conozca los comandos del CLI que usarán a diario.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Apertura y contexto del salto a Angular

- Repaso rápido: ¿qué logramos en JS vanilla? (DOM, fetch, CRUD, HTTP)
- Analogía: si JS vanilla es construir con ladrillos sueltos, Angular es llegar con una **empresa constructora con planos, roles y materiales estandarizados**.
- Presentación del proyecto final: Guía de Restaurantes (mapa de los 7 días).

### 16:50 - 17:30 | Instalación y primer ng serve

- Instalación de Angular CLI (`npm install -g @angular/cli`).
- Crear primera app: `ng new guia-restaurantes`.
- Explorar la estructura de archivos generada (ver sección de referencia más abajo).
- Primer `ng serve --open` y celebrar el "Hello Angular".

### 17:30 - 18:00 | Tutorial oficial de Angular

- Acceder a: https://angular.dev/tutorials/learn-angular
- Trabajar los primeros pasos del tutorial oficial:
  - Componentes y templates
  - Interpolación `{{ }}`
  - `@Input` y `@Output`
  - Directivas básicas (`@if`, `@for`)

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Comandos del CLI — referencia práctica

- Repaso guiado de la Referencia de CLI (ver sección más abajo).
- Práctica: generar un componente `restaurante-card` con `ng g c`.
- Comparar el archivo generado con lo que el tutorial explicó.

### 19:15 - 20:00 | Mapa del proyecto Guía de Restaurantes

- Presentación de la arquitectura por días (ver sección "Plan del proyecto").
- Identificar qué endpoints de la API de recetas (NestJS) ya existen y cuáles hay que agregar.
- Primer commit del proyecto Angular.

### 20:00 - 20:30 | Cierre, checklist y predicción

---

## Referencia de Angular CLI — para usar toda la semana

> Estos comandos son tu caja de herramientas. Senior Cat los usa todos los días 🐱

### Crear y arrancar

```bash
# Crea una aplicación Angular nueva con configuración interactiva
# Úsalo UNA VEZ por proyecto, al inicio
ng new nombre-del-proyecto

# Arranca el servidor de desarrollo en localhost:4200
# Úsalo CADA VEZ que quieras ver cambios en el navegador
# Mantén esta terminal abierta mientras trabajas
ng serve

# Igual que ng serve pero abre el navegador automáticamente
# Conveniente la primera vez que arrancas un proyecto
ng serve --open

# Compila el proyecto para producción (genera la carpeta dist/)
# Úsalo solo cuando vayas a publicar, no durante desarrollo
ng build
```

---

### Generar piezas del proyecto (el pan de cada día)

> Regla de oro: SIEMPRE genera con el CLI, nunca crees archivos Angular a mano.
> El CLI crea el archivo, el spec (test) y lo registra automáticamente.

```bash
# Crea un componente (carpeta + 3 archivos: .ts, .html, .scss)
# Úsalo para cada "bloque visual" del proyecto: tarjetas, formularios, headers
ng generate component nombre-del-componente
ng g c nombre-del-componente   # forma corta

# Ejemplos reales en el proyecto de restaurantes:
ng g c restaurantes/restaurante-lista     # listado de restaurantes
ng g c restaurantes/restaurante-card      # tarjeta individual
ng g c restaurantes/restaurante-detalle   # página de detalle
ng g c comentarios/comentario-lista       # lista de comentarios
ng g c comentarios/comentario-form        # formulario para comentar
ng g c puntuacion/estrellas               # componente de valoración con estrellas


# Crea un servicio (archivo .ts con @Injectable)
# Úsalo para toda la lógica de comunicación con la API (HTTP)
# NO pongas lógica de API dentro de los componentes directamente
ng generate service nombre-del-servicio
ng g s nombre-del-servicio   # forma corta

# Ejemplos reales en el proyecto:
ng g s servicios/restaurantes    # CRUD de restaurantes
ng g s servicios/recetas         # conexión con tu API de recetas NestJS
ng g s servicios/auth            # login/registro de usuarios
ng g s servicios/comentarios     # crear, leer y moderar comentarios
ng g s servicios/puntuaciones    # enviar y leer puntuaciones de restaurantes


# Crea un módulo con ruta lazy loading
# Úsalo para separar secciones grandes del proyecto
# Ventaja: el navegador solo carga el código cuando el usuario navega a esa sección
ng generate module nombre --route nombre --module app
ng g m restaurantes --route restaurantes --module app  # ejemplo real

# Crea un guard
# Úsalo para proteger rutas que requieren autenticación
# Ejemplo: solo usuarios logueados pueden ver favoritos o escribir comentarios
ng generate guard nombre
ng g g guards/auth   # ejemplo: protege rutas privadas


# Crea una interfaz TypeScript (define la "forma" de tus datos)
# Úsalo para tipar los objetos que llegan de la API
# Convención: nombres en singular y PascalCase
ng generate interface interfaces/nombre
ng g interface interfaces/restaurante    # { id, nombre, direccion, imagen, ... }
ng g interface interfaces/receta         # { id, nombre, ingredientes, ... }
ng g interface interfaces/usuario        # { id, email, favoritos, ... }
ng g interface interfaces/comentario     # { id, texto, usuario, restaurante, fecha }
ng g interface interfaces/puntuacion     # { id, valor, usuario, restaurante }


# Crea una pipe (transforma datos en el template)
# Úsalo para formatear fechas, textos, números sin modificar el componente
ng generate pipe nombre
ng g pipe pipes/truncar-texto   # ejemplo: recorta descripción larga de restaurante
ng g pipe pipes/estrellas       # ejemplo: convierte número 4.5 en "★★★★½"


# Crea un enum (conjunto fijo de valores)
# Úsalo para valores que no cambian: tipos, estados, categorías
ng generate enum enums/nombre
ng g enum enums/categoria-restaurante   # ITALIANA, MEXICANA, JAPONESA, etc.
```

---

### Añadir librerías populares

```bash
# Instala Angular Material (componentes visuales listos para usar)
# Ideal para formularios, botones, cards, ratings y diálogos
ng add @angular/material

# Instala NgRx (gestión de estado global)
# Conveniente desde el Día 4 si el proyecto crece en complejidad
ng add @ngrx/store

# Instala Leaflet para mapas interactivos (Día 6 del proyecto)
npm install leaflet @types/leaflet
```

---

### Utilidades de diagnóstico

```bash
# Muestra las versiones de Angular, Node, npm y dependencias
# Úsalo cuando tengas un problema para reportar el entorno exacto
ng version

# Revisa el código en busca de problemas de estilo y errores potenciales
ng lint

# Corre las pruebas unitarias (Karma + Jasmine)
ng test
```

---

## Plan del proyecto — Guía de Restaurantes (7 días)

> Este es el mapa del edificio completo. Hoy ponemos los cimientos, los próximos 6 días levantamos cada piso.

| Día         | Foco                                                         | Entregable mínimo                | Desafío extra                           |
| ----------- | ------------------------------------------------------------ | -------------------------------- | --------------------------------------- |
| **9 (hoy)** | Tutorial Angular + CLI + arquitectura del proyecto           | App corriendo, `ng g c` dominado | Leer docs de `@angular/router`          |
| **10**      | Routing + HttpClient → listar restaurantes desde NestJS      | Lista de restaurantes funcional  | Filtro por categoría                    |
| **11**      | Detalle de restaurante + recetas vinculadas (child routes)   | Página de detalle navegable      | Breadcrumb de navegación                |
| **12**      | Reactive Forms → crear y editar restaurante con validaciones | Formulario con errores visibles  | Upload de imagen (Base64)               |
| **13**      | Auth: registro/login + guards + interceptor JWT              | Rutas protegidas funcionando     | Refresh token automático                |
| **14**      | Comentarios + Puntuación por estrellas + Favoritos           | Sistema de reseñas operativo     | Promedio de puntuaciones en tiempo real |
| **15**      | Mapa con Leaflet + Revisión general + Deploy                 | Proyecto publicado en Vercel     | Cluster de marcadores en el mapa        |

---

### Arquitectura de la API NestJS a completar

La API de recetas ya existe. Estos son los endpoints **nuevos** a añadir:

```
# Ya tienes esto:
GET    /recipes            → lista de recetas
POST   /recipes            → crear receta
PATCH  /recipes/:id        → editar receta
DELETE /recipes/:id        → eliminar receta

# Hay que agregar esto para el proyecto:
GET    /restaurants               → lista de restaurantes
POST   /restaurants               → crear restaurante
GET    /restaurants/:id           → detalle de restaurante
PATCH  /restaurants/:id           → editar restaurante
DELETE /restaurants/:id           → eliminar restaurante
GET    /restaurants/:id/recipes   → recetas de un restaurante (ya tienes la lógica)

GET    /users                     → lista de usuarios
POST   /users/register            → registro
POST   /users/login               → login (devuelve JWT)
GET    /users/:id/favorites       → favoritos del usuario
POST   /users/:id/favorites       → añadir favorito
DELETE /users/:id/favorites/:rid  → quitar favorito

POST   /restaurants/:id/comments  → nuevo comentario
GET    /restaurants/:id/comments  → leer comentarios
POST   /restaurants/:id/rating    → enviar puntuación (1-5)
GET    /restaurants/:id/rating    → promedio de puntuaciones
```

---

### Interfaces TypeScript del proyecto (esqueleto)

```typescript
// interfaces/restaurante.ts
export interface Restaurante {
  id: number;
  nombre: string;
  descripcion: string;
  direccion: string;
  imagen: string;
  categoria: CategoriaRestaurante;
  lat: number; // para el mapa Leaflet
  lng: number; // para el mapa Leaflet
  puntuacionMedia?: number;
}

// interfaces/comentario.ts
export interface Comentario {
  id: number;
  texto: string;
  fecha: string;
  usuario: { id: number; nombre: string };
  restauranteId: number;
}

// interfaces/puntuacion.ts
export interface Puntuacion {
  id: number;
  valor: number; // 1 a 5
  usuario: { id: number; nombre: string };
  restauranteId: number;
}
```

---

## Actividades diferenciadas

### sin-ia

1. Completar los primeros 5 pasos del tutorial oficial en https://angular.dev/tutorials/learn-angular.
2. Generar con CLI los componentes: `restaurante-lista`, `restaurante-card`, `restaurante-detalle`.
3. Copiar la Referencia de CLI de esta bitácora y añadir una nota personal a cada comando ("esto lo usaré para...").
4. Dibujar en papel el mapa de rutas del proyecto (qué URL lleva a qué componente).

### con-ia

1. Completar el tutorial oficial y luego pedir a la IA que explique `@Input`/`@Output` con una analogía diferente a la que usó el tutorial.
2. Pedir a la IA que genere la interfaz `Restaurante` completa y luego validar campo por campo contra el JSON que devuelve tu API.
3. Usar la IA para proponer la estructura de carpetas completa del proyecto y justificar cada carpeta en 1 línea.
4. Desafío: pedir a la IA que genere el componente `estrellas` con `@Input() valor: number` y luego explicar línea por línea sin leer literal.

**Prompt sugerido para con-ia:**

> "Soy estudiante de Angular. Tengo una API NestJS con restaurantes, recetas, usuarios, comentarios y puntuaciones. Genera la estructura de carpetas completa para mi app Angular, una interfaz TypeScript por cada entidad y el servicio de restaurantes con HttpClient para GET, POST, PATCH y DELETE. Explica brevemente cada decisión de diseño."

---

## Entregables mínimos del día

- [ ] `ng serve` corriendo sin errores.
- [ ] Al menos 3 componentes generados con CLI y explorados.
- [ ] Mapa del proyecto (rutas + componentes) dibujado o en Markdown.
- [ ] Referencia del CLI copiada en `sin-ia/angular/CLASE9/` o `con-ia/angular/CLASE9/` con notas propias.
- [ ] Registro en `DUDAS.md` de dudas sobre routing o estructura de Angular.

---

## Checklist de cierre

- [ ] Tengo Angular CLI instalado y una app corriendo en `localhost:4200`.
- [ ] Sé diferenciar componente, servicio, módulo y guard (aunque sea en una línea cada uno).
- [ ] Usé `ng generate` al menos una vez y entendí qué archivos creó.
- [ ] Tengo claro cuál es el entregable del Día 10 (lista de restaurantes con HttpClient).
- [ ] Registré mis dudas en `DUDAS.md`.
- [ ] Autoevaluación personal completada (1-5).

### Autoevaluación sugerida

- ¿Qué fue lo más sorprendente de Angular respecto a JS vanilla?
- ¿Qué parte del CLI me resultó más útil?
- ¿Entiendo por qué los servicios van separados de los componentes?

---

## Predicción de la siguiente clase (CLASE10)

1. Configurar `HttpClientModule` y crear el servicio de restaurantes.
2. Hacer el primer `GET /restaurants` desde Angular a la API NestJS.
3. Renderizar la lista con `@for` y componente `restaurante-card`.
4. Configurar el router con al menos 2 rutas: `/restaurantes` y `/restaurantes/:id`.
