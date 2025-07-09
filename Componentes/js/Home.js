// Funcionalidad para la página de inicio

// Función para hacer scroll suave hacia abajo
function scrollHaciaAbajo() {
    // Calcular la altura de la ventana actual
    const alturaVentana = window.innerHeight;
    
    // Hacer scroll suave hacia abajo por la altura de la ventana
    window.scrollTo({
        top: alturaVentana,
        behavior: 'smooth'
    });
}

// Detectar el scroll para ocultar/mostrar el botón de scroll
window.addEventListener('scroll', function() {
    const botonScroll = document.querySelector('.boton-scroll');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Ocultar el botón cuando el usuario hace scroll hacia abajo
    if (scrollPosition > 100) {
        botonScroll.style.opacity = '0';
        botonScroll.style.transform = 'translateX(-50%) translateY(20px)';
    } else {
        botonScroll.style.opacity = '1';
        botonScroll.style.transform = 'translateX(-50%) translateY(0)';
    }
});

// Asegurar que el video se reproduzca correctamente
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-principal');
    
    if (video) {
        // Intentar reproducir el video
        video.play().catch(function(error) {
            console.log('La reproducción automática fue bloqueada:', error);
        });
        
        // Asegurar que el video se vea correctamente en diferentes dispositivos
        video.addEventListener('loadedmetadata', function() {
            video.currentTime = 0;
        });
    }
});

// Función para ajustar el tamaño del video según la pantalla
function ajustarVideo() {
    const video = document.querySelector('.video-principal');
    const contenedor = document.querySelector('.contenedor-video');
    
    if (video && contenedor) {
        const ratioContenedor = contenedor.offsetWidth / contenedor.offsetHeight;
        const ratioVideo = video.videoWidth / video.videoHeight;
        
        if (ratioVideo > ratioContenedor) {
            video.style.width = 'auto';
            video.style.height = '100%';
        } else {
            video.style.width = '100%';
            video.style.height = 'auto';
        }
    }
}

// Ejecutar ajuste cuando la ventana cambie de tamaño
window.addEventListener('resize', ajustarVideo);

// Ejecutar ajuste cuando el video se cargue
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-principal');
    if (video) {
        video.addEventListener('loadedmetadata', ajustarVideo);
    }
});
