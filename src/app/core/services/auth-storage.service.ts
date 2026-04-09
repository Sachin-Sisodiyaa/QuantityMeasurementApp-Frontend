import { Injectable } from '@angular/core';

import { UserProfile } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  private static readonly tokenKey = 'qm_token';
  private static readonly userKey = 'qm_user';

  saveToken(token: string): void {
    localStorage.setItem(AuthStorageService.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AuthStorageService.tokenKey);
  }

  saveUser(user: UserProfile): void {
    localStorage.setItem(AuthStorageService.userKey, JSON.stringify(user));
  }

  getUser(): UserProfile | null {
    const raw = localStorage.getItem(AuthStorageService.userKey);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearSession(): void {
    localStorage.removeItem(AuthStorageService.tokenKey);
    localStorage.removeItem(AuthStorageService.userKey);
  }
}
