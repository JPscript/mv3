# CLASE12 - Cerrar la app hardcodeada y preparar la conexión con api-recetas

**Fecha:** 2026-03-19  
**Horario:** 16:30 - 20:30  
**Receso:** 18:00 - 18:30  
**Nivel:** inicial-intermedio  
**Clase anterior de referencia:** jp/bitacora/CLASE11.md  
**Lema del grupo Ladrillos:** Construyendo el futuro del desarrollo web, un ladrillo a la vez.  
**Mentor de la sesión:** Senior Cat 🐱

---

## Contexto y continuidad con CLASE11

En CLASE11 el home ya tenía un ladrillo reutilizable claro. Ahora toca cerrar el esqueleto completo de la app hardcodeada y estudiar la API real que servirá de base para reemplazar esos datos falsos en las clases siguientes.

---

## Tema y objetivo del día

### Tema central

Maquetar toda la app con contenido hardcoded y mapear el frontend contra la API `api-recetas` ya mejorada.

### Objetivo general

1. Terminar todas las páginas Angular pendientes en versión hardcoded.
2. Revisar el backend `jp/sin-ia/nestjs/api-recetas`.
3. Leer su `README.md` y la colección de Postman para conocer endpoints, auth y flujo de pruebas.
4. Dejar una tabla mental clara de qué pantallas consumirán qué endpoints.

---

## Qué se debe revisar del backend

Referencia principal:

- `jp/sin-ia/nestjs/api-recetas/README.md`

Material de pruebas:

- `jp/sin-ia/nestjs/api-recetas/postman/api-recetas.postman_collection.json`

Ideas clave del backend que el alumnado debe entender hoy:

- hay endpoints públicos y protegidos,
- existe login con JWT,
- restaurantes, recetas, comentarios y ratings ya están listos,
- hay usuarios seed para clase,
- la colección de Postman ya indica el orden recomendado de prueba.

---

## Piezas Angular que deben quedar listas hardcoded

- home,
- restaurante,
- crear-restaurante,
- actualizar-restaurante,
- borrar-restaurante,
- login,
- registro,
- perfil,
- mapa,
- header,
- footer.

La regla de hoy es simple: sin servicios todavía, pero con intención real de uso.

---

## Mapeo base frontend ↔ backend

### Públicas

- Home → `GET /restaurants`
- Detalle de restaurante → `GET /restaurants/:id`
- Lista de recetas por restaurante → `GET /recipes/restaurant/:restaurantId`
- Login visual preparado para `POST /auth/login`
- Registro visual preparado para `POST /auth/register`

### Protegidas

- Crear restaurante → `POST /restaurants`
- Actualizar restaurante → `PATCH /restaurants/:id`
- Borrar restaurante → `DELETE /restaurants/:id`
- Perfil → `GET /auth/profile` y `GET /users/me`
- Comentarios → `POST /restaurants/:id/comments`
- Ratings → `POST /restaurants/:id/ratings`

---

## Plan por bloques de tiempo

### 16:30 - 16:50 | Repaso de CLASE11

- Ver el home y el uso de `RestauranteCard`.
- Detectar qué páginas siguen siendo solo cascarón.

### 16:50 - 17:30 | Cierre visual de páginas hardcoded

- Completar vistas CRUD visuales.
- Preparar login, registro y perfil con datos falsos coherentes.
- Añadir navegación interna entre pantallas.

### 17:30 - 18:00 | Lectura guiada del backend

- Abrir el README de `api-recetas`.
- Entender recursos disponibles.
- Identificar endpoints clave para la app Angular.

### 18:00 - 18:30 | ⏸ RECESO

### 18:30 - 19:15 | Colección Postman y flujo de prueba

- Ver cómo está separada la colección en `Publico` y `Protegido`.
- Repasar el flujo de login, profile, restaurants y recipes.
- Relacionar esas llamadas con las pantallas del frontend.

### 19:15 - 20:00 | Puente hacia CLASE13

- Decidir qué datos hardcoded desaparecerán primero.
- Preparar el terreno para servicios HTTP y sesión de usuario.

### 20:00 - 20:30 | Cierre

---

## Actividades diferenciadas

### sin-ia

1. Terminar el `html`, `css` y `ts` hardcoded de todas las páginas.
2. Identificar en una tabla qué pantalla usa qué endpoint futuro.
3. Leer el README del backend y anotar qué partes entendiste.
4. Abrir la colección Postman y reconocer qué carpeta es pública y cuál protegida.

### con-ia

1. Pedir a la IA una tabla `pantalla → endpoint → método` y validarla manualmente con el README.
2. Pedir a la IA ejemplos de datos hardcoded coherentes con la API real.
3. Pedir a la IA una propuesta de estructura de modelos TypeScript basada en la respuesta de restaurantes.
4. Explicar luego con palabras propias qué piezas siguen siendo falsas y cuáles ya vienen definidas por la API.

---

## Entregables mínimos del día

- [ ] App completa en versión hardcoded.
- [ ] Todas las rutas visuales principales funcionando.
- [ ] README de `api-recetas` revisado.
- [ ] Colección Postman localizada y entendida a nivel general.
- [ ] Mapa básico de endpoints asociado a pantallas.

---

## Checklist de cierre

- [ ] Tengo clara la diferencia entre maqueta hardcoded y conexión real a backend.
- [ ] Sé dónde consultar endpoints y auth del backend.
- [ ] Entiendo qué pantallas necesitarán token y cuáles no.
- [ ] La app ya está lista para empezar a reemplazar datos falsos.
- [ ] Autoevaluación personal completada (1-5).

---

## Predicción de la siguiente clase (CLASE13)

1. Crear servicios HTTP.
2. Empezar a conectar la app con `api-recetas`.
3. Configurar sesión de usuario.
4. Introducir Leaflet en Angular con coordenadas hardcodeadas como primer paso.
