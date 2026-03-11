const baseUrl = "http://localhost:3000/recipes";

document.getElementById("loadRecipes").onclick = getRecipes;

async function getRecipes() {
    try {
        const response = await fetch(baseUrl, { method: "GET"})
        const result = await response.json();

        const recipes = result.map((recipe) => {
            return `
            <article class="recipe" data-id="${recipe.id}">
                <img src="${recipe.image_url}" alt="${recipe.nombre}">
                <h3>${recipe.nombre}</h3>
                <p> Description: ${recipe.descripcion}</p>
                <p> Ingedients: ${recipe.ingredientes}</p>
                <p> Time: ${recipe.tiempo_min}</p>
                <p> Difficulty: ${recipe.dificultad}</p>
            </article>    
            `;
        });
        const allRecipes = recipes.join('');
        document.getElementById('recipesContainer').innerHTML = allRecipes;
    } catch (error) {
        console.log(error);
    }
}

document.getElementById("recipesContainer").onclick = (e) => e.target.closest(".recipe") && (window.location.href = `detail.html?id=${e.target.closest(".recipe").dataset.id}`);

document.getElementById("oneRecipeContainer") && readOne();

async function readOne(){
    try {
        const id = new URLSearchParams(window.location.search).get("id");
        
        const response = await fetch(`${baseUrl}/${id}`, { method: "GET" });
        const result = await response.json();

        const recipe = Array.isArray(result) ? result[0] : result;

        const oneRecipe = `
            <article class="recipe">
                <img src="${recipe.image_url}" alt="${recipe.nombre}">
                <h3>${recipe.nombre}</h3>
                <p> Description: ${recipe.descripcion}</p>
                <p> Ingedients: ${recipe.ingredientes}</p>
                <p> Time: ${recipe.tiempo_min}</p>
                <p> Difficulty: ${recipe.dificultad}</p>
            </article>    
            `;
        document.getElementById('oneRecipeContainer').innerHTML = oneRecipe;
    } catch (error) {
        console.log(error);
    }
}