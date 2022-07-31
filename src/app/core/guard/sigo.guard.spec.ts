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

import { SigoGuard } from './sigo.guard';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('Guard SIGO Test', () => {
  let guard: SigoGuard;
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
    // guard = TestBed.inject(SigoGuard);
    guard = new SigoGuard(routerSpy, authService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canLoad should return false if isLoggin return false', () => {
    spyOn(authService, 'isLoggin').and.returnValue(false);
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => expect(val).toBeFalse());
  });

  it('canLoad should redirect to login page if isLoggin return false', () => {
    spyOn(authService, 'isLoggin').and.returnValue(false);
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val =>
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'])
    );
  });

  it('canLoad should return true if isLoggin return true', () => {
    spyOn(authService, 'isLoggin').and.returnValue(true);
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => expect(val).toBeTrue());
  });

  it('canActivate should return false if isLoggin return false', () => {
    spyOn(authService, 'isLoggin').and.returnValue(false);
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('home'));
    (canActivate as Observable<boolean>).subscribe(val =>
      expect(val).toBeFalse()
    );
  });

  it('canActivate should redirect to login page if isLoggin return false', () => {
    spyOn(authService, 'isLoggin').and.returnValue(false);
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('home'));
    (canActivate as Observable<boolean>).subscribe(val =>
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login'])
    );
  });

  it('canActivate should return true if isLoggin return true', () => {
    spyOn(authService, 'isLoggin').and.returnValue(true);
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('home'));
    (canActivate as Observable<boolean>).subscribe(val =>
      expect(val).toBeTrue()
    );
  });
});
