import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AuthStorageService {
    static tokenKey = 'qm_token';
    static userKey = 'qm_user';
    saveToken(token) {
        localStorage.setItem(AuthStorageService.tokenKey, token);
    }
    getToken() {
        return localStorage.getItem(AuthStorageService.tokenKey);
    }
    saveUser(user) {
        localStorage.setItem(AuthStorageService.userKey, JSON.stringify(user));
    }
    getUser() {
        const raw = localStorage.getItem(AuthStorageService.userKey);
        if (!raw) {
            return null;
        }
        try {
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    isAuthenticated() {
        return !!this.getToken();
    }
    clearSession() {
        localStorage.removeItem(AuthStorageService.tokenKey);
        localStorage.removeItem(AuthStorageService.userKey);
    }
    static ɵfac = function AuthStorageService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthStorageService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthStorageService, factory: AuthStorageService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthStorageService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
