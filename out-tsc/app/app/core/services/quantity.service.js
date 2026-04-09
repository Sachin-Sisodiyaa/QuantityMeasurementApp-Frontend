import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as i0 from "@angular/core";
export class QuantityService {
    http = inject(HttpClient);
    baseUrl = `${environment.apiBaseUrl}/quantities`;
    executeOperation(operation, payload) {
        return this.http.post(`${this.baseUrl}/${operation}`, payload);
    }
    getHistoryByOperation(operation) {
        return this.http.get(`${this.baseUrl}/history/operation/${operation}`);
    }
    getHistoryByMeasurementType(measurementType) {
        return this.http.get(`${this.baseUrl}/history/type/${measurementType}`);
    }
    getOperationCount(operation) {
        return this.http.get(`${this.baseUrl}/count/${operation}`);
    }
    getErrorHistory() {
        return this.http.get(`${this.baseUrl}/history/errored`);
    }
    static ɵfac = function QuantityService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || QuantityService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: QuantityService, factory: QuantityService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QuantityService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
