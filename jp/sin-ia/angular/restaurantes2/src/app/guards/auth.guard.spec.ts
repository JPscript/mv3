import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, UrlTree } from '@angular/router';
import { firstValueFrom, isObservable, of } from 'rxjs';
import { vi } from 'vitest';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

async function resolveGuardResult(result: ReturnType<typeof authGuard>): Promise<unknown> {
	if (isObservable(result)) {
		return firstValueFrom(result);
	}

	return result;
}

describe('authGuard', () => {
	it('should allow navigation when the session is valid', async () => {
		const authServiceMock = {
			ensureSessionReady: vi.fn().mockReturnValue(of(true)),
		};

		TestBed.configureTestingModule({
			providers: [
				provideRouter([]),
				{ provide: AuthService, useValue: authServiceMock },
			],
		});

		const result = await TestBed.runInInjectionContext(() => resolveGuardResult(authGuard({} as never, {} as never)));

		expect(result).toBe(true);
		expect(authServiceMock.ensureSessionReady).toHaveBeenCalled();
	});

	it('should redirect to login when the session is not valid', async () => {
		const authServiceMock = {
			ensureSessionReady: vi.fn().mockReturnValue(of(false)),
		};

		TestBed.configureTestingModule({
			providers: [
				provideRouter([]),
				{ provide: AuthService, useValue: authServiceMock },
			],
		});

		const router = TestBed.inject(Router);
		const loginTree = router.createUrlTree(['/login']);
		const result = await TestBed.runInInjectionContext(() => resolveGuardResult(authGuard({} as never, {} as never))) as UrlTree;

		expect(authServiceMock.ensureSessionReady).toHaveBeenCalled();
		expect(router.serializeUrl(result)).toBe(router.serializeUrl(loginTree));
	});
});