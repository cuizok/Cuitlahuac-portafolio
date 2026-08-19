// ================================
// PREFERENCIA DE MOVIMIENTO REDUCIDO
// ================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


// ================================
// TEXTO ROTATIVO (TYPEWRITER)
// ================================

const roleTextEl = document.getElementById('role-text');
const roles = [
    'Software Developer',
    'Backend Developer',
    'Frontend Developer',   
    'API Builder',
    '.NET & PHP Developer'
];

if (roleTextEl && !prefersReducedMotion) {
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = false;

    const TYPE_SPEED = 55;
    const DELETE_SPEED = 30;
    const PAUSE_AFTER_TYPE = 1800;
    const PAUSE_AFTER_DELETE = 400;

    function tickTypewriter() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            charIndex++;
            roleTextEl.textContent = currentRole.slice(0, charIndex);

            if (charIndex >= currentRole.length) {
                isDeleting = true;
                setTimeout(tickTypewriter, PAUSE_AFTER_TYPE);
                return;
            }
        } else {
            charIndex--;
            roleTextEl.textContent = currentRole.slice(0, charIndex);

            if (charIndex <= 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(tickTypewriter, PAUSE_AFTER_DELETE);
                return;
            }
        }

        setTimeout(tickTypewriter, isDeleting ? DELETE_SPEED : TYPE_SPEED);
    }

    // Empieza el ciclo después de la pausa inicial mostrando el texto completo
    setTimeout(tickTypewriter, PAUSE_AFTER_TYPE);
}


// ================================
// PARALLAX SUAVE EN LA FOTO
// ================================

const imageContainer = document.getElementById('image-container');

if (imageContainer && !prefersReducedMotion && window.matchMedia('(min-width: 851px)').matches) {
    const MAX_TILT = 10;

    document.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = (e.clientX - centerX) / window.innerWidth;
        const dy = (e.clientY - centerY) / window.innerHeight;

        const rotateY = dx * MAX_TILT;
        const rotateX = -dy * MAX_TILT;

        imageContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
}


// ================================
// MENÚ MÓVIL
// ================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
}

function toggleMenu() {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
}

if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);

    // Cerrar el menú al elegir un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}


// ================================
// ENLACE ACTIVO SEGÚN SECCIÓN VISIBLE
// ================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => sectionObserver.observe(section));


// ================================
// ANIMACIÓN AL HACER SCROLL
// ================================

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));