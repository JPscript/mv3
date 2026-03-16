const { createRecipe, uploadRecipeImage, clearStatus, setStatus, isCorsError, normalizeRecipe } = globalThis.CRUD;

const form = document.querySelector('#createForm');
const statusBox = document.querySelector('#status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearStatus(statusBox);

  const nombre = form.nombre.value.trim();
  const descripcion = form.descripcion.value.trim();
  const ingredientes = form.ingredientes.value.trim();
  const tiempoMinRaw = form.tiempo_min.value.trim();
  const dificultad = form.dificultad.value;
  const imageFile = form.image.files[0] || null;

  const tiempo_min = Number(tiempoMinRaw);

  if (!nombre || !descripcion || !ingredientes || !dificultad || !Number.isFinite(tiempo_min) || tiempo_min <= 0) {
    setStatus(statusBox, 'Please complete all required fields.', 'error');
    return;
  }

  try {
    setStatus(statusBox, 'Creating recipe...', 'info');
    const created = await createRecipe({
      nombre,
      descripcion,
      ingredientes,
      tiempo_min,
      dificultad
    });

    const createdId = normalizeRecipe(created).id;
    if (imageFile && createdId !== null) {
      setStatus(statusBox, 'Uploading image...', 'info');
      await uploadRecipeImage(createdId, imageFile);
    }

    form.reset();
    setStatus(statusBox, 'Recipe created successfully.', 'success');
  } catch (error) {
    if (isCorsError(error)) {
      setStatus(statusBox, 'Could not connect. If opened with Alt+B, check backend CORS for Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Create error: ${error.message}`, 'error');
  }
});
