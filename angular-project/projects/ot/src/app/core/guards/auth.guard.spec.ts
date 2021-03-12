import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: 'environment', useValue: {} }],
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should let pass to a logged in person', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    router = TestBed.inject(Router);
    expect(guard.canActivate()).toEqual(true);
  });

  it('should redirect to login page to a not logged in users', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate'); // Vamos a escuchar el uso de navigate para luego utilizar toHaveBeenCalledWith
    expect(guard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // utilizando la función de spyon podemos usar el metodo toHaveBeenCalledWith
  });
});
