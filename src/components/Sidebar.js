// javascript
export function Sidebar() {
    const aside = document.createElement('aside');
    aside.classList.add('sidebar');

    aside.innerHTML = `
        <div class="sidebar-logo">
          <div class="sidebar-logo-icon">C</div>
          <div class="sidebar-logo-text">CRUDZASO</div>
        </div>

        <ul class="sidebar-nav">
          <li class="sidebar-nav-item">
            <a href="#dashboard" class="sidebar-link active">
              <span class="icon">🏠</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li class="sidebar-nav-item">
            <a href="#tasks" class="sidebar-link">
              <span class="icon">☑️</span>
              <span>My Tasks</span>
            </a>
          </li>
          <li class="sidebar-nav-item">
            <a href="#profile" class="sidebar-link">
              <span class="icon">👤</span>
              <span>Profile</span>
            </a>
          </li>
        </ul>
    `;

    return aside;
}
