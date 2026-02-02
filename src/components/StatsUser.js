// javascript
import JsonService from '../services/jsonService.js';
import {getCurrentUser} from "../services/authService.js";

export async function StatsUser() {
    const service = new JsonService();
    const products = await service.getProducts();
    const currentUser = getCurrentUser();
    let allTasks = [];
    allTasks = products.filter(product => product.assignedTo === currentUser.name);

    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(p => (p.status || 'pending') === 'completed').length;
    const pendingTasks = allTasks.filter(p => (p.status || 'pending') === 'pending').length;
    const highPriorityPending = allTasks.filter(
        p =>
            (p.status || 'pending') === 'pending' &&
            (p.priority || 'medium') === 'high'
    ).length;
    const progressPercent =
        totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const statsConfig = [
        {
            label: 'Total Tasks',
            icon: '📦',
            value: String(totalTasks),
            footerClass: 'positive',
            footer: ['⬈', '+12% from last week']
        },
        {
            label: 'Completed',
            icon: '✅',
            value: String(completedTasks),
            footerClass: 'positive',
            footer: ['On track']
        },
        {
            label: 'Pending',
            icon: '⏰',
            value: String(pendingTasks),
            footerClass: 'warning',
            footer: [`${highPriorityPending} High Priority`]
        },
        {
            label: 'Overall Progress',
            icon: '🕒',
            value: `${progressPercent}%`,
            footerClass: 'positive',
            footer: ['Keep it up']
        }
    ];

    const div = document.createElement('div');
    div.classList.add('stats-row');

    const cardsHtml = statsConfig
        .map(stat => {
            const footerContent =
                stat.footer.length === 2
                    ? `<span>${stat.footer[0]}</span><span>${stat.footer[1]}</span>`
                    : `<span>${stat.footer[0]}</span>`;

            return `
                <article class="stat-card">
                  <div class="stat-label">
                    <span>${stat.label}</span>
                    <span>${stat.icon}</span>
                  </div>
                  <div class="stat-value">${stat.value}</div>
                  <div class="stat-footer ${stat.footerClass}">
                    ${footerContent}
                  </div>
                </article>
            `;
        })
        .join('');

    div.innerHTML = cardsHtml;
    return div;
}
