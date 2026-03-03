# Conceptos básicos de HTML

A continuación se listan definiciones breves de las etiquetas y elementos que usamos en los primeros ejercicios.

- **`<!DOCTYPE html>`**: declaración que indica al navegador que estamos usando HTML5.
- **`<html>`**: elemento raíz que engloba todo el documento; suele llevar `lang="es"` para el idioma.
- **`<head>`**: sección que guarda metadatos (no se ve). Aquí colocamos el `<meta charset="UTF-8">`, el `<title>` y enlaces a CSS o scripts.
- **`<meta charset="UTF-8">`**: etiqueta dentro del `head` que especifica la codificación de caracteres; garantiza acentos y símbolos correctos.
- **`<title>`**: texto que aparece en la pestaña del navegador; no forma parte del contenido visible.
- **`<body>`**: cuerpo del documento, contiene todo lo que el usuario ve (títulos, párrafos, imágenes, enlaces, etc.).

Etiquetas de estructura y contenido visibles:

- **`<h1>`**, **`<h2>`** (y sucesivos): títulos y subtítulos que marcan la jerarquía de la información. `<h1>` solo tiene sentido una vez por página.
- **`<p>`**: párrafo de texto.
- **`<a href="...">`**: enlace a otra URL o a otra parte de la misma página (ancla).
- **`<img src="..." alt="...">`**: imagen; `src` indica la ruta o URL y `alt` describe la imagen para accesibilidad.

Etiquetas semánticas de sección vistas en el ejercicio 1.1:

- **`<header>`**: sección de cabecera, suele incluir el título principal e introducción.
- **`<main>`**: bloque principal de la página donde está el contenido más importante.
- **`<section>`**: subdivisión del `main` (o cualquier otra parte) para agrupar contenido con un tema propio; suele llevar su propio encabezado (`<h2>`).
- **`<footer>`**: pie de página con información de contacto, autor, copyright o enlaces secundarios.

Estas etiquetas hacen que el código sea más fácil de leer, accesible y preparado para mantener a medida que la página crece.

Más estructuras aprendidas en el ejercicio 2:

- **`<nav>`**: contenedor semántico para bloques de navegación. Agrupa enlaces que permiten moverse dentro o fuera de la página.
- **`<ul>`**: lista desordenada (viñetas). Ideal para colecciones sin orden específico, como menús o listas de elementos.
- **`<ol>`**: lista ordenada (numerada). Se usa cuando el orden importa, por ejemplo pasos secuenciales.
- **`<li>`**: elemento de lista, va dentro de `<ul>` o `<ol>` para representar cada ítem.

Elementos de formulario introducidos en el ejercicio 3:

- **`<form>`**: contenedor de un formulario. Agrupa controles de entrada y suele tener atributos como `action` y `method` (aunque no se usan en la práctica básica).
- **`<label>`**: etiqueta que describe un campo de formulario. El atributo `for` debe coincidir con el `id` del control asociado para mejorar la accesibilidad.
- **`<input>`**: campo de entrada. Se usa con diferentes `type` (`text`, `email`, etc.).
- **`<textarea>`**: campo ampliado para texto multilinea (mensaje, comentarios).
- **`<button type="submit">`**: botón que envía el formulario. También puede usarse `input type="submit"`.