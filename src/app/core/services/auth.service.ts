import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  AuthConfig,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserProfile
} from '../models/auth.models';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(AuthStorageService);
  private readonly authUrl = `${environment.apiBaseUrl}/auth`;
  private readonly googleLoginUrl = `${environment.backendOrigin}/oauth2/authorization/google`;

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.authUrl}/register`, request)
      .pipe(tap((response) => this.persistAuth(response)));
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.authUrl}/login`, request)
      .pipe(tap((response) => this.persistAuth(response)));
  }

  getAuthConfig(): Observable<AuthConfig> {
    return this.http.get<AuthConfig>(`${this.authUrl}/config`);
  }

  completeOAuth(token: string): Observable<UserProfile> {
    this.storage.saveToken(token);
    return this.fetchMe();
  }

  fetchMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.authUrl}/me`).pipe(
      tap((profile) => {
        this.storage.saveUser(profile);
      })
    );
  }

  loginWithGoogle(): void {
    window.location.href = this.googleLoginUrl;
  }

  logout(): void {
    this.storage.clearSession();
  }

  getCurrentUser(): UserProfile | null {
    return this.storage.getUser();
  }

  isAuthenticated(): boolean {
    return this.storage.isAuthenticated();
  }

  private persistAuth(response: AuthResponse): void {
    this.storage.saveToken(response.token);
    this.storage.saveUser(response.user);
  }
}
