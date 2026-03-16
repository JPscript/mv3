# HTML medio (sin IA) — Guía de ciudad

## Opciones propuestas (mínimo 5)
1. Guía de ciudad.
2. Guía gastronómica.
3. Guía de museos.
4. Guía de rutas de senderismo.
5. Guía de ocio nocturno.

## Opción elegida
- Guía de ciudad.

## Pasos guiados
1. Crea el archivo `index.html` y escribe solo la base: `<!DOCTYPE html>`, `html`, `head` y `body`.
  - Qué resuelve: tener un documento válido desde el inicio.
  - Verifica: al abrir en navegador no aparece error de parseo.
2. Dentro de `head`, agrega `meta charset`, `meta viewport` y `title`.
  - Qué resuelve: acentos correctos + visualización móvil.
  - Verifica: el título aparece en la pestaña del navegador.
3. Dentro de `body`, crea `header` con `h1` y `nav`.
  - Qué resuelve: cabecera principal y navegación clara.
4. En `nav`, crea cuatro enlaces internos con `href="#lugares"`, `#comida`, `#agenda`, `#contacto`.
  - Qué resuelve: navegación por secciones sin salir de la página.
  - Verifica: de momento los enlaces no saltarán hasta crear los `id`.
5. Crea `main` y dentro agrega `section id="lugares"` con `h2`.
  - Añade un `article` con `h3` y un párrafo.
  - Qué resuelve: estructura semántica de contenido principal.
6. Agrega `section id="comida"` con `h2` y una lista `ul` de 2 o más comidas.
  - Qué resuelve: información rápida en formato escaneable.
7. Agrega `section id="agenda"` con `h2` y una `table` completa (`thead` + `tbody`).
  - Qué resuelve: datos de horarios ordenados por filas/columnas.
  - Verifica: tabla con encabezados "Actividad" y "Hora".
8. Agrega `section id="contacto"` con `form`, `label`, `input`, `textarea` y `button`.
  - Qué resuelve: canal básico de contacto con validación nativa.
  - Verifica: `input` y `textarea` tienen `required`.
9. Prueba navegación: haz clic en cada enlace del menú.
  - Qué resuelve: confirmar que cada `href` coincide con un `id`.
10. Revisión final de profesor:
  - Un solo `h1` en toda la página.
  - IDs sin espacios.
  - Etiquetas correctamente cerradas.

## Solución completa explicada

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guía de Ciudad</title>
</head>
<body>
  <header>
    <h1>Guía de Ciudad</h1>
    <nav>
      <a href="#lugares">Lugares</a> |
      <a href="#comida">Comida</a> |
      <a href="#agenda">Agenda</a> |
      <a href="#contacto">Contacto</a>
    </nav>
  </header>
  <main>
    <section id="lugares"><h2>Lugares</h2><article><h3>Centro</h3><p>Zona histórica.</p></article></section>
    <section id="comida"><h2>Comida</h2><ul><li>Tapa 1</li><li>Tapa 2</li></ul></section>
    <section id="agenda">
      <h2>Agenda</h2>
      <table>
        <thead><tr><th>Actividad</th><th>Hora</th></tr></thead>
        <tbody><tr><td>Tour</td><td>10:00</td></tr></tbody>
      </table>
    </section>
    <section id="contacto">
      <h2>Contacto</h2>
      <form>
        <label for="nombre">Nombre</label>
        <input id="nombre" type="text" required>
        <label for="msg">Mensaje</label>
        <textarea id="msg" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>
</body>
</html>
```

- Se usan IDs sin espacios para enlaces internos robustos.
- `section + article` organiza contenido reutilizable y legible.

## Qué estás construyendo y para qué sirve
- Este ejercicio te enseña a levantar una “estructura de ladrillos” HTML sólida, como Senior Cat: primero cimientos (`head`), luego distribución (`header/main/section`) y al final utilidad real (`form`).
- Sirve para páginas informativas reales (turismo, eventos, catálogos) con navegación interna y contenido accesible.
