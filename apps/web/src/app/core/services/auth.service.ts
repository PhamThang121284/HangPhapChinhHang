import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';

interface AuthResponse {
  user: { id: string; email: string; role: string };
  accessToken: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject = new BehaviorSubject<AuthResponse['user'] | null>(null);
  user$ = this.userSubject.asObservable();
  private readonly roleKey = 'hp_role';

  constructor(private api: ApiService, private storage: TokenStorageService) {}

  login(payload: { email: string; password: string }): Observable<AuthResponse> {
    return this.api.post<AuthResponse>('/auth/login', payload).pipe(
      tap((res) => {
        this.storage.setTokens(res.accessToken, res.refreshToken);
        localStorage.setItem(this.roleKey, res.user.role);
        this.userSubject.next(res.user);
      })
    );
  }

  register(payload: { email: string; password: string; phone?: string; fullName: string }) {
    return this.api.post('/auth/register', payload);
  }

  refresh(): Observable<{ accessToken: string }> {
    const refreshToken = this.storage.getRefreshToken();
    return this.api.post<{ accessToken: string }>('/auth/refresh', { refreshToken });
  }

  logout(): void {
    this.storage.clear();
    localStorage.removeItem(this.roleKey);
    this.userSubject.next(null);
  }

  get currentUser() {
    return this.userSubject.value;
  }

  get role(): string | null {
    return localStorage.getItem(this.roleKey);
  }
}
