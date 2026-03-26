# CLASE14 - Quitar hardcode y llevar la app lo más lejos posible con datos reales

**Fecha:** 2026-03-24  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE13.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE13

En CLASE13 colocamos los primeros ladrillos reales: `provideHttpClient()`, un servicio HTTP, una `interface` y `Home` consumiendo `GET /restaurants`. Ahora CLASE14 debe convertir esa prueba inicial en una integración seria: quitar hardcodeado, conectar más pantallas y llevar la app lo más lejos posible con datos reales del backend.

## Referencia visual del wireframe

El wireframe de `jp/bitacora/CLASE 13-16/` deja una idea bastante clara del flujo que queremos levantar:

- `Home` con listado y búsqueda,
- tarjeta o acceso a detalle de restaurante,
- detalle con imagen, descripción, recetas y comentarios,
- iconos o accesos a mapa/perfil.

Eso convierte CLASE14 en una sesión de traducción entre boceto y datos reales. Senior Cat no quiere una maqueta bonita pero hueca: quiere que el `Home` y el detalle se parezcan cada vez más al plano del pizarrón, pero sostenidos por la API y no por cartón piedra.

---

## Tema y objetivo del día

### Tema central

Eliminar la mayor cantidad posible de hardcode y conectar el frontend a la API real en los flujos principales.

### Objetivo general

1. Reemplazar arrays, textos y datos fake por respuestas reales del backend.
2. Conectar listado, detalle y, si el tiempo lo permite, comentarios, recetas y ratings.
3. Adaptar componentes e interfaces al shape real de la API.
4. Dejar preparada la app para que la siguiente clase se concentre en login y sesión real.

---

## Endpoints protagonistas del día

### Públicos

- `GET /restaurants`
- `GET /restaurants/:id`
- `GET /restaurants/:restaurantId/comments`
- `GET /restaurants/:restaurantId/ratings/summary`
- `GET /recipes/restaurant/:restaurantId`

### Según avance de la clase

- `POST /restaurants/:restaurantId/comments`
- `POST /restaurants/:restaurantId/ratings`

La prioridad real de hoy no es auth todavía. La prioridad es desmontar el cartón piedra y dejar la mayor parte de la interfaz conectada a datos reales.

---

## Qué debe quedar trabajado al final de la clase

- `Home` consumiendo restaurantes reales sin hardcode.
- `RestauranteCard` recibiendo campos reales del backend.
- Detalle de restaurante consumiendo `GET /restaurants/:id` si da tiempo.
- Primer aterrizaje de recetas y comentarios en la vista de detalle, porque el wireframe ya los anticipa como partes visibles de la pantalla.
- Menos placeholders, menos imágenes falsas y menos coordenadas inventadas donde ya existan datos reales.
- Lista clara de lo que aún sigue hardcodeado y por qué.

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE13 y auditoría de hardcode

- Revisar qué ya funciona contra la API.
- Detectar qué sigue siendo fake en Home, detalle, tarjetas, mapa y componentes auxiliares.
- Ordenar prioridades para no dispersarse.

### 16:50 - 17:30 | Consolidar listado real

- Revisar `interface Restaurante`.
- Revisar `getAll()` y consumo desde `Home`.
- Asegurar que la UI pinta datos reales y no mezcla shapes falsos con reales.

### 17:30 - 18:00 | Empezar detalle real

- Preparar o conectar `getById(id)`.
- Mostrar más datos del restaurante desde la API.
- Adaptar componentes a la respuesta agregada del backend.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Comentarios, recetas y ratings según prioridad

- Conectar comentarios si el detalle ya está levantado.
- Mostrar resumen de ratings si el endpoint ya encaja con la UI.
- Traer recetas relacionadas si aporta valor visual y no rompe el ritmo de la clase.

### 19:15 - 20:00 | Limpieza agresiva de hardcode restante

- Quitar placeholders evidentes.
- Sustituir texto temporal por datos reales o mensajes de estado adecuados.
- Dejar por escrito qué sigue pendiente para la siguiente sesión.

### 20:00 - 20:30 | Cierre

- Revisión rápida del avance.
- Lista de pendientes reales.
- Preparación conceptual de la siguiente clase: login y sesión real.

---

## Actividades diferenciadas

### sin-ia

1. Revisar qué propiedades reales devuelve el backend y ajustar la `interface`.
2. Conectar `Home` y, si da tiempo, el detalle del restaurante.
3. Quitar manualmente hardcode innecesario en la UI.
4. Escribir en `DUDAS.md` qué piezas del frontend siguen desacopladas de la API.

### con-ia

1. Pedir a la IA ayuda para adaptar componentes al shape real del backend.
2. Pedir a la IA una estrategia para eliminar hardcode sin romper la UI.
3. Pedir revisión de interfaces y servicios para detectar inconsistencias.
4. Explicar después con palabras propias qué se quitó y qué aún se dejó hardcoded.

---

## Entregables mínimos del día

- [ ] Menos hardcode que en CLASE13.
- [ ] Listado real estable.
- [ ] Avance claro en detalle o componentes secundarios.
- [ ] Inventario breve de hardcode restante.
- [ ] Dudas en `DUDAS.md`.

---

## Checklist de cierre

- [ ] Sé identificar qué parte de la UI sigue dependiendo de datos falsos.
- [ ] Entiendo mejor cómo adaptar el frontend al shape real del backend.
- [ ] Puedo explicar por qué una interface a veces tiene que cambiar al conectar una API real.
- [ ] La app está mucho más cerca de funcionar con datos reales.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE15)

1. Hacer login real contra la API.
2. Guardar el JWT en una cookie.
3. Usar esa sesión para peticiones protegidas.

