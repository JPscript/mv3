import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Router } from '@angular/router';

import { User } from '../interfaces/user.interface';
import { catchError, Observable, throwError, tap, of, map } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response.interface';

// Definimos una interface pequeña para las credenciales de acceso.
// Asi evitamos repetir tipos inline en varios metodos del servicio.
interface AuthCredentials {
	nombre: string;
	password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly apiUrl = 'http://127.0.0.1:3000';

  private readonly tokenCookieName = 'api_recetas_token';

  private readonly token = signal<string | null>(this.readTokenCookie());

  private readonly currentUserState = signal<User | null>(null);

  private readonly authReadyState = signal(false);

  readonly currentUser = this.currentUserState.asReadonly();
  readonly authReady = this.authReadyState.asReadonly();

  readonly isLoggedIn = computed(() => this.token() !== null);

  constructor() {
    if (this.token()) {
      this.loadProfile().subscribe({
        error: (error: unknown) => {
          this.handleSessionRestoreError(error);
        },
      });
    } else {
      this.authReadyState.set(true);
    }
  }

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        this.applyAuthResponse(response);
      }),
    );
  }

  register(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, credentials).pipe(
      tap((response) => {
        this.applyAuthResponse(response);
      }),
    );
  }

  loadProfile(): Observable<User> {

    return this.http.get<User>(`${this.apiUrl}/auth/profile`).pipe(
      tap((user) => {
        this.currentUserState.set(user);
        this.authReadyState.set(true);
      }),
      catchError((error) => {
        this.currentUserState.set(null);
        this.authReadyState.set(true);
        return throwError(() => error);
      }),
    );
  }

  getToken(): string | null {
    return this.token();
  }

  ensureSessionReady(): Observable<boolean> {
    if (this.authReady()) {
      return of(this.isLoggedIn());
    }

    if (!this.token) {
      this.authReadyState.set(true);
      return of(false)
    }

    return this.loadProfile().pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  logout(navigate = true) {
    this.clearSession(true);

    if (navigate) {
      void this.router.navigate(['/login']);
    }
  }

  handleUnauthorized(navigate = true): void {
    this.clearSession(true);

    if (navigate) {
      void this.router.navigate(['/login']);
    }
  }

  private applyAuthResponse(response: AuthResponse): void {
    this.writeTokenCookie(response.access_token);
    this.token.set(response.access_token);
    this.currentUserState.set(response.user);
    this.authReadyState.set(true);
  }

  private clearSession(removeCookie: boolean): void {
    if (removeCookie) {
      this.deleteTokenCookie();
    }

    this.token.set(null);
    this.currentUserState.set(null);
    this.authReadyState.set(true);
  }

  private handleSessionRestoreError(error: unknown): void {
    if (error instanceof HttpErrorResponse && error.status === 401) {
      this.clearSession(true);
      return;
    }

    this.currentUserState.set(null);
    this.authReadyState.set(true);
  }

  private writeTokenCookie(token: string): void {
		const maxAgeSeconds = 60 * 60 * 24 * 7;
    document.cookie = `${this.tokenCookieName}=${encodeURIComponent(token)}: path=/; max-age=${maxAgeSeconds}; samesite=lax`;
  }

  private readTokenCookie(): string | null {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
      const trimedCookie = cookie.trim();
      const prefix = `${this.tokenCookieName}=`;

      if (trimedCookie.startsWith(prefix)) {
        return decodeURIComponent(trimedCookie.slice(prefix.length));
      }
    }

    return null;
  }

  private deleteTokenCookie(): void {
		document.cookie = `${this.tokenCookieName}=; path=/; max-age=0; samesite=lax`;
  }

}
