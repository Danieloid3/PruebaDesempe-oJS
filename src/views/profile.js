import { getCurrentUser } from '../services/authService.js';
import JsonService from '../services/jsonService.js';

export async function profileView() {
    const currentUser = getCurrentUser();
    
    // Si no hay usuario, redirigir a login (aunque router/main ya deberían manejarlo)
    if (!currentUser) {
        window.location.hash = '#login';
        return document.createElement('div');
    }

    const jsonService = new JsonService();
    let userTasksCount = 0;

    try {
        const products = await jsonService.getProducts();
        // Filtramos las tareas asignadas al usuario actual
        const userTasks = products.filter(task => task.assignedTo === currentUser.name);
        userTasksCount = userTasks.length;
    } catch (error) {
        console.error('Error fetching tasks for profile:', error);
    }

    const main = document.createElement('main');
    main.classList.add('app-content-wrapper');

    main.innerHTML = `
      <div style="display: grid; grid-template-columns: 340px minmax(0, 1fr); gap: 1.5rem;">
        <!-- CARD IZQUIERDA -->
        <section class="app-content-card" style="padding-bottom: 1.8rem">
          <div style="height: 90px; border-radius: 12px 12px 0 0; margin: -1.8rem -1.8rem 0; background: linear-gradient(135deg, #2563eb, #1d4ed8);"></div>

          <div style="display: flex; flex-direction: column; align-items: center; margin-top: -50px;">
            <div style="width: 96px; height: 96px; border-radius: 999px; border: 4px solid #ffffff; background: #e5e7eb; overflow: hidden; margin-bottom: 0.8rem;">
              <!-- Aquí podría ir la foto -->
            </div>

            <h2 style="font-size: 1.15rem; font-weight: 700;">
              ${currentUser.name || 'User Name'}
            </h2>
            <div class="badge badge-pill" style="margin-top: 0.45rem; background: var(--primary); color: #ffffff;">
              ${currentUser.role === 'admin' ? 'System Admin' : 'Staff Member'}
            </div>
          </div>

          <div style="margin-top: 1.5rem; background: #f3f4ff; border-radius: 999px; padding: 0.55rem 0.9rem; display: flex; align-items: center; gap: 0.6rem; font-size: 0.9rem;">
            <span>✉️</span>
            <span>${currentUser.email || 'no-email@crudzaso.edu'}</span>
          </div>

          <hr style="margin: 1.4rem 0 1rem; border: none; border-top: 1px solid var(--border-soft);" />

          <div class="text-center">
            <div style="font-size: 1.1rem; font-weight: 700">${userTasksCount}</div>
            <div style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.1rem;">
              Tasks
            </div>
          </div>
        </section>

        <!-- CARD DERECHA -->
        <section class="app-content-card">
          <header style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem;">
            <h2 style="font-size: 1.05rem; font-weight: 600">Personal Information</h2>
            <button class="btn btn-outline" style="font-size: 0.85rem">✏️ Edit Profile</button>
          </header>

          <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 1.3rem; column-gap: 2.5rem; font-size: 0.9rem;">
            <!-- Columna izquierda -->
            <div>
              <div style="margin-bottom: 1.1rem">
                <div style="font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em;">Full Name</div>
                <div style="margin-top: 0.2rem">${currentUser.name || 'N/A'}</div>
              </div>

              <div style="margin-bottom: 1.1rem">
                <div style="font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em;">Phone</div>
                <div style="margin-top: 0.2rem">${currentUser.phone || '+1 (555) 000-0000'}</div>
              </div>

              <div>
                <div style="font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em;">Role Level</div>
                <div style="margin-top: 0.2rem">${currentUser.role === 'admin' ? 'Senior Administrator' : 'Standard User'}</div>
              </div>
            </div>

            <!-- Columna derecha -->
            <div>
              <div style="margin-bottom: 1.1rem">
                <div style="font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em;">Employee ID</div>
                <div style="margin-top: 0.2rem">${currentUser.id || '000000'}</div>
              </div>

              <div style="margin-bottom: 1.1rem">
                <div style="font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em;">Department</div>
                <div style="margin-top: 0.25rem">
                  <span class="badge badge-pill" style="background: #facc15; color: #111827; font-size: 0.8rem;">
                    ${currentUser.department || 'General'}
                  </span>
                </div>
              </div>

              <div>
                <div style="font-size: 0.78rem; color: var(--text-light); text-transform: uppercase; letter-spacing: 0.06em;">Join Date</div>
                <div style="margin-top: 0.2rem">September 14, 2020</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    return main;
}
