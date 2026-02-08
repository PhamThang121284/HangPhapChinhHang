import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

export const authInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const storage = inject(TokenStorageService);
  const authService = inject(AuthService);
  const token = storage.getAccessToken();

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }
      return authService.refresh().pipe(
        switchMap((res) => {
          const refreshToken = storage.getRefreshToken();
          if (!refreshToken) {
            authService.logout();
            return throwError(() => error);
          }
          storage.setTokens(res.accessToken, refreshToken);
          const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${res.accessToken}` } });
          return next(retryReq);
        })
      );
    })
  );
};
