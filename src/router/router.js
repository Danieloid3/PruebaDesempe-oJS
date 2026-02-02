// src/router/router.js
import { render } from '../main.js';

import { getCurrentUser, isAdmin } from '../services/authService.js';
import {LoginView} from '../views/login.js';
import {dashboardView} from '../views/adminDashboard.js';
import {RegisterView} from '../views/register.js';
import {myTasks} from '../views/myTasks.js';
import {profileView} from '../views/profile.js';


// Mapeo de rutas a funciones de vista
const routes = {

    '#login': LoginView,
    '#dashboard': dashboardView,
    '#register': RegisterView,
    '#myTasks' : myTasks,
    '#profile': profileView
};

export async function router() {
    // 1. Obtener el hash actual o usar '#login' como default
    let hash = window.location.hash || '#login';

    // Validación de rol para el dashboard
    if (hash === '#dashboard' && !isAdmin()) {
        hash = '#myTasks';
        window.location.hash = '#myTasks';
    }

    // 2. Buscar la vista correspondiente
    const viewFn = routes[hash];

    if (viewFn) {
        try {
            // 3. Ejecutar la función de la vista para obtener el nodo DOM o string
            const viewContent = await viewFn();

            // 4. Renderizar en el contenedor principal usando la función exportada de main.js
            // Nota: render espera un nodo DOM o string. Si es string, lo convertimos a elemento temporalmente
            if (typeof viewContent === 'string') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = viewContent;

                render(tempDiv);
            } else {
                render(viewContent);
            }

            // 5. Actualizar estado activo en el Navbar (Opcional, pero buena UX)
            updateActiveNavLink(hash);

        } catch (error) {
            console.error("Error loading view:", error);
            renderError404();
        }
    } else {
        renderError404();
    }
}

function updateActiveNavLink(hash) {
    const navLinks = document.querySelectorAll('.sidebar-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function renderError404() {
    const div = document.createElement('div');
    div.classList.add('container');
    div.innerHTML = `
        <h1 class="page-title">404</h1>
        <p class="subtitle">Page not found</p>
        <a href="#menu" class="button primary">Go back to Menu</a>
    `;
    render(div);
}