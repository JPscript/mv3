async function obtenerDatos() {
  try {
    const respuesta = await fetch("https://starwars-databank-server.vercel.app/api/v1/creatures/");
    const datos = await respuesta.json();
    const tarjetas =datos.data;
    const flen = tarjetas.length;

    let text = "";

    for (let i = 0; i < flen; i++) {
      text += "<div class='card'> " + "<h1>" + tarjetas[i].name + "</h1>" +
       "<p>" + tarjetas[i].description + "</p>" +
      "<img src='" + tarjetas[i].image + "' alt='" + tarjetas[i].name + "'>" +
      "</div>";
    }

    document.getElementById("cards").innerHTML = text;
    console.log(datos);

  } catch (error) {
    console.log("error al consumir api", error);
  }
}

obtenerDatos();






