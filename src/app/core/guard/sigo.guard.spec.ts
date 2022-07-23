import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { of } from 'rxjs';

import { SigoGuard } from './sigo.guard';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('Sigo Guard Test', () => {
  let guard: SigoGuard;
  let facade: AuthFacade;
  const dummyRoute = {} as ActivatedRouteSnapshot;
  let routerSpy: jasmine.SpyObj<Router>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
    });
    // guard = TestBed.inject(HomeGuard)
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    facade = TestBed.inject(AuthFacade);
    guard = new SigoGuard(routerSpy, facade);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('CanLoad should return false if sessionData in null and redirect to login', () => {
    const fakeRoute: Route = { path: 'Home' };
    spyOn(facade, 'getSessionData$').and.returnValue(of(null));
    spyOn(router, 'navigate');
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => {
      expect(val).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  it('CanLoad should return false if token is null', () => {
    const fakeRoute: Route = { path: 'Home' };
    spyOn(facade, 'getSessionData$').and.returnValue(
      of({
        token: null,
        usuario_nombre: null,
        usuario_id: null,
        nombre_perfil_select: null,
        permisos: [],
        perfil_proxy_id: null,
        multiperfiles: null,
        rol: null,
      })
    );
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => expect(val).toBeFalse());
  });

  it('CanLoad should return true if token exist', () => {
    const fakeRoute: Route = { path: 'Home' };
    spyOn(facade, 'getSessionData$').and.returnValue(
      of({
        token: '123141215',
        usuario_nombre: null,
        usuario_id: null,
        nombre_perfil_select: null,
        permisos: [],
        perfil_proxy_id: null,
        multiperfiles: null,
        rol: null,
      })
    );
    const canLoad = guard.canLoad(fakeRoute);
    canLoad.subscribe(val => expect(val).toBeTrue());
  });

  it('CanActivate should return false if token doesnt exist', () => {
    const canActivate = guard.canActivate(dummyRoute, fakeRouterState('/'));
    expect(canActivate).toBeTrue();
  });
});
