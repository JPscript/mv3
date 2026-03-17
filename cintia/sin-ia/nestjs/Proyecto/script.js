// JavaScript interactivo para el proyecto de recetas mediterráneas

document.addEventListener('DOMContentLoaded', function() {
    // Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150); // Retraso escalonado para efecto cascada
    });

    // Interactividad: click en tarjeta para resaltar
    cards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover clase 'active' de otras tarjetas
            cards.forEach(c => c.classList.remove('active'));
            // Agregar clase 'active' a la tarjeta clickeada
            this.classList.add('active');
        });
    });
});

// Agregar estilos dinámicos para la clase 'active'
const style = document.createElement('style');
style.textContent = `
    .card.active {
        border-color: #FFA500;
        box-shadow: 0 0 20px rgba(255, 165, 0, 0.5);
        transform: scale(1.05);
    }
`;
document.head.appendChild(style);
