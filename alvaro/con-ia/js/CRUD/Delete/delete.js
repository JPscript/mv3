const { getRecipes, normalizeRecipe, deleteRecipe, setStatus, isCorsError } = window.CRUD;

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
          <button class="danger" data-action="delete" data-id="${item.id}">Eliminar</button>
        </div>
      </div>
    </article>
  `;
}

async function loadRecipes() {
  try {
    setStatus(statusBox, 'Cargando recetas...', 'info');
    const recipes = await getRecipes();

    if (!recipes.length) {
      grid.innerHTML = '<div class="empty">No hay recetas para borrar.</div>';
      setStatus(statusBox, 'Sin elementos.', 'info');
      return;
    }

    grid.innerHTML = recipes.map(deleteCardTemplate).join('');
    setStatus(statusBox, 'Selecciona una receta para eliminar.', 'success');
  } catch (error) {
    grid.innerHTML = '';
    if (isCorsError(error)) {
      setStatus(statusBox, 'No se pudo conectar. Si abriste con Alt+B, revisa CORS en backend para Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Error al cargar: ${error.message}`, 'error');
  }
}

grid.addEventListener('click', async (event) => {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button) return;

  const id = button.dataset.id;
  const card = button.closest('.card');
  const recipeName = card?.querySelector('h3')?.textContent || 'esta receta';

  const confirmed = window.confirm(`¿Seguro que quieres borrar ${recipeName}?`);
  if (!confirmed) {
    setStatus(statusBox, 'Borrado cancelado por el usuario.', 'info');
    return;
  }

  try {
    setStatus(statusBox, 'Eliminando receta...', 'info');
    await deleteRecipe(id);
    setStatus(statusBox, 'Receta eliminada correctamente.', 'success');
    await loadRecipes();
  } catch (error) {
    setStatus(statusBox, `Error al eliminar: ${error.message}`, 'error');
  }
});

reloadBtn.addEventListener('click', loadRecipes);
loadRecipes();
