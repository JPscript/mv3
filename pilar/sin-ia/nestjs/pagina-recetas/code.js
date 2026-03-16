const API_URL = "http://localhost:3000/recipes";

// Carga los datos de la API y los muestra en la página
async function loadData() {
  const cardsContainer = document.getElementById("cards");
  if (!cardsContainer) return; 
  try {
    let response = await fetch(API_URL);
    let data = await response.json();

    cardsContainer.classList.add("cards");

    let htmlContent = "";

    data.forEach((recipe) => {

      const imageUrl = recipe.image_url || recipe.imagen || '';
      const imageHtml = imageUrl
        ? `<div class="card-image"><img src="${imageUrl}" alt="Imagen de ${recipe.nombre}" loading="lazy" /></div>`
        : `<div class="card-image placeholder">Sin imagen</div>`;

      htmlContent += `
                <div class="card">
                    ${imageHtml}
                    <div class="content">
                        <h3>${recipe.nombre}</h3>
                        <p>${recipe.descripcion}</p>
                        <p><strong>Ingredientes:</strong> ${recipe.ingredientes}</p>
                        <p><strong>Tiempo:</strong> ${recipe.tiempo_min} min</p>
                        <p><strong>Dificultad:</strong> ${recipe.dificultad}</p>
                    </div>
                </div>
            `;
    });

    cardsContainer.innerHTML = htmlContent;

  } catch (error) {
    console.log("Network error", error);
  }
}

// Inicializa comportamientos según la página actual
document.addEventListener('DOMContentLoaded', () => {
  loadData(); // Ejecuta este código cuando todo el HTML de la página esté cargado.

  const createForm = document.querySelector('form.create-form');
  if (createForm) createForm.addEventListener('submit', createRecipe);

  const updateForm = document.querySelector('form.update-form');
  if (updateForm) updateForm.addEventListener('submit', updateRecipe);

  const deleteForm = document.querySelector('form.delete-form');
  if (deleteForm) deleteForm.addEventListener('submit', deleteRecipeById);
});

// Crea nuevas recetas a través del formulario
async function createRecipe(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const payload = {
    nombre: (formData.get('nombre') ?? '').toString().trim(),
    descripcion: (formData.get('descripcion') ?? '').toString().trim(),
    ingredientes: (formData.get('ingredientes') ?? '').toString().trim(),
    tiempo_min: Number(formData.get('tiempo')) || 0,
    dificultad: (formData.get('dificultad') ?? 'facil').toString(),
  };

  const missingFields = [];
  if (!payload.nombre) missingFields.push('nombre');
  if (!payload.descripcion) missingFields.push('descripción');
  if (!payload.ingredientes) missingFields.push('ingredientes');
  if (!payload.tiempo_min) missingFields.push('tiempo');

  if (missingFields.length) {
    alert(`Por favor completa: ${missingFields.join(', ')}`);
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const createdRecipe = await response.json();

    // Si se seleccionó una imagen, la subimos al endpoint de imagen
    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length > 0) {
      const uploadForm = new FormData();
      uploadForm.append('image', fileInput.files[0]);

      const uploadResp = await fetch(`${API_URL}/${createdRecipe.id}/image`, {
        method: 'POST',
        body: uploadForm,
      });

      if (!uploadResp.ok) {
        console.warn('No se pudo subir la imagen:', uploadResp.status);
      }
    }

    alert('Receta creada con éxito.');
    form.reset();
    window.location.href = 'read.html';
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al crear la receta. Revisa la consola.');
  }
}

// Actualiza una receta existente
async function updateRecipe(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const id = Number(formData.get('id'));
  if (!id) {
    alert('Introduce un ID válido.');
    return;
  }

  const payload = {};
  const maybeSet = (key, value) => {
    if (value !== null && value !== undefined) {
      const trimmed = value.toString().trim();
      if (trimmed) payload[key] = trimmed;
    }
  };

  maybeSet('nombre', formData.get('nombre'));
  maybeSet('descripcion', formData.get('descripcion'));
  maybeSet('ingredientes', formData.get('ingredientes'));
  const tiempoValue = Number(formData.get('tiempo'));
  if (tiempoValue) payload.tiempo_min = tiempoValue;
  const dificultad = formData.get('dificultad');
  if (dificultad && dificultad !== '') payload.dificultad = dificultad.toString();

  if (Object.keys(payload).length === 0) {
    alert('Selecciona al menos un campo para actualizar.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    // Si se seleccionó una imagen, la subimos al endpoint de imagen
    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length > 0) {
      const uploadForm = new FormData();
      uploadForm.append('image', fileInput.files[0]);

      const uploadResp = await fetch(`${API_URL}/${id}/image`, {
        method: 'POST',
        body: uploadForm,
      });

      if (!uploadResp.ok) {
        console.warn('No se pudo subir la imagen:', uploadResp.status);
      }
    }

    alert('Receta actualizada con éxito.');
    form.reset();
    window.location.href = 'read.html';
  } catch (error) {
    console.error(error);
    alert('Ocurrió un error al actualizar la receta. Revisa la consola.');
  }
}

// Eliminar receta 
async function deleteRecipeById(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const id = Number(formData.get('id'));
  if (!id) {
    alert('Introduce un ID válido.');
    return;
  }

  const nombreInput = (formData.get('nombre') ?? '').toString().trim();
  const nombreLower = nombreInput.toLowerCase();

  try {
    // Si el usuario proporciona un nombre, comprobamos que concuerde con la receta existente.
    if (nombreInput) {
      const resp = await fetch(`${API_URL}/${id}`);
      if (!resp.ok) {
        if (resp.status === 404) {
          alert('No se encontró ninguna receta con ese ID.');
          return;
        }
        throw new Error(`Error ${resp.status}`);
      }

      const receta = await resp.json();
      if (receta.nombre.toLowerCase() !== nombreLower) {
        const confirmed = confirm(
          `El nombre ingresado no coincide con la receta actual ("${receta.nombre}"). ¿Deseas continuar igual?`
        );
        if (!confirmed) return;
      }
    }

    // Confirmación antes de borrar
    if (!confirm(`¿Estás seguro de que quieres eliminar la receta con ID ${id}?`)) return;

    const deleteResponse = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (deleteResponse.ok) {
      alert('Receta eliminada correctamente.');
      form.reset();
      window.location.href = 'read.html'; 
    } else {
      alert('Error al intentar eliminar la receta del servidor.');
    }

  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error en la conexión.');
  }
}
