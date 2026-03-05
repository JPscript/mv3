# HTML bases (sin IA)

## Opciones propuestas (mínimo 5)
1. Página de perfil personal.
2. Página de receta.
3. Página de evento.
4. Mini blog con artículos.
5. Guía de ciudad.

## Opción elegida
- Página de perfil personal.

## Ejercicio guiado
Construye un `index.html` con estructura básica y contenido esencial.

### Pasos
1. Crea un archivo llamado `index.html`.
2. Escribe la estructura mínima: `DOCTYPE`, `html lang="es"`, `head`, `body`.
3. En `head`, añade `meta charset`, `meta viewport` y `title`.
4. En `body`, escribe un `h1` (solo uno) con el nombre del perfil.
5. Debajo del `h1`, agrega un párrafo corto de presentación.
6. Crea un subtítulo `h2` llamado "Datos".
7. Debajo, crea una lista `ul` con al menos 3 `li`.
8. Inserta una imagen con `img` y completa `src`, `alt` y `width`.
9. Agrega un enlace de contacto con `a` usando `mailto:`.
10. Revisión final:
  - `alt` no vacío.
  - Etiquetas cerradas.
  - Jerarquía: `h1` y luego `h2`.

## Solución completa explicada

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil de Senior Cat</title>
</head>
<body>
  <h1>Senior Cat</h1>
  <p>Hola, este es mi perfil básico de práctica HTML.</p>

  <h2>Datos</h2>
  <ul>
    <li>Nombre: Senior Cat</li>
    <li>Edad: 10</li>
    <li>Rol: Mentor felino</li>
  </ul>

  <img src="./assets/image.png" alt="Foto de Senior Cat" width="220">

  <p><a href="mailto:seniorcat@example.com">Contactar</a></p>
</body>
</html>
```

- Se usa `lang="es"` para accesibilidad e internacionalización.
- `meta viewport` permite buena visualización en móvil.
- `h1` define el título principal único de la página.
- `ul/li` organiza datos de forma semántica.
- `img` con `alt` describe la imagen para lectores de pantalla.

## Verificación
- Abre en navegador y comprueba que imagen, lista y enlace funcionan.

## Qué resuelve este ejercicio
- Construye tu primer cimiento web: estructura, contenido, accesibilidad y navegación básica.
- Te prepara para estilos CSS y lógica JS sin arrastrar errores de HTML.
