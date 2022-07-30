import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AfterHttpService } from './after-http.service';
import { SnackMessageService } from './snack-message.service';

import * as authActions from '@storeOT/auth/auth.actions';

describe('AfterHttpService', () => {
  let service: AfterHttpService;
  let routerSpy: jasmine.SpyObj<Router>;
  let snakeMessage: SnackMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    snakeMessage = TestBed.inject(SnackMessageService);
    service = new AfterHttpService(routerSpy, snakeMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('afterHttpAction should return error if no type action defined', () => {
  //   const action = {
  //     type: '',
  //   };
  //   expect(function () {
  //     service.afterHttpAction(action);
  //   }).toThrow(new Error('Formato incorrecto'));
  // });

  it('should call snack-message for errorHandler', () => {
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
    const snackSpy = spyOn(snakeMessage, 'showMessage');
    service.errorHandler(action);
    expect(snackSpy).toHaveBeenCalled();
  });

  it('afterHttpAction if action is "loginSuccess" and response is code 0 then should redirect to "/perfil-select"', () => {
    const action = {
      response: {
        data: '',
        status: {
          code: 0,
          desc: '',
        },
      },
      type: authActions.loginSuccess.type,
    };
    service.successHandler(action);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login/perfil-select']);
  });
});
