// Clientes.js - Carrusel de clientes

async function cargarClientes() {
    try {
        const response = await fetch('data/clientes.json');
        const data = await response.json();
        renderizarCarruselClientes(data.clientes);
    } catch (error) {
        console.error('Error cargando clientes:', error);
        // Si falla, mostrar clientes de ejemplo
        mostrarClientesEjemplo();
    }
}

function renderizarCarruselClientes(clientes) {
    const carruselTrack = document.querySelector('.carrusel-track');
    if (!carruselTrack) return;

    // Duplicar los clientes para efecto infinito
    const clientesDuplicados = [...clientes, ...clientes];

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

function mostrarClientesEjemplo() {
    const carruselTrack = document.querySelector('.carrusel-track');
    if (!carruselTrack) return;

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
    if (document.querySelector('.carrusel-track')) {
        cargarClientes();
    }
});
