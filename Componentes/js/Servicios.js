// servicios.js

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas las funcionalidades
    initAnimaciones();
    initserviciosCards();
    setActiveNavLink();
});

// Función para marcar el enlace activo en el menú
function setActiveNavLink() {
    // Buscar todos los enlaces del menú
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remover la clase active de todos los enlaces
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Buscar el enlace de "servicios" y marcarlo como activo
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'servicios') {
            link.classList.add('active');
        }
    });
}

// Animaciones de entrada
function initAnimaciones() {
    // Animación del hero
    const heroContent = document.querySelector('.contenido-hero');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Animación de las tarjetas de servicios
    const servicioCards = document.querySelectorAll('.servicio-card');
    servicioCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';

        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

// Funcionalidad de las tarjetas de servicios
function initserviciosCards() {
    const servicioCards = document.querySelectorAll('.servicio-card');

    servicioCards.forEach(card => {
        // Efectos de hover mejorados
        card.addEventListener('mouseenter', function () {
            // Efecto de elevación
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.2)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });

        // Animación de las características
        const caracteristicas = card.querySelectorAll('.caracteristica');
        caracteristicas.forEach((caracteristica, index) => {
            caracteristica.addEventListener('mouseenter', function () {
                this.style.transform = 'translateX(10px)';
                this.style.background = '#e9ecef';
            });

            caracteristica.addEventListener('mouseleave', function () {
                this.style.transform = 'translateX(0)';
                this.style.background = '#f8f9fa';
            });
        });

        // Efectos en los botones
        const botones = card.querySelectorAll('.btn-servicio');
        botones.forEach(boton => {
            boton.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-3px)';
            });

            boton.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
            });

            // Efecto de click
            boton.addEventListener('click', function (e) {
                // Crear efecto de ondas
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                setTimeout(() => {
                    ripple.remove();
                }, 600);

                // Mostrar notificación
                const servicioNombre = this.closest('.servicio-card').querySelector('h3').textContent;
                const accion = this.textContent.includes('Demo') || this.textContent.includes('Probar') ? 'demo' : 'compra';
                mostrarNotificacion(servicioNombre, accion);
            });
        });

        // Efectos en las opciones de precio
        const precioOpciones = card.querySelectorAll('.precio-opcion');
        precioOpciones.forEach(opcion => {
            opcion.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.15)';
            });

            opcion.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    });

    // Agregar estilos para el efecto ripple
    const style = document.createElement('style');
    style.textContent = `
        .btn-servicio {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .servicio-card:hover .caracteristica {
            animation: slideInLeft 0.3s ease forwards;
        }
        
        .servicio-card:hover .caracteristica:nth-child(1) { animation-delay: 0.1s; }
        .servicio-card:hover .caracteristica:nth-child(2) { animation-delay: 0.2s; }
        .servicio-card:hover .caracteristica:nth-child(3) { animation-delay: 0.3s; }
        .servicio-card:hover .caracteristica:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes slideInLeft {
            from {
                transform: translateX(-10px);
                opacity: 0.7;
            }
            to {
                transform: translateX(5px);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Mostrar notificación
function mostrarNotificacion(servicioNombre, accion) {
    const mensaje = accion === 'demo' 
        ? `Redirigiendo a WhatsApp para solicitar demo de ${servicioNombre}...`
        : `Redirigiendo a WhatsApp para comprar ${servicioNombre}...`;

    const notification = document.createElement('div');
    notification.className = 'whatsapp-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fab fa-whatsapp"></i>
            <span>${mensaje}</span>
        </div>
    `;

    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;

    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Efecto parallax suave para las esferas
function initParallax() {
    const esferas = document.querySelectorAll('[class*="esfera-"]');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;

        esferas.forEach((esfera, index) => {
            const speed = (index + 1) * 0.2;
            esfera.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Smooth scroll para navegación
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Inicializar parallax y smooth scroll
document.addEventListener('DOMContentLoaded', function () {
    initParallax();
    initSmoothScroll();
});

// Efecto de typing removido - ahora el texto aparece directamente

// Optimización de rendimiento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce al scroll
window.addEventListener('scroll', debounce(() => {
    // Funciones de scroll optimizadas aquí
}, 16)); // ~60fps
