import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  private readonly accessKey = 'hp_access_token';
  private readonly refreshKey = 'hp_refresh_token';

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  setTokens(access: string, refresh: string): void {
    localStorage.setItem(this.accessKey, access);
    localStorage.setItem(this.refreshKey, refresh);
  }

  clear(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
  }
}
