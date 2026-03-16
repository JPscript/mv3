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
    setStatus(statusBox, 'Loading recipes...', 'info');
    const recipes = await getRecipes();
    const recipePairs = recipes
      .map((recipe) => ({ normalized: normalizeRecipe(recipe), original: recipe }))
      .filter((pair) => pair.normalized.id !== null);
    const normalizedRecipes = recipePairs.map((pair) => pair.normalized);

    recipeMap = new Map(recipePairs.map((pair) => [String(pair.normalized.id), pair.original]));

    recipeSelect.innerHTML = '<option value="">Select a recipe</option>';
    recipeSelect.insertAdjacentHTML('beforeend', normalizedRecipes.map(recipeOptionTemplate).join(''));

    if (!normalizedRecipes.length) {
      setStatus(statusBox, 'No recipes available to edit.', 'info');
      return;
    }

    setStatus(statusBox, `Available recipes: ${normalizedRecipes.length}`, 'success');
  } catch (error) {
    if (isCorsError(error)) {
      setStatus(statusBox, 'Could not connect. If opened with Alt+B, check backend CORS for Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Recipe load error: ${error.message}`, 'error');
  }
}

recipeSelect.addEventListener('change', (event) => {
  fillForm(event.target.value);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = recipeSelect.value;
  if (!id || !currentRecipe) {
    setStatus(statusBox, 'Select a recipe to edit.', 'error');
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
      setStatus(statusBox, 'tiempo_min must be a number greater than 0.', 'error');
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
    setStatus(statusBox, 'No changes to send (PATCH or image).', 'info');
    return;
  }

  try {
    if (hasPatchChanges) {
      setStatus(statusBox, 'Saving text changes (PATCH)...', 'info');
      await patchRecipe(id, payload);
    }

    if (hasImageChange) {
      setStatus(statusBox, 'Uploading image...', 'info');
      await uploadRecipeImage(id, imageFile);
    }

    setStatus(statusBox, 'Recipe updated successfully.', 'success');
    await loadRecipes();
    recipeSelect.value = id;
    fillForm(id);
  } catch (error) {
    if (isCorsError(error)) {
      setStatus(statusBox, 'Could not connect. If opened with Alt+B, check backend CORS for Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Update error: ${error.message}`, 'error');
  }
});

reloadBtn.addEventListener('click', loadRecipes);
loadRecipes();
