import {login} from '../services/authService.js';

export function LoginView() {
    const div = document.createElement('div');
    div.classList.add('login-page');
    div.innerHTML = `
<main class="login-card">
    <header class="login-logo">
        <div class="login-logo-icon">C</div>
        <div class="login-logo-text">CRUDZASO</div>
      </header>

      <h1 class="login-title">Welcome back</h1>
      <p class="login-subtitle">
        Enter your credentials to access the platform
      </p>

      <form id ="loginForm" class="login-form">
        <div class="login-form-group">
          <label class="login-label" for="email">Email or username</label>
          <input
            id="email"
            type="email"
            class="input-field"
            placeholder="student@university.edu"
          />
        </div>

        <div class="login-form-group">
          <label class="login-label" for="password">Password</label>
          <div class="password-row">
            <input
              id="password"
              type="password"
              class="input-field"
              value="••••••••"
            />
            <span class="password-toggle">👁</span>
          </div>
        </div>

        <div class="login-extra">
          <a href="#">Forgot password?</a>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%">
          Sign in
        </button>
        <p class="auth-error hidden" id="auth-error">
              Credenciales inválidas. Intenta nuevamente.
        </p>
            
        <p class="auth-success hidden" id="auth-success">
              ¡Inicio de sesión exitoso!
        </p>
      </form>

      <div class="login-footer">
        <span>Don't have an account?</span>
        <a href="#">Register</a>
      </div>
    </main>
    
    `;
    setTimeout(() => {
        attachEventListeners();
    }, 0);

    return div;
}
function attachEventListeners() {

    const form = document.getElementById('loginForm');

    if (form) {
        console.log('[LOGIN] Formulario encontrado');
        form.addEventListener('submit', handleLogin);
    }
}
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    console.log('[LOGIN] Datos de login:', {email});
    // Validaciones
    if (!email || !password) {
        console.warn('[LOGIN] Validación fallida: Campos vacíos');
        showError('Por favor completa todos los campos');
        return;
    }
    console.log('[LOGIN] Enviando credenciales al servidor...');

    const result = await login(email, password);

    if (result.success) {
        console.log('[LOGIN] Login exitoso:', result.user);
        showSuccess('¡Inicio de sesión exitoso! Redirigiendo...');

        console.log('[LOGIN] Esperando 1 segundos antes de redirigir...');
        setTimeout(() => {
            console.log('[LOGIN] Redirigiendo a menu...');
            window.location.hash = '#menu';
            console.log('[LOGIN] Hash cambiado a #menu');
        }, 1000);
    } else {
        console.error('[LOGIN] Login fallido:', result.error);
        showError(result.error);
    }
}
function showError(message) {
    console.error('[UI] Mostrando error:', message);

    const errorElement = document.getElementById('auth-error');
    const successElement = document.getElementById('auth-success');

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }

    if (successElement) {
        successElement.classList.add('hidden');
    }

    setTimeout(() => {
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }, 5000);
}

function showSuccess(message) {
    console.log('[UI] Mostrando éxito:', message);

    const errorElement = document.getElementById('auth-error');
    const successElement = document.getElementById('auth-success');

    if (successElement) {
        successElement.textContent = message;
        successElement.classList.remove('hidden');
    }

    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}