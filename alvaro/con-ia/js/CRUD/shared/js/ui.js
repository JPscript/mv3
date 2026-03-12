import { normalizeRecipe } from './api.js';

export function setStatus(element, message, type = 'info') {
  element.textContent = message;
  element.className = `status status-${type}`;
}

export function clearStatus(element) {
  element.textContent = '';
  element.className = 'status';
}

export function recipeCardTemplate(recipe) {
  const normalized = normalizeRecipe(recipe);
  return `
    <article class="card" data-id="${normalized.id}">
      <div class="card-image-wrap">
        ${normalized.imageUrl ? `<img src="${normalized.imageUrl}" alt="${normalized.title}" class="card-image" />` : '<div class="card-image placeholder">Sin imagen</div>'}
      </div>
      <div class="card-body">
        <h3>${normalized.title}</h3>
        <p>${normalized.description}</p>
      </div>
    </article>
  `;
}

export function recipeOptionTemplate(recipe) {
  const normalized = normalizeRecipe(recipe);
  return `<option value="${normalized.id}">${normalized.title}</option>`;
}
