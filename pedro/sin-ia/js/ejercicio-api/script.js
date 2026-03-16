const API_URL = 'https://starwars-databank-server.vercel.app/api/v1/droids';

const statusEl = document.getElementById('status');
const cardsEl = document.getElementById('cards');

async function loadData() {
  statusEl.textContent = 'Cargando droides...';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const droids = data.data;

    cardsEl.innerHTML = '';

    for (let i = 0; i < droids.length; i++) {
      const droid = droids[i];
      cardsEl.innerHTML += `
  <div class="card">
    <h3>${droid.name}</h3>
    <img src="${droid.image}" alt="${droid.name}">
    <p>${droid.description}</p>
  </div>
  `;
    }

    statusEl.textContent = `Total de droides: ${droids.length}`;

  } catch (err) {
    statusEl.textContent = 'Error al cargar los droides';
    console.log(err);
  }
}

loadData();