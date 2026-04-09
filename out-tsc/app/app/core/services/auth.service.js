import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStorageService } from './auth-storage.service';
import * as i0 from "@angular/core";
export class AuthService {
    http = inject(HttpClient);
    storage = inject(AuthStorageService);
    authUrl = `${environment.apiBaseUrl}/auth`;
    oauthSuccessUrl = `${environment.backendOrigin}/oauth-success`;
    googleLoginUrl = `${environment.backendOrigin}/oauth2/authorization/google`;
    register(request) {
        return this.http
            .post(`${this.authUrl}/register`, request)
            .pipe(tap((response) => this.persistAuth(response)));
    }
    login(request) {
        return this.http
            .post(`${this.authUrl}/login`, request)
            .pipe(tap((response) => this.persistAuth(response)));
    }
    completeOAuth(token, email) {
        const params = new HttpParams().set('token', token).set('email', email);
        return this.http
            .get(this.oauthSuccessUrl, { params })
            .pipe(tap((response) => this.persistAuth(response)));
    }
    fetchMe() {
        return this.http.get(`${this.authUrl}/me`).pipe(tap((profile) => {
            this.storage.saveUser(profile);
        }));
    }
    loginWithGoogle() {
        window.location.href = this.googleLoginUrl;
    }
    logout() {
        this.storage.clearSession();
    }
    getCurrentUser() {
        return this.storage.getUser();
    }
    isAuthenticated() {
        return this.storage.isAuthenticated();
    }
    persistAuth(response) {
        this.storage.saveToken(response.token);
        this.storage.saveUser(response.user);
    }
    static ɵfac = function AuthService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AuthService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AuthService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
