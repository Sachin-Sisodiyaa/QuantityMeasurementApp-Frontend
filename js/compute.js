/* ============================================================
   compute.js — Calculation engine (comparison / conversion / arithmetic)
   ============================================================ */

/* State shared with dashboard.js */
let currentType   = 'length';
let currentAction = 'comparison';
let currentOp     = '+';

/* ---- Main compute dispatcher ---- */
function compute() {
  const valA  = parseFloat(document.getElementById('val-a').value);
  const valB  = parseFloat(document.getElementById('val-b').value);
  const unitA = document.getElementById('unit-a').value;
  const unitB = document.getElementById('unit-b').value;

  switch (currentAction) {
    case 'comparison':  computeComparison(valA, valB, unitA, unitB);  break;
    case 'conversion':  computeConversion(valA, unitA, unitB);        break;
    case 'arithmetic':  computeArithmetic(valA, valB, unitA, unitB);  break;
  }
}

/* ---- Comparison ---- */
function computeComparison(valA, valB, unitA, unitB) {
  if (!unitA || !unitB || isNaN(valA) || isNaN(valB)) {
    setResult('Select units and enter values to begin', 'default');
    return;
  }

  const baseA    = Units.toBase(valA, unitA, currentType);
  const baseB    = Units.toBase(valB, unitB, currentType);
  const diff     = baseA - baseB;
  const baseUnit = Units.BASE_UNIT[currentType];
  const fmt      = Units.formatNumber;

  let message, style;

  if (Math.abs(diff) < 1e-9) {
    message = `✔  ${valA} ${unitA} = ${valB} ${unitB}  (they are equal)`;
    style   = 'success';
  } else if (diff > 0) {
    message = `${valA} ${unitA}  >  ${valB} ${unitB}   (difference: ${fmt(Math.abs(diff))} ${baseUnit})`;
    style   = 'warning';
  } else {
    message = `${valA} ${unitA}  <  ${valB} ${unitB}   (difference: ${fmt(Math.abs(diff))} ${baseUnit})`;
    style   = 'warning';
  }

  setResult(message, style);
  saveEntry(`Comparison: ${valA} ${unitA} vs ${valB} ${unitB}`, message);
}

/* ---- Conversion ---- */
function computeConversion(valA, unitA, unitB) {
  if (!unitA && !unitB) {
    setResult('Select the source unit and the target unit to convert', 'default');
    return;
  }
  if (!unitA) {
    setResult('Select the source unit (unit A)', 'default');
    return;
  }
  if (!unitB) {
    setResult('Select the target unit to convert into', 'default');
    return;
  }
  if (isNaN(valA)) {
    setResult('Enter a value to convert', 'default');
    return;
  }
  if (unitA === unitB) {
    if (typeof updateConversionDisplay === 'function') updateConversionDisplay(valA + ' ' + unitB);
    setResult(`${valA} ${unitA}  =  ${valA} ${unitB}  (same unit)`, 'success');
    return;
  }

  const result  = Units.convert(valA, unitA, unitB, currentType);
  const formatted = Units.formatNumber(result);
  const message = `${valA} ${unitA}  =  ${formatted} ${unitB}`;

  // Update the inline result display in conversion layout
  if (typeof updateConversionDisplay === 'function') {
    updateConversionDisplay(formatted + ' ' + unitB);
  }

  setResult(message, 'success');
  saveEntry(`Conversion: ${valA} ${unitA} → ${unitB}`, message);
}

/* ---- Arithmetic ---- */
function computeArithmetic(valA, valB, unitA, unitB) {
  if (!unitA || isNaN(valA) || isNaN(valB)) {
    setResult('Enter both values to perform arithmetic', 'default');
    return;
  }

  // Convert B into A's unit before operating (except multiply/divide which are scalar)
  let bInA = valB;
  if (unitB && unitB !== unitA && (currentOp === '+' || currentOp === '-')) {
    bInA = Units.convert(valB, unitB, unitA, currentType);
  }

  let result;
  switch (currentOp) {
    case '+': result = valA + bInA;         break;
    case '-': result = valA - bInA;         break;
    case '*': result = valA * valB;         break;
    case '/':
      if (valB === 0) { setResult('Cannot divide by zero', 'default'); return; }
      result = valA / valB;
      break;
  }

  const opLabel   = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  const resultUnit = (currentOp === '*' || currentOp === '/') ? '' : ' ' + unitA;
  const displayB   = unitB ? `${valB} ${unitB}` : valB;
  const message    = `${valA} ${unitA}  ${opLabel[currentOp]}  ${displayB}  =  ${Units.formatNumber(result)}${resultUnit}`;

  setResult(message, 'success');
  saveEntry(`Arithmetic: ${valA} ${unitA} ${currentOp} ${displayB}`, message);
}

/* ---- Helpers ---- */
function setResult(message, style) {
  const banner = document.getElementById('result-banner');
  banner.textContent = message;
  banner.className   = 'result-banner' + (style && style !== 'default' ? ' ' + style : '');
}

function saveEntry(label, result) {
  if (typeof currentUser === 'undefined' || !currentUser) return;
  Storage.addHistoryEntry(currentUser.email, {
    label,
    result,
    type: currentType,
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
  });
}

/* ---- Operator selection ---- */
function selectOp(btn, op) {
  currentOp = op;
  document.querySelectorAll('[data-op]').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  compute();
}
