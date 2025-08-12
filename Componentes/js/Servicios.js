// Servicios.js

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas las funcionalidades
    initAnimaciones();
    initServiciosCards();
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
    
    // Buscar el enlace de "Servicios" y marcarlo como activo
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'Servicios') {
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
function initServiciosCards() {
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

        // Animación del overlay de WhatsApp
        const overlay = card.querySelector('.overlay-servicio');
        const whatsappContact = card.querySelector('.whatsapp-contact');

        if (overlay && whatsappContact) {
            card.addEventListener('mouseenter', function () {
                whatsappContact.style.transform = 'scale(0.8)';
                whatsappContact.style.opacity = '0';
                
                setTimeout(() => {
                    whatsappContact.style.transition = 'all 0.3s ease';
                    whatsappContact.style.transform = 'scale(1)';
                    whatsappContact.style.opacity = '1';
                }, 100);
            });
        }

        // Efecto de pulso en el botón de WhatsApp
        const btnWhatsapp = card.querySelector('.btn-whatsapp');
        if (btnWhatsapp) {
            btnWhatsapp.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });

            btnWhatsapp.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(-2px) scale(1)';
            });

            // Efecto de click
            btnWhatsapp.addEventListener('click', function (e) {
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
            });
        }
    });

    // Agregar estilos para el efecto ripple
    const style = document.createElement('style');
    style.textContent = `
        .btn-whatsapp {
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
        
        .servicio-card:hover .servicio-precio {
            transform: translateY(-5px);
            transition: transform 0.3s ease;
        }
        
        .servicio-features li {
            transition: all 0.3s ease;
        }
        
        .servicio-card:hover .servicio-features li {
            transform: translateX(5px);
        }
        
        .servicio-card:hover .servicio-features li:nth-child(1) { transition-delay: 0.1s; }
        .servicio-card:hover .servicio-features li:nth-child(2) { transition-delay: 0.2s; }
        .servicio-card:hover .servicio-features li:nth-child(3) { transition-delay: 0.3s; }
        .servicio-card:hover .servicio-features li:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elementos a observar
    const elementsToAnimate = document.querySelectorAll('.servicio-card');

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });
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
    initScrollAnimations();
});

// Efecto de typing removido - ahora el texto aparece directamente

// Función para mostrar notificación de WhatsApp
function showWhatsAppNotification(serviceName) {
    const notification = document.createElement('div');
    notification.className = 'whatsapp-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fab fa-whatsapp"></i>
            <span>Redirigiendo a WhatsApp para ${serviceName}...</span>
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
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Agregar event listeners a los botones de WhatsApp
document.addEventListener('DOMContentLoaded', function () {
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function () {
            const serviceName = this.closest('.servicio-card').querySelector('h3').textContent;
            showWhatsAppNotification(serviceName);
        });
    });
});

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