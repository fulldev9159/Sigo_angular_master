/// <reference types="jasmine" />

import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ProfiledGuard } from './profiled.guard';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('Profiled Test', () => {
  let guard: ProfiledGuard;
  let authService: AuthService;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  let routerSpy: jasmine.SpyObj<Router>;
  let fakeRoute: Route = { path: 'home' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
    });
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authService = TestBed.inject(AuthService);
    guard = new ProfiledGuard(routerSpy, authService);
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: null,
      })
    );
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canLoad should return false and redirect to home if isProfiled and isAuth return true', () => {
    spyOn(authService, 'isAuth').and.returnValue(true);
    spyOn(authService, 'isProfiled').and.returnValue(true);
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => {
      expect(val).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  it('canLoad should return true if isProfiled return false and isAuth return true', () => {
    spyOn(authService, 'isProfiled').and.returnValue(false);
    spyOn(authService, 'isAuth').and.returnValue(true);
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => expect(val).toBeTrue());
  });

  it('canLoad should return false and redirect to auth page if isProfiled return false and isAuth return false', () => {
    spyOn(authService, 'isProfiled').and.returnValue(false);
    spyOn(authService, 'isAuth').and.returnValue(false);
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login/auth']);
      expect(val).toBeFalse();
    });
  });

  it('canActive should return false and redirect to home if isProfiled and isAuth return true', () => {
    spyOn(authService, 'isAuth').and.returnValue(true);
    spyOn(authService, 'isProfiled').and.returnValue(true);
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('home'));
    (canActivate as Observable<boolean>).subscribe(val => {
      expect(val).toBeFalse();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });
  });

  it('canActive should return true if isProfiled return false and isAuth return true', () => {
    spyOn(authService, 'isProfiled').and.returnValue(false);
    spyOn(authService, 'isAuth').and.returnValue(true);
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('home'));
    (canActivate as Observable<boolean>).subscribe(val =>
      expect(val).toBeTrue()
    );
  });

  it('canActive should return false and redirect to auth page if isProfiled return false and isAuth return false', () => {
    spyOn(authService, 'isProfiled').and.returnValue(false);
    spyOn(authService, 'isAuth').and.returnValue(false);
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('home'));
    (canActivate as Observable<boolean>).subscribe(val => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login/auth']);
      expect(val).toBeFalse();
    });
  });
});
