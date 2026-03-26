import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { AuthResponse } from '../interfaces/auth-response';

describe('AuthService', () => {
	let service: AuthService;
	let httpMock: HttpTestingController;

	const mockAuthResponse: AuthResponse = {
		access_token: 'token-de-prueba',
		token_type: 'Bearer',
		user: {
			id: 1,
			nombre: 'Senior Cat',
			image_url: null,
			created_at: '2026-03-26T00:00:00.000Z',
			updated_at: '2026-03-26T00:00:00.000Z',
		},
	};

	function clearAuthCookie(): void {
		document.cookie = 'api_recetas_token=; path=/; max-age=0; samesite=lax';
	}

	beforeEach(() => {
		clearAuthCookie();

		TestBed.configureTestingModule({
			providers: [
				provideRouter([]),
				provideHttpClient(),
				provideHttpClientTesting(),
			],
		});

		service = TestBed.inject(AuthService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
		clearAuthCookie();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
		expect(service.authReady()).toBe(true);
		expect(service.isLoggedIn()).toBe(false);
	});

	it('should store token and user after a successful login', () => {
		service.login({
			nombre: 'Senior Cat',
			password: 'seniorcat123',
		}).subscribe((response) => {
			expect(response).toEqual(mockAuthResponse);
		});

		const request = httpMock.expectOne('http://127.0.0.1:3000/auth/login');
		expect(request.request.method).toBe('POST');
		expect(request.request.body).toEqual({
			nombre: 'Senior Cat',
			password: 'seniorcat123',
		});

		request.flush(mockAuthResponse);

		expect(service.getToken()).toBe('token-de-prueba');
		expect(service.currentUser()).toEqual(mockAuthResponse.user);
		expect(service.isLoggedIn()).toBe(true);
		expect(document.cookie).toContain('api_recetas_token=token-de-prueba');
	});

	it('should clear the session after handleUnauthorized', () => {
		service.login({
			nombre: 'Senior Cat',
			password: 'seniorcat123',
		}).subscribe();

		httpMock.expectOne('http://127.0.0.1:3000/auth/login').flush(mockAuthResponse);

		expect(service.isLoggedIn()).toBe(true);

		service.handleUnauthorized(false);

		expect(service.getToken()).toBe(null);
		expect(service.currentUser()).toBe(null);
		expect(service.isLoggedIn()).toBe(false);
	});
});