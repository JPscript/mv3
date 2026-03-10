const API_URL = 'https://mhw-db.com/weapons';
const cardsContainer = document.getElementById('cards');
const statusMessage = document.getElementById('status');
let allWeapons = []; // Store all weapons to apply filters
let activeElementFilter = null;
let activeTypeFilter = null;

async function loadData() {
    try {
        statusMessage.textContent = 'Loading...';
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error");
        }
        const weapons = await response.json();
        allWeapons = weapons; // Save weapons for filtering

        displayWeapons(weapons);
        setupFilterButtons();
        statusMessage.textContent = 'Data loaded successfully!';
    } catch (error) {
        statusMessage.textContent = 'Failed to load data. Please try again later.';
        console.error(error);
    }
}

function displayWeapons(weapons) {
    const cardsArray = weapons.map((weapon) => {
        const iconUrl = weapon.assets ? weapon.assets.image : 'https://via.placeholder.com/250x250?text=No+Image';
        return `
        <article class="card">
            <img src="${iconUrl}" alt="${weapon.name}" onerror="this.src='https://via.placeholder.com/250x250?text=No+Image'">
            <div class="card-content">
                <h3>${weapon.name}</h3>
                <div class="hidden">
                    <p>Attack: ${weapon.attack.display}</p>
                    <p>Element: ${weapon.elements && weapon.elements.length > 0 ? weapon.elements.map(e => e.type).join(', ') : 'none'}</p>
                </div>
            </div>
        </article>
        `;
    });

    const cardsHTML = cardsArray.join('');
    cardsContainer.innerHTML = cardsHTML;
}

function matchesElementFilter(weapon, element) {
    if (!element || element === 'all') {
        return true;
    }

    if (element === 'none') {
        return !weapon.elements || weapon.elements.length === 0;
    }

    if (!weapon.elements || weapon.elements.length === 0) {
        return false;
    }

    return weapon.elements.some(e => e.type.toLowerCase() === element.toLowerCase());
}

function matchesTypeFilter(weapon, type) {
    if (!type || type === 'all') {
        return true;
    }

    return weapon.type && weapon.type.toLowerCase() === type.toLowerCase();
}

function formatFilterLabel(value) {
    if (!value) {
        return 'Any';
    }

    if (value === 'none') {
        return 'No Element';
    }

    return value
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function applyFilters() {
    const filteredWeapons = allWeapons.filter(weapon => {
        const matchesElement = matchesElementFilter(weapon, activeElementFilter);
        const matchesType = matchesTypeFilter(weapon, activeTypeFilter);
        return matchesElement && matchesType;
    });

    displayWeapons(filteredWeapons);

    if (!activeElementFilter && !activeTypeFilter) {
        statusMessage.textContent = `Showing all weapons (${allWeapons.length})`;
        return;
    }

    const elementText = formatFilterLabel(activeElementFilter);
    const typeText = formatFilterLabel(activeTypeFilter);
    statusMessage.textContent = `Showing ${filteredWeapons.length} weapon(s) | Element: ${elementText} | Type: ${typeText}`;
}

function setupFilterButtons() {
    const elementButtons = document.querySelectorAll('.filter-btn[data-element]');
    const typeButtons = document.querySelectorAll('.filter-btn[data-type]');

    elementButtons.forEach(button => {
        button.addEventListener('click', () => {
            const element = button.dataset.element;

            if (activeElementFilter === element) {
                activeElementFilter = null;
                button.classList.remove('active');
            } else {
                activeElementFilter = element;
                elementButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }

            applyFilters();
        });
    });

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;

            if (activeTypeFilter === type) {
                activeTypeFilter = null;
                button.classList.remove('active');
            } else {
                activeTypeFilter = type;
                typeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }

            applyFilters();
        });
    });
}

loadData();
