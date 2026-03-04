## CONCEPTOS GENERALES

En el desarrollo web existen términos que se utilizan con frecuencia. A continuación se definen de forma más amplia y ordenada.

- **Frontend**  
  Parte “visible” de una aplicación o sitio web. Incluye todo lo que el usuario final ve e interactúa: estructura (HTML), presentación (CSS) y comportamiento (JavaScript). Los desarrolladores frontend trabajan con navegadores, utilizan frameworks (React, Vue, Angular…) y se preocupan de la accesibilidad y la experiencia de usuario. No es lo mismo que diseño gráfico; el frontend consume el diseño y lo convierte en código.

- **Backend**  
  Capa “no visible” que corre en el servidor. Se encarga de la lógica de negocio, la persistencia en bases de datos, la autenticación/autorización, el enrutamiento de peticiones, etc. Se desarrolla en lenguajes como Java, Python, Node.js, PHP, C#… y se ejecuta en servidores o plataformas cloud. Comunica con el frontend a través de APIs.

- **API (Interfaz de Programación de Aplicaciones)**  
  Conjunto de reglas y mecanismos que permiten que dos programas se comuniquen. En la web suele tratarse de servicios REST, GraphQL, WebSockets… que aceptan peticiones HTTP y devuelven datos (JSON, XML). Una API abstrae la implementación interna y ofrece “endpoints” con los que otros desarrolladores pueden integrarse.

- **SQL (Structured Query Language)**  
  Lenguaje estandarizado para manipular bases de datos relacionales. Permite crear esquemas (CREATE TABLE), consultar datos (SELECT), insertarlos (INSERT), actualizarlos (UPDATE) o eliminarlos (DELETE). Existen variantes según el motor (MySQL, PostgreSQL, SQL Server…). En contraste, las bases NoSQL (MongoDB, Redis…) usan otros paradigmas.

- **HTTP (HyperText Transfer Protocol)**  
  Protocolo de la capa de aplicación usado por navegadores y servidores para intercambiar información. Cada interacción es una “petición” (request) con un método (GET, POST, PUT, DELETE…), una URL, cabeceras y, opcionalmente, un cuerpo; el servidor responde con un código de estado (200, 404, 500…), cabeceras y datos. HTTP/1.1, HTTP/2 y HTTP/3 son versiones con características distintas.

- **Archivo `README.md`**  
  Documento principal de cualquier proyecto en repositorios. Usualmente contiene descripción del propósito, instrucciones de instalación y uso, requisitos, ejemplos, licencias y cómo contribuir. Es escrito en Markdown para ser legible en GitHub u otras plataformas.

- **Archivo `Agents.md`**  
  Archivo de configuración/documentación donde se especifica el comportamiento esperado de agentes automáticos o bots dentro del proyecto. No es obligatorio en todos los repos, pero puede definirse en contextos de IA o automatización.

- **Archivo `Copilot-instructions.md`**  
  Se utiliza para guiar a herramientas como GitHub Copilot indicando estilo, convenciones, qué evitar y cómo generar el código. Permite establecer reglas globales para el asistente.

- **Skills**  
  Capacidades individuales que posee una IA o asistente. Cada skill es una función concreta (p. ej., traducción, generación de código, análisis de texto) que puede invocarse.

- **Ventana de contexto**  
  Limite de tokens o caracteres que un modelo de IA puede procesar de una sola vez. Superado ese umbral, la IA puede dejar de “recordar” partes anteriores de la conversación y su precisión disminuye.

- **Metadatos**  
  Información sobre la página web que no aparece en el cuerpo visible. Se colocan dentro de la etiqueta `<head>` e incluyen título, descripción, palabras clave, charset, enlaces a hojas de estilo, meta para redes sociales, etc. Ayudan a buscadores y navegadores a interpretar el contenido.

---

## CONCEPTOS HTML

### Definiciones básicas

- **HTML (HyperText Markup Language)**  
  Lenguaje de marcado estándar para estructurar el contenido de una página web. Define qué es cada parte (párrafos, imágenes, listas…) pero no cómo se ve. Es interpretado por el navegador para construir el DOM.

- **Elemento**  
  Unidad básica de HTML, formada por una etiqueta de apertura, contenido (opcional) y una etiqueta de cierre. Ejemplo: `<p>Hola</p>` es un elemento de tipo párrafo.

- **Etiqueta**  
  Texto entre los signos `<` y `>`. Identifica el tipo de elemento. Pueden ser de apertura (`<div>`) o de cierre (`</div>`). Algunas etiquetas son “vacías” (no necesitan cierre), como `<img>` o `<br>`.

- **Atributo**  
  Par clave‑valor dentro de una etiqueta que provee información adicional. Ejemplo: `<img src="foto.jpg" alt="Foto de perfil">`. `src` y `alt` son atributos.

### Estructura mínima

- `<!DOCTYPE html>`: declaración que indica que el documento se ajusta a HTML5.
- `<html>`: elemento raíz; todo el contenido va dentro.
- `<head>`: metadatos, enlaces a CSS, definición del título.
- `<title>`: texto que aparece en la pestaña del navegador.
- `<body>`: contenido visible por el usuario.

### Etiquetas básicas

- **Encabezados**: `<h1>` a `<h6>`; se utilizan para títulos de diferentes niveles. Sólo un `<h1>` por página por razones de accesibilidad/y SEO.
- **`<p>`**: define un párrafo.
- **`<img>`**: inserta imágenes; requiere `src` y debería llevar `alt` para accesibilidad.
- **`<a>`**: crea enlaces; el atributo `href` define la URL de destino.
- **`<div>`**: contenedor genérico de bloque; se usa para agrupar elementos y aplicar estilos.
- **`<span>`**: contenedor en línea; útil para estilizar texto o frases.
- **`<br>`**: salto de línea forzado.
- **`<hr>`**: línea horizontal para separar secciones.
- **`<strong>`**: texto con importancia semántica (normalmente negrita).
- **`<em>`**: texto enfatizado (normalmente cursiva).

### Listas

- `<ul>`: lista desordenada (con viñetas).
- `<ol>`: lista ordenada (con números o letras).
- `<li>`: elemento de la lista.

### Etiquetas semánticas

- `<header>`: cabecera de una sección o página.
- `<nav>`: bloque de navegación con enlaces.
- `<main>`: contenido principal del documento; solo debe haber uno.
- `<section>`: agrupa contenido temático.
- `<article>`: contenido independiente que puede distribuirse (un artículo, post, comentario).
- `<aside>`: contenido tangencial o secundario (barras laterales, anuncios).
- `<footer>`: pie de página de una sección o del documento.

### Tablas

- `<table>`: define una tabla.
- `<tr>`: fila de la tabla.
- `<th>`: celda de encabezado (por defecto negrita, centrada).
- `<td>`: celda de datos normal.
- **Atributos útiles**: `colspan` (permite abarcar varias columnas) y `rowspan` (abarcar varias filas).

### Formularios

- `<form>`: contenedor de controles para enviar datos; atributos `action` (URL destino) y `method` (GET/POST).
- `<input>`: campo de entrada; el atributo `type` define su comportamiento (`text`, `password`, `email`, `number`, `checkbox`, `radio`, `submit`, etc.).
- `<label>`: etiqueta asociada a un control; el atributo `for` se corresponde con el `id` del input.
- `<textarea>`: área de texto de varias líneas.
- `<select>`: lista desplegable.
- `<option>`: opción dentro de un `<select>`.

---

## CONCEPTOS CSS

*(Añadir detalles de CSS aquí cuando se requiera)*
