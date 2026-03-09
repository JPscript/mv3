const API_URL = "https://potterapi-fedeperin.vercel.app/es/books";

async function loadData() {
    try {
        let response = await fetch(API_URL);
        let data = await response.json();

        let cardsContainer = document.getElementById("info");
        cardsContainer.classList.add("cards");
        let htmlContent = "";

        data.forEach((book) => {
            htmlContent += `
                <div class="card">
                    <img src="${book.cover}" alt="Portada de ${book.title}" />
                    <div class="content">
                      <h3>${book.title}</h3>
                      <p>Fecha salida: ${book.releaseDate}</p>
                      <p>Páginas: ${book.pages}</p>
                    </div>
                </div>
            `;
        });

        cardsContainer.innerHTML = htmlContent;
    } catch (error) {
        console.log("Network error");
    }
}

loadData();