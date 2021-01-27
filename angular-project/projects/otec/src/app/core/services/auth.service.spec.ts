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

  it('should be created', () => {
    const service: AuthService = TestBed.inject(AuthService);
    expect(service).toBeTruthy();
  });

  it('getToken should return token', () => {
    localStorage.setItem('otec_token', 'testToken');
    expect(service.getToken()).toEqual('testToken');
  });

  it('setToken should update token', () => {
    service.setToken('testToken2');
    expect(service.getToken()).toEqual('testToken2');
  });

  it('deleteToken should clear localStorage', () => {
    service.deleteToken();
    expect(service.getToken()).toEqual(null);
  });

  it('isLogin should return true if token exist', () => {
    localStorage.setItem('otec_token', 'testToken');
    expect(service.isLogin()).toEqual(true);
  });

  it('isLogin should return false if token not exist', () => {
    expect(service.isLogin()).toEqual(false);
  });

  it('should return a observable<AuthLoginResponse>', () => {
    const user = 'dummyuser';
    const password = 'dummypassword';
    const dummyLoginResponse = {
      data: {
        token: '0xestasdad',
        nombre_usuario: 'JESSICA LORENA CASTILLO GONZÁLEZ',
        roles_modules: [
          {
            id: 2,
            nombre: 'Gestor',
            modulos: [
              {
                id: 1,
                nombre: 'OT',
              },
              {
                id: 2,
                nombre: 'Cubicacion',
              },
            ],
          },
        ],
      },
      status: {
        responseCode: 0,
        description: 'Consulta OK',
      },
    };
    service.auth(user, password).subscribe((response) => {
      expect(response).toEqual(dummyLoginResponse);
    });
    const req = httpMock.expectOne('http://localhost:8021/Test/OTEC/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyLoginResponse);
  });

  it('setPrivilegios should update LocalStorage key privilegios', () => {
    const roles = [
      {
        id: 2,
        nombre: 'Gestor',
        modulos: [
          {
            id: 1,
            nombre: 'OT',
          },
          {
            id: 2,
            nombre: 'Cubicacion',
          },
        ],
      },
    ];
    service.setPrivilegios(roles);

    expect(service.getPrivilegios()).toEqual(roles);
  });

  it('getPrivilegios should return privilegios', () => {
    const roles = [
      {
        id: 2,
        nombre: 'Gestor',
        modulos: [
          {
            id: 1,
            nombre: 'OT',
          },
          {
            id: 2,
            nombre: 'Cubicacion',
          },
        ],
      },
    ];
    const privilegiosJSON = JSON.stringify(roles);
    localStorage.setItem('privilegios_user', privilegiosJSON);
    expect(service.getPrivilegios()).toEqual(roles);
  });

  it('setNombre should update LocalStorage key nombre_usuario', () => {
    service.setNombre('Jorge Retamal Aburto');
    expect(service.getNombre()).toEqual('Jorge Retamal Aburto');
  });

  it('getNombre should return Nombre', () => {
    localStorage.setItem('nombre_usuario', 'Jorge Retamal Aburto');
    expect(service.getNombre()).toEqual('Jorge Retamal Aburto');
  });

  it('getRol should return rol', () => {
    const roles = [
      {
        id: 2,
        nombre: 'Gestor',
        modulos: [
          {
            id: 1,
            nombre: 'OT',
          },
          {
            id: 2,
            nombre: 'Cubicacion',
          },
        ],
      },
    ];
    const privilegiosJSON = JSON.stringify(roles);
    localStorage.setItem('privilegios_user', privilegiosJSON);
    expect(service.getRol()).toEqual('Gestor');
  });

  it('getMenu should return ArrayMenu', () => {
    const Menu = ['OT', 'Cubicacion'];
    const roles = [
      {
        id: 2,
        nombre: 'Gestor',
        modulos: [
          {
            id: 1,
            nombre: 'OT',
          },
          {
            id: 2,
            nombre: 'Cubicacion',
          },
        ],
      },
    ];
    const privilegiosJSON = JSON.stringify(roles);
    localStorage.setItem('privilegios_user', privilegiosJSON);
    expect(service.getMenu()).toEqual(Menu);
  });

  xit('should logout', () => {});
});
