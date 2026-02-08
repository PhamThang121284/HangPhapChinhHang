import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = () => {
  const storage = inject(TokenStorageService);
  const router = inject(Router);
  if (storage.getAccessToken()) {
    return true;
  }
  return router.parseUrl('/auth/login');
};
