# PROMPT STITCH para UI de restaurantes2

## Objetivo del documento

Este archivo está pensado para copiarlo y pasárselo a una IA experta en diseño de interfaces y experiencia de usuario.

La idea es que la IA entienda rápido:

- qué proyecto es,
- qué pantallas existen,
- qué flujo sigue el usuario,
- qué tono visual conviene,
- y qué tipo de interfaz debería proponer.

No es un documento técnico de Angular.

Es un brief corto y claro de producto + UX/UI.

---

## Prompt base

Quiero que diseñes la interfaz de usuario de una aplicación web llamada `restaurantes`.

### Contexto del proyecto

Es una app web de restaurantes hecha para aprendizaje de frontend.

La aplicación permite:

- ver un listado de restaurantes,
- entrar al detalle de un restaurante,
- iniciar sesión y registrarse,
- ver el perfil del usuario,
- crear, actualizar y borrar restaurantes si el usuario está autenticado,
- comentar y puntuar restaurantes,
- ver un mapa con restaurantes.

### Tipo de producto

Es una aplicación tipo directorio gastronómico / explorador de restaurantes.

Debe sentirse:

- clara,
- moderna,
- cálida,
- visual,
- fácil de usar,
- pensada para móvil y escritorio.

### Usuario objetivo

Usuario general que quiere explorar restaurantes de forma simple.

No es una herramienta técnica ni empresarial.

La interfaz debe priorizar:

- descubrimiento visual,
- lectura rápida,
- acciones claras,
- formularios sencillos,
- navegación intuitiva.

---

## Pantallas principales

### 1. Home / listado de restaurantes

Pantalla principal con:

- listado de restaurantes,
- tarjetas visuales,
- imagen,
- nombre,
- descripción corta,
- coordenadas o información secundaria si hace falta,
- acceso al detalle.

Si el usuario está autenticado, también aparece la opción de crear restaurante.

### 2. Detalle de restaurante

Pantalla con:

- nombre del restaurante,
- imagen,
- descripción,
- ubicación,
- puntuación media,
- cantidad de votos,
- comentarios,
- formulario para comentar,
- formulario para puntuar.

Si el usuario está autenticado, también puede ver acciones para editar o borrar.

### 3. Login

Pantalla simple con:

- campo nombre,
- campo contraseña,
- botón de iniciar sesión,
- mensaje de error,
- enlace a registro.

### 4. Registro

Pantalla simple con:

- nombre,
- contraseña,
- repetir contraseña,
- botón de crear cuenta,
- mensajes de validación,
- enlace a login.

### 5. Perfil

Pantalla con:

- datos básicos del usuario,
- nombre,
- imagen si existe,
- acción para cerrar sesión.

### 6. Crear restaurante

Formulario con:

- nombre,
- descripción,
- latitud,
- longitud,
- botón de guardar.

### 7. Actualizar restaurante

Muy similar a crear restaurante, pero pensado para edición.

### 8. Borrar restaurante

Pantalla de confirmación simple, clara y segura.

Debe dejar muy claro que la acción no se puede deshacer.

### 9. Mapa

Pantalla con mapa y restaurantes posicionados visualmente.

Debe sentirse útil, limpia y orientada a exploración espacial.

---

## Navegación principal

La app tiene una navegación superior con enlaces como:

- Home
- Mapa
- Login
- Registro
- Perfil
- Logout

La navegación debe cambiar según si el usuario está autenticado o no.

Si no hay sesión:

- mostrar Login y Registro

Si hay sesión:

- mostrar Perfil y Logout

---

## Flujo principal de usuario

### Usuario no autenticado

1. entra en Home
2. explora restaurantes
3. entra al detalle
4. decide registrarse o hacer login

### Usuario autenticado

1. inicia sesión
2. vuelve al listado
3. puede crear restaurante
4. puede comentar y puntuar
5. puede editar o borrar restaurantes
6. puede entrar al perfil

---

## Prioridades de diseño

Quiero que la propuesta priorice:

1. jerarquía visual clara
2. tarjetas atractivas en el listado
3. formularios muy fáciles de entender
4. estados visibles de error, carga y éxito
5. buena experiencia móvil
6. coherencia entre todas las pantallas
7. diseño moderno pero no recargado

---

## Estilo visual deseado

Quiero una interfaz:

- moderna,
- fresca,
- con buena fotografía,
- con aire gastronómico,
- limpia,
- amigable,
- elegante pero sencilla.

Evitar:

- aspecto demasiado técnico,
- panel administrativo duro,
- diseño genérico sin personalidad,
- sobrecarga visual.

Buscar:

- buenas tarjetas,
- tipografía agradable,
- espaciado generoso,
- llamadas a la acción claras,
- visual de producto gastronómico.

---

## Qué necesito que generes

Quiero que propongas:

1. dirección visual general
2. estructura de layout principal
3. diseño de header
4. diseño de cards de restaurante
5. diseño de detalle de restaurante
6. diseño de formularios de login, registro y CRUD
7. diseño de perfil
8. diseño de confirmación de borrado
9. diseño de la pantalla de mapa
10. criterios responsive para móvil y escritorio

Si puedes, describe:

- la intención visual,
- la organización de cada pantalla,
- componentes reutilizables,
- estilo de botones, inputs, tarjetas y mensajes.

---

## Restricciones

- La app es educativa, así que la interfaz debe ser buena pero realista de implementar.
- Debe sentirse coherente con una app Angular sencilla.
- No plantees una interfaz imposible de construir para un proyecto de aprendizaje.
- Prioriza claridad, estructura y consistencia.

---

## Resumen ultra corto

Diseña una app web moderna de restaurantes con estas pantallas:

- home con cards,
- detalle de restaurante,
- login,
- registro,
- perfil,
- crear/editar/borrar restaurante,
- mapa.

La app debe verse gastronómica, clara, moderna, amable y fácil de usar, con una experiencia responsive y una navegación simple según el estado de autenticación.