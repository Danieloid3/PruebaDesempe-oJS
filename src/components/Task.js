// javascript
import JsonService from '../services/jsonService.js';

export async function Task(productId, isAdmin = false) {
    const service = new JsonService();
    const product = await service.getProductById(productId);

    // Mapeamos el response a la estructura de Task
    const data = {
        id: product.id,
        title: product.title ||  'Untitled task',
        assignee: product.assignedTo || 'Unassigned',
        status: product.status || 'pending',      // 'in-progress' | 'pending' | 'completed'
        priority: product.priority || 'medium',   // 'high' | 'medium' | 'low'
        dueDate: product.dueDate || 'No date'
    };

    const statusClassMap = {
        'in-progress': 'in-progress',
        'pending': 'pending',
        'completed': 'completed'
    };

    const statusLabelMap = {
        'in-progress': 'In Progress',
        'pending': 'Pending',
        'completed': 'Completed'
    };

    const priorityBgMap = {
        high: '#fee2e2',   // rojo suave
        medium: '#fef3c7', // amarillo
        low: '#dcfce7'     // verde
    };

    const priorityLabelMap = {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
    };

    const statusClass = statusClassMap[data.status] || 'pending';
    const statusLabel = statusLabelMap[data.status] || 'Pending';
    const priorityBg = priorityBgMap[data.priority] || '#e5e7eb';
    const priorityLabel = priorityLabelMap[data.priority] || 'Medium';

    const adminControls = isAdmin
        ? `
            <button
              class="table-icon-btn task-edit-btn"
              data-id="${data.id}"
              aria-label="Edit task"
            >
              ✏️
            </button>
            <button
              class="table-icon-btn danger task-delete-btn"
              data-id="${data.id}"
              aria-label="Delete task"
            >
              🗑
            </button>
          `
        : `
            <button
              class="table-icon-btn task-view-btn"
              data-id="${data.id}"
              aria-label="View task"
            >
              👁
            </button>
          `;

    return `
        <tr data-id="${data.id}">
            <td>${data.title}</td>
            <td>${data.assignee}</td>
            <td>
              <span class="badge-status ${statusClass}">${statusLabel}</span>
            </td>
            <td>
              <span class="badge badge-pill" style="background: ${priorityBg}">
                ● ${priorityLabel}
              </span>
            </td>
            <td>${data.dueDate}</td>
            <td>
              <div class="table-actions">
                ${adminControls}
              </div>
            </td>
        </tr>
    `;
}
