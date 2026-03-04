---
name: comentador-html
description: Explica el código HTML al detalle para nivel principiante. 
user-invokable: true
disable-model-invocation: false
argument-hint: "<codigo_html>"
---

# Skill: Comentador de HTML para principiantes

Este documento describe un “skill” que puedes invocar cuando quieras que un fragmento
de código HTML sea comentado y explicado con detalle. El propósito es
que un alumno o cualquier persona con nivel inicial entienda qué hace cada
elemento, atributo, estructura y por qué se utiliza.

---

## ¿Qué hace el skill?

1. Recibe un bloque de código HTML (puede ser una página completa o un snippet-fragmento de código reutilizable).
2. Recorre el código y, etiqueta por etiqueta, inserta comentarios HTML
   (`<!-- ... -->`) que:
   * Definen la función de la etiqueta.
   * Señalan la importancia de la semántica.
   * Describen los atributos usados y sus valores.
   * Indican la jerarquía (padres/‌hijos, contenedores).
   * Aclaran cualquier comportamiento especial (formularios, enlaces, imágenes…).
3. Explica, en un lenguaje sencillo, términos nuevos o conceptos clave.
4. Devuelve el mismo código original con los comentarios intercalados.

---

## Uso sugerido

- **Entrada**: tu código HTML sin comentarios.
- **Salida**: el mismo código con comentarios detallados.
- **Formato**: conservar indentación y estructura; los comentarios deben
  ser lo más claros y breves posible, pero suficientemente descriptivos para un
  principiante.

> Ejemplo de entrada:
> ```html
> <header>
>   <h1>Mi sitio</h1>
>   <nav>
>     <a href="index.html">Inicio</a>
>   </nav>
> </header>
> ```
>
> Ejemplo de salida:
> ```html
> <!-- <header> se usa para el encabezado de la página, suele contener logo,
>      título o navegación -->
> <header>
>   <!-- <h1> título principal, sólo debe haber uno por página -->
>   <h1>Mi sitio</h1>
>   <!-- <nav> elemento de navegación; agrupa enlaces importantes -->
>   <nav>
>     <!-- <a> enlace; el atributo href indica la dirección de destino -->
>     <a href="index.html">Inicio</a>
>   </nav>
> </header>
> ```

---

## Consejos para el autor del skill

- Mantener el lenguaje en español claro y directo.
- Asumir poca o ninguna experiencia previa en HTML.
- Evitar tecnicismos sin explicación; si aparecen, añadir una breve definición.
- No añadir comentarios que digan “esto se explica solo”.
- Comentar también buenas prácticas (por ejemplo, usar `<main>` para
  contenido principal, etc.).

---

