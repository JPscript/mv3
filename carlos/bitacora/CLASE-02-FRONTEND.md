# Clase 2 — Introducción práctica a HTML y CSS (dividida en dos mitades)

Objetivos
- Familiarizarse con etiquetas semánticas básicas: header, nav, main, section, footer.
- Practicar elementos esenciales: headings, párrafos, listas, imágenes, enlaces, inputs y botones.
- Aprender a aplicar estilos CSS básicos para tipografía, colores, spacing, layout y hover states.

Explicación breve
- Primera mitad: construiremos una página HTML simple que use estructura semántica y elementos comunes.
- Segunda mitad: tomaremos la misma página y añadiremos una hoja de estilos CSS para mejorar su aspecto.

Contenido de la clase
- Etiquetas semánticas: header, nav, main, section, article, footer, aside.
- Textos: h1..h3, p.
- Listas: ol/ul, li.
- Multimedia: img (con alt).
- Enlaces: a href (fragmentos y externos).
- Formularios simples: label, input, button.
- CSS: tipografía, colores, layout (max-width, centrar), spacing, hover, estados focus.

Ejercicio práctico (Primera mitad — solo HTML)
- Tarea: crear un mini sitio informativo usando solo HTML. Guardar como `index.html`.

```html
<!-- index.html (copia esto en un archivo llamado index.html) -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Mi página de práctica - Clase 2</title>
  <!-- Sin CSS en esta mitad: solo HTML puro -->
</head>
<body>
  <!-- Encabezado principal con título y navegación -->
  <header>
    <h1>Mi pequeño sitio</h1>
    <nav>
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <!-- Contenedor principal con secciones semánticas -->
  <main>
    <!-- Sección de inicio -->
    <section id="inicio">
      <h2>Bienvenida</h2>
      <p>Este es un ejercicio para practicar etiquetas HTML semánticas y elementos básicos.</p>
      <img src="https://via.placeholder.com/300x150" alt="Imagen de ejemplo" />
    </section>

    <!-- Sección de productos con lista -->
    <section id="productos">
      <h2>Productos destacados</h2>
      <p>Lista simple de artículos:</p>
      <ul>
        <li>Producto A — descripción breve.</li>
        <li>Producto B — descripción breve.</li>
        <li>Producto C — descripción breve.</li>
      </ul>
    </section>

    <!-- Sección de contacto con formulario simple -->
    <section id="contacto">
      <h2>Contacto</h2>
      <p>Déjanos un mensaje:</p>
      <form>
        <label for="nombre">Nombre:</label><br />
        <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" /><br />

        <label for="email">Email:</label><br />
        <input id="email" name="email" type="email" placeholder="tu@correo.com" /><br />

        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>

  <!-- Pie de página -->
  <footer>
    <p>&copy; 2026 Clase 2 — Práctica frontend</p>
    <p><a href="https://developer.mozilla.org/es/" target="_blank" rel="noopener">MDN Web Docs</a></p>
  </footer>
</body>
</html>
```

Segunda mitad — embellecer con CSS
- Tarea: crear un archivo `styles.css` y enlazarlo en el `<head>` de `index.html`. Aplicar estilos para mejorar tipografía, colores, spacing y hover states.

Instrucciones rápidas:
1. Crear `styles.css` en la misma carpeta.
2. En el `<head>` de `index.html` añadir:
   <link rel="stylesheet" href="styles.css" />
3. Copiar el CSS siguiente en `styles.css`.

```css
/* styles.css (copia esto en un archivo llamado styles.css) */
/* Tipografía y colores base */
:root{
  --bg: #f6f8fa;
  --card: #ffffff;
  --accent: #2b6cb0;
  --muted: #6b7280;
  --radius: 8px;
  --maxw: 900px;
}

*{box-sizing:border-box}
body{
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: var(--bg);
  color: #111827;
  margin: 0;
  line-height: 1.5;
  padding: 20px;
}

/* Layout centralizado */
header, main, footer{
  max-width: var(--maxw);
  margin: 0 auto 20px;
  background: var(--card);
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: 0 1px 3px rgba(15,23,42,0.06);
}

/* Header */
header h1{
  margin: 0 0 10px 0;
  color: var(--accent);
  font-size: 1.6rem;
}

/* Navegación horizontal sencilla */
nav ul{
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 12px;
}
nav a{
  text-decoration: none;
  color: var(--muted);
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color .15s, color .15s;
}
nav a:hover,
nav a:focus{
  background: rgba(43,108,176,0.08);
  color: var(--accent);
}

/* Secciones */
section{
  margin-bottom: 16px;
}
section h2{
  margin-top: 0;
  color: #0f172a;
}

/* Imagen responsive */
img{
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
  margin: 10px 0;
}

/* Formulario */
form input[type="text"],
form input[type="email"]{
  width: 100%;
  padding: 8px 10px;
  margin: 6px 0 12px 0;
  border: 1px solid #e6e9ee;
  border-radius: 6px;
  background: #fff;
}
form input:focus{
  outline: 2px solid rgba(43,108,176,0.18);
  border-color: var(--accent);
}

/* Botón */
button{
  background: var(--accent);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform .08s, background-color .12s;
}
button:hover{
  transform: translateY(-1px);
  background: #265f97;
}

/* Footer pequeño y claro */
footer{
  text-align: center;
  font-size: 0.9rem;
  color: var(--muted);
}

/* Respuesta y accesibilidad: foco visible */
a:focus, button:focus, input:focus{
  outline-offset: 2px;
}
```

Versión final (index.html con enlace a styles.css)
- Reemplaza el `<head>` original por este fragmento para usar la hoja de estilos:

```html
<!-- head final para index.html -->
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Mi página de práctica - Clase 2</title>
  <link rel="stylesheet" href="styles.css" />
</head>
```

Cierre y consejos rápidos
- Ejecuta `index.html` en el navegador para ver el resultado.
- Experimenta cambiando colores y espacios en `styles.css`.
- Preguntas de seguimiento: validar accesibilidad (contraste), hacer la navegación responsiva usando media queries (siguiente clase).

