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
            const iconUrl = weapon.assets ? weapon.assets.image : 'https://via.placeholder.com/250x250?text=No+Image';
            return `
            <article class="card">
                <img src="${iconUrl}" alt="${weapon.name}" onerror="this.src='https://via.placeholder.com/250x250?text=No+Image'">
                <div class="card-content">
                    <h3>${weapon.name}</h3>
                    <div class="hidden">
                        <p>Attack: ${weapon.attack.display}</p>
                        <p>Element: ${weapon.elements ? weapon.elements.map(e => e.type).join(', ') : 'None'}</p>
                    </div>
                </div>
            </article>
            `;
        });

        const cardsHTML = cardsArray.join('');
        cardsContainer.innerHTML = cardsHTML;
        statusMessage.textContent = 'Data loaded successfully!';
    } catch (error) {
        statusMessage.textContent = 'Failed to load data. Please try again later.';
        console.error(error);
    }
}

loadData();