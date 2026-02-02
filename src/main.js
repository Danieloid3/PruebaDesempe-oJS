// javascript
import { Navbar } from './components/Navbar.js';
import { router } from './router/router.js';
import { Sidebar } from './components/Sidebar.js';

const app = document.getElementById('app');

export function render(viewNode) {
    app.innerHTML = '';

    const currentPath = window.location.hash || '#login';
    const noNavbarRoutes = ['#login', '#register'];

    if (!noNavbarRoutes.includes(currentPath)) {
        const layout = document.createElement('div');
        layout.classList.add('app-layout');

        const sidebar = Sidebar();

        const appMain = document.createElement('div');
        appMain.classList.add('app-main');

        const header = Navbar();

        appMain.appendChild(header);
        appMain.appendChild(viewNode);

        layout.appendChild(sidebar);
        layout.appendChild(appMain);

        app.appendChild(layout);
    } else {
        app.appendChild(viewNode);
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
