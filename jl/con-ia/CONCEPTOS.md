# Resumen de Clase: Estructura y Etiquetas de HTML

Este documento resume los conceptos clave vistos en clase sobre la estructura de documentos web, etiquetas de texto y navegación.

---

## 1. Estructura y Secciones Principales

Las etiquetas de sección ayudan a los navegadores y lectores de pantalla a entender la jerarquía del contenido.

- `<body>`: Contiene todo el contenido visible de la página web.
- `<header>`: Define la cabecera (títulos, logos, navegación principal).
- `<section>`: Se utiliza para agrupar contenido temático relacionado dentro de la página.

---

## 2. Títulos y Encabezados (`<h1>` a `<h6>`)

HTML ofrece seis niveles de encabezados para estructurar el texto:

- `<h1>`: El título principal (solo debe haber **uno** por página para SEO).
- `<h2>` a `<h6>`: Subtítulos de importancia descendente para organizar secciones y subsecciones.

---

## 3. Enlaces y Navegación (`<a>`)

La etiqueta de ancla (**anchor**) permite conectar páginas y recursos.

- **Atributo `href`**: (Hypertext Reference) Especifica la dirección de destino.
- **Tipos de URLs**:
  - **Absolutas**: Direcciones completas con protocolo (Ej: `https://google.com`).
  - **Relativas**: Rutas a archivos dentro del mismo proyecto (Ej: `contacto.html` o `../assets/foto.jpg`).

Ejemplo:
`<a href="https://www.google.com">Ir a Google</a>`

---

## 4. Citas en Bloque (`<blockquote>`)

Se utiliza para representar una sección que es una cita de otra fuente.

> **Ejemplo:**
> `<blockquote>`
> "El código es como el humor. Cuando tienes que explicarlo, es malo."
> `</blockquote>`

---

## 5. Glosario Rápido de Atributos

| Atributo          | Uso                                                            |
| :---------------- | :------------------------------------------------------------- |
| `href`            | Define la URL o destino de un enlace.                          |
| `target="_blank"` | Abre el enlace en una pestaña nueva.                           |
| `title`           | Muestra información extra al pasar el ratón sobre el elemento. |

---

_Notas adicionales: Siempre recuerda cerrar las etiquetas y mantener una indentación limpia para que el código sea legible._
