const rickAndMortyApi = "https://rickandmortyapi.com/api/character";

async function loadData() {
  try {
    const response = await fetch(rickAndMortyApi);
    const data = await response.json();
    let tarjetas = data.results;
    let salida = ""; // ← QUITADO el <ul>
    let tamano = 6;

    for (let i = 0; i < tamano; i++) {
      let p = tarjetas[i];

      let color =
        p.status === "Alive"
          ? "#55cc44"
          : p.status === "Dead"
            ? "#d63d2e"
            : "#9e9e9e";

      salida += `
        <div class="card">
          <img src="${p.image}" alt="${p.name}" />
          <div class="card-info">
            <h3>${p.name}</h3>
            <p class="status">
              <span class="punto" style="background-color:${color}"></span>
              ${p.status} - ${p.species}
            </p>
            <p class="label">Last known location:</p>
            <p>${p.location.name}</p>
            <p class="label">First seen in:</p>
            <p>${p.episode[0]}</p>
          </div>
        </div>
      `;
    }

    document.getElementById("cards").innerHTML = salida; // ← QUITADO el </ul>
  } catch (error) {
    console.log("Network error");
  }
}

loadData();
