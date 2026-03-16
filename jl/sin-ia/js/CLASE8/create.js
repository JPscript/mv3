const form = document.getElementById("formulario");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let descripcion = document.getElementById("descripcion").value;
  let ingredientes = document.getElementById("ingredientes").value;
  let tiempo_min = parseInt(document.getElementById("tiempo_min").value, 10);

  if (isNaN(tiempo_min) || tiempo_min < 1) {
    alert("Por favor ingresa un tiempo válido (mínimo 1 minuto)");
    return;
  }

  let dificultad = document.getElementById("dificultad").value;

  console.log(nombre, descripcion, ingredientes, tiempo_min, dificultad);

  const respuesta = await fetch("http://localhost:3000/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nombre,
      descripcion,
      ingredientes,
      tiempo_min,
      dificultad,
    }),
  });

  const data = await respuesta.json();

  if (!respuesta.ok) {
    console.error("Error del servidor:", data);
  } else {
    console.log("Receta creada:", data);
  }
});
