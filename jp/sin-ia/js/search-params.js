// Ejemplo en tu script.js
const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // "1" si la URL es ...?id=1

console.log(id);
new URL(window.location.href).searchParams.get('id')