const grid = document.querySelector('#recipesGrid');
const statusBox = document.querySelector('#status');
const reloadBtn = document.querySelector('#reloadBtn');

const {
  setStatus,
  clearStatus,
  getRecipes,
  normalizeRecipe,
  recipeCardTemplate,
  isCorsError
} = window.CRUD;

async function loadRecipes() {
  try {
    setStatus(statusBox, 'Cargando recetas...', 'info');
    const recipes = await getRecipes();

    if (!recipes.length) {
      grid.innerHTML = '<div class="empty">No hay recetas registradas.</div>';
      setStatus(statusBox, 'Sin resultados.', 'info');
      return;
    }

    grid.innerHTML = recipes.map(recipeCardTemplate).join('');

    grid.querySelectorAll('.card').forEach((card) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        window.location.href = `../Detail/detail.html?id=${encodeURIComponent(id)}`;
      });
    });

    const total = recipes.map(normalizeRecipe).filter((item) => item.id).length;
    setStatus(statusBox, `Recetas cargadas: ${total}`, 'success');
  } catch (error) {
    grid.innerHTML = '';
    if (isCorsError(error)) {
      setStatus(statusBox, 'No se pudo conectar. Si abriste con Alt+B, revisa CORS en backend para Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Error al cargar: ${error.message}`, 'error');
  }
}

reloadBtn.addEventListener('click', loadRecipes);
clearStatus(statusBox);
loadRecipes();
