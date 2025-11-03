// Servicios.js - Con carga desde JSON

let serviciosData = null;

document.addEventListener('DOMContentLoaded', function () {
    cargarServicios();
    setActiveNavLink();
});

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    navLinks.forEach(link => {
        if (link.textContent.trim() === 'Servicios') {
            link.classList.add('active');
        }
    });
}

async function cargarServicios() {
    try {
        const response = await fetch('../data/servicios.json');
        serviciosData = await response.json();
        
        renderizarMenuCategorias();
        renderizarProyectos();
        initAnimaciones();
        initMenuCategorias();
        initProyectoCards();
    } catch (error) {
        console.error('Error cargando servicios:', error);
    }
}

function renderizarMenuCategorias() {
    const menuContainer = document.querySelector('.menu-categorias');
    if (!menuContainer || !serviciosData) return;

    menuContainer.innerHTML = '';
    
    Object.keys(serviciosData.categorias).forEach((key, index) => {
        const categoria = serviciosData.categorias[key];
        const btn = document.createElement('button');
        btn.className = `categoria-btn ${index === 0 ? 'active' : ''}`;
        btn.setAttribute('data-categoria', key);
        btn.innerHTML = `
            <i class="fas ${categoria.icono}"></i>
            <span>${categoria.nombre}</span>
        `;
        menuContainer.appendChild(btn);
    });
}

function renderizarProyectos() {
    const proyectosContainer = document.querySelector('.proyectos-container');
    if (!proyectosContainer || !serviciosData) return;

    proyectosContainer.innerHTML = '';

    Object.keys(serviciosData.categorias).forEach((key, index) => {
        const categoria = serviciosData.categorias[key];
        const categoriaDiv = document.createElement('div');
        categoriaDiv.className = `categoria-proyectos ${index === 0 ? 'active' : ''}`;
        categoriaDiv.id = key;

        const gridDiv = document.createElement('div');
        gridDiv.className = 'proyectos-grid';

        categoria.proyectos.forEach(proyecto => {
            const card = crearTarjetaProyecto(proyecto);
            gridDiv.appendChild(card);
        });

        categoriaDiv.appendChild(gridDiv);
        proyectosContainer.appendChild(categoriaDiv);
    });
}

function crearTarjetaProyecto(proyecto) {
    const card = document.createElement('div');
    card.className = 'proyecto-card';
    
    card.innerHTML = `
        <div class="proyecto-imagen">
            <img src="${proyecto.imagen}" alt="${proyecto.titulo}" loading="lazy">
            <div class="proyecto-overlay">
                <button class="btn-demo" data-demo="${proyecto.demoUrl}">
                    <i class="fas fa-play"></i> Ver Proyecto
                </button>
            </div>
        </div>
        <div class="proyecto-info">
            <span class="proyecto-cliente">${proyecto.cliente}</span>
            <h3>${proyecto.titulo}</h3>
            <p>${proyecto.descripcion}</p>
            <div class="proyecto-tags">
                ${proyecto.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="proyecto-botones">
                <button class="btn-ver-demo" data-demo="${proyecto.demoUrl}">
                    <i class="fas fa-eye"></i> Ver Proyecto
                </button>
                <a href="https://wa.me/573024834380?text=Hola,%20me%20interesa%20un%20proyecto%20similar%20a:%20${encodeURIComponent(proyecto.titulo)}" 
                   target="_blank" class="btn-contactar">
                    <i class="fab fa-whatsapp"></i> Consultar
                </a>
            </div>
        </div>
    `;
    
    return card;
}

function initAnimaciones() {
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

    const menuBtns = document.querySelectorAll('.categoria-btn');
    menuBtns.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';

        setTimeout(() => {
            btn.style.transition = 'all 0.5s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
}

function initMenuCategorias() {
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    const categoriaProyectos = document.querySelectorAll('.categoria-proyectos');

    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const categoria = this.getAttribute('data-categoria');

            categoriaBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            categoriaProyectos.forEach(cat => {
                cat.classList.remove('active');
            });

            const categoriaActiva = document.getElementById(categoria);
            if (categoriaActiva) {
                categoriaActiva.classList.add('active');

                const proyectoCards = categoriaActiva.querySelectorAll('.proyecto-card');
                proyectoCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';

                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100 * (index + 1));
                });
            }
        });
    });
}

function initProyectoCards() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-demo') || e.target.closest('.btn-ver-demo')) {
            const btn = e.target.closest('.btn-demo') || e.target.closest('.btn-ver-demo');
            const demoUrl = btn.getAttribute('data-demo');
            const proyectoNombre = btn.closest('.proyecto-card').querySelector('h3').textContent;
            
            if (demoUrl && demoUrl !== '#') {
                mostrarNotificacion(`Abriendo proyecto: ${proyectoNombre}...`);
                setTimeout(() => {
                    window.open(demoUrl, '_blank');
                }, 1000);
            } else {
                mostrarNotificacion(`Proyecto: ${proyectoNombre} - Contáctanos para más información`);
            }
        }
    });

    const proyectoCards = document.querySelectorAll('.proyecto-card');
    proyectoCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

function mostrarNotificacion(mensaje) {
    const notification = document.createElement('div');
    notification.className = 'notification-whatsapp';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${mensaje}</span>
        </div>
    `;

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

    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);

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

document.addEventListener('DOMContentLoaded', function () {
    initParallax();
    initSmoothScroll();
});

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

window.addEventListener('scroll', debounce(() => {
    // Funciones de scroll optimizadas
}, 16));
