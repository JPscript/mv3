# CLASE12

## Tema y objetivo del día

- **Tema:** 
- **Fecha:** Miércoles 18 de marzo 2026.
- **Horario:** 16:30 - 20:30.
- **Objetivo:** Construir una página con Angular que consuma una API de restaurantes.


## Resultados de aprendizaje de la sesión

- Configuración del Router en Angular.
- Definición de la arquitectura de la aplicación.
- Organización mediante componentes.
- Creación de componentes con Angular CLI.

## Conocimientos adquiridos en con los ejercicios de la sesión

Durante esta sesión dimos continuidad al trabajo iniciado con Angular tras el tutorial oficial, pasando de una comprensión teórica a una estructura real de proyecto.

En primer lugar, definimos las distintas páginas que formarán parte de la aplicación, lo que nos permitió tener una visión global del producto antes de seguir desarrollando. A partir de esto, configuramos el Router de Angular, estableciendo las rutas principales y comprendiendo cómo se conecta cada URL con su componente correspondiente.

Posteriormente comenzamos a trabajar en la estructura de carpetas, organizando los componentes según su función dentro de la aplicación. Se creó la carpeta layout, donde se desarrollaron componentes comunes a toda la app.

Dentro de esta estructura, se implementaron y finalizaron los componentes:

- Header → encargado de la navegación principal.

- Footer → elemento común en todas las páginas.

Además, se inició el desarrollo de un componente clave del proyecto: la card de restaurante, diseñada como un componente hijo reutilizable, que servirá para mostrar la información de cada restaurante dentro de listados.

Este enfoque permitió comprender la importancia de la reutilización de componentes en Angular y cómo dividir la interfaz en piezas pequeñas y mantenibles.

# Predicción próxima clase

- Implementar la petición GET /restaurants.
- Mostrar el listado de restaurantes utilizando el componente restaurante-card.
- Introducir renderizado dinámico con @for.

## Entregables mínimos del día

- Router configurado con al menos las rutas principales.
- Componentes header y footer creados y funcionales.
- Estructura de carpetas organizada correctamente.
- Primer avance del componente restaurante-card.
- Registro breve de dudas en `DUDAS.md`.
- Nota corta en la bitácora personal sobre lo aprendido y las dificultades encontradas.

## Autoevaluación y próximos pasos

- [x] Entiendo cómo funciona el Router en Angular.
- [x] Sé crear componentes utilizando Angular CLI.
- [x] Comprendo la importancia de estructurar la aplicación en componentes.
- [x] Escribí cómo me sentí durante la clase.
- [ ] Registré mis dudas en `DUDAS.md`.
- [x] Escribí mi predicción para la siguiente clase.