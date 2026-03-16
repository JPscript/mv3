async function loadData() {
  try {
    const respuesta = await fetch("http://localhost:3000/recipes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await respuesta.json();
    let tarjetas = data;
    let salida = ""; //
    let tamano = tarjetas.length;

    for (let i = 0; i < tamano; i++) {
      let recetaActual = tarjetas[i];

      salida += `
        <div class="receta">
        <a href="detalle.html?id=${recetaActual.id}">
            <h3 class="button">${recetaActual.nombre}</h3>
          </div>
      `;
    }

    document.getElementById("recetas").innerHTML = salida; // ← QUITADO el </ul>
  } catch (error) {
    console.log("Network error");
  }
}
loadData();
