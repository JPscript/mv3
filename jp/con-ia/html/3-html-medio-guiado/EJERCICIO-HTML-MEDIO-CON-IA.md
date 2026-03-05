# HTML medio (con IA)

## Opciones propuestas (mínimo 5)
1. Portafolio pro.
2. Evento creativo.
3. Mini blog.
4. Guía de ciudad.
5. Perfil gamer.

## Opción elegida
- Guía de ciudad.

## Prompt base
"Genera una guía de ciudad semántica con navegación interna, tabla de agenda y formulario de contacto."

## Paso a paso docente (con IA)
1. Pide a la IA una primera versión mínima de la guía.
2. Revisa manualmente que el menú use anclas internas reales (`href` -> `id`).
3. Pide segunda versión para mejorar semántica en secciones y tabla.
4. Verifica que la tabla tenga `thead` y `tbody`.
5. Pide tercera iteración para accesibilidad del formulario.
6. Comprueba `label` + `for`, y campos con `required`.
7. Limpia texto/estructura para que sea legible por otro compañero.
8. Valida en navegador y deja versión final comentada en bitácora.

## Solución completa explicada

```html
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Guía</title></head>
<body>
  <header><h1>Guía Urbana</h1><nav><a href="#plan">Plan</a> | <a href="#contacto">Contacto</a></nav></header>
  <main>
    <section id="plan"><h2>Plan del día</h2><p>Recorrido por puntos clave.</p></section>
    <section><h2>Agenda</h2><table><thead><tr><th>Lugar</th><th>Hora</th></tr></thead><tbody><tr><td>Museo</td><td>11:00</td></tr></tbody></table></section>
    <section id="contacto"><h2>Contacto</h2><form><label for="e">Email</label><input id="e" type="email" required><button type="submit">Enviar</button></form></section>
  </main>
</body>
</html>
```

- La IA genera estructura inicial; la revisión manual corrige semántica y validación.
- El formulario usa `required` para validar sin JS adicional.

## Qué resuelve este ejercicio
- Simula trabajo profesional iterativo: prototipo rápido + validación técnica.
- Enseña a convertir salida de IA en producto fiable.
