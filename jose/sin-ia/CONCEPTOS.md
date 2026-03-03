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