import { createReducer, on } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import * as perfilActions from '../perfil/perfil.actions';
import * as loadingsActions from './loadings.actions';
import * as contratosActions from '../contrato/contrato.actions';
import * as proveedorActions from '../proveedor/proveedor.actions';
import * as serviciosActions from '../servicios/servicios.actions';
import * as cubicacionActions from '../cubicacion/cubicacion.actions';
import * as otActions from '../ot/ot.actions';
import * as numeroInternoActions from '../numero-interno/numero-interno.actions';
import * as sustentoFinancieroActions from '../sustento-financiero/sustento-financiero.actions';
import * as proyectosActions from '../proyectos/proyectos.actions';
import * as informeAvanceActions from '../informe-avance/informe-avance.actions';
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
  sendingGetOTsFromNumeroInterno: boolean;
  sendingGetPlanDeProyecto: boolean;
  sendingGetSitioPlan: boolean;
  sendingGetPMO: boolean;
  sendingGetLP: boolean;
  sendingGetPEP2: boolean;
  sendingGetOPEX: boolean;
  sendingGetSAP: boolean;
  sendingGetCECO: boolean;
  sendingGetAdminContratoFromCub: boolean;
  sendingGetProyectos: boolean;
  sendingCreateOT: boolean;
  sendingGetPosibleSupervisorTrabajos: boolean;
  sendingSendDetalleInformeAvance: boolean;
  sendingSendBorradorInformeAvance: boolean;
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
  sendingGetOTsFromNumeroInterno: false,
  sendingGetPlanDeProyecto: false,
  sendingGetSitioPlan: false,
  sendingGetPMO: false,
  sendingGetLP: false,
  sendingGetPEP2: false,
  sendingGetOPEX: false,
  sendingGetSAP: false,
  sendingGetCECO: false,
  sendingGetAdminContratoFromCub: false,
  sendingGetProyectos: false,
  sendingCreateOT: false,
  sendingGetPosibleSupervisorTrabajos: false,
  sendingSendDetalleInformeAvance: false,
  sendingSendBorradorInformeAvance: false,
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

  on(numeroInternoActions.getTipoDeNumeroInterno, state => ({
    ...state,
    sendingGetTipoNumeroInterno: true,
  })),
  on(
    numeroInternoActions.getTipoDeNumeroInternoSuccess,
    numeroInternoActions.getTipoDeNumeroInternoError,
    state => ({
      ...state,
      sendingGetTipoNumeroInterno: false,
    })
  ),

  on(numeroInternoActions.getOTFromNumeroInterno, state => ({
    ...state,
    sendingGetOTsFromNumeroInterno: true,
  })),
  on(
    numeroInternoActions.getOTFromNumeroInternoSuccess,
    numeroInternoActions.getOTFromNumeroInternoError,
    state => ({
      ...state,
      sendingGetOTsFromNumeroInterno: false,
    })
  ),

  on(otActions.getPlanDeProyecto, state => ({
    ...state,
    sendingGetPlanDeProyecto: true,
  })),
  on(
    otActions.getPlanDeProyectoSuccess,
    otActions.getPlanDeProyectoError,
    state => ({
      ...state,
      sendingGetPlanDeProyecto: false,
    })
  ),

  on(otActions.getSitioPlanProyecto, state => ({
    ...state,
    sendingGetSitioPlan: true,
  })),
  on(
    otActions.getSitioPlanProyectoSuccess,
    otActions.getSitioPlanProyectoError,
    state => ({
      ...state,
      sendingGetSitioPlan: false,
    })
  ),

  on(sustentoFinancieroActions.getPMO, state => ({
    ...state,
    sendingGetPMO: true,
  })),
  on(
    sustentoFinancieroActions.getPMOSuccess,

    sustentoFinancieroActions.getPmoError,
    state => ({
      ...state,
      sendingGetPMO: false,
    })
  ),

  on(sustentoFinancieroActions.getLineaPresupuestaria, state => ({
    ...state,
    sendingGetLP: true,
  })),
  on(
    sustentoFinancieroActions.getLineaPresupuestariaSuccess,
    sustentoFinancieroActions.getLineaPresupuestariaError,
    state => ({
      ...state,
      sendingGetLP: false,
    })
  ),

  on(sustentoFinancieroActions.getPEP2, state => ({
    ...state,
    sendingGetPEP2: true,
  })),
  on(
    sustentoFinancieroActions.getPEP2Success,
    sustentoFinancieroActions.getPEP2Error,
    state => ({
      ...state,
      sendingGetPEP2: false,
    })
  ),

  on(sustentoFinancieroActions.getIDOpex, state => ({
    ...state,
    sendingGetOPEX: true,
  })),
  on(
    sustentoFinancieroActions.getIDOpexSuccess,
    sustentoFinancieroActions.getIDOpexError,
    state => ({
      ...state,
      sendingGetOPEX: false,
    })
  ),

  on(sustentoFinancieroActions.getCuentaSAP, state => ({
    ...state,
    sendingGetSAP: true,
  })),
  on(
    sustentoFinancieroActions.getCuentaSAPSuccess,
    sustentoFinancieroActions.getCuentaSAPError,
    state => ({
      ...state,
      sendingGetSAP: false,
    })
  ),

  on(sustentoFinancieroActions.getCECO, state => ({
    ...state,
    sendingGetCECO: true,
  })),
  on(
    sustentoFinancieroActions.getCECOSuccess,
    sustentoFinancieroActions.getCECOError,
    state => ({
      ...state,
      sendingGetCECO: false,
    })
  ),

  on(cubicacionActions.getAdminContratoFromCub, state => ({
    ...state,
    sendingGetAdminContratoFromCub: true,
  })),
  on(
    cubicacionActions.getAdminContratoFromCubSuccess,
    cubicacionActions.getAdminContratoFromCubError,
    state => ({
      ...state,
      sendingGetAdminContratoFromCub: false,
    })
  ),

  on(proyectosActions.getProyectos, state => ({
    ...state,
    sendingGetProyectos: true,
  })),
  on(
    proyectosActions.getProyectosSuccess,
    proyectosActions.getProyectosError,
    state => ({
      ...state,
      sendingGetProyectos: false,
    })
  ),

  on(otActions.createOT, state => ({
    ...state,
    sendingCreateOT: true,
  })),
  on(otActions.createOTSuccess, otActions.createOTError, state => ({
    ...state,
    sendingCreateOT: false,
  })),

  on(informeAvanceActions.sendDetalleInformeAvance, state => ({
    ...state,
    sendingSendDetalleInformeAvance: true,
  })),
  on(
    informeAvanceActions.sendDetalleInformeAvanceSuccess,
    informeAvanceActions.sendDetalleInformeAvanceError,
    state => ({
      ...state,
      sendingSendDetalleInformeAvance: false,
    })
  ),

  on(
    serviciosActions.agregarAdicionales,
    informeAvanceActions.actualizarInformeAvance,
    state => ({
      ...state,
      sendingSendBorradorInformeAvance: true,
    })
  ),

  on(
    serviciosActions.agregarAdicionalesSuccess,
    serviciosActions.agregarAdicionalesError,
    informeAvanceActions.actualizarInformeAvanceSuccess,
    informeAvanceActions.actualizarInformeAvanceError,
    state => ({
      ...state,
      sendingSendBorradorInformeAvance: false,
    })
  )
);
