// javascript
import JsonService from '../services/jsonService.js';

export function CreateTaskModal({ mode = 'create', task = null, onClose, onSaved }) {
    const isEdit = mode === 'edit';
    const service = new JsonService();

    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    const titleText = isEdit ? 'Edit Task' : 'Create New Task';
    const breadcrumbLast = isEdit ? 'Edit' : 'Create New';

    modal.innerHTML = `
        <header class="modal-header">
            <div>
                <p class="breadcrumb">
                    <span>Back to Tasks</span>
                    <span>${breadcrumbLast}</span>
                </p>
                <h1 class="modal-title">${titleText}</h1>
            </div>
            <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        </header>

        <div class="modal-body">
            <form id="taskForm">
              <div class="form-group" style="margin-top: 1.2rem">
                <label class="form-label" for="task-title">
                  Task Title <span style="color: #ef4444">*</span>
                </label>
                <input
                  id="task-title"
                  name="title"
                  type="text"
                  class="input-field"
                  placeholder="e.g., Complete Quarter 3 Report"
                  required
                />
              </div>

              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label" for="category">Category</label>
                  <select id="category" name="category" class="select-field">
                    <option value="">Select category...</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Computer Science">Computer Science</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="priority">Priority</label>
                  <select id="priority" name="priority" class="select-field">
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="status">Status</label>
                  <select id="status" name="status" class="select-field">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="due-date">Due Date</label>
                  <input
                    id="due-date"
                    name="dueDate"
                    type="text"
                    class="input-field"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
              </div>

              <!-- Assigned To con buscador -->
                <div class="form-group form-group-assigned-to">
                  <label class="form-label" for="assigned-to">Assigned to</label>
                  <input
                    id="assigned-to"
                    class="input-field assigned-to-input"
                    type="text"
                    placeholder="Search user by name..."
                    autocomplete="off"
                  />
                  <ul id="assigned-to-list" class="assigned-to-list hidden"></ul>
                </div>
              <div class="form-group" style="margin-top: 1.1rem">
                <label class="form-label" for="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  class="textarea"
                  placeholder="Add details about this task..."
                ></textarea>
              </div>

              <p id="taskMessage" class="modal-message hidden"></p>

              <div class="form-footer">
                <button type="button" class="btn btn-ghost" id="cancelTaskBtn">
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">
                  ${isEdit ? 'Save Changes' : 'Save Task'}
                </button>
              </div>
            </form>
        </div>
    `;

    backdrop.appendChild(modal);

    const form = modal.querySelector('#taskForm');
    const cancelBtn = modal.querySelector('#cancelTaskBtn');
    const closeBtn = modal.querySelector('.modal-close-btn');
    const messageEl = modal.querySelector('#taskMessage');

    const assignedInput = modal.querySelector('#assigned-to');
    const assignedList = modal.querySelector('#assigned-to-list');

    let users = [];
    let selectedUserName = task?.assignedTo || '';

    // Prerellenar si es edición
    if (task) {
        form.elements['title'].value = task.title || task.name || '';
        form.elements['category'].value = task.category || '';
        form.elements['priority'].value = task.priority || 'medium';
        form.elements['status'].value = task.status || 'pending';
        form.elements['dueDate'].value = task.dueDate || '';
        form.elements['description'].value = task.description || '';
        if (selectedUserName) {
            assignedInput.value = selectedUserName;
        }
    }

    function close() {
        if (backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
        if (typeof onClose === 'function') onClose();
    }

    cancelBtn.addEventListener('click', close);
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', e => {
        if (e.target === backdrop) close();
    });

    // Cargar usuarios usando JsonService.getUsers
    (async () => {
        try {
            users = await service.getUsers();
        } catch (err) {
            console.error('Error loading users for Assigned To field', err);
        }
    })();

    function renderUserList(filterText) {
        if (!users || users.length === 0) {
            assignedList.innerHTML = `
                <li class="assigned-to-item disabled">No users available</li>
            `;
            assignedList.classList.remove('hidden');
            return;
        }

        const text = (filterText || '').toLowerCase();
        const filtered = users.filter(u => {
            const name = (u.name || u.username || '').toLowerCase();
            return !text || name.includes(text);
        });

        if (filtered.length === 0) {
            assignedList.innerHTML = `
                <li class="assigned-to-item disabled">No users found</li>
            `;
            assignedList.classList.remove('hidden');
            return;
        }

        assignedList.innerHTML = filtered
            .map(
                u => `
              <li
                class="assigned-to-item"
                data-name="${u.name || u.username || ''}"
              >
                ${u.name || u.username || u.email}
              </li>
            `
            )
            .join('');

        assignedList.classList.remove('hidden');
    }

    assignedInput.addEventListener('input', () => {
        const value = assignedInput.value.trim();
        selectedUserName = value;
        renderUserList(value);
    });

    assignedInput.addEventListener('focus', () => {
        renderUserList(assignedInput.value.trim());
    });

    assignedList.addEventListener('click', e => {
        const item = e.target.closest('.assigned-to-item');
        if (!item || item.classList.contains('disabled')) return;
        const name = item.dataset.name;
        assignedInput.value = name;
        selectedUserName = name;
        assignedList.classList.add('hidden');
    });

    document.addEventListener('click', e => {
        if (!modal.contains(e.target)) {
            assignedList.classList.add('hidden');
        }
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        messageEl.classList.remove('error', 'success');
        messageEl.classList.add('hidden');

        const title = form.elements['title'].value.trim();
        if (!title) {
            messageEl.textContent = 'Task title is required.';
            messageEl.classList.add('error');
            messageEl.classList.remove('hidden');
            return;
        }

        const payload = {
            title,
            category: form.elements['category'].value || null,
            priority: form.elements['priority'].value || 'medium',
            status: form.elements['status'].value || 'pending',
            dueDate: form.elements['dueDate'].value || null,
            description: form.elements['description'].value || '',
            assignedTo: selectedUserName || null
        };

        try {
            let saved;
            if (isEdit && task?.id) {
                saved = await service.updateProduct(task.id, payload);
                messageEl.textContent = 'Task updated successfully.';
            } else {
                saved = await service.createProduct(payload);
                messageEl.textContent = 'Task created successfully.';
            }

            messageEl.classList.add('success');
            messageEl.classList.remove('hidden');

            if (typeof onSaved === 'function') onSaved(saved);

            setTimeout(() => close(), 700);
        } catch (err) {
            console.error('Error saving task/product', err);
            messageEl.textContent = 'Error saving task. Please try again.';
            messageEl.classList.add('error');
            messageEl.classList.remove('hidden');
        }
    });

    return backdrop;
}
