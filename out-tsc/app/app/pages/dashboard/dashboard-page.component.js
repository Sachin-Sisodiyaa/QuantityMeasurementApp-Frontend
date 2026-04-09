import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { measurementUnits } from '../../core/models/quantity.models';
import { AuthService } from '../../core/services/auth.service';
import { QuantityService } from '../../core/services/quantity.service';
import { ToastService } from '../../core/services/toast.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
const _forTrack0 = ($index, $item) => $item.key;
function DashboardPageComponent_Conditional_10_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Hi, ");
    i0.ɵɵelementStart(2, "span", 49);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "uppercase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(5, "div", 50);
    i0.ɵɵelementStart(6, "button", 51);
    i0.ɵɵlistener("click", function DashboardPageComponent_Conditional_10_Template_button_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.handleLogout()); });
    i0.ɵɵtext(7, "Logout");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate((ctx_r1.user == null ? null : ctx_r1.user.fullName) ? i0.ɵɵpipeBind1(4, 1, ctx_r1.user == null ? null : ctx_r1.user.fullName) : "USER");
} }
function DashboardPageComponent_Conditional_11_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Hi, ");
    i0.ɵɵelementStart(2, "span", 49);
    i0.ɵɵtext(3, "GUEST");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "button", 51);
    i0.ɵɵlistener("click", function DashboardPageComponent_Conditional_11_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToAuth()); });
    i0.ɵɵtext(5, "Login / Register");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_For_18_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 52);
    i0.ɵɵlistener("click", function DashboardPageComponent_For_18_Template_div_click_0_listener() { const card_r5 = i0.ɵɵrestoreView(_r4).$implicit; const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.selectType(card_r5.key)); });
    i0.ɵɵelementStart(1, "span", 53);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const card_r5 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassProp("active", ctx_r1.currentType === card_r5.key);
    i0.ɵɵattribute("data-type", card_r5.key);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r5.icon);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(card_r5.label);
} }
function DashboardPageComponent_For_40_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const unit_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", unit_r6);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.displayUnit(unit_r6));
} }
function DashboardPageComponent_For_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const unit_r7 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", unit_r7);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.displayUnit(unit_r7));
} }
function DashboardPageComponent_For_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const unit_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", unit_r8);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.displayUnit(unit_r8));
} }
function DashboardPageComponent_For_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 23);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const unit_r9 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("value", unit_r9);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.displayUnit(unit_r9));
} }
function DashboardPageComponent_Conditional_99_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 48);
    i0.ɵɵtext(1, "No calculations yet. Start measuring!");
    i0.ɵɵelementEnd();
} }
function DashboardPageComponent_Conditional_100_For_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 55);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 56);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r10.label);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r10.result);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3("", entry_r10.time, " \u2022 ", entry_r10.date, " \u2022 ", entry_r10.type, "");
} }
function DashboardPageComponent_Conditional_100_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵrepeaterCreate(0, DashboardPageComponent_Conditional_100_For_1_Template, 7, 5, "div", 54, i0.ɵɵrepeaterTrackByIndex);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵrepeater(ctx_r1.historyEntries);
} }
export class DashboardPageComponent {
    authService = inject(AuthService);
    quantityService = inject(QuantityService);
    toastService = inject(ToastService);
    router = inject(Router);
    typeCards = [
        {
            key: 'length',
            label: 'Length',
            icon: '\uD83D\uDCCF',
            measurementType: 'LengthUnit'
        },
        {
            key: 'weight',
            label: 'Weight',
            icon: '\u2696\uFE0F',
            measurementType: 'WeightUnit'
        },
        {
            key: 'temperature',
            label: 'Temperature',
            icon: '\uD83C\uDF21\uFE0F',
            measurementType: 'TemperatureUnit'
        },
        {
            key: 'volume',
            label: 'Volume',
            icon: '\uD83E\uDDF4',
            measurementType: 'VolumeUnit'
        }
    ];
    user = null;
    isAuthenticated = false;
    currentType = 'length';
    currentMeasurementType = 'LengthUnit';
    currentAction = 'comparison';
    currentOp = '+';
    valA = '';
    valB = '';
    unitA = '';
    unitB = '';
    availableUnits = measurementUnits.LengthUnit;
    resultMessage = 'Select units and enter values to begin';
    resultStyle = 'default';
    conversionDisplay = '\u2014';
    historyOpen = false;
    historyEntries = [];
    requestCounter = 0;
    activeRequest = 0;
    constructor() {
        this.refreshAuthState();
        this.selectType('length');
        this.selectAction('comparison');
    }
    selectType(type) {
        const definition = this.typeCards.find((item) => item.key === type);
        if (!definition) {
            return;
        }
        this.currentType = type;
        this.currentMeasurementType = definition.measurementType;
        this.availableUnits = measurementUnits[this.currentMeasurementType];
        this.clearInputs();
        this.compute();
    }
    selectAction(action) {
        this.currentAction = action;
        this.clearInputs();
        this.compute();
    }
    selectOp(op) {
        this.currentOp = op;
        this.compute();
    }
    compute() {
        if (this.currentAction === 'comparison') {
            this.computeComparison();
            return;
        }
        if (this.currentAction === 'conversion') {
            this.computeConversion();
            return;
        }
        this.computeArithmetic();
    }
    toggleHistory() {
        if (!this.ensureAuthenticated('view history')) {
            return;
        }
        this.historyOpen = !this.historyOpen;
        if (this.historyOpen) {
            this.loadHistory();
        }
    }
    closeHistoryIfOutside(event) {
        if (event.target === event.currentTarget) {
            this.historyOpen = false;
        }
    }
    clearHistory() {
        if (!this.ensureAuthenticated('clear history')) {
            return;
        }
        const user = this.user;
        if (!user) {
            return;
        }
        const confirmed = window.confirm('Clear all calculation history? This cannot be undone.');
        if (!confirmed) {
            return;
        }
        localStorage.removeItem(this.getHistoryKey(user.email));
        this.historyEntries = [];
        this.toastService.show('History cleared.');
        this.historyOpen = false;
    }
    handleLogout() {
        this.authService.logout();
        this.refreshAuthState();
        this.historyOpen = false;
        this.historyEntries = [];
        this.toastService.show('Logged out successfully.');
        void this.router.navigateByUrl('/login');
    }
    goToAuth() {
        void this.router.navigateByUrl('/login');
    }
    onEscapePress() {
        if (this.historyOpen) {
            this.historyOpen = false;
        }
    }
    computeComparison() {
        const parsed = this.parseValues({ requiresSecondValue: true, requiresSecondUnit: true });
        if (!parsed) {
            this.setResult('Select units and enter values to begin', 'default');
            return;
        }
        if (!this.ensureAuthenticated('perform comparison operations')) {
            return;
        }
        this.executeBackendOperation('compare', parsed).subscribe({
            next: (response) => {
                const equal = String(response.resultString).toLowerCase() === 'true';
                const baseA = this.toBase(parsed.valA, parsed.unitA, this.currentMeasurementType);
                const baseB = this.toBase(parsed.valB, parsed.unitB, this.currentMeasurementType);
                const diff = Math.abs(baseA - baseB);
                let message;
                let style;
                if (equal) {
                    message =
                        '\u2714  ' +
                            `${parsed.valA} ${parsed.unitA} = ${parsed.valB} ${parsed.unitB} (they are equal)`;
                    style = 'success';
                }
                else if (baseA > baseB) {
                    message =
                        `${parsed.valA} ${parsed.unitA} > ${parsed.valB} ${parsed.unitB} ` +
                            `(difference: ${this.formatNumber(diff)} ${this.baseUnitLabel(this.currentMeasurementType)})`;
                    style = 'warning';
                }
                else {
                    message =
                        `${parsed.valA} ${parsed.unitA} < ${parsed.valB} ${parsed.unitB} ` +
                            `(difference: ${this.formatNumber(diff)} ${this.baseUnitLabel(this.currentMeasurementType)})`;
                    style = 'warning';
                }
                this.setResult(message, style);
                this.addHistoryEntry(`Comparison: ${parsed.valA} ${parsed.unitA} vs ${parsed.valB} ${parsed.unitB}`, message);
            },
            error: (error) => this.handleOperationError(error)
        });
    }
    computeConversion() {
        const valA = this.parseInputValue(this.valA);
        if (!this.unitA && !this.unitB) {
            this.conversionDisplay = '\u2014';
            this.setResult('Select the source unit and the target unit to convert', 'default');
            return;
        }
        if (!this.unitA) {
            this.conversionDisplay = '\u2014';
            this.setResult('Select the source unit (unit A)', 'default');
            return;
        }
        if (!this.unitB) {
            this.conversionDisplay = '\u2014';
            this.setResult('Select the target unit to convert into', 'default');
            return;
        }
        if (Number.isNaN(valA)) {
            this.conversionDisplay = '\u2014';
            this.setResult('Enter a value to convert', 'default');
            return;
        }
        const parsed = this.parseValues({ requiresSecondValue: false, requiresSecondUnit: true });
        if (!parsed) {
            return;
        }
        if (!this.ensureAuthenticated('perform conversion operations')) {
            return;
        }
        if (parsed.unitA === parsed.unitB) {
            const same = `${this.formatNumber(parsed.valA)} ${parsed.unitB}`;
            this.conversionDisplay = same;
            this.setResult(`${parsed.valA} ${parsed.unitA} = ${parsed.valA} ${parsed.unitB} (same unit)`, 'success');
            return;
        }
        this.executeBackendOperation('convert', parsed).subscribe({
            next: (response) => {
                const converted = this.formatNumber(response.resultValue);
                this.conversionDisplay = `${converted} ${parsed.unitB}`;
                const message = `${parsed.valA} ${parsed.unitA} = ${converted} ${parsed.unitB}`;
                this.setResult(message, 'success');
                this.addHistoryEntry(`Conversion: ${parsed.valA} ${parsed.unitA} \u2192 ${parsed.unitB}`, message);
            },
            error: (error) => this.handleOperationError(error)
        });
    }
    computeArithmetic() {
        const parsed = this.parseValues({ requiresSecondValue: true, requiresSecondUnit: false });
        if (!parsed) {
            this.setResult('Enter both values to perform arithmetic', 'default');
            return;
        }
        if (!this.ensureAuthenticated('perform arithmetic operations')) {
            return;
        }
        if (this.currentOp === '*') {
            const local = parsed.valA * parsed.valB;
            const message = `${parsed.valA} ${parsed.unitA} \u00D7 ${parsed.valB} ${parsed.unitB} = ` +
                `${this.formatNumber(local)}`;
            this.setResult(message, 'success');
            this.addHistoryEntry(`Arithmetic: ${parsed.valA} ${parsed.unitA} * ${parsed.valB} ${parsed.unitB}`, message);
            return;
        }
        if (this.currentOp === '/' && parsed.valB === 0) {
            this.setResult('Cannot divide by zero', 'warning');
            return;
        }
        const operationMap = {
            '+': 'add',
            '-': 'subtract',
            '/': 'divide'
        };
        const symbolMap = {
            '+': '+',
            '-': '\u2212',
            '/': '\u00F7'
        };
        const operation = operationMap[this.currentOp];
        this.executeBackendOperation(operation, parsed).subscribe({
            next: (response) => {
                const resultValue = this.formatNumber(response.resultValue);
                const resultUnit = response.resultUnit ? ` ${response.resultUnit}` : '';
                const message = `${parsed.valA} ${parsed.unitA} ${symbolMap[this.currentOp]} ` +
                    `${parsed.valB} ${parsed.unitB} = ${resultValue}${resultUnit}`;
                this.setResult(message, 'success');
                this.addHistoryEntry(`Arithmetic: ${parsed.valA} ${parsed.unitA} ${this.currentOp} ${parsed.valB} ${parsed.unitB}`, message);
            },
            error: (error) => this.handleOperationError(error)
        });
    }
    executeBackendOperation(operation, parsed) {
        const payload = {
            thisQuantityDTO: {
                value: parsed.valA,
                unit: parsed.unitA,
                measurementType: this.currentMeasurementType
            },
            thatQuantityDTO: {
                value: operation === 'convert' ? 1 : parsed.valB,
                unit: parsed.unitB || parsed.unitA,
                measurementType: this.currentMeasurementType
            }
        };
        const requestId = ++this.requestCounter;
        this.activeRequest = requestId;
        return {
            subscribe: (handlers) => {
                this.quantityService.executeOperation(operation, payload).subscribe({
                    next: (result) => {
                        if (requestId !== this.activeRequest) {
                            return;
                        }
                        handlers.next(result);
                    },
                    error: (error) => {
                        if (requestId !== this.activeRequest) {
                            return;
                        }
                        handlers.error(error);
                    }
                });
            }
        };
    }
    parseValues(options) {
        const valA = this.parseInputValue(this.valA);
        const valB = this.parseInputValue(this.valB);
        if (!this.unitA || Number.isNaN(valA)) {
            return null;
        }
        if (options.requiresSecondUnit && !this.unitB) {
            return null;
        }
        if (options.requiresSecondValue && Number.isNaN(valB)) {
            return null;
        }
        return {
            valA,
            valB: Number.isNaN(valB) ? 1 : valB,
            unitA: this.unitA,
            unitB: this.unitB
        };
    }
    parseInputValue(raw) {
        if (raw === null || raw === undefined) {
            return Number.NaN;
        }
        if (typeof raw === 'number') {
            return Number.isFinite(raw) ? raw : Number.NaN;
        }
        const trimmed = raw.trim();
        if (!trimmed) {
            return Number.NaN;
        }
        const parsed = Number.parseFloat(trimmed);
        return Number.isFinite(parsed) ? parsed : Number.NaN;
    }
    setResult(message, style) {
        this.resultMessage = message;
        this.resultStyle = style;
    }
    addHistoryEntry(label, result) {
        if (!this.user) {
            return;
        }
        const nextEntry = {
            label,
            result,
            type: this.currentType,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        };
        const history = this.readHistory();
        const first = history[0];
        if (first && first.label === nextEntry.label && first.result === nextEntry.result) {
            return;
        }
        history.unshift(nextEntry);
        if (history.length > 100) {
            history.pop();
        }
        localStorage.setItem(this.getHistoryKey(this.user.email), JSON.stringify(history));
        if (this.historyOpen) {
            this.historyEntries = history;
        }
    }
    loadHistory() {
        this.historyEntries = this.readHistory();
    }
    readHistory() {
        if (!this.user) {
            return [];
        }
        const raw = localStorage.getItem(this.getHistoryKey(this.user.email));
        if (!raw) {
            return [];
        }
        try {
            return JSON.parse(raw);
        }
        catch {
            return [];
        }
    }
    getHistoryKey(email) {
        return `qm_history_${email}`;
    }
    clearInputs() {
        this.valA = '';
        this.valB = '';
        this.unitA = '';
        this.unitB = '';
        this.conversionDisplay = '\u2014';
        this.setResult('Select units and enter values to begin', 'default');
    }
    handleOperationError(error) {
        const apiError = error.error;
        const message = apiError?.message ?? 'Operation failed. Please check your input values.';
        this.setResult(message, 'warning');
    }
    ensureAuthenticated(action) {
        this.refreshAuthState();
        if (this.isAuthenticated && this.user) {
            return true;
        }
        this.setResult('Login or register to continue with operations.', 'warning');
        this.toastService.show(`Please login or register to ${action}.`);
        void this.router.navigateByUrl('/login');
        return false;
    }
    refreshAuthState() {
        this.user = this.authService.getCurrentUser();
        this.isAuthenticated = this.authService.isAuthenticated() && !!this.user;
    }
    toBase(value, unit, measurementType) {
        if (measurementType === 'TemperatureUnit') {
            return this.temperatureToCelsius(value, unit);
        }
        const factor = this.getLinearFactor(unit);
        return value * factor;
    }
    temperatureToCelsius(value, unit) {
        if (unit === 'CELSIUS')
            return value;
        if (unit === 'FAHRENHEIT')
            return ((value - 32) * 5) / 9;
        if (unit === 'KELVIN')
            return value - 273.15;
        return value;
    }
    getLinearFactor(unit) {
        const map = {
            FEET: 0.3048,
            INCHES: 0.0254,
            YARDS: 0.9144,
            CENTIMETERS: 0.01,
            KILOGRAM: 1000,
            GRAM: 1,
            POUND: 453.592,
            LITRE: 1000,
            MILLILITRE: 1,
            GALLON: 3785.41
        };
        return map[unit] ?? 1;
    }
    baseUnitLabel(measurementType) {
        if (measurementType === 'LengthUnit')
            return 'm';
        if (measurementType === 'WeightUnit')
            return 'g';
        if (measurementType === 'VolumeUnit')
            return 'ml';
        return '\u00B0C';
    }
    formatNumber(value) {
        if (!Number.isFinite(value) || Number.isNaN(value)) {
            return '\u2013';
        }
        if (Math.abs(value) >= 1e9) {
            return value.toExponential(4);
        }
        if (Math.abs(value) < 0.0001 && value !== 0) {
            return value.toExponential(4);
        }
        return Number.parseFloat(value.toPrecision(8)).toString();
    }
    displayUnit(unit) {
        return unit
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }
    static ɵfac = function DashboardPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || DashboardPageComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DashboardPageComponent, selectors: [["app-dashboard-page"]], hostBindings: function DashboardPageComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("keydown.escape", function DashboardPageComponent_keydown_escape_HostBindingHandler() { return ctx.onEscapePress(); }, false, i0.ɵɵresolveDocument);
        } }, decls: 101, vars: 37, consts: [[1, "navbar"], [1, "navbar-brand"], ["width", "26", "height", "26", "viewBox", "0 0 26 26", "fill", "none"], ["x", "2", "y", "11", "width", "22", "height", "4", "rx", "2", "fill", "white", "opacity", "0.9"], ["x", "2", "y", "11", "width", "3", "height", "9", "rx", "1.5", "fill", "white", "opacity", "0.7"], ["x", "21", "y", "6", "width", "3", "height", "14", "rx", "1.5", "fill", "white", "opacity", "0.7"], ["cx", "13", "cy", "8", "r", "3.5", "fill", "#fbbf24"], [1, "brand-text"], [1, "navbar-user"], [1, "main-content"], [1, "section-card"], [1, "section-label"], [1, "type-grid"], [1, "type-card", 3, "active"], [1, "action-tabs"], ["type", "button", 1, "action-tab", 3, "click"], ["id", "conversion-layout"], [1, "conversion-row"], [1, "conversion-val-col"], [1, "value-label-sm"], ["type", "number", "id", "val-a-conv", "placeholder", "Enter value", "name", "valAConv", 1, "value-input-big", 3, "ngModelChange", "input", "ngModel"], ["id", "unit-a-conv", "name", "unitAConv", 1, "unit-select", 3, "ngModelChange", "change", "ngModel"], ["value", ""], [3, "value"], [1, "conversion-arrow"], [1, "conversion-unit-col"], ["id", "conv-result-display", 1, "conversion-result-display"], ["id", "unit-b-conv", "name", "unitBConv", 1, "unit-select", 3, "ngModelChange", "change", "ngModel"], ["id", "default-layout", 1, "values-grid"], [1, "value-col"], ["type", "number", "id", "val-a", "placeholder", "Enter value", "name", "valA", 1, "value-input-big", 3, "ngModelChange", "input", "ngModel"], ["id", "unit-a", "name", "unitA", 1, "unit-select", 3, "ngModelChange", "change", "ngModel"], ["id", "val-b-col", 1, "value-col"], ["id", "val-b-label", 1, "value-label-sm"], ["type", "number", "id", "val-b", "placeholder", "Enter value", "name", "valB", 1, "value-input-big", 3, "ngModelChange", "input", "ngModel"], ["id", "unit-b", "name", "unitB", 1, "unit-select", 3, "ngModelChange", "change", "ngModel"], ["id", "arith-op-row", 1, "arith-op-row"], [1, "section-label", 2, "margin-bottom", "10px"], [1, "op-tabs"], ["id", "result-banner", 1, "result-banner"], ["type", "button", "title", "View History", "aria-label", "View calculation history", 1, "fab", 3, "click"], ["id", "history-overlay", 1, "history-overlay", 3, "click"], ["role", "dialog", "aria-label", "Calculation history", 1, "history-panel"], [1, "history-header"], [1, "history-header-actions"], ["type", "button", 1, "btn-clear-history", 3, "click"], ["type", "button", 1, "btn-close-history", 3, "click"], ["id", "history-list"], [1, "history-empty"], ["id", "display-name"], [1, "dot-online"], ["type", "button", 1, "btn-logout", 3, "click"], [1, "type-card", 3, "click"], [1, "type-icon"], [1, "history-item"], [1, "history-result"], [1, "history-meta"]], template: function DashboardPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "nav", 0)(1, "div", 1);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(2, "svg", 2);
            i0.ɵɵelement(3, "rect", 3)(4, "rect", 4)(5, "rect", 5)(6, "circle", 6);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(7, "span", 7);
            i0.ɵɵtext(8, "QUANTITY MEASUREMENT");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 8);
            i0.ɵɵtemplate(10, DashboardPageComponent_Conditional_10_Template, 8, 3)(11, DashboardPageComponent_Conditional_11_Template, 6, 0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "main", 9)(13, "section", 10)(14, "div", 11);
            i0.ɵɵtext(15, "Choose Type");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "div", 12);
            i0.ɵɵrepeaterCreate(17, DashboardPageComponent_For_18_Template, 5, 5, "div", 13, _forTrack0);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "section", 10)(20, "div", 11);
            i0.ɵɵtext(21, "Choose Action");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "div", 14)(23, "button", 15);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_23_listener() { return ctx.selectAction("comparison"); });
            i0.ɵɵtext(24, " Comparison ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "button", 15);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_25_listener() { return ctx.selectAction("conversion"); });
            i0.ɵɵtext(26, " Conversion ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "button", 15);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_27_listener() { return ctx.selectAction("arithmetic"); });
            i0.ɵɵtext(28, " Arithmetic ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(29, "section", 10)(30, "div", 16)(31, "div", 17)(32, "div", 18)(33, "div", 19);
            i0.ɵɵtext(34, "Value");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "input", 20);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPageComponent_Template_input_ngModelChange_35_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.valA, $event) || (ctx.valA = $event); return $event; });
            i0.ɵɵlistener("input", function DashboardPageComponent_Template_input_input_35_listener() { return ctx.compute(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(36, "select", 21);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPageComponent_Template_select_ngModelChange_36_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.unitA, $event) || (ctx.unitA = $event); return $event; });
            i0.ɵɵlistener("change", function DashboardPageComponent_Template_select_change_36_listener() { return ctx.compute(); });
            i0.ɵɵelementStart(37, "option", 22);
            i0.ɵɵtext(38, "From unit");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(39, DashboardPageComponent_For_40_Template, 2, 2, "option", 23, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(41, "div", 24);
            i0.ɵɵtext(42, "\u2192");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(43, "div", 25)(44, "div", 19);
            i0.ɵɵtext(45, "Convert To");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(46, "div", 26);
            i0.ɵɵtext(47);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(48, "select", 27);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPageComponent_Template_select_ngModelChange_48_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.unitB, $event) || (ctx.unitB = $event); return $event; });
            i0.ɵɵlistener("change", function DashboardPageComponent_Template_select_change_48_listener() { return ctx.compute(); });
            i0.ɵɵelementStart(49, "option", 22);
            i0.ɵɵtext(50, "To unit");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(51, DashboardPageComponent_For_52_Template, 2, 2, "option", 23, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()()();
            i0.ɵɵelementStart(53, "div", 28)(54, "div", 29)(55, "div", 19);
            i0.ɵɵtext(56, "Value A");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(57, "input", 30);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPageComponent_Template_input_ngModelChange_57_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.valA, $event) || (ctx.valA = $event); return $event; });
            i0.ɵɵlistener("input", function DashboardPageComponent_Template_input_input_57_listener() { return ctx.compute(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(58, "select", 31);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPageComponent_Template_select_ngModelChange_58_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.unitA, $event) || (ctx.unitA = $event); return $event; });
            i0.ɵɵlistener("change", function DashboardPageComponent_Template_select_change_58_listener() { return ctx.compute(); });
            i0.ɵɵelementStart(59, "option", 22);
            i0.ɵɵtext(60, "Select unit");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(61, DashboardPageComponent_For_62_Template, 2, 2, "option", 23, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(63, "div", 32)(64, "div", 33);
            i0.ɵɵtext(65, "Value B");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(66, "input", 34);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPageComponent_Template_input_ngModelChange_66_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.valB, $event) || (ctx.valB = $event); return $event; });
            i0.ɵɵlistener("input", function DashboardPageComponent_Template_input_input_66_listener() { return ctx.compute(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(67, "select", 35);
            i0.ɵɵtwoWayListener("ngModelChange", function DashboardPageComponent_Template_select_ngModelChange_67_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.unitB, $event) || (ctx.unitB = $event); return $event; });
            i0.ɵɵlistener("change", function DashboardPageComponent_Template_select_change_67_listener() { return ctx.compute(); });
            i0.ɵɵelementStart(68, "option", 22);
            i0.ɵɵtext(69, "Select unit");
            i0.ɵɵelementEnd();
            i0.ɵɵrepeaterCreate(70, DashboardPageComponent_For_71_Template, 2, 2, "option", 23, i0.ɵɵrepeaterTrackByIdentity);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(72, "div", 36)(73, "div", 37);
            i0.ɵɵtext(74, "Operator");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(75, "div", 38)(76, "button", 15);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_76_listener() { return ctx.selectOp("+"); });
            i0.ɵɵtext(77, " + Add ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(78, "button", 15);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_78_listener() { return ctx.selectOp("-"); });
            i0.ɵɵtext(79, " \u2212 Subtract ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(80, "button", 15);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_80_listener() { return ctx.selectOp("*"); });
            i0.ɵɵtext(81, " \u00D7 Multiply ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(82, "button", 15);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_82_listener() { return ctx.selectOp("/"); });
            i0.ɵɵtext(83, " \u00F7 Divide ");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(84, "div", 39);
            i0.ɵɵtext(85);
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(86, "button", 40);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_86_listener() { return ctx.toggleHistory(); });
            i0.ɵɵtext(87, " \uF551\n");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(88, "div", 41);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_div_click_88_listener($event) { return ctx.closeHistoryIfOutside($event); });
            i0.ɵɵelementStart(89, "div", 42)(90, "div", 43)(91, "h3");
            i0.ɵɵtext(92, "Calculation History");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(93, "div", 44)(94, "button", 45);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_94_listener() { return ctx.clearHistory(); });
            i0.ɵɵtext(95, "\uF5D1 Clear All");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(96, "button", 46);
            i0.ɵɵlistener("click", function DashboardPageComponent_Template_button_click_96_listener() { return ctx.toggleHistory(); });
            i0.ɵɵtext(97, "\u2715");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(98, "div", 47);
            i0.ɵɵtemplate(99, DashboardPageComponent_Conditional_99_Template, 2, 0, "div", 48)(100, DashboardPageComponent_Conditional_100_Template, 2, 0);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵconditional(ctx.isAuthenticated ? 10 : 11);
            i0.ɵɵadvance(7);
            i0.ɵɵrepeater(ctx.typeCards);
            i0.ɵɵadvance(6);
            i0.ɵɵclassProp("active", ctx.currentAction === "comparison");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentAction === "conversion");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentAction === "arithmetic");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("hidden", ctx.currentAction !== "conversion");
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.valA);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.unitA);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.availableUnits);
            i0.ɵɵadvance(8);
            i0.ɵɵtextInterpolate(ctx.conversionDisplay);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.unitB);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.availableUnits);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("hidden", ctx.currentAction === "conversion");
            i0.ɵɵadvance(4);
            i0.ɵɵtwoWayProperty("ngModel", ctx.valA);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.unitA);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.availableUnits);
            i0.ɵɵadvance(5);
            i0.ɵɵtwoWayProperty("ngModel", ctx.valB);
            i0.ɵɵadvance();
            i0.ɵɵtwoWayProperty("ngModel", ctx.unitB);
            i0.ɵɵadvance(3);
            i0.ɵɵrepeater(ctx.availableUnits);
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("hidden", ctx.currentAction !== "arithmetic");
            i0.ɵɵadvance(4);
            i0.ɵɵclassProp("active", ctx.currentOp === "+");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentOp === "-");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentOp === "*");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("active", ctx.currentOp === "/");
            i0.ɵɵadvance(2);
            i0.ɵɵclassProp("success", ctx.resultStyle === "success")("warning", ctx.resultStyle === "warning");
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", ctx.resultMessage, " ");
            i0.ɵɵadvance(3);
            i0.ɵɵclassProp("open", ctx.historyOpen);
            i0.ɵɵadvance(11);
            i0.ɵɵconditional(!ctx.historyEntries.length ? 99 : 100);
        } }, dependencies: [CommonModule, i1.UpperCasePipe, FormsModule, i2.NgSelectOption, i2.ɵNgSelectMultipleOption, i2.DefaultValueAccessor, i2.NumberValueAccessor, i2.SelectControlValueAccessor, i2.NgControlStatus, i2.NgModel], styles: [".navbar[_ngcontent-%COMP%] {\n  background: var(--blue);\n  color: white;\n  padding: 0 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 56px;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  box-shadow: 0 2px 16px rgba(61, 76, 206, 0.2);\n}\n\n.navbar-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-family: var(--font-display);\n  font-weight: 900;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n}\n\n.navbar-user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.dot-online[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #fbbf24;\n  flex-shrink: 0;\n}\n\n.btn-logout[_ngcontent-%COMP%] {\n  height: 34px;\n  padding: 0 18px;\n  border: 1.5px solid rgba(255, 255, 255, 0.5);\n  border-radius: 8px;\n  background: transparent;\n  color: white;\n  font-family: var(--font-display);\n  font-size: 13px;\n  font-weight: 700;\n  transition: background 0.2s;\n}\n\n.btn-logout[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.15);\n}\n\n.main-content[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 28px 20px;\n  max-width: 880px;\n  margin: 0 auto;\n  width: 100%;\n}\n\n.section-card[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: var(--radius);\n  padding: 24px;\n  box-shadow: var(--shadow);\n  margin-bottom: 20px;\n}\n\n.section-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n  margin-bottom: 16px;\n}\n\n.type-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n}\n\n.type-card[_ngcontent-%COMP%] {\n  border: 1.5px solid var(--border);\n  border-radius: 12px;\n  padding: 18px 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  transition: border-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;\n  background: var(--white);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-muted);\n  user-select: none;\n}\n\n.type-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--blue);\n  color: var(--blue);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 14px rgba(61, 76, 206, 0.12);\n}\n\n.type-card.active[_ngcontent-%COMP%] {\n  border-color: var(--blue);\n  border-width: 2px;\n  color: var(--blue);\n  background: var(--blue-light);\n}\n\n.type-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  line-height: 1;\n}\n\n.action-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.action-tab[_ngcontent-%COMP%] {\n  padding: 8px 22px;\n  border-radius: 8px;\n  border: 1.5px solid var(--border);\n  font-family: var(--font-display);\n  font-size: 13px;\n  font-weight: 700;\n  background: var(--white);\n  color: var(--text-muted);\n  transition: background 0.2s, border-color 0.2s, color 0.2s;\n}\n\n.action-tab.active[_ngcontent-%COMP%] {\n  background: var(--blue);\n  color: white;\n  border-color: var(--blue);\n}\n\n.action-tab[_ngcontent-%COMP%]:hover:not(.active) {\n  border-color: var(--blue);\n  color: var(--blue);\n}\n\n.values-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n\n.value-col[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.value-label-sm[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n  margin-bottom: 8px;\n}\n\n.value-input-big[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  outline: none;\n  font-family: var(--font-display);\n  font-size: 32px;\n  font-weight: 800;\n  color: var(--text);\n  background: transparent;\n  margin-bottom: 10px;\n  -moz-appearance: textfield;\n}\n\n.value-input-big[_ngcontent-%COMP%]::-webkit-outer-spin-button, \n.value-input-big[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n\n.value-input-big[_ngcontent-%COMP%]::placeholder {\n  color: #d1d5db;\n}\n\n.unit-select[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  padding: 0 14px;\n  font-size: 14px;\n  color: var(--text);\n  background: #fafafa;\n  cursor: pointer;\n  outline: none;\n  transition: border-color 0.2s;\n  appearance: auto;\n}\n\n.unit-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--blue);\n}\n\n.arith-op-row[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n\n.op-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.result-banner[_ngcontent-%COMP%] {\n  background: var(--blue-light);\n  border-left: 4px solid var(--blue);\n  border-radius: 0 12px 12px 0;\n  padding: 16px 20px;\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--blue);\n  margin-top: 20px;\n  min-height: 56px;\n  display: flex;\n  align-items: center;\n  transition: background 0.3s, border-color 0.3s, color 0.3s;\n  line-height: 1.5;\n}\n\n.result-banner.success[_ngcontent-%COMP%] {\n  background: #f0fdf4;\n  border-color: var(--success);\n  color: #065f46;\n}\n\n.result-banner.warning[_ngcontent-%COMP%] {\n  background: #fffbeb;\n  border-color: var(--warning);\n  color: #92400e;\n}\n\n.fab[_ngcontent-%COMP%] {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  border: none;\n  background: var(--blue);\n  color: white;\n  box-shadow: 0 4px 16px rgba(61, 76, 206, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  transition: transform 0.2s, box-shadow 0.2s;\n  z-index: 200;\n}\n\n.fab[_ngcontent-%COMP%]:hover {\n  transform: scale(1.08);\n  box-shadow: 0 8px 24px rgba(61, 76, 206, 0.42);\n}\n\n.history-overlay[_ngcontent-%COMP%] {\n  display: none;\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  z-index: 300;\n  align-items: flex-end;\n  justify-content: center;\n}\n\n.history-overlay.open[_ngcontent-%COMP%] {\n  display: flex;\n}\n\n.history-panel[_ngcontent-%COMP%] {\n  background: var(--white);\n  border-radius: 20px 20px 0 0;\n  padding: 24px;\n  width: 100%;\n  max-width: 620px;\n  max-height: 72vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_slide-up 0.25s ease;\n}\n\n@keyframes _ngcontent-%COMP%_slide-up {\n  from {\n    transform: translateY(100%);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n\n.history-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n\n.history-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 18px;\n  font-weight: 800;\n}\n\n.btn-close-history[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 22px;\n  cursor: pointer;\n  color: var(--text-muted);\n  line-height: 1;\n  transition: color 0.2s;\n}\n\n.btn-close-history[_ngcontent-%COMP%]:hover {\n  color: var(--text);\n}\n\n.history-item[_ngcontent-%COMP%] {\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border);\n  font-size: 13px;\n  color: var(--text-muted);\n}\n\n.history-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.history-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--text);\n  font-weight: 600;\n}\n\n.history-item[_ngcontent-%COMP%]   .history-result[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 13px;\n  color: var(--text);\n}\n\n.history-item[_ngcontent-%COMP%]   .history-meta[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  font-size: 11px;\n  color: #aaa;\n}\n\n.history-empty[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 32px 0;\n  font-size: 14px;\n}\n\n.conversion-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: 16px;\n}\n\n.conversion-val-col[_ngcontent-%COMP%] {\n  flex: 1.2;\n  display: flex;\n  flex-direction: column;\n}\n\n.conversion-unit-col[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.conversion-arrow[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--blue);\n  padding-bottom: 10px;\n  flex-shrink: 0;\n  line-height: 1;\n  align-self: center;\n}\n\n.conversion-result-display[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 32px;\n  font-weight: 800;\n  color: var(--blue);\n  margin-bottom: 10px;\n  min-height: 42px;\n  display: flex;\n  align-items: center;\n  letter-spacing: -0.5px;\n}\n\n.history-header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.btn-clear-history[_ngcontent-%COMP%] {\n  background: var(--red-light);\n  border: 1.5px solid #fca5a5;\n  border-radius: 8px;\n  padding: 6px 14px;\n  font-family: var(--font-display);\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--red);\n  cursor: pointer;\n  transition: background 0.2s, border-color 0.2s;\n  white-space: nowrap;\n}\n\n.btn-clear-history[_ngcontent-%COMP%]:hover {\n  background: #fee2e2;\n  border-color: var(--red);\n}\n\n@media (max-width: 700px) {\n  .type-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .values-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n\n  .brand-text[_ngcontent-%COMP%] {\n    display: none;\n  }\n\n  .main-content[_ngcontent-%COMP%] {\n    padding: 16px 12px;\n  }\n\n  .navbar[_ngcontent-%COMP%] {\n    padding: 0 16px;\n  }\n}\n\n@media (max-width: 500px) {\n  .conversion-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  .conversion-arrow[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n@media (max-width: 420px) {\n  .action-tab[_ngcontent-%COMP%] {\n    padding: 8px 14px;\n    font-size: 12px;\n  }\n\n  .value-input-big[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n\n  .result-banner[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n}"] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashboardPageComponent, [{
        type: Component,
        args: [{ selector: 'app-dashboard-page', standalone: true, imports: [CommonModule, FormsModule], template: "<nav class=\"navbar\">\n  <div class=\"navbar-brand\">\n    <svg width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\">\n      <rect x=\"2\" y=\"11\" width=\"22\" height=\"4\" rx=\"2\" fill=\"white\" opacity=\"0.9\" />\n      <rect x=\"2\" y=\"11\" width=\"3\" height=\"9\" rx=\"1.5\" fill=\"white\" opacity=\"0.7\" />\n      <rect x=\"21\" y=\"6\" width=\"3\" height=\"14\" rx=\"1.5\" fill=\"white\" opacity=\"0.7\" />\n      <circle cx=\"13\" cy=\"8\" r=\"3.5\" fill=\"#fbbf24\" />\n    </svg>\n    <span class=\"brand-text\">QUANTITY MEASUREMENT</span>\n  </div>\n\n  <div class=\"navbar-user\">\n    @if (isAuthenticated) {\n      <span>Hi, <span id=\"display-name\">{{ user?.fullName ? (user?.fullName | uppercase) : 'USER' }}</span></span>\n      <div class=\"dot-online\"></div>\n      <button class=\"btn-logout\" type=\"button\" (click)=\"handleLogout()\">Logout</button>\n    } @else {\n      <span>Hi, <span id=\"display-name\">GUEST</span></span>\n      <button class=\"btn-logout\" type=\"button\" (click)=\"goToAuth()\">Login / Register</button>\n    }\n  </div>\n</nav>\n\n<main class=\"main-content\">\n  <section class=\"section-card\">\n    <div class=\"section-label\">Choose Type</div>\n    <div class=\"type-grid\">\n      @for (card of typeCards; track card.key) {\n        <div\n          class=\"type-card\"\n          [class.active]=\"currentType === card.key\"\n          [attr.data-type]=\"card.key\"\n          (click)=\"selectType(card.key)\"\n        >\n          <span class=\"type-icon\">{{ card.icon }}</span>\n          <span>{{ card.label }}</span>\n        </div>\n      }\n    </div>\n  </section>\n\n  <section class=\"section-card\">\n    <div class=\"section-label\">Choose Action</div>\n    <div class=\"action-tabs\">\n      <button\n        class=\"action-tab\"\n        [class.active]=\"currentAction === 'comparison'\"\n        type=\"button\"\n        (click)=\"selectAction('comparison')\"\n      >\n        Comparison\n      </button>\n      <button\n        class=\"action-tab\"\n        [class.active]=\"currentAction === 'conversion'\"\n        type=\"button\"\n        (click)=\"selectAction('conversion')\"\n      >\n        Conversion\n      </button>\n      <button\n        class=\"action-tab\"\n        [class.active]=\"currentAction === 'arithmetic'\"\n        type=\"button\"\n        (click)=\"selectAction('arithmetic')\"\n      >\n        Arithmetic\n      </button>\n    </div>\n  </section>\n\n  <section class=\"section-card\">\n    <div id=\"conversion-layout\" [class.hidden]=\"currentAction !== 'conversion'\">\n      <div class=\"conversion-row\">\n        <div class=\"conversion-val-col\">\n          <div class=\"value-label-sm\">Value</div>\n          <input\n            class=\"value-input-big\"\n            type=\"number\"\n            id=\"val-a-conv\"\n            placeholder=\"Enter value\"\n            [(ngModel)]=\"valA\"\n            name=\"valAConv\"\n            (input)=\"compute()\"\n          />\n          <select\n            class=\"unit-select\"\n            id=\"unit-a-conv\"\n            [(ngModel)]=\"unitA\"\n            name=\"unitAConv\"\n            (change)=\"compute()\"\n          >\n            <option value=\"\">From unit</option>\n            @for (unit of availableUnits; track unit) {\n              <option [value]=\"unit\">{{ displayUnit(unit) }}</option>\n            }\n          </select>\n        </div>\n\n        <div class=\"conversion-arrow\">&#8594;</div>\n\n        <div class=\"conversion-unit-col\">\n          <div class=\"value-label-sm\">Convert To</div>\n          <div class=\"conversion-result-display\" id=\"conv-result-display\">{{ conversionDisplay }}</div>\n          <select\n            class=\"unit-select\"\n            id=\"unit-b-conv\"\n            [(ngModel)]=\"unitB\"\n            name=\"unitBConv\"\n            (change)=\"compute()\"\n          >\n            <option value=\"\">To unit</option>\n            @for (unit of availableUnits; track unit) {\n              <option [value]=\"unit\">{{ displayUnit(unit) }}</option>\n            }\n          </select>\n        </div>\n      </div>\n    </div>\n\n    <div id=\"default-layout\" class=\"values-grid\" [class.hidden]=\"currentAction === 'conversion'\">\n      <div class=\"value-col\">\n        <div class=\"value-label-sm\">Value A</div>\n        <input\n          class=\"value-input-big\"\n          type=\"number\"\n          id=\"val-a\"\n          placeholder=\"Enter value\"\n          [(ngModel)]=\"valA\"\n          name=\"valA\"\n          (input)=\"compute()\"\n        />\n        <select\n          class=\"unit-select\"\n          id=\"unit-a\"\n          [(ngModel)]=\"unitA\"\n          name=\"unitA\"\n          (change)=\"compute()\"\n        >\n          <option value=\"\">Select unit</option>\n          @for (unit of availableUnits; track unit) {\n            <option [value]=\"unit\">{{ displayUnit(unit) }}</option>\n          }\n        </select>\n      </div>\n\n      <div class=\"value-col\" id=\"val-b-col\">\n        <div class=\"value-label-sm\" id=\"val-b-label\">Value B</div>\n        <input\n          class=\"value-input-big\"\n          type=\"number\"\n          id=\"val-b\"\n          placeholder=\"Enter value\"\n          [(ngModel)]=\"valB\"\n          name=\"valB\"\n          (input)=\"compute()\"\n        />\n        <select\n          class=\"unit-select\"\n          id=\"unit-b\"\n          [(ngModel)]=\"unitB\"\n          name=\"unitB\"\n          (change)=\"compute()\"\n        >\n          <option value=\"\">Select unit</option>\n          @for (unit of availableUnits; track unit) {\n            <option [value]=\"unit\">{{ displayUnit(unit) }}</option>\n          }\n        </select>\n      </div>\n    </div>\n\n    <div id=\"arith-op-row\" class=\"arith-op-row\" [class.hidden]=\"currentAction !== 'arithmetic'\">\n      <div class=\"section-label\" style=\"margin-bottom: 10px\">Operator</div>\n      <div class=\"op-tabs\">\n        <button class=\"action-tab\" [class.active]=\"currentOp === '+'\" type=\"button\" (click)=\"selectOp('+')\">\n          + Add\n        </button>\n        <button class=\"action-tab\" [class.active]=\"currentOp === '-'\" type=\"button\" (click)=\"selectOp('-')\">\n          &#8722; Subtract\n        </button>\n        <button class=\"action-tab\" [class.active]=\"currentOp === '*'\" type=\"button\" (click)=\"selectOp('*')\">\n          &#215; Multiply\n        </button>\n        <button class=\"action-tab\" [class.active]=\"currentOp === '/'\" type=\"button\" (click)=\"selectOp('/')\">\n          &#247; Divide\n        </button>\n      </div>\n    </div>\n\n    <div class=\"result-banner\" id=\"result-banner\" [class.success]=\"resultStyle === 'success'\" [class.warning]=\"resultStyle === 'warning'\">\n      {{ resultMessage }}\n    </div>\n  </section>\n</main>\n\n<button class=\"fab\" type=\"button\" (click)=\"toggleHistory()\" title=\"View History\" aria-label=\"View calculation history\">\n  &#128337;\n</button>\n\n<div\n  class=\"history-overlay\"\n  id=\"history-overlay\"\n  [class.open]=\"historyOpen\"\n  (click)=\"closeHistoryIfOutside($event)\"\n>\n  <div class=\"history-panel\" role=\"dialog\" aria-label=\"Calculation history\">\n    <div class=\"history-header\">\n      <h3>Calculation History</h3>\n      <div class=\"history-header-actions\">\n        <button class=\"btn-clear-history\" type=\"button\" (click)=\"clearHistory()\">&#128465; Clear All</button>\n        <button class=\"btn-close-history\" type=\"button\" (click)=\"toggleHistory()\">&#10005;</button>\n      </div>\n    </div>\n\n    <div id=\"history-list\">\n      @if (!historyEntries.length) {\n        <div class=\"history-empty\">No calculations yet. Start measuring!</div>\n      } @else {\n        @for (entry of historyEntries; track $index) {\n          <div class=\"history-item\">\n            <strong>{{ entry.label }}</strong>\n            <div class=\"history-result\">{{ entry.result }}</div>\n            <div class=\"history-meta\">{{ entry.time }} &bull; {{ entry.date }} &bull; {{ entry.type }}</div>\n          </div>\n        }\n      }\n    </div>\n  </div>\n</div>\r\n", styles: [".navbar {\n  background: var(--blue);\n  color: white;\n  padding: 0 24px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  height: 56px;\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  box-shadow: 0 2px 16px rgba(61, 76, 206, 0.2);\n}\n\n.navbar-brand {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-family: var(--font-display);\n  font-weight: 900;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n}\n\n.navbar-user {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.dot-online {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #fbbf24;\n  flex-shrink: 0;\n}\n\n.btn-logout {\n  height: 34px;\n  padding: 0 18px;\n  border: 1.5px solid rgba(255, 255, 255, 0.5);\n  border-radius: 8px;\n  background: transparent;\n  color: white;\n  font-family: var(--font-display);\n  font-size: 13px;\n  font-weight: 700;\n  transition: background 0.2s;\n}\n\n.btn-logout:hover {\n  background: rgba(255, 255, 255, 0.15);\n}\n\n.main-content {\n  flex: 1;\n  padding: 28px 20px;\n  max-width: 880px;\n  margin: 0 auto;\n  width: 100%;\n}\n\n.section-card {\n  background: var(--white);\n  border-radius: var(--radius);\n  padding: 24px;\n  box-shadow: var(--shadow);\n  margin-bottom: 20px;\n}\n\n.section-label {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n  margin-bottom: 16px;\n}\n\n.type-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n}\n\n.type-card {\n  border: 1.5px solid var(--border);\n  border-radius: 12px;\n  padding: 18px 12px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  cursor: pointer;\n  transition: border-color 0.2s, color 0.2s, transform 0.2s, box-shadow 0.2s;\n  background: var(--white);\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--text-muted);\n  user-select: none;\n}\n\n.type-card:hover {\n  border-color: var(--blue);\n  color: var(--blue);\n  transform: translateY(-2px);\n  box-shadow: 0 4px 14px rgba(61, 76, 206, 0.12);\n}\n\n.type-card.active {\n  border-color: var(--blue);\n  border-width: 2px;\n  color: var(--blue);\n  background: var(--blue-light);\n}\n\n.type-icon {\n  font-size: 28px;\n  line-height: 1;\n}\n\n.action-tabs {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.action-tab {\n  padding: 8px 22px;\n  border-radius: 8px;\n  border: 1.5px solid var(--border);\n  font-family: var(--font-display);\n  font-size: 13px;\n  font-weight: 700;\n  background: var(--white);\n  color: var(--text-muted);\n  transition: background 0.2s, border-color 0.2s, color 0.2s;\n}\n\n.action-tab.active {\n  background: var(--blue);\n  color: white;\n  border-color: var(--blue);\n}\n\n.action-tab:hover:not(.active) {\n  border-color: var(--blue);\n  color: var(--blue);\n}\n\n.values-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n\n.value-col {\n  display: flex;\n  flex-direction: column;\n}\n\n.value-label-sm {\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 1.5px;\n  text-transform: uppercase;\n  color: var(--text-muted);\n  margin-bottom: 8px;\n}\n\n.value-input-big {\n  width: 100%;\n  border: none;\n  outline: none;\n  font-family: var(--font-display);\n  font-size: 32px;\n  font-weight: 800;\n  color: var(--text);\n  background: transparent;\n  margin-bottom: 10px;\n  -moz-appearance: textfield;\n}\n\n.value-input-big::-webkit-outer-spin-button,\n.value-input-big::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n}\n\n.value-input-big::placeholder {\n  color: #d1d5db;\n}\n\n.unit-select {\n  width: 100%;\n  height: 42px;\n  border: 1.5px solid var(--border);\n  border-radius: 10px;\n  padding: 0 14px;\n  font-size: 14px;\n  color: var(--text);\n  background: #fafafa;\n  cursor: pointer;\n  outline: none;\n  transition: border-color 0.2s;\n  appearance: auto;\n}\n\n.unit-select:focus {\n  border-color: var(--blue);\n}\n\n.arith-op-row {\n  margin-top: 20px;\n}\n\n.op-tabs {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n\n.result-banner {\n  background: var(--blue-light);\n  border-left: 4px solid var(--blue);\n  border-radius: 0 12px 12px 0;\n  padding: 16px 20px;\n  font-size: 15px;\n  font-weight: 600;\n  color: var(--blue);\n  margin-top: 20px;\n  min-height: 56px;\n  display: flex;\n  align-items: center;\n  transition: background 0.3s, border-color 0.3s, color 0.3s;\n  line-height: 1.5;\n}\n\n.result-banner.success {\n  background: #f0fdf4;\n  border-color: var(--success);\n  color: #065f46;\n}\n\n.result-banner.warning {\n  background: #fffbeb;\n  border-color: var(--warning);\n  color: #92400e;\n}\n\n.fab {\n  position: fixed;\n  bottom: 24px;\n  right: 24px;\n  width: 52px;\n  height: 52px;\n  border-radius: 50%;\n  border: none;\n  background: var(--blue);\n  color: white;\n  box-shadow: 0 4px 16px rgba(61, 76, 206, 0.35);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 20px;\n  transition: transform 0.2s, box-shadow 0.2s;\n  z-index: 200;\n}\n\n.fab:hover {\n  transform: scale(1.08);\n  box-shadow: 0 8px 24px rgba(61, 76, 206, 0.42);\n}\n\n.history-overlay {\n  display: none;\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.35);\n  z-index: 300;\n  align-items: flex-end;\n  justify-content: center;\n}\n\n.history-overlay.open {\n  display: flex;\n}\n\n.history-panel {\n  background: var(--white);\n  border-radius: 20px 20px 0 0;\n  padding: 24px;\n  width: 100%;\n  max-width: 620px;\n  max-height: 72vh;\n  overflow-y: auto;\n  animation: slide-up 0.25s ease;\n}\n\n@keyframes slide-up {\n  from {\n    transform: translateY(100%);\n  }\n  to {\n    transform: translateY(0);\n  }\n}\n\n.history-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n\n.history-header h3 {\n  font-family: var(--font-display);\n  font-size: 18px;\n  font-weight: 800;\n}\n\n.btn-close-history {\n  background: none;\n  border: none;\n  font-size: 22px;\n  cursor: pointer;\n  color: var(--text-muted);\n  line-height: 1;\n  transition: color 0.2s;\n}\n\n.btn-close-history:hover {\n  color: var(--text);\n}\n\n.history-item {\n  padding: 12px 0;\n  border-bottom: 1px solid var(--border);\n  font-size: 13px;\n  color: var(--text-muted);\n}\n\n.history-item:last-child {\n  border-bottom: none;\n}\n\n.history-item strong {\n  color: var(--text);\n  font-weight: 600;\n}\n\n.history-item .history-result {\n  margin-top: 4px;\n  font-size: 13px;\n  color: var(--text);\n}\n\n.history-item .history-meta {\n  margin-top: 4px;\n  font-size: 11px;\n  color: #aaa;\n}\n\n.history-empty {\n  text-align: center;\n  color: var(--text-muted);\n  padding: 32px 0;\n  font-size: 14px;\n}\n\n.conversion-row {\n  display: flex;\n  align-items: flex-end;\n  gap: 16px;\n}\n\n.conversion-val-col {\n  flex: 1.2;\n  display: flex;\n  flex-direction: column;\n}\n\n.conversion-unit-col {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.conversion-arrow {\n  font-size: 28px;\n  font-weight: 700;\n  color: var(--blue);\n  padding-bottom: 10px;\n  flex-shrink: 0;\n  line-height: 1;\n  align-self: center;\n}\n\n.conversion-result-display {\n  font-family: var(--font-display);\n  font-size: 32px;\n  font-weight: 800;\n  color: var(--blue);\n  margin-bottom: 10px;\n  min-height: 42px;\n  display: flex;\n  align-items: center;\n  letter-spacing: -0.5px;\n}\n\n.history-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.btn-clear-history {\n  background: var(--red-light);\n  border: 1.5px solid #fca5a5;\n  border-radius: 8px;\n  padding: 6px 14px;\n  font-family: var(--font-display);\n  font-size: 12px;\n  font-weight: 700;\n  color: var(--red);\n  cursor: pointer;\n  transition: background 0.2s, border-color 0.2s;\n  white-space: nowrap;\n}\n\n.btn-clear-history:hover {\n  background: #fee2e2;\n  border-color: var(--red);\n}\n\n@media (max-width: 700px) {\n  .type-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n\n  .values-grid {\n    grid-template-columns: 1fr;\n  }\n\n  .brand-text {\n    display: none;\n  }\n\n  .main-content {\n    padding: 16px 12px;\n  }\n\n  .navbar {\n    padding: 0 16px;\n  }\n}\n\n@media (max-width: 500px) {\n  .conversion-row {\n    flex-direction: column;\n    gap: 12px;\n  }\n\n  .conversion-arrow {\n    display: none;\n  }\n}\n\n@media (max-width: 420px) {\n  .action-tab {\n    padding: 8px 14px;\n    font-size: 12px;\n  }\n\n  .value-input-big {\n    font-size: 24px;\n  }\n\n  .result-banner {\n    font-size: 13px;\n  }\n}\r\n"] }]
    }], () => [], { onEscapePress: [{
            type: HostListener,
            args: ['document:keydown.escape']
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(DashboardPageComponent, { className: "DashboardPageComponent", filePath: "src/app/pages/dashboard/dashboard-page.component.ts", lineNumber: 47 }); })();
