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
        <label for="nombre">Nombre de la receta:</label><br />
        <input type="text" id="nombre" value="${data.nombre}" /><br />

        <label for="descripcion">Breve descripción:</label><br />
        <textarea id="descripcion">${data.descripcion}</textarea><br />

        <label for="ingredientes">Ingredientes:</label><br />
        <input type="text" id="ingredientes" value="${data.ingredientes}" /><br />

        <label for="tiempo_min">Tiempo de cocina en minutos:</label><br />
        <input type="number" id="tiempo_min" min="1" value="${data.tiempo_min}" /><br />

        <label for="dificultad">¿Dificultad?</label><br />
        <select id="dificultad">
          <option value="facil" ${data.dificultad === "facil" ? "selected" : ""}>Fácil</option>
          <option value="media" ${data.dificultad === "media" ? "selected" : ""}>Media</option>
          <option value="dificil" ${data.dificultad === "dificil" ? "selected" : ""}>Difícil</option>
        </select><br /><br />

        <input type="submit" value="Actualizar receta" />
      </form>
    `;

    document.getElementById("contenedor").innerHTML = salida;

    const form = document.getElementById("formulario");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      let nombre = document.getElementById("nombre").value;
      let descripcion = document.getElementById("descripcion").value;
      let ingredientes = document.getElementById("ingredientes").value;
      let tiempo_min = parseInt(
        document.getElementById("tiempo_min").value,
        10,
      );
      let dificultad = document.getElementById("dificultad").value;

      const respuestaPatch = await fetch(
        "http://localhost:3000/recipes/" + id,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            descripcion,
            ingredientes,
            tiempo_min,
            dificultad,
          }),
        },
      );

      const dataPatch = await respuestaPatch.json();

      if (!respuestaPatch.ok) {
        console.error("Error del servidor:", dataPatch);
      } else {
        console.log("Receta actualizada:", dataPatch);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

loadData();
