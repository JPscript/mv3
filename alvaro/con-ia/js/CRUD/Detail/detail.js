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
    setStatus(statusBox, 'Falta el parámetro id en la URL.', 'error');
    detailBox.innerHTML = '';
    if (pageTitle) pageTitle.textContent = 'Detalle de receta';
    document.title = 'Detalle de receta';
    return;
  }

  try {
    setStatus(statusBox, 'Cargando detalle...', 'info');
    const recipe = await getRecipeById(id);
    const item = normalizeRecipe(recipe);
    const ingredients = parseIngredients(
      getFirstAvailable(recipe, ['ingredientes', 'ingredients'])
    );
    const timeMinutes = getFirstAvailable(recipe, ['tiempo_min', 'timeMinutes', 'duration']);
    const difficulty = getFirstAvailable(recipe, ['dificultad', 'difficulty']);
    const createdAt = getFirstAvailable(recipe, ['created_at', 'createdAt']);
    const updatedAt = getFirstAvailable(recipe, ['updated_at', 'updatedAt']);

    if (pageTitle) pageTitle.textContent = `Receta: ${item.title}`;
    document.title = `${item.title}`;

    detailBox.innerHTML = `
      <article class="card">
        <div class="card-image-wrap">
          ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="card-image" />` : '<div class="card-image placeholder">Sin imagen</div>'}
        </div>
        <div class="card-body">
          <h2>${item.title}</h2>
          <p><strong>Nombre:</strong> ${item.title}</p>
          <p><strong>Descripción:</strong> ${item.description}</p>
          <p><strong>Tiempo:</strong> ${timeMinutes ? `${timeMinutes} min` : 'No disponible'}</p>
          <p><strong>Dificultad:</strong> ${difficulty ?? 'No disponible'}</p>
          <p><strong>Creada:</strong> ${formatDate(createdAt)}</p>
          <p><strong>Última actualización:</strong> ${formatDate(updatedAt)}</p>

          <h3>Ingredientes</h3>
          ${
            ingredients.length
              ? `<ul>${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join('')}</ul>`
              : '<p>No disponibles.</p>'
          }
        </div>
      </article>
    `;

    setStatus(statusBox, 'Detalle cargado correctamente.', 'success');
  } catch (error) {
    detailBox.innerHTML = '';
    if (pageTitle) pageTitle.textContent = 'Detalle de receta';
    document.title = 'Detalle de receta';
    if (isCorsError(error)) {
      setStatus(statusBox, 'No se pudo conectar. Si abriste con Alt+B, revisa CORS en backend para Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Error al cargar detalle: ${error.message}`, 'error');
  }
}

loadDetail();
