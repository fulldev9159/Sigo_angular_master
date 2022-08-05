import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AfterHttpService } from './after-http.service';
import { SnackMessageService } from './snack-message.service';

import * as authActions from '@storeOT/auth/auth.actions';
import * as perfilActions from '@storeOT/perfil/perfil.actions';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { StoreModule } from '@ngrx/store';

describe('AfterHttpService', () => {
  let service: AfterHttpService;
  let routerSpy: jasmine.SpyObj<Router>;
  let snakeMessage: SnackMessageService;
  let authFacade: AuthFacade;
  let snackMessage: SnackMessageService;
  beforeEach(() => {
    TestBed.configureTestingModule(StoreModule.forRoot({}));
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    snakeMessage = TestBed.inject(SnackMessageService);
    authFacade = TestBed.inject(AuthFacade);
    service = new AfterHttpService(routerSpy, snakeMessage, authFacade);
    snackMessage = TestBed.inject(SnackMessageService);
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

  it('afterHttpAction if action is "Logout" should redirect to "/login/auth"', () => {
    const action = {
      response: {
        data: '',
        status: {
          code: 0,
          desc: '',
        },
      },
      type: authActions.Logout.type,
    };
    service.successHandler(action);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login/auth']);
  });

  it('afterHttpAction if action is "getPerfilesUsuarioSuccess" and code 0 and data empty should display error message', () => {
    spyOn(snackMessage, 'showMessage');
    const action: any = {
      response: {
        data: { perfiles: [] },
        status: {
          code: 0,
          desc: '',
        },
      },
      type: perfilActions.getPerfilesUsuarioSuccess.type,
    };
    service.successHandler(action);
    expect(snackMessage.showMessage).toHaveBeenCalled();
  });

  it('afterHttpAction if action is "refreshLoginSuccess" should call getPermisosPerfilUsuario4Login', () => {
    spyOn(authFacade, 'getPermisosPerfilUsuario4Login');
    const action = {
      response: {
        data: '',
        status: {
          code: 0,
          desc: '',
        },
      },
      type: authActions.refreshLoginSuccess.type,
    };
    service.successHandler(action);
    expect(authFacade.getPermisosPerfilUsuario4Login).toHaveBeenCalled();
  });

  it('afterHttpAction if action is "getPermisosPerfilUsuario4LoginSuccess" should redirect to "/home"', () => {
    const action = {
      response: {
        data: '',
        status: {
          code: 0,
          desc: '',
        },
      },
      type: authActions.getPermisosPerfilUsuario4LoginSuccess.type,
    };
    service.successHandler(action);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
