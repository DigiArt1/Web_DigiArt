// Clientes.js - Carrusel de clientes

async function cargarClientes() {
    const carruselTrack = document.querySelector('.carrusel-track');
    if (!carruselTrack) {
        console.log('No se encontró .carrusel-track');
        return;
    }

    try {
        // Detectar la ruta correcta basándose en la ubicación actual
        const currentPath = window.location.pathname;
        let jsonPath = 'data/clientes.json';
        
        // Si estamos en una subcarpeta (Secciones/), usar ruta relativa
        if (currentPath.includes('/Secciones/')) {
            jsonPath = '../data/clientes.json';
        }
        
        console.log('📍 Ruta actual:', currentPath);
        console.log('📂 Intentando cargar JSON desde:', jsonPath);
        
        const response = await fetch(jsonPath);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ JSON cargado exitosamente:', data);
        
        if (data && data.clientes && data.clientes.length > 0) {
            renderizarCarruselClientes(data.clientes);
        } else {
            console.warn('⚠️ El JSON no contiene clientes');
            mostrarClientesEjemplo();
        }
    } catch (error) {
        console.error('❌ Error cargando clientes:', error);
        console.log('Mostrando clientes de ejemplo como fallback');
        mostrarClientesEjemplo();
    }
}

function renderizarCarruselClientes(clientes) {
    const carruselTrack = document.querySelector('.carrusel-track');
    if (!carruselTrack) return;

    console.log('🎨 Renderizando', clientes.length, 'clientes');

    // Duplicar los clientes para efecto infinito
    const clientesDuplicados = [...clientes, ...clientes];

    carruselTrack.innerHTML = '';

    clientesDuplicados.forEach((cliente, index) => {
        const logoDiv = document.createElement('div');
        logoDiv.className = 'cliente-logo';
        
        // Ajustar ruta de imagen según ubicación
        let logoPath = cliente.logo;
        const currentPath = window.location.pathname;
        
        // Si estamos en Secciones/ y la ruta no empieza con ../ ni http
        if (currentPath.includes('/Secciones/') && 
            !logoPath.startsWith('../') && 
            !logoPath.startsWith('http')) {
            logoPath = '../' + logoPath;
        }
        
        console.log(`Logo ${index + 1}: ${logoPath}`);
        
        logoDiv.innerHTML = `
            <img src="${logoPath}" 
                 alt="${cliente.nombre}" 
                 title="${cliente.nombre}"
                 onerror="console.error('Error cargando imagen:', this.src); this.src='https://via.placeholder.com/150x80?text=${encodeURIComponent(cliente.nombre)}'">
        `;
        carruselTrack.appendChild(logoDiv);
    });
    
    console.log('✅ Carrusel renderizado con', clientes.length, 'clientes (duplicados:', clientesDuplicados.length, ')');
}

function mostrarClientesEjemplo() {
    const carruselTrack = document.querySelector('.carrusel-track');
    if (!carruselTrack) return;

    console.log('📦 Mostrando clientes de ejemplo (placeholders)');

    // Clientes de ejemplo con logos placeholder
    const clientesEjemplo = [
        { nombre: 'Cliente 1', logo: 'https://via.placeholder.com/150x80?text=Cliente+1' },
        { nombre: 'Cliente 2', logo: 'https://via.placeholder.com/150x80?text=Cliente+2' },
        { nombre: 'Cliente 3', logo: 'https://via.placeholder.com/150x80?text=Cliente+3' },
        { nombre: 'Cliente 4', logo: 'https://via.placeholder.com/150x80?text=Cliente+4' },
        { nombre: 'Cliente 5', logo: 'https://via.placeholder.com/150x80?text=Cliente+5' },
        { nombre: 'Cliente 6', logo: 'https://via.placeholder.com/150x80?text=Cliente+6' },
        { nombre: 'Cliente 7', logo: 'https://via.placeholder.com/150x80?text=Cliente+7' },
        { nombre: 'Cliente 8', logo: 'https://via.placeholder.com/150x80?text=Cliente+8' }
    ];

    // Duplicar para efecto infinito
    const clientesDuplicados = [...clientesEjemplo, ...clientesEjemplo];

    carruselTrack.innerHTML = '';

    clientesDuplicados.forEach(cliente => {
        const logoDiv = document.createElement('div');
        logoDiv.className = 'cliente-logo';
        logoDiv.innerHTML = `
            <img src="${cliente.logo}" alt="${cliente.nombre}" title="${cliente.nombre}">
        `;
        carruselTrack.appendChild(logoDiv);
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Clientes.js inicializado');
    const carruselTrack = document.querySelector('.carrusel-track');
    
    if (carruselTrack) {
        console.log('✅ Elemento .carrusel-track encontrado');
        cargarClientes();
    } else {
        console.log('❌ No se encontró elemento .carrusel-track en esta página');
    }
});
