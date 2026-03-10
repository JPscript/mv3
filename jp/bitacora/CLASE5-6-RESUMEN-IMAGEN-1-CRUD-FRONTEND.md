# Resumen Imagen 1 - Flujo CRUD en Frontend (HTML, CSS, JS)

## Idea central
La pizarra muestra el mapa de navegacion del frontend para un CRUD de recetas hecho sin frameworks, solo con `HTML`, `CSS` y `JS`.

## Flujo principal
1. **Home principal**
- Pantalla con 4 tarjetas: `C`, `R`, `U`, `D`.
- Cada tarjeta representa una operacion CRUD y lleva a una pagina distinta.

2. **Create (C)**
- Primera pantalla: formulario de receta (nombre, descripcion, etc.).
- Segunda pantalla/bloque: carga o alta de imagen.
- Se destaca que hay **2 llamadas POST** en este flujo.

3. **Read (R)**
- `R all`: listado de todas las recetas en tarjetas.
- `R-1`: al hacer click en una tarjeta, se abre detalle de una receta unica.

4. **Update (U)**
- Pantalla para seleccionar receta y editar datos.
- Luego se envia actualizacion al backend.

5. **Delete (D)**
- Seleccion de receta a borrar.
- Confirmacion antes de ejecutar el borrado.

## Que se esta aprendiendo aqui
- Navegacion multipagina en frontend.
- Separar claramente responsabilidades por pantalla.
- Pensar en UX minima: listado, detalle, edicion, confirmacion de borrado.
- Diseñar el flujo antes de codificar (primero plano, luego ladrillos).

## Como explicarlo en clase (guion rapido)
- "Primero definimos el mapa de pantallas, luego escribimos codigo".
- "Cada tarjeta C/R/U/D es una puerta a una tarea concreta".
- "Create no es solo un formulario: puede requerir 2 POST si hay imagen".
- "Read se divide en listar todo y ver uno".
- "Delete siempre debe confirmar para evitar borrados accidentales".

## Error tipico a evitar
- Mezclar todo en una sola pagina con logica confusa.
- Solucion: mantener una pagina/flujo por operacion y luego conectar todo desde la home.
