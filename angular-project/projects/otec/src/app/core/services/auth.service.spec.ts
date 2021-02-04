import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service'; // 1. Se importa el servicio a probar

import * as LoginModel from '../../features/login/login.model';
describe('AuthService', () => {
  let service: AuthService; // 2.- Se crea la variable type del servicio a probar
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // 3.- Se limita el acceso al servicio solo a este componente --Leer más al respecto
      providers: [{ provide: 'environment', useValue: {} }, AuthService],
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    // 4.- Se realiza un inject de una instancia del servicio dentro de la variable creada para luego ser usada
    service = TestBed.inject(AuthService);
    let store: { [key: string]: string } = {};
    // MockLocalstorage para simular el funcionamiento del LocalStorage del navegador
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  // Verificar que no hayan solicitudes faltantes
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggedIn should return true if token exist', () => {
    localStorage.setItem('otec_token', 'testToken');
    expect(service.isLoggedIn()).toEqual(true);
  });

  it('isLoggedIn should return false if token not exist', () => {
    localStorage.clear();
    expect(service.isLoggedIn()).toEqual(false);
  });

  it('setItemStorage should storage key,value in a localstorage', () => {
    service.setItemStorage('testkey', 'testvalue');
    expect(service.getItemStorage('testkey')).toEqual('testvalue');
  });

  it('deleteItemStorage should clear localStorage', () => {
    service.setItemStorage('testkey', 'testvalue');
    service.deleteItemStorage();
    expect(service.getItemStorage('testkey')).toEqual(null);
  });

  it('should return user information', () => {
    const user = 'carloscj';
    const password = 'dummypassword';
    const dummyLoginResponse: LoginModel.AuthLoginResponse = {
      data: {
        token: '01EXND28AQ6ZF4ER4JVMWTB7YV',
        nombre_usuario: 'Carlos Alberto Campos Jaraquemada',
        roles_modulos: {
          Trabajador: {
            id: 5,
            nombre: 'Trabajador',
            modulos: {
              OT: {
                nombre: 'OT',
                privilegio: {
                  ver: false,
                  editar: false,
                },
              },
            },
          },
        },
      },
      status: {
        responseCode: 0,
        description: '',
      },
    };
    service.auth(user, password).subscribe((response) => {
      expect(response).toEqual(dummyLoginResponse);
    });
    const req = httpMock.expectOne('http://localhost:4040/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyLoginResponse);
  });

  it('should return response for logout', () => {
    const user = 'carloscj';
    const token = '01EXM8Q1RSB1WGW1WBQ07WB6YA';
    const dummyResponse: LoginModel.LogoutResponse = {
      user: 'jcastill',
      token: '01EXM8Q1RSB1WGW1WBQ07WB6YA',
      createdat: '',
      modifiedat: '',
    };
    service.logOut(user, token).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne('http://localhost:4040/logout');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });
});
