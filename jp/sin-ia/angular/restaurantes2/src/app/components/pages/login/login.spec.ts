import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Login } from './login';
import { AuthService } from '../../../services/auth.service';
import { AuthResponse } from '../../../interfaces/auth-response';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

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

  const authServiceMock = {
    login: vi.fn(),
  };

  beforeEach(async () => {
    authServiceMock.login.mockReset();

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an error if nombre or password are empty', () => {
    component.nombre = '';
    component.password = '';

    component.submitLogin();

    expect(component.errorMessage).toBe('Debes completar nombre y contraseña.');
    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should navigate to restaurantes after a successful login', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    authServiceMock.login.mockReturnValue(of(mockAuthResponse));

    component.nombre = 'Senior Cat';
    component.password = 'seniorcat123';

    component.submitLogin();
    await fixture.whenStable();

    expect(authServiceMock.login).toHaveBeenCalledWith({
      nombre: 'Senior Cat',
      password: 'seniorcat123',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['/restaurantes']);
    expect(component.errorMessage).toBe('');
  });

  it('should show an error and avoid navigation when login fails', async () => {
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    authServiceMock.login.mockReturnValue(throwError(() => new Error('Credenciales incorrectas')));

    component.nombre = 'Senior Cat';
    component.password = 'incorrecta';

    component.submitLogin();
    await fixture.whenStable();

    expect(component.errorMessage).toBe('No se pudo iniciar sesión. Revisa tus credenciales.');
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
