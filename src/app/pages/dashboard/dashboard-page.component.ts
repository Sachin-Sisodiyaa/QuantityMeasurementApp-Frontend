import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiError, UserProfile } from '../../core/models/auth.models';
import {
  MeasurementType,
  QuantityInputDto,
  QuantityMeasurementDto,
  measurementUnits
} from '../../core/models/quantity.models';
import { AuthService } from '../../core/services/auth.service';
import { QuantityService } from '../../core/services/quantity.service';
import { ToastService } from '../../core/services/toast.service';

type UiTypeKey = 'length' | 'weight' | 'temperature' | 'volume';
type UiAction = 'comparison' | 'conversion' | 'arithmetic';
type ArithmeticOp = '+' | '-' | '*' | '/';
type BannerStyle = 'default' | 'success' | 'warning';

type BackendOperation = 'compare' | 'convert' | 'add' | 'subtract' | 'divide';

interface TypeCard {
  key: UiTypeKey;
  label: string;
  icon: string;
  measurementType: MeasurementType;
}

interface HistoryEntry {
  label: string;
  result: string;
  type: UiTypeKey;
  time: string;
  date: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  private readonly authService = inject(AuthService);
  private readonly quantityService = inject(QuantityService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly typeCards: TypeCard[] = [
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

  user: UserProfile | null = null;
  isAuthenticated = false;

  currentType: UiTypeKey = 'length';
  currentMeasurementType: MeasurementType = 'LengthUnit';
  currentAction: UiAction = 'comparison';
  currentOp: ArithmeticOp = '+';

  valA: string | number | null = '';
  valB: string | number | null = '';
  unitA = '';
  unitB = '';
  availableUnits: string[] = measurementUnits.LengthUnit;

  resultMessage = 'Select units and enter values to begin';
  resultStyle: BannerStyle = 'default';
  conversionDisplay = '\u2014';

  historyOpen = false;
  historyEntries: HistoryEntry[] = [];

  private requestCounter = 0;
  private activeRequest = 0;

  constructor() {
    this.refreshAuthState();
    this.selectType('length');
    this.selectAction('comparison');
  }

  selectType(type: UiTypeKey): void {
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

  selectAction(action: UiAction): void {
    this.currentAction = action;
    this.clearInputs();
    this.compute();
  }

  selectOp(op: ArithmeticOp): void {
    this.currentOp = op;
    this.compute();
  }

  compute(): void {
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

  toggleHistory(): void {
    if (!this.ensureAuthenticated('view history')) {
      return;
    }

    this.historyOpen = !this.historyOpen;
    if (this.historyOpen) {
      this.loadHistory();
    }
  }

  closeHistoryIfOutside(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.historyOpen = false;
    }
  }

  clearHistory(): void {
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

  handleLogout(): void {
    this.authService.logout();
    this.refreshAuthState();
    this.historyOpen = false;
    this.historyEntries = [];
    this.toastService.show('Logged out successfully.');
    void this.router.navigateByUrl('/login');
  }

  goToAuth(): void {
    void this.router.navigateByUrl('/login');
  }

  @HostListener('document:keydown.escape')
  onEscapePress(): void {
    if (this.historyOpen) {
      this.historyOpen = false;
    }
  }

  private computeComparison(): void {
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

        let message: string;
        let style: BannerStyle;

        if (equal) {
          message =
            '\u2714  ' +
            `${parsed.valA} ${parsed.unitA} = ${parsed.valB} ${parsed.unitB} (they are equal)`;
          style = 'success';
        } else if (baseA > baseB) {
          message =
            `${parsed.valA} ${parsed.unitA} > ${parsed.valB} ${parsed.unitB} ` +
            `(difference: ${this.formatNumber(diff)} ${this.baseUnitLabel(this.currentMeasurementType)})`;
          style = 'warning';
        } else {
          message =
            `${parsed.valA} ${parsed.unitA} < ${parsed.valB} ${parsed.unitB} ` +
            `(difference: ${this.formatNumber(diff)} ${this.baseUnitLabel(this.currentMeasurementType)})`;
          style = 'warning';
        }

        this.setResult(message, style);
        this.addHistoryEntry(
          `Comparison: ${parsed.valA} ${parsed.unitA} vs ${parsed.valB} ${parsed.unitB}`,
          message
        );
      },
      error: (error) => this.handleOperationError(error)
    });
  }

  private computeConversion(): void {
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
      this.setResult(
        `${parsed.valA} ${parsed.unitA} = ${parsed.valA} ${parsed.unitB} (same unit)`,
        'success'
      );
      return;
    }

    this.executeBackendOperation('convert', parsed).subscribe({
      next: (response) => {
        const converted = this.formatNumber(response.resultValue);
        this.conversionDisplay = `${converted} ${parsed.unitB}`;
        const message = `${parsed.valA} ${parsed.unitA} = ${converted} ${parsed.unitB}`;
        this.setResult(message, 'success');
        this.addHistoryEntry(
          `Conversion: ${parsed.valA} ${parsed.unitA} \u2192 ${parsed.unitB}`,
          message
        );
      },
      error: (error) => this.handleOperationError(error)
    });
  }

  private computeArithmetic(): void {
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
      const message =
        `${parsed.valA} ${parsed.unitA} \u00D7 ${parsed.valB} ${parsed.unitB} = ` +
        `${this.formatNumber(local)}`;
      this.setResult(message, 'success');
      this.addHistoryEntry(
        `Arithmetic: ${parsed.valA} ${parsed.unitA} * ${parsed.valB} ${parsed.unitB}`,
        message
      );
      return;
    }

    if (this.currentOp === '/' && parsed.valB === 0) {
      this.setResult('Cannot divide by zero', 'warning');
      return;
    }

    const operationMap: Record<Exclude<ArithmeticOp, '*'>, BackendOperation> = {
      '+': 'add',
      '-': 'subtract',
      '/': 'divide'
    };
    const symbolMap: Record<Exclude<ArithmeticOp, '*'>, string> = {
      '+': '+',
      '-': '\u2212',
      '/': '\u00F7'
    };

    const operation = operationMap[this.currentOp as Exclude<ArithmeticOp, '*'>];
    this.executeBackendOperation(operation, parsed).subscribe({
      next: (response) => {
        const resultValue = this.formatNumber(response.resultValue);
        const resultUnit = response.resultUnit ? ` ${response.resultUnit}` : '';
        const message =
          `${parsed.valA} ${parsed.unitA} ${symbolMap[this.currentOp as Exclude<ArithmeticOp, '*'>]} ` +
          `${parsed.valB} ${parsed.unitB} = ${resultValue}${resultUnit}`;
        this.setResult(message, 'success');
        this.addHistoryEntry(
          `Arithmetic: ${parsed.valA} ${parsed.unitA} ${this.currentOp} ${parsed.valB} ${parsed.unitB}`,
          message
        );
      },
      error: (error) => this.handleOperationError(error)
    });
  }

  private executeBackendOperation(
    operation: BackendOperation,
    parsed: { valA: number; valB: number; unitA: string; unitB: string }
  ) {
    const payload: QuantityInputDto = {
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
      subscribe: (handlers: {
        next: (result: QuantityMeasurementDto) => void;
        error: (error: HttpErrorResponse) => void;
      }) => {
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

  private parseValues(options: {
    requiresSecondValue: boolean;
    requiresSecondUnit: boolean;
  }): { valA: number; valB: number; unitA: string; unitB: string } | null {
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

  private parseInputValue(raw: string | number | null | undefined): number {
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

  private setResult(message: string, style: BannerStyle): void {
    this.resultMessage = message;
    this.resultStyle = style;
  }

  private addHistoryEntry(label: string, result: string): void {
    if (!this.user) {
      return;
    }

    const nextEntry: HistoryEntry = {
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

  private loadHistory(): void {
    this.historyEntries = this.readHistory();
  }

  private readHistory(): HistoryEntry[] {
    if (!this.user) {
      return [];
    }

    const raw = localStorage.getItem(this.getHistoryKey(this.user.email));
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as HistoryEntry[];
    } catch {
      return [];
    }
  }

  private getHistoryKey(email: string): string {
    return `qm_history_${email}`;
  }

  private clearInputs(): void {
    this.valA = '';
    this.valB = '';
    this.unitA = '';
    this.unitB = '';
    this.conversionDisplay = '\u2014';
    this.setResult('Select units and enter values to begin', 'default');
  }

  private handleOperationError(error: HttpErrorResponse): void {
    const apiError = error.error as ApiError;
    const message = apiError?.message ?? 'Operation failed. Please check your input values.';
    this.setResult(message, 'warning');
  }

  private ensureAuthenticated(action: string): boolean {
    this.refreshAuthState();
    if (this.isAuthenticated && this.user) {
      return true;
    }

    this.setResult('Login or register to continue with operations.', 'warning');
    this.toastService.show(`Please login or register to ${action}.`);
    void this.router.navigateByUrl('/login');
    return false;
  }

  private refreshAuthState(): void {
    this.user = this.authService.getCurrentUser();
    this.isAuthenticated = this.authService.isAuthenticated() && !!this.user;
  }

  private toBase(value: number, unit: string, measurementType: MeasurementType): number {
    if (measurementType === 'TemperatureUnit') {
      return this.temperatureToCelsius(value, unit);
    }

    const factor = this.getLinearFactor(unit);
    return value * factor;
  }

  private temperatureToCelsius(value: number, unit: string): number {
    if (unit === 'CELSIUS') return value;
    if (unit === 'FAHRENHEIT') return ((value - 32) * 5) / 9;
    if (unit === 'KELVIN') return value - 273.15;
    return value;
  }

  private getLinearFactor(unit: string): number {
    const map: Record<string, number> = {
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

  private baseUnitLabel(measurementType: MeasurementType): string {
    if (measurementType === 'LengthUnit') return 'm';
    if (measurementType === 'WeightUnit') return 'g';
    if (measurementType === 'VolumeUnit') return 'ml';
    return '\u00B0C';
  }

  formatNumber(value: number): string {
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

  displayUnit(unit: string): string {
    return unit
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
