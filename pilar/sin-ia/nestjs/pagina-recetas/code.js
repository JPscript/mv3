const API_URL = "http://localhost:3000/recipes";
async function loadData() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();

        let cardsContainer = document.getElementById("info");
        cardsContainer.classList.add("cards");

        let htmlContent = "";

        data.forEach((recipe) => {

            const maxDescriptionLength = 100;

            const shortDescription =
                recipe.descripcion.length > maxDescriptionLength
                ? recipe.descripcion.slice(0, maxDescriptionLength).trimEnd() + "..."
                : recipe.descripcion;

            htmlContent += `
                <div class="card">
                    <div class="content">
                        <h3>${recipe.nombre}</h3>
                        <p>${shortDescription}</p>
                        <p><strong>Ingredientes:</strong> ${recipe.ingredientes}</p>
                        <p><strong>Tiempo:</strong> ${recipe.tiempo_min} min</p>
                        <p><strong>Dificultad:</strong> ${recipe.dificultad}</p>
                    </div>
                </div>
            `;
        });

        cardsContainer.innerHTML = htmlContent;

    } catch (error) {
        console.log("Network error", error);
    }
}

loadData();
