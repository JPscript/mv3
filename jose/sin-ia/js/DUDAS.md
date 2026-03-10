# DUDAS.md

## Preguntas y respuestas sobre el CRUD en JS

---

### 1. ¿Qué es el DOM?
El DOM (Document Object Model) es la estructura de objetos que representa todos los elementos de una página web. Permite que JavaScript acceda y modifique el contenido, como si fueran ladrillos en un muro.

**Ejemplo:**
```js
// Espera a que el DOM esté listo
// Así puedes manipular los elementos de la página

document.addEventListener('DOMContentLoaded', function() {
  // ...
});
```

---

### 2. ¿Qué significa form. en el código?
`form` es la variable que contiene el formulario HTML. Al usar `form.nombre.value`, accedes al valor del campo con name="nombre".

**Ejemplo:**
```js
const form = document.getElementById('formulario-create');
let nombre = form.nombre.value;
```

---

### 3. ¿Qué es .then?
`.then` es un método de las promesas en JavaScript. Permite ejecutar código cuando la promesa se resuelve (por ejemplo, cuando fetch termina).

**Ejemplo:**
```js
fetch('url').then(response => { /* aquí va el código */ });
```

---

### 4. ¿Qué es response?
`response` es el objeto que devuelve fetch cuando la promesa se resuelve. Contiene la respuesta de la API, incluyendo estado, headers y cuerpo.

**Ejemplo:**
```js
fetch('url')
  .then(response => response.json())
  .then(data => { /* aquí va el código */ });
```

---

### 5. ¿Cómo mostrar un mensaje al usuario?
Puedes crear un elemento (por ejemplo, un p) y añadirlo al formulario o a la página.

**Ejemplo:**
```js
let mensaje = document.createElement('p');
mensaje.textContent = 'Receta creada correctamente.';
form.appendChild(mensaje);
setTimeout(() => mensaje.remove(), 3000);
```

---

### 6. ¿Por qué me sale error 400 (Bad Request) al crear una receta?
El error 400 indica que la API rechaza los datos enviados porque algún campo no cumple las validaciones.

En nuestro caso, el campo `tiempo_min` debe ser un número entero mayor o igual a 1. Si envías vacío, 0, decimales o texto, la API lo rechaza.

**Solución:**
- En el formulario HTML, pon:
  ```html
  <input type="number" id="tiempo" name="tiempo_min" min="1" step="1" required>
  ```
- En JS, convierte el valor a número antes de enviarlo:
  ```js
  tiempo_min: parseInt(form.tiempo_min.value),
  ```
- Así, la API recibe un número válido y la receta se crea correctamente.

**Ejemplo de error mostrado:**
```
Error: tiempo_min must not be less than 1, tiempo_min must be an integer number
```

**Explicación:**
La API valida que el campo sea un número entero mayor que 0. Si no lo es, devuelve este mensaje y no crea la receta.

---

### 7. ¿Qué es el parámetro event en el submit?
El navegador lo genera automáticamente cuando ocurre el evento "submit" en el formulario. Se pasa como argumento a la función del addEventListener y te permite controlar el envío.

**Ejemplo:**
```js
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Evita el envío normal
  // ...tu lógica para crear la receta
});
```

---

### 8. ¿Qué es el objeto receta?
Es un objeto JavaScript con propiedades (clave:valor) que representa los datos de la receta. No es un array.

**Ejemplo:**
```js
const receta = {
  nombre: form.nombre.value,
  descripcion: form.descripcion.value,
  ingredientes: form.ingredientes.value,
  tiempo_min: parseInt(form.tiempo_min.value),
  dificultad: form.dificultad.value
};
```

---

### 9. ¿Qué hacen method, headers, body y JSON.stringify en fetch?
- method: indica el tipo de petición HTTP (POST para crear).
- headers: define el formato de los datos (application/json).
- body: contiene los datos enviados, convertidos a JSON.
- JSON.stringify: convierte el objeto JS a texto JSON.

**Ejemplo:**
```js
fetch("http://localhost:3000/recipes", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify(receta)
})
```

---

### 10. ¿Qué hacemos en el .then(async)?
Esperamos a que la respuesta de la API se convierta en datos JS (con await response.json()), y luego procesamos el resultado (éxito o error).

**Ejemplo:**
```js
.then(async response => {
  const data = await response.json();
  if (response.ok) {
    // Receta creada correctamente
  } else {
    // Mostrar mensaje de error
  }
})
```

---

Si tienes más dudas, dímelas y las iré añadiendo aquí con ejemplos del código que estamos construyendo.
