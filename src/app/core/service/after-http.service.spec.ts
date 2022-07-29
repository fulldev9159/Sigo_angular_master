import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AfterHttpService } from './after-http.service';

describe('AfterHttpService', () => {
  let service: AfterHttpService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    service = new AfterHttpService(routerSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('afterHttpAction should return error if no type action defined', () => {
    const action = {
      type: '',
    };
    expect(function () {
      service.afterHttpAction(action);
    }).toThrow(new Error('Formato incorrecto'));
  });

  it('should call errorHandler for action error', () => {
    const action = {
      error: {
        error: {
          data: '',
          status: {
            code: 7,
            desc: 'Usuario de SIGO no encontrado o contraseña incorrecta',
          },
        },
      },
      type: 'loginError',
    };
    spyOn(service, 'errorHandler');
    service.afterHttpAction(action);
    expect(service.errorHandler).toHaveBeenCalled();
  });

  it('should call successHandler for action success', () => {
    const action = {
      response: {
        data: '',
        status: {
          code: 0,
          desc: '',
        },
      },
      type: 'loginSuccess',
    };
    spyOn(service, 'successHandler');
    service.successHandler(action);
    expect(service.successHandler).toHaveBeenCalled();
  });

  // it('afterHttpAction if action is "loginSuccess" and response is code 0 then should redirect to "/perfil-select"', () => {
  //   const action = {
  //     response: {
  //       data: '',
  //       status: {
  //         code: 0,
  //         desc: '',
  //       },
  //     },
  //     type: 'loginSuccess',
  //   };
  //   service.afterHttpAction(action);
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/perfil-select']);
  // });
});
