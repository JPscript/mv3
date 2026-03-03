# Clase 2 — Práctica: Página de perfil personal (HTML + CSS inicial)

Referencia: ver CLASE1.md para la introducción y principios básicos revisados anteriormente.

Objetivos
- Construir una página de perfil personal usando etiquetas semánticas.
- Practicar listas, imágenes, enlaces, formularios simples (inputs y botones) y una barra de navegación.
- Aprender a mejorar visualmente la página con reglas CSS básicas (tipografía, colores, espaciado, layout con flex).

Horario
- 16:30 - 18:00 — Primera mitad: ejercicio HTML práctico (con explicación guiada).
- 18:00 - 18:30 — Receso.
- 18:30 - 20:30 — Segunda mitad: aplicar CSS y mejoras; actividad dirigida.

Primera mitad — Ejercicio base (HTML) — "Mi perfil"
- Tarea única: crear un archivo `index.html` que represente tu página de perfil personal con una zona de contacto.
- Requisitos mínimos (todos deben aparecer en la página):
  - Estructura semántica: header, nav, main, section, footer.
  - Navbar con enlaces internos (anchors) a secciones: Inicio, Sobre mí, Proyectos, Contacto.
  - Encabezados y párrafos (h1..h3, p).
  - Una lista de habilidades o proyectos (ul/ol).
  - Una imagen de perfil (img con alt).
  - Formulario de contacto con inputs (nombre, email, mensaje) y botón de envío.
  - Al menos un enlace externo (target="_blank" con rel="noopener").

Ejemplo mínimo (copiar en index.html):
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Mi perfil personal</title>
</head>
<body>
  <header>
    <h1>Mi perfil</h1>
    <nav>
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#sobre-mi">Sobre mí</a></li>
        <li><a href="#proyectos">Proyectos</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="inicio">
      <h2>Bienvenida</h2>
      <p>Esta es mi página de perfil personal.</p>
      <img src="https://via.placeholder.com/150" alt="Foto de perfil" />
    </section>
    <section id="sobre-mi">
      <h2>Sobre mí</h2>
      <p>Breve descripción personal.</p>
    </section>
    <section id="proyectos">
      <h2>Proyectos</h2>
      <ul>
        <li>Proyecto A</li>
        <li>Proyecto B</li>
        <li>Proyecto C</li>
      </ul>
    </section>
    <section id="contacto">
      <h2>Contacto</h2>
      <form>
        <label for="nombre">Nombre:</label><br />
        <input id="nombre" name="nombre" type="text" placeholder="Tu nombre" /><br />
        <label for="email">Email:</label><br />
        <input id="email" name="email" type="email" placeholder="tu@correo.com" /><br />
        <label for="mensaje">Mensaje:</label><br />
        <textarea id="mensaje" name="mensaje" placeholder="Escribe tu mensaje"></textarea><br />
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 Mi perfil personal</p>
    <p><a href="https://developer.mozilla.org/es/" target="_blank" rel="noopener">MDN Web Docs</a></p>
  </footer>
</body>
</html>
```

Segunda mitad — Embellecer con CSS
- Crear un archivo `styles.css` y enlazarlo en el `<head>` de `index.html`.
- Aplicar estilos para mejorar tipografía, colores, espaciado y layout con flexbox.

Instrucciones rápidas:
1. Crear `styles.css` en la misma carpeta.
2. En el `<head>` de `index.html` añadir:
   <link rel="stylesheet" href="styles.css" />
3. Copiar el CSS siguiente en `styles.css`.

```css
/* styles.css */
:root {
  --bg: #f6f8fa;
  --card: #ffffff;
  --accent: #2b6cb0;
  --muted: #6b7280;
  --radius: 8px;
  --maxw: 900px;
}

* {
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  background: var(--bg);
  color: #111827;
  margin: 0;
  line-height: 1.5;
  padding: 20px;
}

header, main, footer {
  max-width: var(--maxw);
  margin: 0 auto 20px;
  background: var(--card);
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
}

header h1 {
  margin: 0 0 10px 0;
  color: var(--accent);
  font-size: 1.6rem;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 12px;
}

nav a {
  text-decoration: none;
  color: var(--muted);
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.15s, color 0.15s;
}

nav a:hover,
nav a:focus {
  background: rgba(43, 108, 176, 0.08);
  color: var(--accent);
}

section {
  margin-bottom: 16px;
}

section h2 {
  margin-top: 0;
  color: #0f172a;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
  margin: 10px 0;
}

form input[type="text"],
form input[type="email"],
form textarea {
  width: 100%;
  padding: 8px 10px;
  margin: 6px 0 12px 0;
  border: 1px solid #e6e9ee;
  border-radius: 6px;
  background: #fff;
}

form input:focus,
form textarea:focus {
  outline: 2px solid rgba(43, 108, 176, 0.18);
  border-color: var(--accent);
}

button {
  background: var(--accent);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.08s, background-color 0.12s;
}

button:hover {
  transform: translateY(-1px);
  background: #265f97;
}

footer {
  text-align: center;
  font-size: 0.9rem;
  color: var(--muted);
}

a:focus,
button:focus,
input:focus {
  outline-offset: 2px;
}
```

Actividades diferenciadas
- Sin IA: Completar el ejercicio base y aplicar los estilos CSS sugeridos.
- Con IA: Experimentar con cambios en el diseño y estructura, usando herramientas como Copilot para sugerencias.

Entregables
- Archivo `index.html` con la estructura y contenido requeridos.
- Archivo `styles.css` con los estilos aplicados.

Checklist
- [ ] Página HTML cumple con los requisitos mínimos.
- [ ] CSS mejora la presentación visual.
- [ ] Navegación funcional y enlaces correctos.
- [ ] Formulario funcional (sin validación avanzada).

Cierre y consejos rápidos
- Ejecuta `index.html` en el navegador para ver el resultado.
- Experimenta cambiando colores y espacios en `styles.css`.
- Preguntas de seguimiento: validar accesibilidad (contraste), hacer la navegación responsiva usando media queries (siguiente clase).

