import { API_BASE_URL, RECIPES_ENDPOINT } from './config.js';

function buildUrl(path = '') {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

async function request(path, options = {}) {
  const response = await fetch(buildUrl(path), {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  let payload = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    payload = await response.json();
  } else {
    const text = await response.text();
    payload = text ? { message: text } : null;
  }

  if (!response.ok) {
    const message = payload?.message || `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

export function getRecipeId(recipe) {
  return recipe?.id ?? recipe?._id ?? recipe?.recipeId ?? recipe?.recipe_id ?? null;
}

export function normalizeRecipe(recipe) {
  return {
    id: getRecipeId(recipe),
    title: recipe?.title ?? recipe?.name ?? recipe?.nombre ?? 'Sin título',
    description: recipe?.description ?? recipe?.instructions ?? recipe?.descripcion ?? 'Sin descripción',
    imageUrl: recipe?.imageUrl ?? recipe?.image ?? recipe?.photo ?? recipe?.image_url ?? '',
    original: recipe
  };
}

export async function getRecipes() {
  const data = await request(RECIPES_ENDPOINT, { method: 'GET' });
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.recipes)) return data.recipes;
  return [];
}

export async function getRecipeById(id) {
  return request(`${RECIPES_ENDPOINT}/${id}`, { method: 'GET' });
}

export async function createRecipe(payload) {
  return request(RECIPES_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export async function updateRecipe(id, payload) {
  return request(`${RECIPES_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
}

export async function removeRecipe(id) {
  return request(`${RECIPES_ENDPOINT}/${id}`, {
    method: 'DELETE'
  });
}
