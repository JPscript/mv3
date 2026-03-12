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
        case 'add-picture':
            setRecipePicture();
            break;
        case 'update-recipe':
          updateRecipeForm();
    }
});

function populateRecipe(container, recipe, link) {
  let html = '<div class="recipe-card">';
  if (link) {
    html += '<a href="recipe.html?id=' + recipe.id + '">';
  }
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
  if (link) {
    html += '</a>'
  }
  html += '</div>';
  return container.innerHTML += html;
}


// GET (listar)
async function recipes() {
    try {
      const r = await fetch(`${APIUrl}recipes`, { method: "GET" });
    //   console.log(await r.json());
      const main_container = document.getElementsByClassName('recipes-container')[0];
    //   console.log(main_container);
      const recipes = await r.json();
      // populating, add an 'a' tag
      recipes.forEach(recipe => {
        let link = true;
        populateRecipe(main_container, recipe, link);
      });
    } catch (error) {
      console.error(error);
    }
}

// GET por id
async function recipe(id) {
    try {
        const r = await fetch(`${APIUrl}recipes/${id}`, { method: "GET" });
        const recipe = await r.json();
        const main_container = document.getElementsByClassName('recipe-container')[0];
        // populating, don't add an 'a' tag
        let link = false;
        populateRecipe(main_container, recipe, link)
        // add id to buttons links
        const delete_btn = document.getElementById('delete-recipe');
        delete_btn.href = `delete.html?id=${id}`;
        const add_picture_btn = document.getElementById('add-picture');
        add_picture_btn.href = `add-picture.html?id=${id}`;
        const update_picture_btn = document.getElementById('update-recipe');
        update_picture_btn.href = `update-recipe.html?id=${id}`;

        delete_btn.addEventListener('click', (e) => {
          e.preventDefault();
          deleteRecipe(id);
        })
    } catch (error) {
      console.error(error);
    }
}

// POST (crear)
function createRecipeForm() {
    document.getElementById('new-recipe-form').addEventListener('submit', (e) => {
        e.preventDefault(); // empêche le rechargement de la page

        const data = new FormData(e.target);
        saveRecipe(data);
    });
}

function setRecipePicture() {
    const recipeId = new URL(window.location.href).searchParams.get('id');
    if (!recipeId) {
        alert('No se proporcionó el id de la receta');
        return;
    }

    document.getElementById('add-picture-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const pic = new FormData(e.target).get('picture');
        if (!pic || !pic.size) {
            alert('Selecciona una imagen primero');
            return;
        }

        const formData = new FormData();
        formData.append('image', pic);

        try {
            const r = await fetch(`${APIUrl}recipes/${recipeId}/image`, {
                method: 'POST',
                body: formData,
            });
            const recipe = await r.json();
            alert('Imagen guardada: ' + recipe.image_url);
            window.location.href = `recipe.html?id=${recipeId}`;
        } catch (error) {
            console.error(error);
            alert('Error al subir la imagen');
        }
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
            // const imageData = new formData();
            // imageData.append('image', formData.get('image'));

            try {
              const recipe = await r.json();
              const t = await fetch(`${APIUrl}recipes/${recipe.id}/image`, {
                  method: 'POST',
                  body: formData,
              });
            } catch(error) {
              console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
}

async function updateRecipeForm() {
  // populate form
  const recipeId = new URL(window.location.href).searchParams.get('id');
  try {
        const r = await fetch(`${APIUrl}recipes/${recipeId}`, { method: "GET" });
        const recipe = await r.json();
        const nameInput = document.getElementsByName('nombre')[0];
        nameInput.value = recipe.nombre;
        const descriptionInput = document.getElementsByName('descripcion')[0];
        descriptionInput.value = recipe.descripcion;
        const ingredientesInput = document.getElementsByName('ingredientes')[0];
        ingredientesInput.value = recipe.ingredientes;
        const tiempoInput = document.getElementsByName('tiempo_min')[0];
        tiempoInput.value = recipe.tiempo_min;
        const dificultadInput = document.getElementsByName('dificultad')[0];
        dificultadInput.value = recipe.dificultad;

        document.getElementById('update-recipe-form').addEventListener('submit', (e) => {
          e.preventDefault(); // empêche le rechargement de la page

          const data = new FormData(e.target);
          patchRecipe(recipeId, data);
        });
  } catch (error) {
        console.error(error);
  }
}

// PUT (reemplazo completo)
async function putRecipe(recipeId, formData) {
    try {
      const r = await fetch(`${APIUrl}/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.get('nombre'),
          ingredientes: formData.get('ingredientes'),
          descripcion: formData.get('descripcion'),
          tiempo_min: parseInt(formData.get('tiempo_min')),
          dificultad: formData.get('dificultad'),
        }),
      });
      window.location.href = 'index.html';

    } catch (error) {
      console.error(error);
    }
}


// PATCH (actualizacion parcial)
async function patchRecipe(recipeId, formData) {
    try {
      const r = await fetch(`${APIUrl}recipes/${recipeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.get('nombre'),
          ingredientes: formData.get('ingredientes'),
          descripcion: formData.get('descripcion'),
          tiempo_min: parseInt(formData.get('tiempo_min')),
          dificultad: formData.get('dificultad'),
        }),
      });
      window.location.href = 'index.html';
    } catch (error) {
      console.error(error);
    }
}

// DELETE
async function deleteRecipe(id) {
    try {
      const r = await fetch(`${APIUrl}recipes/${id}`, { method: "DELETE" });
      console.log(await r.json());
      window.location.href = 'index.html';
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