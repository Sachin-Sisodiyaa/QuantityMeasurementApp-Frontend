/* ============================================================
   auth.js — Login / Signup logic & form validation
   ============================================================ */

/* ---------- Tab switching ---------- */
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === tab)
  );
  document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
  document.getElementById('signup-form').classList.toggle('hidden', tab !== 'signup');
  clearErrors();
}

/* ---------- Error helpers ---------- */
function clearErrors() {
  document.querySelectorAll('.field-error').forEach(el => (el.textContent = ''));
  document.querySelectorAll('.input-wrap input').forEach(inp =>
    inp.classList.remove('error')
  );
}

function setError(inputId, errId, message) {
  const input = document.getElementById(inputId);
  const errEl = document.getElementById(errId);
  if (input)  input.classList.add('error');
  if (errEl)  errEl.textContent = message;
}

/* ---------- Validators ---------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(pw) {
  return pw.length >= 6;
}

/* ---------- Password toggle ---------- */
function togglePw(inputId, btn) {
  const input = document.getElementById(inputId);
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';

  btn.innerHTML = isText
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>
       </svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
         <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
         <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
         <line x1="1" y1="1" x2="23" y2="23"/>
       </svg>`;
}

/* ---------- Login ---------- */
function handleLogin() {
  clearErrors();
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  let valid = true;

  if (!email) {
    setError('login-email', 'login-email-err', 'Email is required');
    valid = false;
  } else if (!isValidEmail(email)) {
    setError('login-email', 'login-email-err', 'Enter a valid email address');
    valid = false;
  }

  if (!password) {
    setError('login-password', 'login-pw-err', 'Password is required');
    valid = false;
  }

  if (!valid) return;

  const user = Storage.validateUser(email, password);
  if (!user) {
    // Distinguish "no account" vs "wrong password"
    if (!Storage.getUser(email)) {
      setError('login-email', 'login-email-err', 'No account found. Please sign up.');
    } else {
      setError('login-password', 'login-pw-err', 'Incorrect password. Please try again.');
    }
    return;
  }

  Storage.setLastUser(email);
  showToast('Welcome back, ' + user.name.split(' ')[0] + '!');
  window.location.href = 'pages/dashboard.html';
}

/* ---------- Signup ---------- */
function handleSignup() {
  clearErrors();
  const name     = document.getElementById('signup-name').value.trim();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;
  const confirm  = document.getElementById('signup-confirm').value;
  let valid = true;

  if (!name || name.length < 2) {
    setError('signup-name', 'signup-name-err', 'Please enter your full name');
    valid = false;
  }

  if (!email) {
    setError('signup-email', 'signup-email-err', 'Email is required');
    valid = false;
  } else if (!isValidEmail(email)) {
    setError('signup-email', 'signup-email-err', 'Enter a valid email address');
    valid = false;
  } else if (Storage.getUser(email)) {
    setError('signup-email', 'signup-email-err', 'Account already exists. Please login.');
    valid = false;
  }

  if (!password) {
    setError('signup-password', 'signup-pw-err', 'Password is required');
    valid = false;
  } else if (!isValidPassword(password)) {
    setError('signup-password', 'signup-pw-err', 'Password must be at least 6 characters');
    valid = false;
  }

  if (password && confirm !== password) {
    setError('signup-confirm', 'signup-confirm-err', 'Passwords do not match');
    valid = false;
  }

  if (!valid) return;

  Storage.createUser(name, email, password);
  Storage.setLastUser(email);
  showToast('Account created! Welcome, ' + name.split(' ')[0] + '!');
  window.location.href = 'pages/dashboard.html';
}

/* ---------- Enter key support ---------- */
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Enter') return;
  const loginVisible  = !document.getElementById('login-form').classList.contains('hidden');
  const signupVisible = !document.getElementById('signup-form').classList.contains('hidden');
  if (loginVisible)  handleLogin();
  if (signupVisible) handleSignup();
});

/* ---------- Auto-redirect if already logged in ---------- */
(function checkSession() {
  const user = Storage.getLastUser();
  if (user) window.location.href = 'pages/dashboard.html';
})();
