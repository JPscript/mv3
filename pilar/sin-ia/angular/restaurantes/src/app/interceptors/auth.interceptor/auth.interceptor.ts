import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service/auth.service';

const AUTH_LOGIN_URL = '/auth/login';
const AUTH_REGISTER_URL = '/auth/register';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
	const authService = inject(AuthService);
	const token = authService.getToken();

	const requestWithToken = token
		? request.clone({
			headers: request.headers.set('Authorization', `Bearer ${token}`),
		})
		: request;

	return next(requestWithToken).pipe(
		catchError((error: unknown) => {
			const isUnauthorized = error instanceof HttpErrorResponse && error.status === 401;
			const isAuthFormRequest = request.url.includes(AUTH_LOGIN_URL) || request.url.includes(AUTH_REGISTER_URL);

			if (isUnauthorized && token && !isAuthFormRequest) {
				authService.handleUnauthorized();
			}

			return throwError(() => error);
		}),
	);
};