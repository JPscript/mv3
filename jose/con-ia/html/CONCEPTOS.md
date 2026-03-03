# Conceptos clave del ejercicio "Mi día ideal"

En este ejercicio de nivel inicial se trabajaron varias etiquetas HTML semánticas y de contenido. A continuación se explican brevemente los conceptos utilizados:

- **`<header>`**: cabecera de la página. Contiene el título principal (`<h1>`) y una breve introducción.
- **`<nav>`**: elemento de navegación separado que agrupa enlaces internos (anclas) hacia las distintas secciones de la página. Se usa junto con una lista (`<ul>`) para estructurar el menú.
- **`<main>`**: bloque que engloba el contenido principal de la página, en este caso las secciones que describen el día.
- **`<section>`**: división del `main` con tema propio. Cada sección (`mañana`, `tarde`, `noche`) lleva su propio encabezado `<h2>`.
- **`<h1>` y `<h2>`**: títulos jerárquicos. Solo un `<h1>` por documento; `<h2>` para subtítulos de cada sección.
- **Listas (`<ul>`, `<ol>`, `<li>`)**: usadas para mostrar elementos no ordenados (actividades de la mañana) y ordenados (pasos de la tarde).
- **`<a href="#id">`**: enlace interno (ancla) que facilita la navegación dentro de la misma página.
- **`<img src="..." alt="...">`**: imagen con texto alternativo para describir su contenido; se utiliza en la sección de la mañana.
- **`<footer>`**: pie de página con información secundaria, como derechos de autor y contacto.

Estos conceptos refuerzan la organización semántica, la accesibilidad y la claridad del documento.

## Nuevos conceptos vistos en "Guía de hobbies para principiantes"

- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: ayuda a que la página se adapte mejor en móviles y pantallas pequeñas.
- **`<article>`**: bloque semántico para agrupar contenido independiente dentro de una sección (por ejemplo, cada categoría de hobby).
- **`<h3>`**: subtítulo de tercer nivel para organizar subtemas dentro de una misma sección.
- **`aria-labelledby`**: atributo de accesibilidad que vincula una sección con su título mediante un `id`, mejorando la lectura por tecnologías de asistencia.
- **`<table>`**: estructura para mostrar datos en filas y columnas de forma clara.
- **`<caption>`**: título descriptivo de la tabla para dar contexto rápido al contenido.
- **`<thead>` y `<tbody>`**: separan la cabecera del cuerpo de la tabla y mejoran la semántica.
- **`<th scope="col">`**: define encabezados de columna y facilita interpretar la tabla, especialmente para accesibilidad.
- **Enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`**: abren enlaces en nueva pestaña con una configuración más segura.
- **`aria-label` en `<nav>`**: aporta una descripción clara de la navegación (por ejemplo, índice de preguntas frecuentes) para mejorar accesibilidad.
- **FAQ con anclas internas (`href="#faq-x"` + `id="faq-x"`)**: permite saltar rápido desde un índice de preguntas a cada respuesta dentro de la misma página.