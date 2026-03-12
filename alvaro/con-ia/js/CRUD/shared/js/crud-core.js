(function () {
  const API_URL = 'http://localhost:3000/recipes';

  function setStatus(element, message, type = 'info') {
    if (!element) return;
    element.textContent = message;
    element.className = `status status-${type}`;
  }

  function clearStatus(element) {
    if (!element) return;
    element.textContent = '';
    element.className = 'status';
  }

  function isCorsError(error) {
    return String(error?.message || '').toLowerCase().includes('failed to fetch');
  }

  function normalizeRecipe(recipe) {
    return {
      id: recipe?.id ?? recipe?._id ?? recipe?.recipeId ?? recipe?.recipe_id ?? null,
      title: recipe?.title ?? recipe?.name ?? recipe?.nombre ?? 'Sin título',
      description: recipe?.description ?? recipe?.instructions ?? recipe?.descripcion ?? 'Sin descripción',
      imageUrl: recipe?.imageUrl ?? recipe?.image ?? recipe?.photo ?? recipe?.image_url ?? ''
    };
  }

  function recipeCardTemplate(recipe) {
    const item = normalizeRecipe(recipe);
    return `
      <article class="card" data-id="${item.id}">
        <div class="card-image-wrap">
          ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="card-image" />` : '<div class="card-image placeholder">Sin imagen</div>'}
        </div>
        <div class="card-body">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </article>
    `;
  }

  function getFirstAvailable(obj, keys) {
    for (const key of keys) {
      if (obj?.[key] !== undefined && obj?.[key] !== null && String(obj[key]).trim() !== '') {
        return obj[key];
      }
    }
    return null;
  }

  function parseIngredients(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
    return String(value).split(',').map((item) => item.trim()).filter(Boolean);
  }

  function formatDate(value) {
    if (!value) return 'No disponible';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleString('es-ES');
  }

  async function parseResponse(response) {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Error HTTP ${response.status}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) return response.json();
    return null;
  }

  function extractRecipes(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.recipes)) return data.recipes;
    return [];
  }

  async function getRecipes() {
    const response = await fetch(API_URL, { method: 'GET' });
    const data = await parseResponse(response);
    return extractRecipes(data);
  }

  async function getRecipeById(id) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, { method: 'GET' });
    return parseResponse(response);
  }

  async function createRecipe(payload) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return parseResponse(response);
  }

  async function patchRecipe(id, payload) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return parseResponse(response);
  }

  async function deleteRecipe(id) {
    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
    return parseResponse(response);
  }

  async function uploadRecipeImage(id, file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/${encodeURIComponent(id)}/image`, {
      method: 'POST',
      body: formData
    });
    return parseResponse(response);
  }

  window.CRUD = {
    API_URL,
    setStatus,
    clearStatus,
    isCorsError,
    normalizeRecipe,
    recipeCardTemplate,
    getFirstAvailable,
    parseIngredients,
    formatDate,
    getRecipes,
    getRecipeById,
    createRecipe,
    patchRecipe,
    deleteRecipe,
    uploadRecipeImage
  };
})();
