export function LoadingView() {
    return `
        <div class="container">
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-title">Cargando datos de usuarios...</p>
                <p class="loading-subtitle">Conectando con la API /p>
            </div>
        </div>`;
}