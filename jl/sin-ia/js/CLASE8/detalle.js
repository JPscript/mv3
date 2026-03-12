async function loadData() {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    salida = "";

    const id = urlParams.get("id");
    console.log(id);
    const respuesta = await fetch("http://localhost:3000/recipes/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await respuesta.json();
    console.log(data);

    salida += `
        <div class="receta">
          <a href="update.html?id=${data.id}">
            <h3>${data.nombre}</h3>
            <h4>${data.descripcion}</h4>
            <h4>${data.ingredientes}</h4>
            <h4>${data.tiempo_min}</h4>
            <h4>${data.dificultad}</h4>
            <input type="button" value="EDITAR" />
          </a>
          </div>
      `;

    document.getElementById("recetas").innerHTML = salida; // ← QUITADO el </ul>
  } catch (error) {
    console.log(error);
  }
}

loadData();
