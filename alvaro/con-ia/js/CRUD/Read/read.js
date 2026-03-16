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
    setStatus(statusBox, 'Loading recipes...', 'info');
    const recipes = await getRecipes();

    if (!recipes.length) {
      grid.innerHTML = '<div class="empty">No recipes found.</div>';
      setStatus(statusBox, 'No results.', 'info');
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
    setStatus(statusBox, `Loaded recipes: ${total}`, 'success');
  } catch (error) {
    grid.innerHTML = '';
    if (isCorsError(error)) {
      setStatus(statusBox, 'Could not connect. If opened with Alt+B, check backend CORS for Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Load error: ${error.message}`, 'error');
  }
}

reloadBtn.addEventListener('click', loadRecipes);
clearStatus(statusBox);
loadRecipes();
