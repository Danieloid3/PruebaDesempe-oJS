import { getCurrentUser } from '../services/authService.js';

export function Sidebar() {
    const div = document.createElement('div');
    div.classList.add('app-layout');
    div.innerHTML = `
        <aside class="sidebar">
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">C</div>
          <div class="sidebar-logo-text">CRUDZASO</div>
        </div>

        <ul class="sidebar-nav">
          <li class="sidebar-nav-item">
            <a href="dashboard.html" class="sidebar-link active">
              <span class="icon">🏠</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="sidebar-nav-item">
            <a href="tasks.html" class="sidebar-link">
              <span class="icon">☑️</span>
              <span>My Tasks</span>
            </a>
          </li>
          <li class="sidebar-nav-item">
            <a href="#" class="sidebar-link">
              <span class="icon">👤</span>
              <span>Profile</span>
            </a>
          </li>
        </ul>
      </aside>
    
    `;
}