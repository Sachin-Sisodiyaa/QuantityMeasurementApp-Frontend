/* ============================================================
   dashboard.js — Dashboard init, type/action UI, logout
   ============================================================ */

let currentUser = null;

/* ---------- Guard: redirect to login if no session ---------- */
(function init() {
  const user = Storage.getLastUser();
  if (!user) {
    window.location.href = '../index.html';
    return;
  }
  currentUser = user;
  document.getElementById('display-name').textContent = user.name.toUpperCase();

  selectType('length');
  selectAction('comparison');
})();

/* ---------- Logout ---------- */
function handleLogout() {
  Storage.clearSession();
  window.location.href = '../index.html';
}

/* ---------- Type selection ---------- */
function selectType(type) {
  currentType = type;

  document.querySelectorAll('.type-card').forEach(card =>
    card.classList.toggle('active', card.dataset.type === type)
  );

  populateUnits();
  clearInputs();
  compute();
}

/* ---------- Action selection ---------- */
function selectAction(action) {
  currentAction = action;

  document.querySelectorAll('.action-tab[data-action]').forEach(tab =>
    tab.classList.toggle('active', tab.dataset.action === action)
  );

  const convLayout    = document.getElementById('conversion-layout');
  const defaultLayout = document.getElementById('default-layout');
  const valBCol       = document.getElementById('val-b-col');
  const arithRow      = document.getElementById('arith-op-row');

  if (action === 'conversion') {
    // Show the dedicated conversion layout, hide default
    convLayout.classList.remove('hidden');
    defaultLayout.classList.add('hidden');
    arithRow.classList.add('hidden');
  } else {
    // Show the default two-column layout
    convLayout.classList.add('hidden');
    defaultLayout.classList.remove('hidden');
    // Value B col: always visible for comparison & arithmetic
    valBCol.style.display = '';
    document.getElementById('val-b-label').textContent = 'Value B';
    arithRow.classList.toggle('hidden', action !== 'arithmetic');
  }

  clearInputs();
  compute();
}

/* ---------- Populate unit dropdowns for all selects ---------- */
function populateUnits() {
  const units = Units.UNITS[currentType] || [];

  // Default layout selects
  ['unit-a', 'unit-b'].forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="">Select unit</option>';
    units.forEach(unit => {
      const opt = document.createElement('option');
      opt.value = unit; opt.textContent = unit;
      select.appendChild(opt);
    });
  });

  // Conversion layout selects
  const unitAConv = document.getElementById('unit-a-conv');
  const unitBConv = document.getElementById('unit-b-conv');
  if (unitAConv) {
    unitAConv.innerHTML = '<option value="">From unit</option>';
    units.forEach(unit => {
      const opt = document.createElement('option');
      opt.value = unit; opt.textContent = unit;
      unitAConv.appendChild(opt);
    });
  }
  if (unitBConv) {
    unitBConv.innerHTML = '<option value="">To unit</option>';
    units.forEach(unit => {
      const opt = document.createElement('option');
      opt.value = unit; opt.textContent = unit;
      unitBConv.appendChild(opt);
    });
  }
}

/* ---------- Sync conversion layout inputs → hidden real inputs ---------- */
// The compute engine always reads from #val-a, #unit-a, #unit-b.
// The conversion layout has its own inputs, so we mirror them.
function syncValA() {
  const v = document.getElementById('val-a-conv');
  if (v) document.getElementById('val-a').value = v.value;
}
function syncUnitA() {
  const v = document.getElementById('unit-a-conv');
  if (v) document.getElementById('unit-a').value = v.value;
}
function syncUnitB() {
  const v = document.getElementById('unit-b-conv');
  if (v) document.getElementById('unit-b').value = v.value;
}

/* ---------- Update the inline result display inside conversion layout ---------- */
function updateConversionDisplay(text) {
  const el = document.getElementById('conv-result-display');
  if (el) el.textContent = text || '—';
}

/* ---------- Clear inputs & result ---------- */
function clearInputs() {
  // Default layout
  const valA  = document.getElementById('val-a');
  const valB  = document.getElementById('val-b');
  const unitA = document.getElementById('unit-a');
  const unitB = document.getElementById('unit-b');
  if (valA)  valA.value  = '';
  if (valB)  valB.value  = '';
  if (unitA) unitA.value = '';
  if (unitB) unitB.value = '';

  // Conversion layout
  const valAConv  = document.getElementById('val-a-conv');
  const unitAConv = document.getElementById('unit-a-conv');
  const unitBConv = document.getElementById('unit-b-conv');
  if (valAConv)  valAConv.value  = '';
  if (unitAConv) unitAConv.value = '';
  if (unitBConv) unitBConv.value = '';
  updateConversionDisplay('—');

  setResult('Select units and enter values to begin', 'default');
}
