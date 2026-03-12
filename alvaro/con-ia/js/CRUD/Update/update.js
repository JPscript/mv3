const form = document.querySelector('#updateForm');
const recipeSelect = document.querySelector('#recipeSelect');
const statusBox = document.querySelector('#status');
const reloadBtn = document.querySelector('#reloadBtn');

let recipeMap = new Map();
let currentRecipe = null;

const { setStatus, normalizeRecipe, getRecipes, patchRecipe, uploadRecipeImage, isCorsError } = window.CRUD;

function recipeOptionTemplate(recipe) {
  const item = normalizeRecipe(recipe);
  return `<option value="${item.id}">${item.title}</option>`;
}

function fillForm(selectedId) {
  const recipe = recipeMap.get(selectedId);
  if (!recipe) return;

  currentRecipe = recipe;

  form.nombre.value = recipe?.nombre ?? recipe?.name ?? recipe?.title ?? '';
  form.descripcion.value = recipe?.descripcion ?? recipe?.description ?? '';
  form.ingredientes.value = recipe?.ingredientes ?? '';
  form.tiempo_min.value = recipe?.tiempo_min ?? '';
  form.dificultad.value = recipe?.dificultad ?? '';
  form.image.value = '';
}

async function loadRecipes() {
  try {
    setStatus(statusBox, 'Cargando recetas...', 'info');
    const recipes = await getRecipes();
    const recipePairs = recipes
      .map((recipe) => ({ normalized: normalizeRecipe(recipe), original: recipe }))
      .filter((pair) => pair.normalized.id !== null);
    const normalizedRecipes = recipePairs.map((pair) => pair.normalized);

    recipeMap = new Map(recipePairs.map((pair) => [String(pair.normalized.id), pair.original]));

    recipeSelect.innerHTML = '<option value="">Selecciona una receta</option>';
    recipeSelect.insertAdjacentHTML('beforeend', normalizedRecipes.map(recipeOptionTemplate).join(''));

    if (!normalizedRecipes.length) {
      setStatus(statusBox, 'No hay recetas disponibles para editar.', 'info');
      return;
    }

    setStatus(statusBox, `Recetas disponibles: ${normalizedRecipes.length}`, 'success');
  } catch (error) {
    if (isCorsError(error)) {
      setStatus(statusBox, 'No se pudo conectar. Si abriste con Alt+B, revisa CORS en backend para Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Error al cargar recetas: ${error.message}`, 'error');
  }
}

recipeSelect.addEventListener('change', (event) => {
  fillForm(event.target.value);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = recipeSelect.value;
  if (!id || !currentRecipe) {
    setStatus(statusBox, 'Selecciona una receta para editar.', 'error');
    return;
  }

  const payload = {};
  const nombre = form.nombre.value.trim();
  const descripcion = form.descripcion.value.trim();
  const ingredientes = form.ingredientes.value.trim();
  const tiempoMinRaw = form.tiempo_min.value.trim();
  const dificultad = form.dificultad.value;
  const imageFile = form.image.files[0] || null;

  if (nombre !== String(currentRecipe?.nombre ?? '')) payload.nombre = nombre;
  if (descripcion !== String(currentRecipe?.descripcion ?? '')) payload.descripcion = descripcion;
  if (ingredientes !== String(currentRecipe?.ingredientes ?? '')) payload.ingredientes = ingredientes;

  const currentTiempo = currentRecipe?.tiempo_min ?? '';
  if (tiempoMinRaw !== String(currentTiempo)) {
    const tiempoParsed = Number(tiempoMinRaw);
    if (!Number.isFinite(tiempoParsed) || tiempoParsed <= 0) {
      setStatus(statusBox, 'tiempo_min debe ser un número mayor que 0.', 'error');
      return;
    }
    payload.tiempo_min = tiempoParsed;
  }

  if (dificultad && dificultad !== String(currentRecipe?.dificultad ?? '')) {
    payload.dificultad = dificultad;
  }

  const hasPatchChanges = Object.keys(payload).length > 0;
  const hasImageChange = Boolean(imageFile);

  if (!hasPatchChanges && !hasImageChange) {
    setStatus(statusBox, 'No hay cambios para enviar (PATCH o imagen).', 'info');
    return;
  }

  try {
    if (hasPatchChanges) {
      setStatus(statusBox, 'Guardando cambios de texto (PATCH)...', 'info');
      await patchRecipe(id, payload);
    }

    if (hasImageChange) {
      setStatus(statusBox, 'Subiendo imagen...', 'info');
      await uploadRecipeImage(id, imageFile);
    }

    setStatus(statusBox, 'Receta actualizada correctamente.', 'success');
    await loadRecipes();
    recipeSelect.value = id;
    fillForm(id);
  } catch (error) {
    if (isCorsError(error)) {
      setStatus(statusBox, 'No se pudo conectar. Si abriste con Alt+B, revisa CORS en backend para Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Error al actualizar: ${error.message}`, 'error');
  }
});

reloadBtn.addEventListener('click', loadRecipes);
loadRecipes();
