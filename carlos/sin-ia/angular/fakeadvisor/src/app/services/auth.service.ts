import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { AuthResponse } from '../interfaces/auth-response.model';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = 'https://api-recetas.com'; // Ajusta si tu backend usa otra URL

  // SIGNALS
  readonly token = signal<string | null>(null);
  readonly currentUserState = signal<User | null>(null);
  readonly authReadyState = signal<boolean>(false);

  // COMPUTED
  readonly isLoggedIn = computed(() => this.token() !== null);
  readonly currentUser = computed(() => this.currentUserState());
  readonly authReady = computed(() => this.authReadyState());

  constructor() {
    this.restoreSessionFromCookie();
  }

  // LOGIN
  login(nombre: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, {
      nombre,
      password
    }).pipe(
      tap((response) => this.applyAuthResponse(response))
    );
  }

  // REGISTRO
  register(nombre: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      nombre,
      password
    });
  }

  // PERFIL
  loadProfile() {
    return this.http.get<User>(`${this.apiUrl}/auth/profile`).subscribe({
      next: (user) => {
        this.currentUserState.set(user);
        this.authReadyState.set(true);
      },
      error: () => {
        this.logout();
      }
    });
  }

  // APLICAR LOGIN
  private applyAuthResponse(response: AuthResponse) {
    this.token.set(response.access_token);
    this.currentUserState.set(response.user);
    this.authReadyState.set(true);

    this.setCookie('fakeadvisor_token', response.access_token, 7);

    void this.router.navigate(['/restaurantes']);
  }

  // LOGOUT
  logout() {
    this.token.set(null);
    this.currentUserState.set(null);
    this.authReadyState.set(true);

    this.deleteCookie('fakeadvisor_token');

    void this.router.navigate(['/login']);
  }

  // COOKIES
  private setCookie(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; samesite=lax`;
  }

  private getCookie(name: string): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1] || null;
  }

  private deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  // RECONSTRUIR SESIÓN
  private restoreSessionFromCookie() {
    const token = this.getCookie('fakeadvisor_token');

    if (!token) {
      this.authReadyState.set(true);
      return;
    }

    this.token.set(token);
    this.loadProfile();
  }
}
