/* ============================================
   SCRIPT CYBERPUNK MATRIX
   Interactividad profesional
   ============================================ */

// Efecto Matrix al cargar la página
window.addEventListener('load', () => {
  console.log('> SISTEMA INICIADO');
  console.log('> BIENVENIDO AL PERFIL DE PEDRO LÓPEZ');
  
  // Agregar clase de carga
  document.body.classList.add('loaded');
});

// Smooth scroll para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Efecto glitch en hover para títulos
document.querySelectorAll('h1, h2').forEach(heading => {
  heading.addEventListener('mouseenter', () => {
    heading.style.animation = 'glitch 0.5s';
  });
  heading.addEventListener('animation', () => {
    heading.style.animation = 'none';
  });
});

// Efecto de párrafos que se escriben (typing effect opcional)
const typingElements = document.querySelectorAll('section > p:first-of-type');
typingElements.forEach(element => {
  const text = element.textContent;
  element.textContent = '';
  
  let index = 0;
  const type = () => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 30);
    }
  };
  
  // Iniciar solo cuando el elemento sea visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && element.textContent === '') {
      type();
      observer.unobserve(element);
    }
  });
  
  observer.observe(element);
});

// Animación de números contadores
const animateCounters = () => {
  const listItems = document.querySelectorAll('section ol li');
  listItems.forEach((item, index) => {
    item.style.animation = `fadeIn 0.6s ease ${index * 0.1}s forwards`;
  });
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.tagName === 'OL') {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('section ol').forEach(ol => {
  observer.observe(ol);
});

// Efecto de brillo en imágenes al pasar el mouse
document.querySelectorAll('section img').forEach(img => {
  img.addEventListener('mousemove', (e) => {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    img.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 255, 0.3), transparent)`;
  });
  
  img.addEventListener('mouseleave', () => {
    img.style.background = 'none';
  });
});

// Event listeners para botones
document.querySelectorAll('button, input[type="submit"]').forEach(button => {
  button.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Animación de scroll para elementos
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('in-view');
    }
  });
});

// Efecto de párpadeo en textos especiales
const flicker = (element) => {
  element.style.animation = 'flicker 0.15s infinite';
};

const stopFlicker = (element) => {
  element.style.animation = 'none';
};

// Tooltip informativo al cargar
console.log('%c> ACCESO CONCEDIDO', 'color: #00ff41; font-size: 16px; text-shadow: 0 0 10px #00ff41;');
console.log('%c> Bienvenido al portafolio cyberpunk de Pedro López', 'color: #00ffff; font-size: 12px;');
