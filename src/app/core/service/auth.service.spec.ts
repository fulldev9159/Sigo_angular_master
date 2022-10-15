import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { StoreModule } from '@ngrx/store';
import { UtilsService } from './utils.service';

describe('Auth Service', () => {
  let service: AuthService;
  let utilsService: UtilsService;
  let facade: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    });
    facade = TestBed.inject(AuthFacade);
    utilsService = TestBed.inject(UtilsService);

    service = new AuthService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggin should return false if sessionData doest exist', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: null,
      })
    );
    expect(service.isLoggin()).toBeFalse();
  });

  it('isLoggin should return true if sessionData exist and all data is complete', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: 'sas',
          usuario_nombre: '1',
          usuario_id: 1,
          nombre_perfil_select: 'asda',
          permisos: [1, 2],
          perfil_proxy_id: 1,
          multiperfiles: false,
          rol: 'asdas',
        },
      })
    );
    expect(service.isLoggin()).toBeTrue();
  });

  it('isLoggin should return false if sessionData does have token null', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: null,
          usuario_nombre: '1',
          usuario_id: null,
          nombre_perfil_select: 'asda',
          permisos: [],
          perfil_proxy_id: 1,
          multiperfiles: false,
          rol: 'asdas',
        },
      })
    );
    expect(service.isLoggin()).toBeFalse();
  });

  it('isAuth should return true if login data not null', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: 'sas',
          usuario_nombre: '1',
          usuario_id: 1,
          nombre_perfil_select: '',
          permisos: [],
          perfil_proxy_id: 1,
          multiperfiles: false,
          rol: '',
        },
      })
    );
    expect(service.isAuth()).toBeTrue();
  });

  it('isAuth should return false if login data is null', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: null,
          usuario_nombre: null,
          usuario_id: null,
          nombre_perfil_select: 'asda',
          permisos: [],
          perfil_proxy_id: 1,
          multiperfiles: false,
          rol: 'asdas',
        },
      })
    );
    expect(service.isAuth()).toBeFalse();
  });

  it('isAuth should return false if sessionData is null', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: null,
      })
    );
    expect(service.isAuth()).toBeFalse();
  });

  it('isPerfiled should return true if permisos have data', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: '',
          usuario_nombre: null,
          usuario_id: null,
          nombre_perfil_select: 'asda',
          permisos: [1, 2],
          perfil_proxy_id: 1,
          multiperfiles: false,
          rol: 'asdas',
        },
      })
    );
    expect(service.isProfiled()).toBeTrue();
  });

  it('isPerfiled should return false if permisos is empty', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          token: '',
          usuario_nombre: null,
          usuario_id: null,
          nombre_perfil_select: 'asda',
          permisos: [],
          perfil_proxy_id: 1,
          multiperfiles: false,
          rol: 'asdas',
        },
      })
    );
    expect(service.isProfiled()).toBeFalse();
  });

  it('isPerfiled should return false if sessionData is null', () => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: null,
      })
    );
    expect(service.isProfiled()).toBeFalse();
  });
});
