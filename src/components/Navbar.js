// javascript
import { getCurrentUser } from '../services/authService.js';

export function Navbar() {
    const header = document.createElement('header');
    header.classList.add('app-header');

    const user = getCurrentUser();

    header.innerHTML = `
        <div class="breadcrumb">
          <span>Home</span>
          <span>Dashboard</span>
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
        </div>
    `;

    return header;
}
