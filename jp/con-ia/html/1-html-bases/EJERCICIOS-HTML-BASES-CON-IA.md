# HTML bases (con IA)

## Opciones propuestas (mínimo 5)
1. Perfil personal.
2. Landing de curso.
3. Página de evento.
4. Catálogo de hobbies.
5. Mini blog inicial.

## Opción elegida
- Perfil personal.

## Ejercicio guiado
Crear un HTML básico con ayuda de IA y revisión manual.

### Prompt inicial
"Genera un `index.html` básico de perfil personal con título, párrafo, lista, imagen y enlace de contacto."

### Iteraciones
1. "Mejora semántica y claridad de títulos."
2. "Añade accesibilidad básica (`alt`, jerarquía de headings)."

### Paso a paso docente (con IA, pero guiado)
1. Escribe el prompt inicial y guarda el resultado en bruto.
2. Revisa manualmente la estructura base (`DOCTYPE`, `lang`, `head`, `body`).
3. Pide a la IA mejora de semántica (`header`, `main`, `footer`).
4. Compara versión anterior y nueva: anota qué cambió y por qué.
5. Verifica accesibilidad manualmente (`alt`, un único `h1`, orden de títulos).
6. Ajusta nombres/textos para que reflejen el objetivo de clase.
7. Ejecuta prueba en navegador y corrige etiquetas mal cerradas si aparecen.
8. Cierra con reflexión: qué hizo la IA y qué corrigió el estudiante.

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
  <header>
    <h1>Senior Cat</h1>
    <p>Perfil básico creado con IA y revisado manualmente.</p>
  </header>

  <main>
    <section>
      <h2>Datos principales</h2>
      <ul>
        <li>Nombre: Senior Cat</li>
        <li>Edad: 10</li>
        <li>Especialidad: Construcción web</li>
      </ul>
    </section>

    <section>
      <h2>Foto</h2>
      <img src="./assets/image.png" alt="Senior Cat con gafas" width="220">
    </section>
  </main>

  <footer>
    <a href="mailto:seniorcat@example.com">Escríbeme</a>
  </footer>
</body>
</html>
```

- `header/main/footer` mejora la semántica general.
- Se mantiene estructura simple para nivel básico.
- La revisión manual valida que no haya etiquetas mal cerradas.

## Verificación
- Validar en navegador y revisar que no haya errores de consola/estructura.

## Qué resuelve este ejercicio
- Enseña flujo profesional: IA como asistente, no como reemplazo del razonamiento.
- Refuerza revisión crítica y control de calidad del HTML final.
