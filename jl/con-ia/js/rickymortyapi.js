const rickAndMortyApi = "https://rickandmortyapi.com/api/character";

async function loadData() {
  try {
    const response = await fetch(rickAndMortyApi);
    const data = await response.json();
    console.log(data);
    let tarjetas = data.results;
    console.log(tarjetas);
    let salida = "<ul>";
    let tamano = tarjetas.length;
    for (let i = 0; i < tamano; i++) {
      //console.log(tarjetas[i].name);
      salida += "<li>" + tarjetas[i].name + "</li>";
    }
    salida += "</ul>";
    document.getElementById("demo").innerHTML = salida;
  } catch (error) {
    console.log("Network error");
  }
}
loadData();
