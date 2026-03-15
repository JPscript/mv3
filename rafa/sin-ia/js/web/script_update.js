const API_URL = 'http://localhost:3000/recipes';

// READ ALL

function getReadCard(nombre, ingredientes) {
  return '<div class = readCard><h3>' + nombre + '</h3> <p>' + ingredientes + '</p></div> '
}

async function readAll() {
  try {
    const response = await fetch(API_URL, { method: "GET" });
    const data = await response.json();
    console.log("data: ", data);
    let info = data;
    let fLen = data.length;

    for (let i = 0; i < fLen; i++) {
      let myDiv = document.createElement("div");
      myDiv.setAttribute("id", info[i].id);
      document.getElementById("read").appendChild(myDiv);
      let content = "";
      content += getReadCard(info[i].nombre, info[i].ingredientes, info[i].id);
      document.getElementById(info[i].id).innerHTML = content;
      let myButton = document.createElement("button");
      myButton.setAttribute("id", info[i].id);
      myButton.setAttribute("class", "btn");
      myButton.innerHTML = "Edit";
      document.getElementById(info[i].id).appendChild(myButton);

      myButton.addEventListener("click", () => modal(myButton.id));
    }
  } catch (error) {
    console.log("Network error");
  }
}
readAll();

async function modal(id) {
  try {
    const response = await fetch(`${API_URL}/` + id, { method: "GET" });
    const data = await response.json();
    console.log("data: ", data);
    let info = data;
    document.getElementById("id").value = info.id;
    document.getElementById("nombre").value = info.nombre;
    document.getElementById("descripcion").value = info.descripcion;
    document.getElementById("ingredientes").value = info.ingredientes;
    document.getElementById("tiempo").value = info.tiempo_min;
    document.getElementById("dificultad").value = info.dificultad;

  } catch (error) {
    console.log("Error cargando los datos");
  }
  //get the modal
  var modal = document.getElementById("modal");
  //get the button that opens the modal
  var btns = document.querySelectorAll(".btn");

  //get the span element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  //when the user clicks on span (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }
  //when the user clicks the button, open the modal
  btns.forEach((btn) => {
    btn.onclick = function () {
      modal.style.display = "block";
    }
  })
  //when the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}



document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target)

  try {
    const response = await fetch(`${API_URL}/` + formData.get("id"), { method: "GET" });
    const data = await response.json();
    console.log("data: ", data);
    let infoModal = data;
    document.getElementById("id").value = infoModal.id;
    document.getElementById("nombre").value = infoModal.nombre;
    document.getElementById("descripcion").value = infoModal.descripcion;
    document.getElementById("ingredientes").value = infoModal.ingredientes;
    document.getElementById("tiempo").value = infoModal.tiempo_min;
    document.getElementById("dificultad").value = infoModal.dificultad;

    // Comparacion de datos
    let cambios = {};
    if (formData.get("nombre") !== infoModal.nombre) {
      cambios.nombre = formData.get("nombre");
    }
    if (formData.get("descripcion") !== infoModal.descripcion) {
      cambios.descripcion = formData.get("descripcion");
    }
    if (formData.get("ingredientes") !== infoModal.ingredientes) {
      cambios.ingredientes = formData.get("ingredientes");
    }
    if (Number(formData.get("tiempo")) !== infoModal.tiempo_min) {
      cambios.tiempo_min = Number(formData.get("tiempo"));
    }
    if (formData.get("dificultad") !== infoModal.dificultad) {
      cambios.dificultad = formData.get("dificultad");
    }
    console.log("Hemos llegado hasta cambios: ", cambios);

    //Patch en el caso de que haya cambios
    if (Object.keys(cambios).length > 0) {
      const r = await fetch(`${API_URL}/` + formData.get("id"), {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambios),
      });
      const datos_finales = await r.json();
      console.log("Datos actualizados:", datos_finales);
      document.getElementById("nombre").value = datos_finales.nombre;
      document.getElementById("descripcion").value = datos_finales.descripcion;
      document.getElementById("ingredientes").value = datos_finales.ingredientes;
      document.getElementById("tiempo").value = datos_finales.tiempo_min;
      document.getElementById("dificultad").value = datos_finales.dificultad;
    }

  } catch (error) {
    console.log("Error cargando los datos");
  }


})




