// javascript
import { register } from "../services/authService.js";

export function RegisterView() {
    const page = document.createElement('div');
    page.classList.add('login-page');

    const main = document.createElement('main');
    main.classList.add('login-card');

    const brand = document.createElement('div');
    brand.classList.add('login-logo');
    brand.innerHTML = `
      <div class="login-logo-icon">C</div>
      <div class="login-logo-text">CRUDZASO</div>
  `;

    const title = document.createElement('h1');
    title.classList.add('login-title');
    title.textContent = 'Create account';

    const subtitle = document.createElement('p');
    subtitle.classList.add('login-subtitle');
    subtitle.textContent = 'Fill the fields to register in the platform';

    const form = document.createElement('form');
    form.classList.add('login-form');
    form.id = 'registerForm';
    form.innerHTML = `
      <div class="login-form-group">
        <label class="login-label" for="reg-name">Full name</label>
        <input
          id="reg-name"
          type="text"
          class="input-field"
          placeholder="Your name"
        />
      </div>

      <div class="login-form-group">
        <label class="login-label" for="reg-email">Email</label>
        <input
          id="reg-email"
          type="email"
          class="input-field"
          placeholder="you@example.com"
        />
      </div>

      <div class="login-form-group">
        <label class="login-label" for="reg-password">Password</label>
        <input
          id="reg-password"
          type="password"
          class="input-field"
          placeholder="Create a password"
        />
      </div>

      <div class="login-form-group">
        <label class="login-label" for="reg-confirm-password">
          Confirm Password
        </label>
        <input
          id="reg-confirm-password"
          type="password"
          class="input-field"
          placeholder="Confirm password"
        />
      </div>

      <div class="login-form-group">
        <label class="login-label" for="reg-role">Role</label>
        <input
          id="reg-role"
          class="input-field"
          type="text"
          value="customer"
          readonly
        />
      </div>

      <p id="register-error" class="auth-error hidden"></p>
      <p id="register-success" class="auth-success hidden"></p>

      <button type="submit" class="btn btn-primary" style="width: 100%">
        Register
      </button>

      <div class="login-footer">
        <span>Already have an account\?</span>
        <a href="#login">Sign in</a>
      </div>
  `;

    main.appendChild(brand);
    main.appendChild(title);
    main.appendChild(subtitle);
    main.appendChild(form);
    page.appendChild(main);

    // listeners
    form.addEventListener('submit', handleRegister);

    return page;
}

async function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    const errorEl = document.getElementById('register-error');
    const successEl = document.getElementById('register-success');

    const showError = (msg) => {
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.classList.remove('hidden');
        }
        if (successEl) successEl.classList.add('hidden');
    };

    const showSuccess = (msg) => {
        if (successEl) {
            successEl.textContent = msg;
            successEl.classList.remove('hidden');
        }
        if (errorEl) errorEl.classList.add('hidden');
    };

    if (!name || !email || !password || !confirmPassword) {
        showError('Por favor completa todos los campos');
        return;
    }

    if (password !== confirmPassword) {
        showError('Las contraseñas no coinciden');
        return;
    }

    const userData = {
        name,
        email,
        password,
        role: 'customer'
    };

    const result = await register(userData);

    if (!result.success) {
        showError(result.error || 'Error al registrar usuario');
        return;
    }

    showSuccess('Registro exitoso, redirigiendo a login...');
    setTimeout(() => {
        window.location.hash = '#login';
    }, 1000);
}
