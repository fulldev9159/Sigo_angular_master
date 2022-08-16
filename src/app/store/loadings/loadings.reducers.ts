import { createReducer, on } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as perfilActions from '../perfil/perfil.actions';
import * as loadingsActions from './loadings.actions';
import * as contratosActions from '../contrato/contrato.actions';
import * as proveedorActions from '../proveedor/proveedor.actions';

export const FeatureKey = 'loadings';

export interface StateLoadings {
  sendingLogin: boolean;
  sendingGetPerfilesUser4Login: boolean;
  sendingRefreshLogin: boolean;
  sendingPermisosPerfilUser: boolean;
  sendingGetAgenciasContrato: boolean;
  sendingGetProveedorAgenciasContrato: boolean;
  sendingGetActividadesContratoProveedor: boolean;
  sendingGetTipoServiciosContrato: boolean;
}

export const initialStateLoading: StateLoadings = {
  sendingLogin: false,
  sendingGetPerfilesUser4Login: false,
  sendingRefreshLogin: false,
  sendingPermisosPerfilUser: false,
  sendingGetAgenciasContrato: false,
  sendingGetProveedorAgenciasContrato: false,
  sendingGetActividadesContratoProveedor: false,
  sendingGetTipoServiciosContrato: false,
};

export const reducerLoadings = createReducer(
  initialStateLoading,
  on(authActions.login, state => ({
    ...state,
    sendingLogin: true,
  })),
  on(authActions.loginError, authActions.loginSuccess, state => ({
    ...state,
    sendingLogin: false,
  })),
  on(loadingsActions.sendingGetPerfilesUser, state => ({
    ...state,
    sendingGetPerfilesUser4Login: true,
  })),
  on(
    perfilActions.getPerfilesUsuarioError,
    perfilActions.getPerfilesUsuarioSuccess,
    state => ({
      ...state,
      sendingGetPerfilesUser4Login: false,
    })
  ),
  on(authActions.refreshLogin, state => ({
    ...state,
    sendingRefreshLogin: true,
  })),
  on(authActions.refreshLoginSuccess, authActions.refreshLoginError, state => ({
    ...state,
    sendingRefreshLogin: false,
  })),
  on(authActions.getPermisosPerfilUsuario4Login, state => ({
    ...state,
    sendingPermisosPerfilUser: true,
  })),
  on(
    authActions.getPermisosPerfilUsuario4LoginSuccess,
    authActions.getPermisosPerfilUsuario4LoginError,
    state => ({
      ...state,
      sendingPermisosPerfilUser: false,
    })
  ),
  on(contratosActions.getAgenciasContrato, state => ({
    ...state,
    sendingGetAgenciasContrato: true,
  })),
  on(
    contratosActions.getAgenciasContratoSuccess,
    contratosActions.getAgenciasContratoError,
    state => ({
      ...state,
      sendingGetAgenciasContrato: false,
    })
  ),
  on(proveedorActions.getProveedoresAgenciaContrato, state => ({
    ...state,
    sendingGetProveedorAgenciasContrato: true,
  })),
  on(
    proveedorActions.getProveedoresAgenciaContratoSuccess,
    proveedorActions.getProveedoresAgenciaContratoError,
    state => ({
      ...state,
      sendingGetProveedorAgenciasContrato: false,
    })
  ),
  on(contratosActions.getActividadesContratoProveedor, state => ({
    ...state,
    sendingGetActividadesContratoProveedor: true,
  })),
  on(
    contratosActions.getActividadesContratoProveedorSuccess,
    contratosActions.getActividadesContratoProveedorError,
    state => ({
      ...state,
      sendingGetActividadesContratoProveedor: false,
    })
  ),
  on(contratosActions.getTipoServiciosContrato, state => ({
    ...state,
    sendingGetTipoServiciosContrato: true,
  })),
  on(
    contratosActions.getTipoServiciosContratoSuccess,
    contratosActions.getTipoServiciosContratoError,
    state => ({
      ...state,
      sendingGetTipoServiciosContrato: false,
    })
  )
);
