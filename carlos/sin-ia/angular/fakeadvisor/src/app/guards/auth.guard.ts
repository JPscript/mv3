import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Si aún no sabemos si hay sesión, bloqueamos
  if (!authService.authReady()) {
    return false;
  }

  // Si NO hay token → redirigimos al login
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  // Si hay sesión → permitir acceso
  return true;
};
