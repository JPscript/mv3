const API_URL = 'https://mhw-db.com/weapons';
const cardsContainer = document.getElementById('cards');
const statusMessage = document.getElementById('status');

async function loadData() {
    try {
        statusMessage.textContent = 'Loading...';
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error");
        }
        const weapons = await response.json();

        const cardsArray = weapons.map((weapon) => {
            return `
            <article class="card">
                <img src="${weapon.icon}" alt="${weapon.name}">
                    <h3>${weapon.name}</h3>
                    <p>Attack: ${weapon.attack.display}</p>
                    <p>Element: ${weapon.element}</p>
            </article>
            `;
        });

        const cardsHTML = cardsArray.join('');
        cardsContainer.innerHTML = cardsHTML;
        statusMessage.textContent = 'FINALLY JESUS FUCKING CHRIST!';
    } catch (error) {
        statusMessage.textContent = 'Failed to load data. Life has no meaning anymore...';
    } 
}

loadData();