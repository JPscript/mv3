import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

// Un guard decide si una ruta puede abrirse o si debemos redirigir.
// En esta version comprobamos si la sesion esta lista y si hay login activo.
export const authGuard: CanActivateFn = () => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.ensureSessionReady().pipe(
		map(((isLoggedIn) => {
			if (isLoggedIn) {
				return true;
			}

			return router.createUrlTree(['/login']);
		})),
	);
};