const { createRecipe, uploadRecipeImage, clearStatus, setStatus, isCorsError, normalizeRecipe } = window.CRUD;

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
    setStatus(statusBox, 'Completa todos los campos obligatorios.', 'error');
    return;
  }

  try {
    setStatus(statusBox, 'Creando receta...', 'info');
    const created = await createRecipe({
      nombre,
      descripcion,
      ingredientes,
      tiempo_min,
      dificultad
    });

    const createdId = normalizeRecipe(created).id;
    if (imageFile && createdId !== null) {
      setStatus(statusBox, 'Subiendo imagen...', 'info');
      await uploadRecipeImage(createdId, imageFile);
    }

    form.reset();
    setStatus(statusBox, 'Receta creada correctamente.', 'success');
  } catch (error) {
    if (isCorsError(error)) {
      setStatus(statusBox, 'No se pudo conectar. Si abriste con Alt+B, revisa CORS en backend para Origin null.', 'error');
      return;
    }
    setStatus(statusBox, `Error al crear: ${error.message}`, 'error');
  }
});
