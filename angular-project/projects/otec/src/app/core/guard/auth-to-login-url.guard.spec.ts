import { TestBed } from '@angular/core/testing';

import { AuthToLoginUrlGuard } from './auth-to-login-url.guard';

import { RouterTestingModule } from '@angular/router/testing'; // Se debe importar la versión testing de Router

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import * as LoginModel from '../../features/login/login.model';

describe('AuthToLoginUrlGuard', () => {
  let guard: AuthToLoginUrlGuard;
  let authService: AuthService;
  let router: Router;
  let auth:Observable<LoginModel.AuthLoginResponse>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
    });
    guard = TestBed.inject(AuthToLoginUrlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for NOT logged in user', () => {
    authService = {
      isLogin: () => false,
      getToken: () => null,
      auth: () => auth
    };
    router = TestBed.inject(Router);
    guard = new AuthToLoginUrlGuard(authService, router);

    // spyOn(router, 'navigate');

    expect(guard.canActivate()).toEqual(true);
    // expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should return false for logged in user and redirect to /dashboard', () => {
    authService = {
      isLogin: () => true,
      getToken: () => null,
      auth: () => auth
    };
    router = TestBed.inject(Router);
    guard = new AuthToLoginUrlGuard(authService, router);

    spyOn(router, 'navigate');

    expect(guard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
