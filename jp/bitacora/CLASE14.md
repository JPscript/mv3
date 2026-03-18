# CLASE14 - Sustituir hardcodeado por datos reales y avanzar la integración

**Fecha:** 2026-03-24  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE13.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE13

En CLASE13 se abrieron los servicios, la sesión y el primer mapa. CLASE14 debe quitar más cartón piedra del proyecto: menos hardcoded, más datos reales del backend.

---

## Tema y objetivo del día

### Tema central

Conectar las pantallas principales con la API real y avanzar la experiencia autenticada.

### Objetivo general

1. Cargar detalle de restaurante desde backend.
2. Mostrar comentarios y resumen de ratings reales.
3. Preparar o conectar formularios de creación, actualización y borrado.
4. Consolidar el uso del token en peticiones protegidas.

---

## Endpoints protagonistas del día

### Públicos

- `GET /restaurants`
- `GET /restaurants/:id`
- `GET /restaurants/:id/comments`
- `GET /restaurants/:id/ratings/summary`
- `GET /recipes/restaurant/:restaurantId`

### Protegidos

- `GET /auth/profile`
- `POST /restaurants`
- `PATCH /restaurants/:id`
- `DELETE /restaurants/:id`
- `POST /restaurants/:id/comments`
- `POST /restaurants/:id/ratings`

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE13

- Ver qué partes ya están conectadas.
- Detectar qué sigue hardcodeado por prioridad.

### 16:50 - 17:30 | Detalle real de restaurante

- Cargar datos desde la API.
- Mostrar recetas y estructura agregada del detalle.

### 17:30 - 18:00 | Comentarios y ratings

- Mostrar comentarios reales.
- Mostrar resumen de calificaciones.
- Preparar el envío si el tiempo lo permite.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | CRUD protegido

- Revisar creación, edición y borrado de restaurante.
- Relacionar cada formulario con su endpoint real.
- Probar las peticiones con el token de sesión.

### 19:15 - 20:00 | Limpieza de hardcoded restante

- Identificar arrays falsos, placeholders y texto temporal.
- Sustituir lo prioritario.

### 20:00 - 20:30 | Cierre

---

## Actividades diferenciadas

### sin-ia

1. Conectar el detalle de restaurante con `GET /restaurants/:id`.
2. Mostrar comentarios reales.
3. Añadir la puntuación media al detalle.
4. Probar al menos una acción protegida con sesión activa.

### con-ia

1. Pedir a la IA una propuesta de adaptación del modelo de detalle del backend al frontend.
2. Pedir ayuda para organizar observables o promesas de forma limpia.
3. Pedir a la IA una estrategia para reemplazar arrays hardcoded sin romper la UI.
4. Explicar luego por qué se mantiene o elimina cada dato falso.

---

## Entregables mínimos del día

- [ ] Detalle conectado a backend.
- [ ] Comentarios y ratings visibles en la UI.
- [ ] Al menos una acción protegida probada con token.
- [ ] Menos contenido hardcoded que en CLASE13.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Sé diferenciar endpoint público de protegido en la práctica.
- [ ] Entiendo qué datos devuelve el detalle agregado de restaurante.
- [ ] Mi sesión se reutiliza para acciones autenticadas.
- [ ] Tengo identificado qué piezas siguen pendientes para cerrar la app.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE15)

1. Integrar mapa con coordenadas reales.
2. Quitar más hardcoded de la app.
3. Dejar casi todo el proyecto terminado funcionalmente.
