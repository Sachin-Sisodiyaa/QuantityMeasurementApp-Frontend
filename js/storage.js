/* ============================================================
   storage.js — LocalStorage helpers for users & history
   ============================================================ */

const Storage = (() => {
  const KEYS = {
    USERS:        'qm_users',
    LAST_USER:    'qm_last_user',
    HISTORY_PFX:  'qm_history_',
  };

  /* ---- Users ---- */
  function getUsers() {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || '{}');
  }

  function saveUsers(users) {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  }

  function getUser(email) {
    return getUsers()[email] || null;
  }

  function createUser(name, email, password) {
    const users = getUsers();
    if (users[email]) return false; // already exists
    users[email] = { name, email, password };
    saveUsers(users);
    return true;
  }

  function validateUser(email, password) {
    const user = getUser(email);
    if (!user) return null;
    return user.password === password ? user : null;
  }

  /* ---- Session ---- */
  function setLastUser(email) {
    localStorage.setItem(KEYS.LAST_USER, email);
  }

  function getLastUser() {
    const email = localStorage.getItem(KEYS.LAST_USER);
    return email ? getUser(email) : null;
  }

  function clearSession() {
    localStorage.removeItem(KEYS.LAST_USER);
  }

  /* ---- History ---- */
  function getHistory(email) {
    return JSON.parse(localStorage.getItem(KEYS.HISTORY_PFX + email) || '[]');
  }

  function addHistoryEntry(email, entry) {
    const hist = getHistory(email);
    hist.unshift(entry);
    if (hist.length > 100) hist.pop(); // cap at 100 entries
    localStorage.setItem(KEYS.HISTORY_PFX + email, JSON.stringify(hist));
  }

  function clearHistory(email) {
    localStorage.removeItem(KEYS.HISTORY_PFX + email);
  }

  return {
    getUsers, saveUsers, getUser, createUser, validateUser,
    setLastUser, getLastUser, clearSession,
    getHistory, addHistoryEntry, clearHistory,
  };
})();
