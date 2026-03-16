# CLASE8

## Tema y objetivo del día

- **Tema:** Desarrollo de un frontend CRUD de recetas utilizando HTML, CSS y JavaScript, conectado a una API backend.
- **Fecha:** Martes 10 de marzo de 2026.
- **Horario:** 16:30 - 20:30.
- **Objetivo:** Construir una mini aplicación multipágina capaz de crear, leer, actualizar y eliminar recetas mediante peticiones fetch a la API desarrollada previamente.


## Resultados de aprendizaje de la sesión

- Conexión entre frontend y backend: Comprendimos cómo una interfaz web puede comunicarse con una API mediante peticiones HTTP usando fetch, permitiendo que los usuarios interactúen con datos reales.

- Implementación completa de un CRUD: Aprendimos a implementar las cuatro operaciones fundamentales de gestión de datos (Create, Read, Update y Delete) desde una interfaz web.

- Arquitectura multipágina en aplicaciones web simples: Diseñamos una estructura basada en varias páginas HTML especializadas (crear, listar, editar, eliminar) conectadas desde una página principal.

- Validación básica de formularios y manejo de errores: Introdujimos validaciones antes de enviar datos al servidor y mostramos mensajes claros de éxito o error en la interfaz.

## Conocimientos adquiridos en con los ejercicios de la sesión

Durante esta sesión dimos el paso de tener una API funcional probada en Postman a construir una interfaz real que permita a un usuario interactuar con ella desde el navegador.

La práctica comenzó diseñando la arquitectura del frontend. Se creó una página principal (index.html) con cuatro tarjetas que representan cada operación del CRUD: crear, leer, actualizar y eliminar recetas. Desde esta página el usuario puede navegar hacia las diferentes pantallas de la aplicación.

Posteriormente se implementaron las funcionalidades de creación y lectura de recetas. En create.html se construyó un formulario que permite introducir los datos de una nueva receta. Se trabajó un flujo típico de creación que incluye dos peticiones POST: una para subir o registrar la imagen y otra para crear la receta utilizando la referencia a esa imagen.

En read.html se implementó la obtención de todas las recetas mediante una petición GET a la API. Los resultados se transformaron en tarjetas HTML que se renderizan dinámicamente en la página. Cada tarjeta permite acceder a una vista de detalle (detail.html) donde se muestra la información completa de una receta concreta utilizando su identificador.


## Actividades sin-ia

- Crear la estructura de archivos del frontend.
- Diseñar la página principal con cuatro tarjetas que enlacen a cada operación CRUD.
- Implementar manualmente formularios para crear y editar recetas.
- Realizar peticiones fetch a la API para crear y listar recetas.
- Probar el flujo completo de creación, lectura, actualización y eliminación desde la interfaz.

# Predicción próxima clase

- Continuar con el desarrollo de la interfaz que muestra los datos de la API.

## Entregables mínimos del día

- Página principal con las cuatro operaciones CRUD accesibles.
- create.html funcional con flujo de creación de recetas.
- read.html mostrando tarjetas de recetas obtenidas desde la API.
- Registro breve de dudas en `DUDAS.md`.
- Nota corta en la bitácora personal sobre lo aprendido y las dificultades encontradas.

## Autoevaluación y próximos pasos

- [x] Entiendo cómo conectar un frontend con una API mediante fetch.
- [x] Puedo implementar las operaciones CRUD desde una interfaz web.
- [ ] Escribí cómo me sentí durante la clase.
- [ ] Registré mis dudas en `DUDAS.md`.
- [x] Escribí mi predicción para la siguiente clase.