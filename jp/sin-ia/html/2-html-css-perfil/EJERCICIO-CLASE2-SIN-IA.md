# CLASE2 Perfil (sin IA)

## Opciones propuestas (mínimo 5)
1. Perfil personal con contacto.
2. Página de mascota.
3. Ficha de videojuego favorito.
4. Perfil profesional de estudiante.
5. Página de club/afición.

## Opción elegida
- Perfil personal con contacto.

## Pasos guiados
1. Crea `index.html` y define estructura base completa.
2. En `body`, crea `header` con `h1` y `nav`.
3. En `nav`, crea enlaces internos a `#bio`, `#hobbies`, `#contacto`.
4. Crea `main` y agrega `section id="bio"` con título y párrafo.
5. Agrega `section id="hobbies"` con lista de 3 hobbies.
6. Agrega `section id="contacto"` con formulario.
7. En el formulario, conecta cada `label` con su `input` usando `for/id`.
8. Marca campos importantes con `required`.
9. Añade un `footer` breve al final.
10. Comprueba navegación y validación del formulario en navegador.
11. Revisión docente:
  - IDs coinciden con enlaces del menú.
  - No hay saltos de jerarquía de títulos.
  - Todos los campos tienen etiqueta.

## Solución completa explicada

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil Personal</title>
</head>
<body>
  <header>
    <h1>Mi Perfil</h1>
    <nav>
      <a href="#bio">Biografía</a> |
      <a href="#hobbies">Hobbies</a> |
      <a href="#contacto">Contacto</a>
    </nav>
  </header>

  <main>
    <section id="bio">
      <h2>Biografía</h2>
      <p>Soy estudiante de desarrollo web y me gusta aprender creando proyectos.</p>
    </section>

    <section id="hobbies">
      <h2>Hobbies</h2>
      <ul><li>Programar</li><li>Leer</li><li>Gaming</li></ul>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
      <form>
        <label for="nombre">Nombre</label>
        <input id="nombre" name="nombre" type="text" required>
        <label for="msg">Mensaje</label>
        <textarea id="msg" name="msg" required></textarea>
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>

  <footer><p>© 2026</p></footer>
</body>
</html>
```

- `required` asegura validación nativa mínima.
- `label` mejora accesibilidad del formulario.
- Anclas internas guían navegación rápida.

## Qué resuelve este ejercicio
- Te enseña a construir una página de perfil completa y navegable.
- Es base para luego “vestir” con CSS, ladrillo por ladrillo.
