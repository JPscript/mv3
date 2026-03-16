# CLASE2 Perfil (con IA)

## Opciones propuestas (mínimo 5)
1. Perfil personal.
2. Perfil de artista.
3. Perfil de desarrollador.
4. Perfil de streamer.
5. Perfil de equipo.

## Opción elegida
- Perfil personal.

## Prompt base
"Crea una página semántica de perfil personal con secciones, navegación interna y formulario de contacto accesible."

## Iteraciones sugeridas
1. "Añade tabla simple de datos de amigos."
2. "Revisa accesibilidad del formulario y mejora labels."

## Paso a paso docente (con IA)
1. Genera primer borrador con el prompt base.
2. Copia el HTML en tu archivo y NO lo des por válido aún.
3. Revisa manualmente que exista estructura semántica (`header/main/section`).
4. Pide mejora puntual de accesibilidad en el formulario.
5. Verifica a mano que cada `label` apunte a un `id` existente.
6. Añade navegación interna y prueba cada enlace.
7. Ejecuta validación visual: móvil y escritorio.
8. Escribe una mini conclusión: qué aportó la IA y qué corregiste tú.

## Solución completa explicada

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil con IA</title>
</head>
<body>
  <header>
    <h1>Senior Cat Profile</h1>
    <nav>
      <a href="#perfil">Perfil</a> |
      <a href="#datos">Datos</a> |
      <a href="#contacto">Contacto</a>
    </nav>
  </header>
  <main>
    <section id="perfil"><h2>Perfil</h2><p>Descripción personal.</p></section>
    <section id="datos"><h2>Datos</h2><ul><li>Edad: 10</li><li>Flow: alto</li></ul></section>
    <section id="contacto">
      <h2>Contacto</h2>
      <form>
        <label for="email">Email</label>
        <input id="email" type="email" required>
        <button type="submit">Enviar</button>
      </form>
    </section>
  </main>
</body>
</html>
```

- El flujo con IA acelera el borrador, pero la revisión manual corrige detalles finales.
- Se valida semántica y accesibilidad antes de aceptar la solución.

## Qué resuelve este ejercicio
- Entrena un proceso real de desarrollo asistido por IA con control humano.
- Refuerza calidad de código y criterio técnico del estudiante.
