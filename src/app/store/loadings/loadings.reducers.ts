import { createReducer, on } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as perfilActions from '../perfil/perfil.actions';
import * as loadingsActions from './loadings.actions';
import * as contratosActions from '../contrato/contrato.actions';
import * as proveedorActions from '../proveedor/proveedor.actions';
import * as serviciosActions from '../servicios/servicios.actions';
import * as cubicacionActions from '../cubicacion/cubicacion.actions';
import * as otActions from '../ot/ot.actions';

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
  sendingGetServiciosAgenciaContratoProveedor: boolean;
  sendingGetUnidadesObraServicios: boolean;
  sendingAgregarServicioCarrito: boolean;
  sendingSaveCubicacion: boolean;
  sendingClonarCubicacion: boolean;
  sendingGetCubicaciones: boolean;
  sendingDetalleCubicacion: boolean;
  sendingGetCubicacionesContrato: boolean;
  sendingGetOficinaCentral: boolean;
  sendingGetSolicitadoPor: boolean;
  sendingGetComunasFromCub: boolean;
  sendingGetTipoDeRed: boolean;
  sendingGetTipoDeTrabajoFromCub: boolean;
  sendingGetAreaDeNegocio: boolean;
  sendingGetTipoNumeroInterno: boolean;
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
  sendingGetServiciosAgenciaContratoProveedor: false,
  sendingGetUnidadesObraServicios: false,
  sendingAgregarServicioCarrito: false,
  sendingSaveCubicacion: false,
  sendingGetCubicaciones: false,
  sendingDetalleCubicacion: false,
  sendingClonarCubicacion: false,
  sendingGetCubicacionesContrato: false,
  sendingGetOficinaCentral: false,
  sendingGetSolicitadoPor: false,
  sendingGetComunasFromCub: false,
  sendingGetTipoDeRed: false,
  sendingGetTipoDeTrabajoFromCub: false,
  sendingGetAreaDeNegocio: false,
  sendingGetTipoNumeroInterno: false,
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
  ),
  on(serviciosActions.getServiciosAgenciaContratoProveedor, state => ({
    ...state,
    sendingGetServiciosAgenciaContratoProveedor: true,
  })),
  on(
    serviciosActions.getServiciosAgenciaContratoProveedorSuccess,
    serviciosActions.getServiciosAgenciaContratoProveedorError,
    state => ({
      ...state,
      sendingGetServiciosAgenciaContratoProveedor: false,
    })
  ),
  on(serviciosActions.getUnidadesObraServicio, state => ({
    ...state,
    sendingGetUnidadesObraServicios: true,
  })),
  on(
    serviciosActions.getUnidadesObraServicioSuccess,
    serviciosActions.getUnidadesObraServicioError,
    state => ({
      ...state,
      sendingGetUnidadesObraServicios: false,
    })
  ),
  on(serviciosActions.addServicioCarrito, state => ({
    ...state,
    sendingAgregarServicioCarrito: true,
  })),
  on(
    serviciosActions.addServicioCarritoSuccess,
    serviciosActions.addServicioCarritoError,
    state => ({
      ...state,
      sendingAgregarServicioCarrito: false,
    })
  ),
  on(
    cubicacionActions.createCubicacion,
    cubicacionActions.editCubicacion,
    state => ({
      ...state,
      sendingSaveCubicacion: true,
    })
  ),
  on(
    cubicacionActions.createCubicacionSuccess,
    cubicacionActions.createCubicacionError,
    cubicacionActions.editCubicacionSuccess,
    cubicacionActions.editCubicacionError,
    state => ({
      ...state,
      sendingSaveCubicacion: false,
    })
  ),
  on(cubicacionActions.listarCubicaciones, state => ({
    ...state,
    sendingGetCubicaciones: true,
  })),
  on(
    cubicacionActions.listarCubicacionesSuccess,
    cubicacionActions.listarCubicacionesError,
    state => ({
      ...state,
      sendingGetCubicaciones: false,
    })
  ),
  on(
    cubicacionActions.detalleCubicacionSuccess,
    cubicacionActions.detalleCubicacionError,
    state => ({
      ...state,
      sendingDetalleCubicacion: false,
    })
  ),
  on(cubicacionActions.detalleCubicacion, state => ({
    ...state,
    sendingDetalleCubicacion: true,
  })),

  on(cubicacionActions.clonarCubicacion, state => ({
    ...state,
    sendingClonarCubicacion: true,
  })),
  on(
    cubicacionActions.clonarCubicacionSuccess,
    cubicacionActions.clonarCubicacionError,
    state => ({
      ...state,
      sendingClonarCubicacion: false,
    })
  ),

  on(cubicacionActions.getCubicacionesContrato, state => ({
    ...state,
    sendingGetCubicacionesContrato: true,
  })),
  on(
    cubicacionActions.getCubicacionesContratoSuccess,
    cubicacionActions.getCubicacionesContratoError,
    state => ({
      ...state,
      sendingGetCubicacionesContrato: false,
    })
  ),

  on(otActions.getOficinaCentral, state => ({
    ...state,
    sendingGetOficinaCentral: true,
  })),
  on(
    otActions.getOficinaCentralSuccess,
    otActions.getOficinaCentralError,
    state => ({
      ...state,
      sendingGetOficinaCentral: false,
    })
  ),

  on(otActions.getSolicitadoPor, state => ({
    ...state,
    sendingGetSolicitadoPor: true,
  })),
  on(
    otActions.getSolicitadoPorSuccess,
    otActions.getSolicitadoPorError,
    state => ({
      ...state,
      sendingGetSolicitadoPor: false,
    })
  ),

  on(otActions.getComunasFromCub, state => ({
    ...state,
    sendingGetComunasFromCub: true,
  })),
  on(
    otActions.getComunasFromCubSuccess,
    otActions.getComunasFromCublError,
    state => ({
      ...state,
      sendingGetComunasFromCub: false,
    })
  ),

  on(otActions.getTipoDeRed, state => ({
    ...state,
    sendingGetTipoDeRed: true,
  })),
  on(otActions.getTipoDeRedSuccess, otActions.getTipoDeRedError, state => ({
    ...state,
    sendingGetTipoDeRed: false,
  })),

  on(otActions.getTipoDeTrabajoFromCub, state => ({
    ...state,
    sendingGetTipoDeTrabajoFromCub: true,
  })),
  on(
    otActions.getTipoDeTrabajoFromCubSuccess,
    otActions.getTipoDeTrabajoFromCubError,
    state => ({
      ...state,
      sendingGetTipoDeTrabajoFromCub: false,
    })
  ),

  on(otActions.getAreaDeNegocio, state => ({
    ...state,
    sendingGetAreaDeNegocio: true,
  })),
  on(
    otActions.getAreaDeNegocioSuccess,
    otActions.getAreaDeNegocioError,
    state => ({
      ...state,
      sendingGetAreaDeNegocio: false,
    })
  ),

  on(otActions.getTipoDeNumeroInterno, state => ({
    ...state,
    sendingGetTipoNumeroInterno: true,
  })),
  on(
    otActions.getTipoDeNumeroInternoSuccess,
    otActions.getTipoDeNumeroInternoError,
    state => ({
      ...state,
      sendingGetTipoNumeroInterno: false,
    })
  )
);
