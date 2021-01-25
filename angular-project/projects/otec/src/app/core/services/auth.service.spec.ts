import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService } from './auth.service'; // 1. Se importa el servicio a probar

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

  it('getToken should return token', () => {
    localStorage.setItem('otec_token', 'testToken');
    expect(service.getToken()).toEqual('testToken');
  });

  it('setToken should update token', () => {
    service.setToken('testToken2');
    expect(service.getToken()).toEqual('testToken2');
  });

  // xit('setPrivilegios should update LocalStorage key privilegios', () => {
  //   const roles = [
  //     {
  //       id: 1,
  //       nombre: 'gestor',
  //       accesos: [
  //         {
  //           modulo: 'A',
  //           privilegio: {
  //             ver: true,
  //             editar: false,
  //           },
  //         },
  //         {
  //           modulo: 'B',
  //           privilegio: {
  //             ver: true,
  //             editar: false,
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       id: 1,
  //       nombre: 'coordinador',
  //       accesos: [
  //         {
  //           modulo: 'A',
  //           privilegio: {
  //             ver: true,
  //             editar: false,
  //           },
  //         },
  //         {
  //           modulo: 'B',
  //           privilegio: {
  //             ver: true,
  //             editar: false,
  //           },
  //         },
  //       ],
  //     },
  //   ];
  //   service.setPrivilegios(roles);
  //   expect(service.getPrivilegios).toEqual(roles);
  // });

  it('isLogin should return true if token exist', () => {
    localStorage.setItem('otec_token', 'testToken');
    expect(service.isLogin()).toEqual(true);
  });

  it('isLogin should return false if token not exist', () => {
    expect(service.isLogin()).toEqual(false);
  });

  // it('should return a observable<AuthLoginResponse>', () => {
  //   const user = 'dummyuser';
  //   const password = 'dummypassword';
  //   const dummyLoginResponse = {
  //     data: {
  //       token: 'token0xafgfgfgtoken',
  //       roles: [
  //         {
  //           id: 1,
  //           nombre: 'gestor',
  //           accesos: [
  //             { modulo: 'A', privilegio: { ver: true, editar: false } },
  //             { modulo: 'B', privilegio: { ver: true, editar: false } },
  //           ],
  //         },
  //         {
  //           id: 1,
  //           nombre: 'coordinador',
  //           accesos: [
  //             { modulo: 'A', privilegio: { ver: true, editar: false } },
  //             { modulo: 'B', privilegio: { ver: true, editar: false } },
  //           ],
  //         },
  //       ],
  //     },
  //     status: { responseCode: 0, description: 'OK' },
  //   };
  //   service.auth(user, password).subscribe((response) => {
  //     expect(response).toEqual(dummyLoginResponse);
  //   });
  //   const req = httpMock.expectOne('http://localhost:8021/Test/OTEC/login');
  //   expect(req.request.method).toBe('POST');
  //   req.flush(dummyLoginResponse);
  // });

  xit('should logout', () => {});
});
