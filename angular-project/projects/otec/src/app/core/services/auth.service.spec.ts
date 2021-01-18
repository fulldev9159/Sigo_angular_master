import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service'; //1. Se importa el servicio a probar

describe('AuthService', () => {
  let service: AuthService; //2.- Se crea la variable type del servicio a probar
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],  //3.- Se limita el acceso al servicio solo a este componente --Leer más al respecto
    });
    service = TestBed.inject(AuthService); //4.- Se realiza un inject de una instancia del servicio dentro de la variable creada para luego ser usada

    let store: { [key: string]: string } = {};
    //MockLocalstorage para simular el funcionamiento del LocalStorage del navegador
    const mockLocalStorage = {
      getItem: (key: string): string|null => {
        return key in store ? store[key]:null;
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

  it('getToken should return token', () => {
    localStorage.setItem('otec_token', 'testToken');
    expect(service.getToken()).toEqual('testToken');
  });

  xit('setToken should update token', () => {});

  it('isLogin should return true if token exist',()=>{
    localStorage.setItem('otec_token', 'testToken');
    expect(service.isLogin()).toEqual(true)
  })

  it('isLogin should return false if token not exist',()=>{
    expect(service.isLogin()).toEqual(false)
  })
});
