const url = "https://ll.thespacedevs.com/2.3.0/launches/upcoming/";

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("Datos recibidos: ", data);
  })
  .catch(error => {
    console.error("Error al obtener los datos: ", error);
  });

const contenedor = document.getElementById("lanzamientos");

fetch(url)
  .then(res => res.json())
  .then(data => {
    const lista = data.results
      .map(item => `
      <div class = "card">
        <h3>${item.name}</h3>
        <img src="${item.image.image_url}" alt="${item.name}">
        </div>
        `)
      .join("");

    contenedor.innerHTML = lista;
  })
  .catch(error => {
    contenedor.innerHTML = "Error cargando datos";
    console.error(error);
  });


