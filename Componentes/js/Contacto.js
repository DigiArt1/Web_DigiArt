// Contacto.js

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas las funcionalidades
    initAnimaciones();
    initFormulario();
    initRedesSociales();
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
    
    // Buscar el enlace de "Contacto" y marcarlo como activo
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'Contacto') {
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

    // Animación de las secciones de contacto
    const contactElements = document.querySelectorAll('.info-contacto, .formulario-contacto, .redes-sociales');
    contactElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';

        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });

    // Animación de los elementos de contacto
    const contactItems = document.querySelectorAll('.contacto-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';

        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
    });
}

// Funcionalidad del formulario
function initFormulario() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    const btnEnviar = form.querySelector('.btn-enviar');

    // Efectos de focus en los inputs
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Validación en tiempo real
        input.addEventListener('input', function () {
            validateField(this);
        });
    });

    // Envío del formulario
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Validar todos los campos
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            enviarFormulario(form, btnEnviar);
        } else {
            mostrarNotificacion('Por favor, completa todos los campos requeridos correctamente.', 'error');
        }
    });
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    // Remover clases de error previas
    field.classList.remove('error', 'success');
    
    if (isRequired && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Validaciones específicas
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    if (value) {
        field.classList.add('success');
    }
    
    return true;
}

// Enviar formulario
function enviarFormulario(form, btnEnviar) {
    // Cambiar estado del botón
    const originalText = btnEnviar.innerHTML;
    btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btnEnviar.disabled = true;

    // Simular envío (aquí integrarías con tu backend)
    setTimeout(() => {
        // Restaurar botón
        btnEnviar.innerHTML = originalText;
        btnEnviar.disabled = false;

        // Mostrar mensaje de éxito
        mostrarNotificacion('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        
        // Limpiar formulario
        form.reset();
        
        // Remover clases de validación
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
            input.parentElement.classList.remove('focused');
        });

        // Redirigir a WhatsApp con el mensaje
        const formData = new FormData(form);
        const mensaje = crearMensajeWhatsApp(formData);
        const whatsappUrl = `https://wa.me/573024834380?text=${encodeURIComponent(mensaje)}`;
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 2000);

    }, 2000);
}

// Crear mensaje para WhatsApp
function crearMensajeWhatsApp(formData) {
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    const servicio = formData.get('servicio');
    const mensaje = formData.get('mensaje');

    let whatsappMessage = `¡Hola! Me contacto desde el sitio web de Digi Art Creativo.\n\n`;
    whatsappMessage += `📝 *Información de contacto:*\n`;
    whatsappMessage += `• Nombre: ${nombre}\n`;
    whatsappMessage += `• Email: ${email}\n`;
    if (telefono) whatsappMessage += `• Teléfono: ${telefono}\n`;
    whatsappMessage += `• Servicio de interés: ${getServiceName(servicio)}\n\n`;
    whatsappMessage += `💬 *Mensaje:*\n${mensaje}\n\n`;
    whatsappMessage += `¡Espero su respuesta!`;

    return whatsappMessage;
}

// Obtener nombre del servicio
function getServiceName(serviceValue) {
    const services = {
        'contenido': 'Creación de Contenido',
        'video': 'Producción de Videos',
        'web': 'Desarrollo Web',
        'software': 'Software Empresarial',
        'app': 'Aplicaciones Móviles',
        'anuncios': 'Anuncios Digitales',
        'ia-whatsapp': 'Agente IA WhatsApp',
        'chatbot': 'Chatbot Flotante IA'
    };
    return services[serviceValue] || serviceValue;
}

// Mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    
    const icon = tipo === 'success' ? 'fas fa-check-circle' : 
                 tipo === 'error' ? 'fas fa-exclamation-circle' : 
                 'fas fa-info-circle';
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="${icon}"></i>
            <span>${mensaje}</span>
        </div>
    `;

    // Estilos de la notificación
    const bgColor = tipo === 'success' ? '#25D366' : 
                    tipo === 'error' ? '#e74c3c' : 
                    '#3498db';

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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

    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Funcionalidad de redes sociales
function initRedesSociales() {
    const redesSociales = document.querySelectorAll('.red-social');
    
    redesSociales.forEach(red => {
        red.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        red.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });

        red.addEventListener('click', function (e) {
            // Efecto de click
            this.style.transform = 'translateY(-5px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }, 150);
        });
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
});

// Efecto de typing removido - ahora el texto aparece directamente

// Funcionalidad del botón de WhatsApp
document.addEventListener('DOMContentLoaded', function () {
    const btnWhatsapp = document.querySelector('.btn-whatsapp');
    
    if (btnWhatsapp) {
        btnWhatsapp.addEventListener('click', function () {
            mostrarNotificacion('Redirigiendo a WhatsApp...', 'success');
        });
    }
});

// Agregar estilos CSS dinámicos
document.addEventListener('DOMContentLoaded', function () {
    const style = document.createElement('style');
    style.textContent = `
        .grupo-input.focused label {
            color: var(--color-primario);
        }
        
        .grupo-input input.error,
        .grupo-input select.error,
        .grupo-input textarea.error {
            border-color: #e74c3c;
            background: #fdf2f2;
        }
        
        .grupo-input input.success,
        .grupo-input select.success,
        .grupo-input textarea.success {
            border-color: #25D366;
            background: #f2fdf5;
        }
        
        .whatsapp-destacado:hover .icono-contacto-whatsapp {
            transform: scale(1.1);
            box-shadow: 0 12px 35px rgba(37, 211, 102, 0.4);
        }
        
        .contacto-item:hover .contacto-icono {
            transform: scale(1.1);
        }
        
        .btn-enviar:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            transform: none !important;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .btn-whatsapp:hover {
            animation: pulse 1s infinite;
        }
    `;
    document.head.appendChild(style);
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