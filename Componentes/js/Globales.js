/*Funciones Globales*/

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');

    // Función para abrir/cerrar el menú
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        navOverlay.classList.toggle('active');
        
        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    // Función para cerrar el menú
    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', closeMenu));
});