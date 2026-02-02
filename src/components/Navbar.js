import { logout } from '../services/authService.js';
import { getCurrentUser } from '../services/authService.js';


export function Navbar() {
    const header = document.createElement('header');
    header.classList.add('header');
    header.innerHTML = `
    <div>
            <div class="breadcrumb">
              <span>Home</span>
              <span>Dashboard</span>
            </div>
          </div>

          <div class="app-header-right">
            <button class="icon-button">🔔</button>
            <div class="user-info">
              <div class="user-meta">
                <span class="user-name">Alex Morgan</span>
                <span class="user-role">Product Designer</span>
              </div>
              <div class="user-avatar"></div>
            </div>
          </div>
    
    `;
    return header;
}