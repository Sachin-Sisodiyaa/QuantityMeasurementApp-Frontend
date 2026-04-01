/* ============================================================
   history.js — Calculation history panel
   ============================================================ */

function toggleHistory() {
  const overlay = document.getElementById('history-overlay');
  const isOpen  = overlay.classList.toggle('open');
  if (isOpen) renderHistory();
}

function closeHistoryIfOutside(event) {
  if (event.target === document.getElementById('history-overlay')) {
    toggleHistory();
  }
}

function renderHistory() {
  const list = document.getElementById('history-list');
  if (!list) return;

  if (typeof currentUser === 'undefined' || !currentUser) {
    list.innerHTML = '<div class="history-empty">Please log in to see history.</div>';
    return;
  }

  const entries = Storage.getHistory(currentUser.email);

  if (!entries.length) {
    list.innerHTML = '<div class="history-empty">No calculations yet. Start measuring!</div>';
    return;
  }

  list.innerHTML = entries.map(entry => `
    <div class="history-item">
      <strong>${escapeHtml(entry.label)}</strong>
      <div class="history-result">${escapeHtml(entry.result)}</div>
      <div class="history-meta">${entry.time}  &bull;  ${entry.date}  &bull;  ${entry.type}</div>
    </div>
  `).join('');
}

/* ---------- Clear all history ---------- */
function clearHistory() {
  if (typeof currentUser === 'undefined' || !currentUser) return;

  // Confirm before wiping
  if (!confirm('Clear all calculation history? This cannot be undone.')) return;

  Storage.clearHistory(currentUser.email);
  renderHistory();
  showToast('History cleared.');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

/* Close history panel with Escape key */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('history-overlay');
    if (overlay && overlay.classList.contains('open')) toggleHistory();
  }
});
