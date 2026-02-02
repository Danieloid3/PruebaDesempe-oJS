import { Task } from '../components/Task.js';
import { LoadingView } from '../components/Loading.js';
import JsonService from '../services/jsonService.js';
import { getCurrentUser } from '../services/authService.js';
import { Stats } from '../components/Stats.js';
import { CreateTaskModal } from '../components/CreateTaskModal.js';
import {StatsUser} from "../components/StatsUser.js"

export async function myTasks() {
    // Contenedor principal de la vista
    const main = document.createElement('main');
    main.classList.add('app-content-wrapper');

    const card = document.createElement('section');
    card.classList.add('app-content-card');

    const currentUser = getCurrentUser();
    const isAdmin = currentUser && currentUser.role === 'admin' || 'customer';

    card.innerHTML = `
        <header class="page-header">
          <div>
            <h1 class="page-title">Task Manager</h1>
            <p class="page-subtitle">
              Overview of your current academic performance tasks.
            </p>
          </div>
          ${isAdmin
        ? `<button class="btn btn-primary" id="openTaskModalBtn">+ New Task</button>`
        : ''}
        </header>
    `;

    const statsPlaceholder = document.createElement('div');
    statsPlaceholder.textContent = 'Loading stats...';
    card.appendChild(statsPlaceholder);

    const searchTabs = document.createElement('div');
    searchTabs.style.display = 'flex';
    searchTabs.style.alignItems = 'center';
    searchTabs.style.justifyContent = 'space-between';
    searchTabs.style.gap = '1rem';
    searchTabs.innerHTML = `
        <div class="search-bar" style="flex: 1">
            <input
              class="search-input"
              placeholder="Search tasks..."
              type="search"
              id="taskSearchInput"
            />
        </div>
        <div class="tabs" id="taskTabs">
            <button class="tab active" data-status="all">All Tasks</button>
            <button class="tab" data-status="pending">Pending</button>
            <button class="tab" data-status="in-progress">In Progress</button>
            <button class="tab" data-status="completed">Completed</button>
        </div>
    `;
    card.appendChild(searchTabs);

    const tableWrapper = document.createElement('div');
    tableWrapper.classList.add('table-wrapper');
    tableWrapper.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Assignee</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th style="text-align: right">Actions</th>
            </tr>
          </thead>
          <tbody id="tasksTbody">
            <tr>
              <td colspan="6">
                ${LoadingView()}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="table-footer" id="tableFooter">
          Showing 0 tasks
        </div>
    `;
    card.appendChild(tableWrapper);

    main.appendChild(card);

    const jsonService = new JsonService();
    let allTasks = [];               // cache de todas las tareas (products)
    let currentStatusFilter = 'all'; // 'all' | 'pending' | 'in-progress' | 'completed'
    let currentSearch = '';
    const tbody = tableWrapper.querySelector('#tasksTbody');
    const tableFooter = tableWrapper.querySelector('#tableFooter');
    const searchInput = searchTabs.querySelector('#taskSearchInput');
    const tabs = searchTabs.querySelectorAll('#taskTabs .tab');
    const openTaskModalBtn = card.querySelector('#openTaskModalBtn');

    async function loadTasks() {
        try {
            const products = await jsonService.getProducts();
            allTasks = products.filter(product => product.assignedTo === currentUser.name);
            await renderTasks();
        } catch (err) {
            console.error('Error cargando tasks/products', err);
            tbody.innerHTML = `
                <tr>
                  <td colspan="6" style="color: var(--text-danger); padding: 1rem;">
                    Could not connect to the Products API.
                  </td>
                </tr>
            `;
            tableFooter.textContent = 'Showing 0 tasks';
        }
    }

    function getFilteredTasks() {
        return allTasks.filter(task => {
            const status = task.status || 'pending';
            const title = (task.title || task.name || '').toLowerCase();

            const matchesStatus =
                currentStatusFilter === 'all' || status === currentStatusFilter;

            const matchesSearch =
                !currentSearch || title.includes(currentSearch.toLowerCase());

            return matchesStatus && matchesSearch;
        });
    }

    async function renderTasks() {
        const filtered = getFilteredTasks();

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                  <td colspan="6" style="padding: 1rem; text-align: center; color: var(--text-muted);">
                    No tasks found.
                  </td>
                </tr>
            `;
            tableFooter.textContent = 'Showing 0 tasks';
            return;
        }

        // Loading mientras se resuelven todas las filas (cada Task hace su propio fetch)
        tbody.innerHTML = `
            <tr>
              <td colspan="6">
                ${LoadingView()}
              </td>
            </tr>
        `;

        const rows = await Promise.all(
            filtered.map(task => Task(task.id, isAdmin))
        );

        tbody.innerHTML = rows.join('');
        tableFooter.textContent = `Showing ${filtered.length} task${filtered.length !== 1 ? 's' : ''}`;
    }


    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            currentStatusFilter = tab.dataset.status || 'all';
            renderTasks();
        });
    });

    searchInput.addEventListener('input', () => {
        currentSearch = searchInput.value.trim();
        renderTasks();
    });

    // \[12\] Delegación de acciones en la tabla (editar, eliminar, ver)
    tbody.addEventListener('click', async e => {
        const editBtn = e.target.closest('.task-edit-btn');
        const deleteBtn = e.target.closest('.task-delete-btn');
        const viewBtn = e.target.closest('.task-view-btn');


        if (editBtn && isAdmin) {
            const id = editBtn.dataset.id;
            const existing = allTasks.find(p => String(p.id) === String(id));
            if (!existing) return;

            const modal = CreateTaskModal({
                mode: 'edit',
                task: existing,
                onSaved: updated => {
                    // Actualizamos la tarea en memoria y re-renderizamos
                    const idx = allTasks.findIndex(p => String(p.id) === String(updated.id));
                    if (idx !== -1) allTasks[idx] = updated;
                    renderTasks();
                }
            });

            document.body.appendChild(modal);
            return;
        }


        if (deleteBtn && isAdmin) {
            const id = deleteBtn.dataset.id;
            const confirmDelete = window.confirm('Are you sure you want to delete this task?');
            if (!confirmDelete) return;

            try {
                await jsonService.deleteProduct(id);
                allTasks = allTasks.filter(p => String(p.id) !== String(id));
                renderTasks();
            } catch (err) {
                console.error('Error deleting task', err);
                alert('Could not delete task.');
            }
            return;
        }

        // Ver detalle (modo lectura para no-admin, aquí solo placeholder)

    });

    // \[13\] Botón de crear nueva tarea (solo admin)
    if (openTaskModalBtn) {
        openTaskModalBtn.addEventListener('click', () => {
            const modal = CreateTaskModal({
                mode: 'create',
                onSaved: created => {
                    // Añadimos la nueva tarea al array en memoria
                    allTasks.push(created);
                    renderTasks();
                }
            });

            document.body.appendChild(modal);
        });
    }

    // \[14\] Cargar stats de forma asíncrona y reemplazar el placeholder
    try {
        const statsRow = await StatsUser();
        statsPlaceholder.replaceWith(statsRow);
    } catch (err) {
        console.error('Error cargando stats', err);
        statsPlaceholder.textContent = 'Error loading stats';
    }

    // \[15\] Cargar tareas iniciales
    await loadTasks();

    return main;

}