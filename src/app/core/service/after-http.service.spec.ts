import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AfterHttpService } from './after-http.service';
import { SnackMessageService } from './snack-message.service';

import * as authActions from '@storeOT/auth/auth.actions';
import * as perfilActions from '@storeOT/perfil/perfil.actions';
import * as usuarioActions from '@storeOT/usuario/usuario.actions';
import * as cubicacionActions from '@storeOT/cubicacion/cubicacion.actions';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { StoreModule } from '@ngrx/store';
import {
  ContratosUsuarioMOCK200OKSinContratos,
  eliminarCubicacionMOCK200ok,
  eliminarServicioCarritoMOCK200ok,
  saveCubicacionMOCK200ok,
} from '@mocksOT';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { OTFacade } from '@storeOT/ot/ot.facades';

describe('AfterHttpService', () => {
  let service: AfterHttpService;
  let routerSpy: jasmine.SpyObj<Router>;
  let snakeMessage: SnackMessageService;
  let authFacade: AuthFacade;
  let snackMessage: SnackMessageService;
  let cubicacionFacade: CubicacionFacade;
  let otFacade: OTFacade;
  beforeEach(() => {
    TestBed.configureTestingModule(StoreModule.forRoot({}));
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
    snakeMessage = TestBed.inject(SnackMessageService);
    authFacade = TestBed.inject(AuthFacade);
    cubicacionFacade = TestBed.inject(CubicacionFacade);
    otFacade = TestBed.inject(OTFacade);
    service = new AfterHttpService(
      routerSpy,
      snakeMessage,
      authFacade,
      cubicacionFacade,
      otFacade
    );
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

  it('afterHttpAction if action is "getContratosUsuarioSuccess" and user has no contrats should display message "No tiene contratos asignados. Favor contactar con el administrador del sistema" ', () => {
    spyOn(snackMessage, 'showMessage');
    const action = {
      response: ContratosUsuarioMOCK200OKSinContratos,
      type: usuarioActions.getContratosUsuarioSuccess.type,
    };
    service.successHandler(action);
    expect(snackMessage.showMessage).toHaveBeenCalledWith(
      'No tiene contratos asignados. Favor contactar con el administrador del sistema',
      'info',
      6000
    );
  });

  it('afterHttpAction if action is "createCubicacionSuccess" should display message "Cubicación creada con exito. Cubicación ID:3 " ', () => {
    spyOn(snackMessage, 'showMessage');
    const action = {
      response: saveCubicacionMOCK200ok,
      type: cubicacionActions.createCubicacionSuccess.type,
    };
    service.successHandler(action);
    expect(snackMessage.showMessage).toHaveBeenCalledWith(
      'Cubicación creada con exito. Cubicación ID:3',
      'Exito',
      6000
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cubicacion/list-cub']);
  });

  it('afterHttpAction if action is "clonarCubicacionSuccess" should display message "Clonación realizada con éxito. Nueva Cubicación ID:3 " ', () => {
    spyOn(cubicacionFacade, 'listarCubicaciones');
    spyOn(snackMessage, 'showMessage');
    const action = {
      response: saveCubicacionMOCK200ok,
      type: cubicacionActions.clonarCubicacionSuccess.type,
    };
    service.successHandler(action);
    expect(snackMessage.showMessage).toHaveBeenCalledWith(
      'Clonación realizada con éxito. Nueva Cubicación ID:3',
      'Exito',
      6000
    );
    expect(cubicacionFacade.listarCubicaciones).toHaveBeenCalled();
  });

  it('afterHttpAction if action is "eliminarCubicacion" should display message "Cubicación ID:6 eliminada con exito" y debe listar nuevamente las cubicaciones" ', () => {
    spyOn(cubicacionFacade, 'listarCubicaciones');
    spyOn(snackMessage, 'showMessage');
    const action = {
      response: eliminarCubicacionMOCK200ok,
      type: cubicacionActions.eliminarCubicacionSuccess.type,
    };
    service.successHandler(action);
    expect(snackMessage.showMessage).toHaveBeenCalledWith(
      'Cubicación ID:6 eliminada con exito',
      'Exito',
      6000
    );
    expect(cubicacionFacade.listarCubicaciones).toHaveBeenCalled();
  });

  it('afterHttpAction if action is "eliminarServicioCarrito" should display message "Eliminación exitosa" " ', () => {
    spyOn(snackMessage, 'showMessage');
    const action = {
      response: eliminarServicioCarritoMOCK200ok,
      type: cubicacionActions.eliminarServicioCarritoSuccess.type,
    };
    service.successHandler(action);
    expect(snackMessage.showMessage).toHaveBeenCalledWith(
      'Eliminación exitosa',
      'Exito',
      6000
    );
  });
});
