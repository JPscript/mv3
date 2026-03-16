async function loadData() {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const respuesta = await fetch("http://localhost:3000/recipes/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await respuesta.json();

    let salida = `
      <form id="formulario">
      <a href="detalle.html?id=${data.id}">

      <label for="nombre">Nombre de la receta:</label><br />
            <h3 class="button">${data.nombre}</h3>
        <input type="submit" value="Eliminar receta" />
      </form>
    `;

    document.getElementById("contenedor").innerHTML = salida;

    const form = document.getElementById("formulario");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const respuestaPatch = await fetch(
        "http://localhost:3000/recipes/" + id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      const dataPatch = await respuestaPatch.json();

      if (!respuestaPatch.ok) {
        console.error("Error del servidor:", dataPatch);
        alert("No se pudo eliminar la receta");
      } else {
        console.log("Receta eliminada", dataPatch);
        alert("Receta eliminada");
      }
    });
  } catch (error) {
    console.log(error);
  }
}

loadData();
