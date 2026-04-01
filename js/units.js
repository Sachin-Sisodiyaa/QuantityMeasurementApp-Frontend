/* ============================================================
   units.js — Unit definitions and conversion utilities
   ============================================================ */

const Units = (() => {
  /* All available units per measurement type */
  const UNITS = {
    length:      ['mm', 'cm', 'm', 'km', 'inch', 'foot', 'yard', 'mile'],
    weight:      ['mg', 'g', 'kg', 'ton', 'oz', 'lb'],
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin'],
    volume:      ['ml', 'L', 'm³', 'tsp', 'tbsp', 'cup', 'fl oz', 'gallon'],
  };

  /*
   * Conversion factors to a base unit:
   *   length      → meters
   *   weight      → grams
   *   temperature → handled separately (non-linear)
   *   volume      → millilitres
   */
  const FACTOR = {
    // length
    mm:      0.001,
    cm:      0.01,
    m:       1,
    km:      1000,
    inch:    0.0254,
    foot:    0.3048,
    yard:    0.9144,
    mile:    1609.344,
    // weight
    mg:      0.001,
    g:       1,
    kg:      1000,
    ton:     1_000_000,
    oz:      28.3495,
    lb:      453.592,
    // volume
    ml:      1,
    L:       1000,
    'm³':    1_000_000,
    tsp:     4.92892,
    tbsp:    14.7868,
    cup:     236.588,
    'fl oz': 29.5735,
    gallon:  3785.41,
  };

  /* Base unit label shown in results */
  const BASE_UNIT = {
    length:      'm',
    weight:      'g',
    temperature: '°C',
    volume:      'ml',
  };

  /* ---- Temperature helpers ---- */
  function toCelsius(value, unit) {
    switch (unit) {
      case 'Celsius':    return value;
      case 'Fahrenheit': return (value - 32) * 5 / 9;
      case 'Kelvin':     return value - 273.15;
      default:           return NaN;
    }
  }

  function fromCelsius(value, unit) {
    switch (unit) {
      case 'Celsius':    return value;
      case 'Fahrenheit': return value * 9 / 5 + 32;
      case 'Kelvin':     return value + 273.15;
      default:           return NaN;
    }
  }

  /* ---- Generic conversion to base unit ---- */
  function toBase(value, unit, type) {
    if (type === 'temperature') return toCelsius(value, unit);
    return value * (FACTOR[unit] ?? 1);
  }

  /* ---- Generic conversion from base unit ---- */
  function fromBase(value, unit, type) {
    if (type === 'temperature') return fromCelsius(value, unit);
    return value / (FACTOR[unit] ?? 1);
  }

  /* ---- Direct unit-to-unit conversion ---- */
  function convert(value, fromUnit, toUnit, type) {
    const base = toBase(value, fromUnit, type);
    return fromBase(base, toUnit, type);
  }

  /* ---- Format a number for display ---- */
  function formatNumber(n) {
    if (!isFinite(n) || isNaN(n)) return '–';
    if (Math.abs(n) >= 1e9)                         return n.toExponential(4);
    if (Math.abs(n) < 0.0001 && n !== 0)            return n.toExponential(4);
    // Up to 8 significant figures, strip trailing zeros
    return parseFloat(n.toPrecision(8)).toString();
  }

  return {
    UNITS,
    BASE_UNIT,
    toBase,
    fromBase,
    convert,
    formatNumber,
  };
})();
