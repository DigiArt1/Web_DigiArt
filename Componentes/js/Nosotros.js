// Nosotros.js

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas las funcionalidades
    initAnimaciones();
    initTarjetasFifa();
    initScrollAnimations();
    initContadores();
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
    
    // Buscar el enlace de "Nosotros" y marcarlo como activo
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'Nosotros') {
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
}

// Funcionalidad de las tarjetas FIFA
function initTarjetasFifa() {
    const tarjetas = document.querySelectorAll('.tarjeta-fifa');

    tarjetas.forEach((tarjeta, index) => {
        // Animación de entrada escalonada
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(50px)';

        setTimeout(() => {
            tarjeta.style.transition = 'all 0.6s ease';
            tarjeta.style.opacity = '1';
            tarjeta.style.transform = 'translateY(0)';
        }, 200 * (index + 1));

        // Efectos de hover mejorados
        tarjeta.addEventListener('mouseenter', function () {
            // Efecto de brillo
            this.style.boxShadow = '0 25px 60px rgba(237, 46, 139, 0.4), 0 0 30px rgba(237, 46, 139, 0.2)';

            // Animar las barras de estadísticas
            const statFills = this.querySelectorAll('.stat-fill');
            statFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.transition = 'width 0.8s ease';
                    fill.style.width = width;
                }, 100);
            });
        });

        tarjeta.addEventListener('mouseleave', function () {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });

        // Efecto de click
        tarjeta.addEventListener('click', function () {
            // Efecto de pulso
            this.style.transform = 'translateY(-10px) scale(1.02) rotateY(5deg)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 200);

            // Mostrar información adicional (opcional)
            mostrarInfoMiembro(this);
        });
    });
}

// Mostrar información adicional del miembro
function mostrarInfoMiembro(tarjeta) {
    const miembro = tarjeta.getAttribute('data-miembro');
    const infoMiembro = obtenerInfoMiembro(miembro);

    // Crear modal o tooltip con información adicional
    if (infoMiembro) {
        mostrarModal(infoMiembro);
    }
}

// Obtener información adicional del miembro
function obtenerInfoMiembro(miembro) {
    const info = {
        '1': {
            nombre: 'Andrés Hincapié Ruiz',
            cargo: 'Desarrollador Full Stack',
            experiencia: '5 años',
            especialidades: ['React', 'Node.js', 'Python', 'MongoDB'],
            proyectos: '50+',
            descripcion: 'Experto en desarrollo web full stack con amplia experiencia en tecnologías modernas. Especializado en crear aplicaciones escalables y eficientes.'
        },
        '2': {
            nombre: 'María González',
            cargo: 'Diseñadora UX/UI',
            experiencia: '4 años',
            especialidades: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
            proyectos: '40+',
            descripcion: 'Diseñadora creativa enfocada en crear experiencias de usuario excepcionales. Experta en investigación de usuarios y diseño centrado en el usuario.'
        },
        '3': {
            nombre: 'Carlos Rodríguez',
            cargo: 'Marketing Digital',
            experiencia: '3 años',
            especialidades: ['Google Ads', 'Facebook Ads', 'SEO', 'Analytics'],
            proyectos: '35+',
            descripcion: 'Especialista en marketing digital con enfoque en ROI y crecimiento orgánico. Experto en campañas publicitarias y análisis de datos.'
        },
        '4': {
            nombre: 'Jadinzon Diaz',
            cargo: 'Diseñador Grafico',
            experiencia: '8 años',
            especialidades: ['After Effects', 'Premiere Pro', 'Cinema 4D', 'Adobe'],
            proyectos: '45+',
            descripción: 'Productora audiovisual con experiencia en contenido digital y publicitario. Especializada en motion graphics y postproducción.'
        },
        '5': {
            nombre: 'Diego López',
            cargo: 'Project Manager',
            experiencia: '6 años',
            especialidades: ['Scrum', 'Agile', 'Jira', 'Trello'],
            proyectos: '60+',
            descripcion: 'Project Manager certificado con amplia experiencia en metodologías ágiles. Especializado en la gestión de equipos multidisciplinarios.'
        }
    };

    return info[miembro] || null;
}

// Mostrar modal con información del miembro
function mostrarModal(info) {
    // Crear modal dinámicamente
    const modal = document.createElement('div');
    modal.className = 'modal-miembro';
    modal.innerHTML = `
        <div class="modal-contenido">
            <span class="modal-cerrar">&times;</span>
            <h3>${info.nombre}</h3>
            <p class="modal-cargo">${info.cargo}</p>
            <div class="modal-info">
                <p><strong>Experiencia:</strong> ${info.experiencia}</p>
                <p><strong>Proyectos completados:</strong> ${info.proyectos}</p>
                <p><strong>Especialidades:</strong></p>
                <div class="especialidades">
                    ${info.especialidades.map(esp => `<span class="especialidad">${esp}</span>`).join('')}
                </div>
                <p class="descripcion">${info.descripcion}</p>
            </div>
        </div>
    `;

    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContenido = modal.querySelector('.modal-contenido');
    modalContenido.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;

    // Agregar al DOM
    document.body.appendChild(modal);

    // Animar entrada
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContenido.style.transform = 'scale(1)';
    }, 10);

    // Cerrar modal
    const cerrarModal = () => {
        modal.style.opacity = '0';
        modalContenido.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    };

    modal.querySelector('.modal-cerrar').addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    // Cerrar con ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            cerrarModal();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
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
    const elementsToAnimate = document.querySelectorAll(`
        .texto-empresa,
        .imagen-empresa,
        .mision,
        .vision,
        .valor,
        .estadistica
    `);

    elementsToAnimate.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    // CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .modal-miembro .modal-cargo {
            color: var(--color-primario);
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        .modal-miembro .modal-info p {
            margin-bottom: 15px;
            color: #666;
        }
        
        .modal-miembro .especialidades {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 10px 0 20px;
        }
        
        .modal-miembro .especialidad {
            background: var(--color-primario);
            color: white;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 500;
        }
        
        .modal-miembro .descripcion {
            font-style: italic;
            line-height: 1.6;
            color: #555;
        }
        
        .modal-cerrar {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            transition: color 0.3s ease;
        }
        
        .modal-cerrar:hover {
            color: var(--color-primario);
        }
    `;
    document.head.appendChild(style);
}

// Contador animado para estadísticas
function initContadores() {
    const contadores = document.querySelectorAll('.numero');

    const observerContadores = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador(entry.target);
                observerContadores.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(contador => {
        observerContadores.observe(contador);
    });
}

// Animar contador
function animarContador(elemento) {
    const texto = elemento.textContent;
    const numero = parseInt(texto.replace(/\D/g, ''));
    const sufijo = texto.replace(/\d/g, '');

    let actual = 0;
    const incremento = numero / 50;
    const duracion = 2000;
    const intervalo = duracion / 50;

    const timer = setInterval(() => {
        actual += incremento;
        if (actual >= numero) {
            actual = numero;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(actual) + sufijo;
    }, intervalo);
}

// Efecto parallax suave para las esferas
function initParallax() {
    const esferas = document.querySelectorAll('[class*="esfera-"]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
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