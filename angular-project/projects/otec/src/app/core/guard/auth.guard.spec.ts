import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as LoginModel from '../../features/login/login.model';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService:AuthService;
  let router:Router;
  let auth:Observable<LoginModel.AuthLoginResponse>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for logged in user',()=>{
    authService = {
      isLogin: () => true,
      getToken: () => null,
      auth: () =>auth,
      setToken:()=>null,
      setPrivilegios:()=>null,
      getPrivilegios:()=>[],
    };
    router = TestBed.inject(Router);
    guard = new AuthGuard(authService, router);
    expect(guard.canActivate()).toEqual(true);
  })

  it('should navigate to login for a logged in user',()=>{
    authService = {
      isLogin: () => false,
      getToken: () => null,
      auth: () =>auth,
      setToken:()=>null,
      setPrivilegios:()=>null,
      getPrivilegios:()=>[],
    };
    router = TestBed.inject(Router);
    guard = new AuthGuard(authService, router);
    spyOn(router, 'navigate'); //Vamos a escuchar el uso de navigate para luego utilizar toHaveBeenCalledWith

    expect(guard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']); //utilizando la función de spyon podemos usar el metodo toHaveBeenCalledWith
  })
});
