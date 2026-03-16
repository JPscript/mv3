const statusBox = document.querySelector('#status');
const detailBox = document.querySelector('#detailBox');
const pageTitle = document.querySelector('#pageTitle');

const {
  setStatus,
  normalizeRecipe,
  getFirstAvailable,
  parseIngredients,
  formatDate,
  getRecipeById,
  isCorsError
} = window.CRUD;

async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    setStatus(statusBox, 'Missing id parameter in URL.', 'error');
    detailBox.innerHTML = '';
    if (pageTitle) pageTitle.textContent = 'Recipe Detail';
    document.title = 'Recipe Detail';
    return;
  }

  try {
    setStatus(statusBox, 'Loading detail...', 'info');
    const recipe = await getRecipeById(id);
    const item = normalizeRecipe(recipe);
    const ingredients = parseIngredients(
      getFirstAvailable(recipe, ['ingredientes', 'ingredients'])
    );
    const timeMinutes = getFirstAvailable(recipe, ['tiempo_min', 'timeMinutes', 'duration']);
    const difficulty = getFirstAvailable(recipe, ['dificultad', 'difficulty']);
    const createdAt = getFirstAvailable(recipe, ['created_at', 'createdAt']);
    const updatedAt = getFirstAvailable(recipe, ['updated_at', 'updatedAt']);

    if (pageTitle) pageTitle.textContent = `Recipe: ${item.title}`;
    document.title = `${item.title}`;

    detailBox.innerHTML = `
      <article class="card">
        <div class="card-image-wrap">
          ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="card-image" />` : '<div class="card-image placeholder">No image</div>'}
        </div>
        <div class="card-body">
          <h2>${item.title}</h2>
          <p><strong>Name:</strong> ${item.title}</p>
          <p><strong>Description:</strong> ${item.description}</p>
          <p><strong>Time:</strong> ${timeMinutes ? `${timeMinutes} min` : 'Not available'}</p>
          <p><strong>Difficulty:</strong> ${difficulty ?? 'Not available'}</p>
          <p><strong>Created:</strong> ${formatDate(createdAt)}</p>
          <p><strong>Last update:</strong> ${formatDate(updatedAt)}</p>

          <h3>Ingredients</h3>
          ${
            ingredients.length
              ? `<ul>${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>`
              : '<p>Not available.</p>'
          }
        </div>
      </article>
    `;

    setStatus(statusBox, 'Detail loaded successfully.', 'success');
  } catch (error) {
    detailBox.innerHTML = '';
    if (pageTitle) pageTitle.textContent = 'Recipe Detail';
    document.title = 'Recipe Detail';
    if (isCorsError(error)) {
      setStatus(statusBox, 'Could not connect. If opened with Alt+B, check backend CORS for Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Detail load error: ${error.message}`, 'error');
  }
}

loadDetail();
