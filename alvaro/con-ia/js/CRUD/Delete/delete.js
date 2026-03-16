const { getRecipes, normalizeRecipe, deleteRecipe, setStatus, isCorsError } = globalThis.CRUD;

const grid = document.querySelector('#deleteGrid');
const statusBox = document.querySelector('#status');
const reloadBtn = document.querySelector('#reloadBtn');

function deleteCardTemplate(recipe) {
  const item = normalizeRecipe(recipe);
  return `
    <article class="card" data-id="${item.id}">
      <div class="card-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="actions">
          <button class="danger" data-action="delete" data-id="${item.id}">Delete</button>
        </div>
      </div>
    </article>
  `;
}

async function loadRecipes() {
  try {
    setStatus(statusBox, 'Loading recipes...', 'info');
    const recipes = await getRecipes();

    if (!recipes.length) {
      grid.innerHTML = '<div class="empty">No recipes available to delete.</div>';
      setStatus(statusBox, 'No items found.', 'info');
      return;
    }

    grid.innerHTML = recipes.map(deleteCardTemplate).join('');
    setStatus(statusBox, 'Select a recipe to delete.', 'success');
  } catch (error) {
    grid.innerHTML = '';
    if (isCorsError(error)) {
      setStatus(statusBox, 'Could not connect. If opened with Alt+B, check backend CORS for Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Load error: ${error.message}`, 'error');
  }
}

grid.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button) return;

  const id = button.dataset.id;
  const card = button.closest('.card');
  const recipeName = card?.querySelector('h3')?.textContent || 'this recipe';

  const confirmed = globalThis.confirm(`Are you sure you want to delete ${recipeName}?`);
  if (!confirmed) {
    setStatus(statusBox, 'Delete canceled by user.', 'info');
    return;
  }

  try {
    setStatus(statusBox, 'Deleting recipe...', 'info');
    await deleteRecipe(id);
    setStatus(statusBox, 'Recipe deleted successfully.', 'success');
    await loadRecipes();
  } catch (error) {
    setStatus(statusBox, `Delete error: ${error.message}`, 'error');
  }
});

reloadBtn.addEventListener('click', loadRecipes);
loadRecipes();
