// javascript
import { getCurrentUser } from '../services/authService.js';
import { logout } from '../services/authService.js';
export function Navbar() {
    const header = document.createElement('header');
    header.classList.add('app-header');

    const user = getCurrentUser();
    const hash = window.location.hash || '#dashboard';
    
    let pageTitle = 'Dashboard';
    if (hash === '#myTasks') pageTitle = 'My Tasks';
    if (hash === '#profile') pageTitle = 'My Profile';

    header.innerHTML = `
        <div class="breadcrumb">
          <span>Home</span>
          <span>${pageTitle}</span>
        </div>

        <div class="app-header-right">
          <button class="icon-button">🔔</button>
          <div class="user-info">
            <div class="user-meta">
              <span class="user-name">${user?.name || 'User'}</span>
              <span class="user-role">${user?.role || 'Guest'}</span>
            </div>
            <div class="user-avatar"></div>
          </div>
          <button id="logoutBtn" class="btn-logout">
            Log out
          </button>
        </div>
    `;

    // Acción del botón de logout
    const logoutBtn = header.querySelector('#logoutBtn');
    logoutBtn.addEventListener('click', () => {
        logout();
    });
    return header;
}
