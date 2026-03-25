
let recetasData = [];

const cargarRecetas = async () => {
    try {
        const respuesta = await fetch('./data/recetas.json');
        recetasData = await respuesta.json();
        renderizarCards(recetasData);
    } catch (error) {
        console.error("Error cargando el JSON de recetas:", error);
    }
};

const renderizarCards = (datos) => {
    const contenedor = document.getElementById('lista-recetas');
    contenedor.innerHTML = ''; 

    datos.forEach(receta => {
        const article = document.createElement('article');
        article.className = 'card-receta';
        
        article.innerHTML = `
            <h3>${receta.nombre}</h3>
            <div class="info">
                <span>⏱️ ${receta.tiempo}</span>
                <span>📊 ${receta.dificultad}</span>
            </div>
            <p><strong>Ingredientes:</strong> ${receta.ingredientes.join(', ')}</p>
        `;
        contenedor.appendChild(article);
    });
};

document.getElementById('buscador').addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtradas = recetasData.filter(item => 
        item.nombre.toLowerCase().includes(termino)
    );
    renderizarCards(filtradas);
});

document.addEventListener('DOMContentLoaded', cargarRecetas);