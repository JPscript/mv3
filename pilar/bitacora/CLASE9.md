# CLASE9

## Tema y objetivo del día

- **Tema:** Fundamentos de las consultas HTTP aplicadas al CRUD mediante fetch.
- **Fecha:** Miércoles 11 de marzo de 2026.
- **Horario:** 16:30 - 20:30.
- **Objetivo:** Comprender la estructura fundamental de una petición HTTP y cómo se aplica al desarrollo de operaciones CRUD en aplicaciones web.

## Resultados de aprendizaje de la sesión
- Implementación de actualización de datos (update).

- Eliminación de recursos (delete).

- Manejo de estados en la interfaz.

## Conocimientos adquiridos en con los ejercicios de la sesión

Durante esta sesión continuamos con el desarrollo del frontend del proyecto de recetas, completando las funcionalidades necesarias para que la aplicación permita gestionar completamente los datos desde la interfaz.

SE implementó la funcionalidad de edición de recetas en update.html. En esta página el usuario puede seleccionar una receta existente y cargar automáticamente sus datos en un formulario. A partir de ahí es posible modificar los campos necesarios y enviar los cambios al servidor mediante una petición PUT o PATCH.

También se desarrolló la página delete.html, donde se muestra un listado de recetas disponibles para eliminar. Cada elemento del listado incluye un mecanismo de confirmación para asegurar que el usuario realmente desea eliminar la receta antes de ejecutar la petición DELETE a la API.

Durante la sesión se reforzó la importancia del manejo de estados en la interfaz, implementando mensajes de carga mientras se realizan las peticiones, confirmaciones cuando las operaciones se completan correctamente y mensajes de error cuando se producen problemas de conexión o validación.

Finalmente se realizaron pruebas funcionales completas del CRUD para verificar que todas las operaciones —crear, leer, actualizar y eliminar— funcionaran correctamente desde la interfaz conectada a la API.


## Actividades sin-ia

- Implementar la página detail.html para mostrar la información completa de una receta.

- Crear la página update.html con un formulario que permita editar los datos de una receta existente.

- Precargar los datos actuales de la receta dentro del formulario de edición.

- Enviar los cambios al servidor mediante una petición PUT o PATCH.

- Crear la página delete.html con un listado de recetas disponibles.

- Implementar un sistema de confirmación antes de eliminar una receta.

- Realizar pruebas funcionales del CRUD completo desde la interfaz.

# Predicción próxima clase

- Continuar con el desarrollo de la interfaz que muestra los datos de la API.

## Entregables mínimos del día

- update.html con formulario de edición funcional.

- delete.html con confirmación antes de eliminar una receta.

- CRUD funcionando completamente desde el frontend.

- Registro breve de dudas en `DUDAS.md`.
- Nota corta en la bitácora personal sobre lo aprendido y las dificultades encontradas.

## Autoevaluación y próximos pasos

- [x] Entiendo cómo conectar un frontend con una API mediante fetch.
- [x] Puedo implementar las operaciones CRUD desde una interfaz web.
- [ ] Escribí cómo me sentí durante la clase.
- [ ] Registré mis dudas en `DUDAS.md`.
- [x] Escribí mi predicción para la siguiente clase.