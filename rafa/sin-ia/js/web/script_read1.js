const API_URL = 'http://localhost:3000/recipes';

const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // "1" si la URL es ...?id=1

function getReadOneCard(nombre, ingredientes, tiempo_min, dificultad, descripcion, image_url){
  if (image_url == null){
    return  '<div class = readOneCard> <h3>' + nombre + '</h3> <p> Ingredientes: ' + ingredientes + '</p> \
      <p> Tiempo de preparación: ' + tiempo_min + '</p> <p> Dificultad: ' + dificultad + '</p> <blockquote> \
      Descripción: ' + descripcion + '</blockquote> </div> '
  } else {
    return  '<div class = readOneCard> <h3>' + nombre + '</h3> <p> Ingredientes: ' + ingredientes + '</p> \
      <p> Tiempo de preparación: ' + tiempo_min + '</p> <p> Dificultad: ' + dificultad + '</p> <blockquote> \
      Descripción: ' + descripcion + '</blockquote> <img src="' + image_url + '" alt= "' + nombre + '"> </div> '
  }
}

async function readOne() {
  try {
    const response = await fetch(`${API_URL}/`+id, { method: "GET" });
    const data = await response.json();
    console.log("data: ", data);
    let info = data;
    let content = getReadOneCard(info.nombre, info.ingredientes, info.tiempo_min, info.dificultad, info.descripcion, info.image_url);
    document.getElementById("read1").innerHTML = content;
  } catch (error) {
    console.log("Network error");
  }
}
readOne();