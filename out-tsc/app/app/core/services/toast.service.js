import { Injectable, signal } from '@angular/core';
import * as i0 from "@angular/core";
export class ToastService {
    toasts = signal([]);
    nextId = 1;
    show(message, isError = false, duration = 3000) {
        const id = this.nextId++;
        this.toasts.update((items) => [...items, { id, message, isError }]);
        window.setTimeout(() => {
            this.remove(id);
        }, duration);
    }
    remove(id) {
        this.toasts.update((items) => items.filter((item) => item.id !== id));
    }
    static ɵfac = function ToastService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ToastService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ToastService, factory: ToastService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
