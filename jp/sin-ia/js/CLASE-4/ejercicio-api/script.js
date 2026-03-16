const apiUrl = "https://api.disneyapi.dev/character";

async function loadData() {
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    let cardsContainer = document.getElementById("cards-container");
    let htmlContent = "";
    data.data.forEach((character) => {
      htmlContent += `
        <div class="card">
          <img src="${character.imageUrl}" alt="${character.name}" />
          <h3>${character.name}</h3>
          <p>Films: ${character.films.join(", ")}</p>
        </div>
      `;
    });
    cardsContainer.innerHTML = htmlContent;
  } catch (error) {
    console.log("Network error");
  }
}
