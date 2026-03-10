// Ejemplos minimos de fetch por metodo HTTP.
// Cambia la URL y el body segun tu API.

const APIUrl = "http://127.0.0.1:3000/";
const HTMLUrl = "http://127.0.0.1:5500/guillaume/sin-ia/nestjs/api-recetas/front/";

// determine the location:
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || (location.pathname.split('/').pop().replace('.html','') || 'index');
    const params = new URL(window.location.href).searchParams;
    console.log(params.get('id'));
    switch (page) {
        case 'recipes':
            recipes();
            break;
        case 'recipe':
            recipe(params.get('id'));
            break;
        case 'new-recipe':
            createRecipeForm();
            break;
    }
});


// GET (listar)
async function recipes() {
    try {
      const r = await fetch(`${APIUrl}recipes`, { method: "GET" });
    //   console.log(await r.json());
      const main_container = document.getElementsByClassName('recipes-container')[0];
    //   console.log(main_container);
      const recipes = await r.json();
      recipes.forEach(recipe => {
        let html = '<div class="recipe-card">';
        html += '<a href="recipe.html?id=' + recipe.id + '">';
        html += '<div class="recipe-header">';
        html += '<h2>' + recipe.nombre + '</h2>';
        if (recipe.image_url != null) {
            html += '<img src="' + recipe.image_url + '" alt="Recipe picture">';
        }
        html += '</div>';
        html += '<div class="recipe-content">';
        html += '<h3>Descripción</h3>';
        html += '<p>' + recipe.descripcion + '</p>';
        html += '<h3>Ingredientes</h3>';
        html += '<p>' + recipe.ingredientes + '</h3>';
        html += '<h3>Tiempo min</h3>';
        html += '<p>' + recipe.tiempo_min + '</h3>';
        html += '<h3>Dificultad</h3>';
        html += '<p>' + recipe.dificultad + '</h3>';
        html += '<h3>Ingredientes</h3>';
        html += '<p>' + recipe.ingredientes + '</h3>';
        html += '</div>';
        html += '</a>';
        html += '</div>';
        main_container.innerHTML += html;
        console.log(recipe);
      });
    } catch (error) {
      console.error(error);
    }
}

// GET por id
async function recipe(id) {
    document.getElementById('delete').addEventListener('click', (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        alert('hello')
    });

    try {
        const r = await fetch(`${APIUrl}recipes/${id}`, { method: "GET" });
        const recipe = await r.json();
        const main_container = document.getElementsByClassName('recipe-container')[0];
        let html = '<div class="recipe-card">';
        html += '<div class="recipe-header">';
        html += '<h2>' + recipe.nombre + '</h2>';
        if (recipe.image_url != null) {
        html += '<img src="' + recipe.image_url + '" alt="Recipe picture">';
        }
        html += '</div>';
        html += '<div class="recipe-content">';
        html += '<h3>Descripción</h3>';
        html += '<p>' + recipe.descripcion + '</p>';
        html += '<h3>Ingredientes</h3>';
        html += '<p>' + recipe.ingredientes + '</h3>';
        html += '<h3>Tiempo min</h3>';
        html += '<p>' + recipe.tiempo_min + '</h3>';
        html += '<h3>Dificultad</h3>';
        html += '<p>' + recipe.dificultad + '</h3>';
        html += '<h3>Ingredientes</h3>';
        html += '<p>' + recipe.ingredientes + '</h3>';
        html += '</div>';
        html += '</div>';
        main_container.innerHTML += html;
        console.log(recipe);
    //   console.log(await r.json());
    } catch (error) {
      console.error(error);
    }
}

// POST (crear)
function createRecipeForm() {
    document.getElementById('new-recipe-form').addEventListener('submit', (e) => {
        e.preventDefault(); // empêche le rechargement de la page

        const data = new FormData(e.target);
        console.log(data);
        saveRecipe(data);
    });
}

async function saveRecipe(formData) {
        try {
            const r = await fetch(`${APIUrl}recipes`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre: formData.get('nombre'),
                    ingredientes: formData.get('ingredientes'),
                    descripcion: formData.get('descripcion'),
                    tiempo_min: parseInt(formData.get('tiempo_min')),
                    dificultad: formData.get('dificultad'),
                }),
            });
        } catch (error) {
            console.error(error);
        }
}

// PUT (reemplazo completo)
async function putRecipe(params) {
    try {
      const r = await fetch(`${baseUrl}/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Item reemplazado",
          description: "PUT completo",
          active: false,
        }),
      });
      console.log(await r.json());
    } catch (error) {
      console.error(error);
    }
}


// PATCH (actualizacion parcial)
async function patchRecipe(params) {
    try {
      const r = await fetch(`${baseUrl}/1`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: "Cambio parcial con PATCH",
        }),
      });
      console.log(await r.json());
    } catch (error) {
      console.error(error);
    }
}

// DELETE
async function deleteRecipe(params) {
    try {
      const r = await fetch(`${baseUrl}/1`, { method: "DELETE" });
      console.log(await r.json());
    } catch (error) {
      console.error(error);
    }
}

// FORM-DATA (subida de archivo)
const fileInput = document.querySelector("#fileInput");
const formData = new FormData();
// formData.append("image", fileInput.files[0]);

async function addImage(params) {
    try {
      const r = await fetch(`${baseUrl}/1/upload`, {
        method: "POST",
        body: formData,
      });
      console.log(await r.json());
    } catch (error) {
      console.error(error);
    }
}