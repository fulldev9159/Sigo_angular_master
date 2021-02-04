import { TestBed } from '@angular/core/testing';
import { AuthToLoginUrlGuard } from './auth-to-login-url.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthToLoginUrlGuard', () => {
  let guard: AuthToLoginUrlGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: 'environment', useValue: {} }],
    });
    guard = TestBed.inject(AuthToLoginUrlGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should let pass to a not  logged in users', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    router = TestBed.inject(Router);
    expect(guard.canActivate()).toEqual(true);
  });

  it('should redirect to /dashboard to a logged in users', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    expect(guard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
