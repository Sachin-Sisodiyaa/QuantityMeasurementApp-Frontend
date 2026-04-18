import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, forkJoin, of } from 'rxjs';

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

type BackendOperation = 'compare' | 'convert' | 'add' | 'subtract' | 'multiply' | 'divide';

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
  private static readonly historyClearStorageKey = 'qm_history_clear_markers';

  private readonly authService = inject(AuthService);
  private readonly quantityService = inject(QuantityService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);

  readonly typeCards: TypeCard[] = [
    {
      key: 'length',
      label: 'Length',
      icon: '\uD83D\uDCCF',
      measurementType: 'Length'
    },
    {
      key: 'weight',
      label: 'Weight',
      icon: '\u2696\uFE0F',
      measurementType: 'Weight'
    },
    {
      key: 'temperature',
      label: 'Temperature',
      icon: '\uD83C\uDF21\uFE0F',
      measurementType: 'Temperature'
    },
    {
      key: 'volume',
      label: 'Volume',
      icon: '\uD83E\uDDF4',
      measurementType: 'Volume'
    }
  ];

  user: UserProfile | null = null;
  isAuthenticated = false;
  isHistoryLoading = false;
  isClearingHistory = false;

  currentType: UiTypeKey = 'length';
  currentMeasurementType: MeasurementType = 'Length';
  currentAction: UiAction = 'comparison';
  currentOp: ArithmeticOp = '+';

  valA: string | number | null = '';
  valB: string | number | null = '';
  unitA = '';
  unitB = '';
  availableUnits: string[] = measurementUnits.Length;

  resultMessage = 'Select units and enter values to begin';
  resultStyle: BannerStyle = 'default';
  conversionDisplay = '\u2014';

  historyOpen = false;
  historyEntries: HistoryEntry[] = [];
  currentOperationCount = 0;
  errorHistoryCount = 0;

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
    if (this.historyOpen) {
      this.loadHistory();
    }
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

    this.isClearingHistory = true;
    this.quantityService
      .clearHistoryByMeasurementType(this.currentMeasurementType)
      .pipe(finalize(() => (this.isClearingHistory = false)))
      .subscribe({
        next: (deleted) => {
          this.setHistoryClearMarker(this.currentMeasurementType, null);
          this.historyEntries = [];
          this.currentOperationCount = 0;
          this.errorHistoryCount = 0;
          this.historyOpen = false;
          this.toastService.show(
            deleted > 0
              ? `${deleted} history entr${deleted === 1 ? 'y was' : 'ies were'} cleared.`
              : 'No history found to clear for this measurement type.'
          );
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404 || error.status === 405) {
            const clearedAt = new Date().toISOString();
            this.setHistoryClearMarker(this.currentMeasurementType, clearedAt);
            this.historyEntries = [];
            this.currentOperationCount = 0;
            this.errorHistoryCount = 0;
            this.historyOpen = false;
            this.toastService.show('History cleared!');
            return;
          }

          this.toastService.show(
            this.extractApiError(error, 'Unable to clear history.'),
            true
          );
        }
      });
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
        this.loadHistory();
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
        this.loadHistory();
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
      this.executeBackendOperation('multiply', parsed).subscribe({
        next: (response) => {
          const resultValue = this.formatNumber(response.resultValue);
          const rightUnit = parsed.unitB || parsed.unitA;
          const message =
            `${parsed.valA} ${parsed.unitA} \u00D7 ${parsed.valB} ${rightUnit} = ` +
            `${resultValue} ${response.resultUnit}`;
          this.setResult(message, 'success');
          this.loadHistory();
        },
        error: (error) => this.handleOperationError(error)
      });
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
        this.loadHistory();
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

  private loadHistory(showRefreshToast = false): void {
    if (!this.isAuthenticated || !this.user) {
      this.historyEntries = [];
      this.currentOperationCount = 0;
      this.errorHistoryCount = 0;
      return;
    }

    this.isHistoryLoading = true;

    const operation = this.getSelectedBackendOperation();
    const requests = {
      history: this.quantityService.getHistoryByMeasurementType(this.currentMeasurementType),
      errors: this.quantityService.getErrorHistory(),
      count: operation ? this.quantityService.getOperationCount(operation) : null
    };

    forkJoin({
      history: requests.history,
      errors: requests.errors,
      count: requests.count ?? of(0)
    })
      .pipe(finalize(() => (this.isHistoryLoading = false)))
      .subscribe({
      next: ({ history, errors, count }) => {
        const filteredHistory = this.applyHistoryClearMarker(history, this.currentMeasurementType);
        const filteredErrors = this.applyHistoryClearMarker(errors, this.currentMeasurementType);

        this.historyEntries = filteredHistory
          .slice()
          .reverse()
          .map((entry) => this.toHistoryEntry(entry));
        this.errorHistoryCount = filteredErrors.filter(
          (entry) => entry.thisMeasurementType === this.currentMeasurementType
        ).length;
        this.currentOperationCount = Array.isArray(count)
          ? 0
          : filteredHistory.filter((entry) => entry.operation === operation && !entry.isError).length;
        if (showRefreshToast) {
          this.toastService.show('History refreshed from backend.');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.show(this.extractApiError(error, 'Unable to load history.'), true);
      }
    });
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
    const message = this.extractApiError(
      error,
      'Operation failed. Please check your input values.'
    );
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
    if (measurementType === 'Temperature') {
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
      MM: 0.001,
      CM: 0.01,
      METER: 1,
      KM: 1000,
      INCH: 0.0254,
      FOOT: 0.3048,
      YARD: 0.9144,
      MILE: 1609.34,
      MG: 0.000001,
      GRAM: 0.001,
      KG: 1,
      OUNCE: 0.0283495,
      POUND: 0.453592,
      ML: 0.001,
      LITER: 1,
      GALLON: 3.78541,
      PINT: 0.473176,
      CUBIC_METER: 1000
    };
    return map[unit] ?? 1;
  }

  private baseUnitLabel(measurementType: MeasurementType): string {
    if (measurementType === 'Length') return 'm';
    if (measurementType === 'Weight') return 'kg';
    if (measurementType === 'Volume') return 'l';
    return '\u00B0C';
  }

  private getSelectedBackendOperation(): BackendOperation | null {
    if (this.currentAction === 'comparison') {
      return 'compare';
    }

    if (this.currentAction === 'conversion') {
      return 'convert';
    }

    if (this.currentOp === '*') {
      return 'multiply';
    }

    const operationMap: Record<Exclude<ArithmeticOp, '*'>, BackendOperation> = {
      '+': 'add',
      '-': 'subtract',
      '/': 'divide'
    };
    return operationMap[this.currentOp as Exclude<ArithmeticOp, '*'>];
  }

  private toHistoryEntry(entry: QuantityMeasurementDto): HistoryEntry {
    const createdAt = entry.createdAt ? new Date(entry.createdAt) : new Date();
    const operationLabel = entry.operation.charAt(0).toUpperCase() + entry.operation.slice(1);
    const left = `${this.formatNumber(entry.thisValue)} ${entry.thisUnit}`;
    const right = `${this.formatNumber(entry.thatValue)} ${entry.thatUnit}`;
    const result =
      entry.resultString && entry.operation === 'compare'
        ? `${left} vs ${right} = ${entry.resultString}`
        : `${left} ${this.operationSymbol(entry.operation)} ${right} = ${this.formatHistoryResult(entry)}`;

    return {
      label: `${operationLabel} (${entry.thisMeasurementType})`,
      result,
      type: this.currentType,
      time: createdAt.toLocaleTimeString(),
      date: createdAt.toLocaleDateString()
    };
  }

  private operationSymbol(operation: string): string {
    if (operation === 'compare') return 'vs';
    if (operation === 'convert') return '->';
    if (operation === 'add') return '+';
    if (operation === 'subtract') return '-';
    if (operation === 'multiply') return '*';
    if (operation === 'divide') return '/';
    return '=';
  }

  private formatHistoryResult(entry: QuantityMeasurementDto): string {
    if (entry.resultUnit) {
      return `${this.formatNumber(entry.resultValue)} ${entry.resultUnit}`;
    }

    if (entry.resultString) {
      return entry.resultString;
    }

    return this.formatNumber(entry.resultValue);
  }

  private extractApiError(error: HttpErrorResponse, fallback: string): string {
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    const apiError = error.error as ApiError;
    return apiError?.message ?? apiError?.error ?? fallback;
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

  private applyHistoryClearMarker(
    entries: QuantityMeasurementDto[],
    measurementType: MeasurementType
  ): QuantityMeasurementDto[] {
    const clearedAt = this.getHistoryClearMarker(measurementType);
    if (!clearedAt) {
      return entries;
    }

    const clearedTime = new Date(clearedAt).getTime();
    if (Number.isNaN(clearedTime)) {
      return entries;
    }

    return entries.filter((entry) => {
      if (entry.thisMeasurementType !== measurementType) {
        return true;
      }

      if (!entry.createdAt) {
        return false;
      }

      const createdTime = new Date(entry.createdAt).getTime();
      return !Number.isNaN(createdTime) && createdTime > clearedTime;
    });
  }

  private getHistoryClearMarker(measurementType: MeasurementType): string | null {
    try {
      const raw = localStorage.getItem(DashboardPageComponent.historyClearStorageKey);
      if (!raw) {
        return null;
      }

      const markers = JSON.parse(raw) as Partial<Record<MeasurementType, string>>;
      return markers[measurementType] ?? null;
    } catch {
      return null;
    }
  }

  private setHistoryClearMarker(measurementType: MeasurementType, value: string | null): void {
    try {
      const raw = localStorage.getItem(DashboardPageComponent.historyClearStorageKey);
      const markers = raw
        ? (JSON.parse(raw) as Partial<Record<MeasurementType, string>>)
        : {};

      if (value) {
        markers[measurementType] = value;
      } else {
        delete markers[measurementType];
      }

      localStorage.setItem(
        DashboardPageComponent.historyClearStorageKey,
        JSON.stringify(markers)
      );
    } catch {
      // Ignore storage issues and let backend history render normally.
    }
  }
}
