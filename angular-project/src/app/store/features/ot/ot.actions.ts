import { createAction, props } from '@ngrx/store';
import * as Data from '@data';
import {
  DataRespGetContratosUser,
  OT,
  PMO,
  RequestGetOTs,
  StatusResponse,
  Response,
  ResponseItems,
  DataRespGetPMO,
  DataRespGetLP,
  DataRespGetPEP2,
  DataRespGetOPEX,
  DataRespGetSAP,
  DataRespGetCECO,
  Proyectos,
  AdminContrato4OT,
  Cubs4OT,
  OficinaCentral,
  SolicitadoPor,
  Comuna,
  TipoDeRed,
  TipoDeTrabajo,
  AreaDeNegocio,
  ModelPlan,
  Sitio,
  TipoNumeroInterno,
  NumeroInternoHasOT,
  RequestCreateOTMovil,
  RequestCreateOTFijo,
  RequestCreateOTOrdinario,
  RequestCreateOTBucle,
  DataRespGetDetalleOT,
  MotivoRechazo,
  RequestAceptarRechazarOT,
  PosibleTrabajador,
  DataRespGetCategoriaArchivo,
  DataRespSubirArchivo,
  ReqCreateRegistroLibroObra,
} from '@data';

// GET OTS
export const getOTs = createAction(
  '[OT] Get OTs',
  props<{ request: RequestGetOTs }>()
);

export const getOtEjecucionSuccess = createAction(
  '[OT] GET OT Success Ejecucion',
  props<{ response: ResponseItems<OT[]> }>()
);

export const getOtAbiertasSuccess = createAction(
  '[OT] GET OT Success Abiertas',
  props<{ response: ResponseItems<OT[]> }>()
);

export const getOtSuccessCerradas = createAction(
  '[Ot GetAll] GET Ot Success Cerradas',
  props<{ response: ResponseItems<OT[]> }>()
);

export const getOtsError = createAction(
  '[Ot GetAll] GET Ot Error',
  props<{ error: any }>()
);

// GET DETALLE OT
export const getDetalleOT = createAction(
  '[OT] GET Detalle OT',
  props<{ id: number }>()
);

export const getDetalleOTSuccess = createAction(
  '[OT] GET Detalle OT Success',
  props<{ response: Response<DataRespGetDetalleOT> }>()
);

export const getDetalleOTError = createAction(
  '[OT] GET Detalle OT  Error',
  props<{ error: any }>()
);
// GET CONTRATOS USER 4 OT
export const getContratosUser4OT = createAction(
  '[OT] getContratosUser4OT ',
  props<{ usuario_id: number }>()
);

export const getContratosUser4OTSuccess = createAction(
  '[OT] getContratosUser4OT Success',
  props<{ response: Response<DataRespGetContratosUser> }>()
);
export const getContratosUser4OTError = createAction(
  '[OT] getContratosUser4OT Error',
  props<{ error: any }>()
);

// GET CUBICACIONES
export const getCubicaciones4OT = createAction(
  '[OT] GET getCubicaciones4OT',
  props<{ contrato_id: number }>()
);

export const getCubicaciones4OTSuccess = createAction(
  '[OT] GET getCubicaciones4OT Success',
  props<{ response: ResponseItems<Cubs4OT[]> }>()
);

export const getCubicaciones4OTError = createAction(
  '[OT] GET getCubicaciones4OT Error',
  props<{ error: any }>()
);

// CUBICACION SELECCIONADA
export const cubicacionSeleccionada = createAction(
  '[OT] GET cubicacionSeleccionada',
  props<{ cubicacion: Cubs4OT }>()
);

// GET PMO
export const getPMO = createAction(
  '[OT] GET PMO',
  props<{ sitio_codigo: string }>()
);

export const getPMOSuccess = createAction(
  '[OT] GET PMO Success',
  props<{ response: Response<DataRespGetPMO> }>()
);

export const getPmoError = createAction(
  '[OT] GET PMO Error',
  props<{ error: any }>()
);

// LP
export const getLineaPresupuestaria = createAction(
  '[OT] GET getLineaPresupuestaria',
  props<{ pmo_id: number }>()
);

export const getLineaPresupuestariaSuccess = createAction(
  '[OT] GET getLineaPresupuestaria Success',
  props<{ response: Response<DataRespGetLP> }>()
);

export const getLineaPresupuestariaError = createAction(
  '[OT] GET getLineaPresupuestaria Error',
  props<{ error: any }>()
);

// PEP2
export const getPEP2 = createAction(
  '[OT] GET getPEP2',
  props<{ pmo_codigo: number; linea_presupuestaria_codigo: string }>()
);

export const getPEP2Success = createAction(
  '[OT] GET getPEP2 Success',
  props<{ response: Response<DataRespGetPEP2> }>()
);

export const getPEP2Error = createAction(
  '[OT] GET getPEP2 Error',
  props<{ error: any }>()
);

// OPEX
export const getIDOpex = createAction('[OT] GET getIDOpex');

export const getIDOpexSuccess = createAction(
  '[OT] GET getIDOpex Success',
  props<{ response: Response<DataRespGetOPEX> }>()
);

export const getIDOpexError = createAction(
  '[OT] getIDOpex Error',
  props<{ error: any }>()
);

// SAP
export const getCuentaSAP = createAction(
  '[OT] GET getCuentaSAP',
  props<{ id_opex: string }>()
);

export const getCuentaSAPSuccess = createAction(
  '[OT] GET getCuentaSAP Success',
  props<{ response: Response<DataRespGetSAP> }>()
);

export const getCuentaSAPError = createAction(
  '[OT] GET getCuentaSAP Error',
  props<{ error: any }>()
);

// CECO
export const getCECO = createAction(
  '[OT] GET getCECO',
  props<{ id_opex: string; cuenta_sap: number }>()
);

export const getCECOSuccess = createAction(
  '[OT] GET getCECO Success',
  props<{ response: Response<DataRespGetCECO> }>()
);

export const getCECOError = createAction(
  '[OT] GET getCECO Error',
  props<{ error: any }>()
);

// GET PROYECTOS
export const getProyecto = createAction('[OT] GET getProyecto');

export const getProyectoSuccess = createAction(
  '[OT] GET getProyecto Success',
  props<{ response: ResponseItems<Proyectos[]> }>()
);

export const getProyectoError = createAction(
  '[OT] GET getProyecto Error',
  props<{ error: any }>()
);

// GET ADMIN CONTRATO
export const getAdminContrato = createAction(
  '[OT] GET getAdminContrato',
  props<{ cubicacion_id: number }>()
);

export const getAdminContratoSuccess = createAction(
  '[OT] GET getAdminContrato Success',
  props<{ response: ResponseItems<AdminContrato4OT[]> }>()
);

export const getAdminContratoError = createAction(
  '[OT] GET getAdminContrato Error',
  props<{ error: any }>()
);

// GET OFICINA CENTRAL
export const getOficinaCentral = createAction(
  '[OT] GET getOficinaCentral',
  props<{ agencia_id: number }>()
);

export const getOficinaCentralSuccess = createAction(
  '[OT] GET getOficinaCentral Success',
  props<{ response: ResponseItems<OficinaCentral[]> }>()
);

export const getOficinaCentralError = createAction(
  '[OT] GET getOficinaCentral Error',
  props<{ error: any }>()
);

// GET SOLICITADO POR
export const getSolicitadoPor = createAction('[OT] GET getSolicitadoPor');

export const getSolicitadoPorSuccess = createAction(
  '[OT] GET getSolicitadoPor Success',
  props<{ response: ResponseItems<SolicitadoPor[]> }>()
);

export const getSolicitadoPorError = createAction(
  '[OT] GET getSolicitadoPor Error',
  props<{ error: any }>()
);

// GET COMUNA
export const getComuna = createAction(
  '[OT] GET getComuna',
  props<{ cubicacion_id: number }>()
);

export const getComunaSuccess = createAction(
  '[OT] GET getComuna Success',
  props<{ response: ResponseItems<Comuna[]> }>()
);

export const getComunaError = createAction(
  '[OT] GET getComuna Error',
  props<{ error: any }>()
);

// GET TIPO DE RED
export const getTipoDeRed = createAction('[OT] GET getTipoDeRed');

export const getTipoDeRedSuccess = createAction(
  '[OT] GET getTipoDeRed Success',
  props<{ response: ResponseItems<TipoDeRed[]> }>()
);

export const getTipoDeRedError = createAction(
  '[OT] GET getComuna Error',
  props<{ error: any }>()
);

// GET TIPO DE TRABAJO
export const getTipoDeTrabajo = createAction(
  '[OT] GET getTipoDeTrabajo',
  props<{ cubicacion_id: number }>()
);

export const getTipoDeTrabajoSuccess = createAction(
  '[OT] GET getTipoDeTrabajo Success',
  props<{ response: ResponseItems<TipoDeTrabajo[]> }>()
);

export const getTipoDeTrabajoError = createAction(
  '[OT] GET getTipoDeTrabajo Error',
  props<{ error: any }>()
);

// GET TIPO DE NEGOCIO
export const getAreaDeNegocio = createAction('[OT] GET getAreaDeNegocio');

export const getAreaDeNegocioSuccess = createAction(
  '[OT] GET getAreaDeNegocio Success',
  props<{ response: ResponseItems<AreaDeNegocio[]> }>()
);

export const getAreaDeNegocioError = createAction(
  '[OT] GET getAreaDeNegocio Error',
  props<{ error: any }>()
);

// GET PLAN DE PROYECTO
export const getPlanDeProyecto = createAction('[OT] GET getPlanDeProyecto');

export const getPlanDeProyectoSuccess = createAction(
  '[OT] GET getPlanDeProyecto Success',
  props<{ response: ResponseItems<ModelPlan[]> }>()
);

export const getPlanDeProyectoError = createAction(
  '[OT] GET getPlanDeProyecto Error',
  props<{ error: any }>()
);

// GET SITIO
export const getSitio = createAction(
  '[OT] GET getSitio',
  props<{ plan_id: number }>()
);

export const getSitioSuccess = createAction(
  '[OT] GET getSitio Success',
  props<{ response: ResponseItems<Sitio[]> }>()
);

export const getSitioError = createAction(
  '[OT] GET getSitio Error',
  props<{ error: any }>()
);

// FIJO
// TIPO NUMERO INTERNO
export const getTipoNumeroInterno = createAction(
  '[OT] GET getTipoNumeroInterno'
);

export const getTipoNumeroInternoSuccess = createAction(
  '[OT] GET getTipoNumeroInterno Success',
  props<{ response: ResponseItems<TipoNumeroInterno[]> }>()
);

export const getTipoNumeroInternoError = createAction(
  '[OT] GET getTipoNumeroInterno Error',
  props<{ error: any }>()
);

// NUMERO INTERNO HAS OT
export const getNumeroInternoHasOT = createAction(
  '[OT] GET getNumeroInternoHasOT',
  props<{ numero_interno: string }>()
);

export const getNumeroInternoHasOTSuccess = createAction(
  '[OT] GET getNumeroInternoHasOT Success',
  props<{ response: ResponseItems<NumeroInternoHasOT[]> }>()
);

export const getNumeroInternoHasOTError = createAction(
  '[OT] GET getNumeroInternoHasOT Error',
  props<{ error: any }>()
);

// CREATE OT
export const createOT = createAction(
  '[OT] GET createOT',
  props<{
    request:
      | RequestCreateOTBucle
      | RequestCreateOTFijo
      | RequestCreateOTMovil
      | RequestCreateOTOrdinario;
  }>()
);

export const createOTSuccess = createAction(
  '[OT] GET createOT Success',
  props<{ response: Response<any> }>()
);

export const createOTError = createAction(
  '[OT] GET createOT Error',
  props<{ error: any }>()
);

// GET ALL MOTIVO RECHAZO
export const getAllMotivoRechazoOT = createAction(
  '[OT] GET getAllMotivoRechazoOT',
  props<{ tipo: string }>()
);

export const getAllMotivoRechazoOTSuccess = createAction(
  '[OT] GET getAllMotivoRechazoOT Success',
  props<{ response: ResponseItems<MotivoRechazo[]> }>()
);

export const getAllMotivoRechazoOTError = createAction(
  '[OT] GET getAllMotivoRechazoOT Error',
  props<{ error: any }>()
);

// ACEPTAR O RECHAZAR INCIAL
export const AceptarRechazarIncialOT = createAction(
  '[OT] GET AceptarRechazarIncialOT',
  props<{ request: RequestAceptarRechazarOT }>()
);

export const AceptarRechazarIncialOTSuccess = createAction(
  '[OT] GET AceptarRechazarIncialOT Success',
  props<{ response: Response<any> }>()
);

export const AceptarRechazarIncialOTError = createAction(
  '[OT] GET AceptarRechazarIncialOT Error',
  props<{ error: any }>()
);

// POSIBLES TRABAJADORES
export const getPosibleTrabajador = createAction(
  '[OT] GET getPosibleTrabajador',
  props<{ ot_id: number }>()
);

export const getPosibleTrabajadorSuccess = createAction(
  '[OT] GET getPosibleTrabajador Success',
  props<{ response: ResponseItems<PosibleTrabajador[]> }>()
);

export const getPosibleTrabajadorError = createAction(
  '[OT] GET getPosibleTrabajador Error',
  props<{ error: any }>()
);

// ACEPTAR PROVEEDOR
export const AceptarProveedorOT = createAction(
  '[OT] GET AceptarProveedorOT',
  props<{
    request: RequestAceptarRechazarOT;
    ot_id: number;
    proxy_id: number;
    concepto: string;
  }>() // ADM_CONTRATO','COORDINADOR','SUPERVISOR_DE_TRABAJOS')
);

export const AceptarProveedorOTError = createAction(
  '[OT] GET AceptarProveedorOT Error',
  props<{ error: any }>()
);

//  RECHAZAR PROVEEDOR
export const RechazarProveedorOT = createAction(
  '[OT] GET RechazarProveedorOT',
  props<{ request: RequestAceptarRechazarOT }>()
);

export const RechazarProveedorOTSuccess = createAction(
  '[OT] GET RechazarProveedorOT Success',
  props<{ response: Response<any> }>()
);

export const RechazarProveedorOTError = createAction(
  '[OT] GET RechazarProveedorOT Error',
  props<{ error: any }>()
);

//  ASIGNAR SUPERVISOR DE TRABAJOS
export const AsignarSupervisorTrabajosOT = createAction(
  '[OT] GET AsignarSupervisorTrabajosOT',
  props<{ ot_id: number; proxy_id: number; concepto: string }>()
);

export const AsignarSupervisorTrabajosOTSuccess = createAction(
  '[OT] GET AsignarSupervisorTrabajosOT Success',
  props<{ response: Response<any> }>()
);

export const AsignarSupervisorTrabajosOTError = createAction(
  '[OT] GET AsignarSupervisorTrabajosOT Error',
  props<{ error: any }>()
);

//  GET DETALLE INFORME DE AVANCE
export const getDetalleInformeAvance = createAction(
  '[OT] GET getDetalleInformeAvance',
  props<{ ot_id: number }>()
);

export const getDetalleInformeAvanceSuccess = createAction(
  '[OT] GET getDetalleInformeAvance Success',
  props<{ response: Response<any> }>()
);

export const getDetalleInformeAvanceError = createAction(
  '[OT] GET getDetalleInformeAvance Error',
  props<{ error: any }>()
);

//  UPDATE DETALLE INFORME DE AVANCE
export const updateDetalleInformeAvance = createAction(
  '[OT] GET updateDetalleInformeAvance',
  props<{
    ot_id: number;
    id: number;
    data: {
      servicio: {
        row_id: number;
        cantidad: number;
      }[];
      unidad_obra: {
        row_id: number;
        cantidad: number;
      }[];
    };
  }>()
);

export const updateDetalleInformeAvanceSuccess = createAction(
  '[OT] GET updateDetalleInformeAvance Success',
  props<{ response: Response<any> }>()
);

export const updateDetalleInformeAvanceError = createAction(
  '[OT] GET updateDetalleInformeAvance Error',
  props<{ error: any }>()
);

//  SEND DETALLE INFORME DE AVANCE
export const sendDetalleInformeAvance = createAction(
  '[OT] GET sendDetalleInformeAvance',
  props<{ ot_id: number }>()
);

export const sendDetalleInformeAvanceSuccess = createAction(
  '[OT] GET sendDetalleInformeAvance Success',
  props<{ response: Response<any> }>()
);

export const sendDetalleInformeAvanceError = createAction(
  '[OT] GET sendDetalleInformeAvance Error',
  props<{ error: any }>()
);

//  GET CATEGORIAS DE ARCHIVOS
export const getCategoriasArchivos = createAction(
  '[OT] GET getCategoriasArchivos'
);

export const getCategoriasArchivosSuccess = createAction(
  '[OT] GET getCategoriasArchivos Success',
  props<{ response: Response<DataRespGetCategoriaArchivo> }>()
);

export const getCategoriasArchivosError = createAction(
  '[OT] GET getCategoriasArchivos Error',
  props<{ error: any }>()
);

//  SUBIR ARCHIVO
export const subirArchivoLibroObras = createAction(
  '[OT] GET subirArchivo',
  props<{
    categoria_id: number;
    files: any;
    request_libroobras: ReqCreateRegistroLibroObra;
  }>()
);

export const subirArchivoSuccess = createAction(
  '[OT] GET subirArchivo Success',
  props<{ response: Response<DataRespSubirArchivo> }>()
);

export const subirArchivoError = createAction(
  '[OT] GET subirArchivo Error',
  props<{ error: any }>()
);

//  CREATE LIBRO DE OBRAS
export const createRegistroLibroObras = createAction(
  '[OT] GET createRegistroLibroObras',
  props<{ request: ReqCreateRegistroLibroObra }>()
);

export const createRegistroLibroObrasSuccess = createAction(
  '[OT] GET createRegistroLibroObras Success',
  props<{ response: Response<any> }>()
);

export const createRegistroLibroObrasError = createAction(
  '[OT] GET createRegistroLibroObras Error',
  props<{ error: any }>()
);

//  GET LIBRO DE OBRAS
export const getLibroObras = createAction(
  '[OT] GET getLibroObras',
  props<{ ot_id: number }>()
);

export const getLibroObrasSuccess = createAction(
  '[OT] GET getLibroObras Success',
  props<{ response: Response<any> }>()
);

export const getLibroObrasError = createAction(
  '[OT] GET getLibroObras Error',
  props<{ error: any }>()
);

export const resetData = createAction('[ResetData] ResetData');
export const resetContrato = createAction('[ResetData] Reset Contrato');
export const resetPlan = createAction('[ResetData] ResetPlan');
export const resetSitio = createAction('[ResetData] ResetSitio');
export const resetPMO = createAction('[ResetData] ResetPMO');
export const resetSAP = createAction('[ResetData] ResetSAP');
export const resetLPs = createAction('[ResetData] ResetLPs');
export const resetPEP2 = createAction('[ResetData] ResetPEP2');
export const resetCECO = createAction('[ResetData] ResetCECO');
//  //////

export const deleteOt = createAction(
  '[Ot DeleteById] DELETE Ot',
  props<{ otPosition: number }>()
);

export const deleteOtSuccess = createAction(
  '[Ot DeleteById] DELETE Ot Success',
  props<{ otId: string }>()
);

export const deleteOtError = createAction(
  '[Ot DeleteById] DELETE Ot Error',
  props<{ error: any }>()
);

export const editOt = createAction(
  '[Ot EditById] EDIT Ot',
  props<{ ot: Data.OT }>()
);

export const editOtSuccess = createAction(
  '[Ot EditById] EDIT Ot Success',
  props<{ OtId: string; Ot: Data.OT }>()
);

export const editOtError = createAction(
  '[Ot EditById] EDIT Ot Error',
  props<{ error: any }>()
);

export const replyOtSuccess = createAction(
  '[Ot Reply] POST Reply Ot Success',
  props<{ ot: Data.OT }>()
);

export const replyOtError = createAction(
  '[Ot Reply] POST Reply Ot Error',
  props<{ error: any }>()
);

export const stateOt = createAction(
  '[Ot State] POST State Ot',
  props<{ ot: Data.OT }>()
);

export const stateOtSuccess = createAction(
  '[Ot State] POST State Ot Success',
  props<{ ot: Data.OT }>()
);

export const stateOtError = createAction(
  '[Ot State] POST State Ot Error',
  props<{ error: any }>()
);

export const postOtSuccess = createAction(
  '[Ot Post] CREATE Ot Success',
  props<{ ot: Data.OT }>()
);

export const postOtError = createAction(
  '[Ot Post] CREATE Ot Error',
  props<{ error: any }>()
);

export const postOtSCESuccess = createAction(
  '[Ot Post] CREATE Ot SCE Success',
  props<{ ot: Data.OT }>()
);

// OT LIST

// OT FORM

export const selectOT = createAction(
  '[OT] select OT',
  props<{
    ot: Data.OT;
  }>()
);

// Estados de la OT
export const approveOT = createAction(
  '[OT] Approve OT',
  props<{ otID: number; coordinador_id: number }>()
);

export const approveOTSuccess = createAction('[OT] Approve OT success');

export const approveOTError = createAction(
  '[OT] Approve OT error',
  props<{ error: any }>()
);

export const rejectOT = createAction(
  '[OT] Reject OT',
  props<{ otID: number; motivo: string }>()
);

export const rejectOTSuccess = createAction('[OT] Reject OT success');

export const rejectOTError = createAction(
  '[OT] Reject OT error',
  props<{ error: any }>()
);

export const cancelOT = createAction(
  '[OT] Cancel OT',
  props<{ otID: number }>()
);

export const cancelOTSuccess = createAction('[OT] Cancel OT success');

export const cancelOTError = createAction(
  '[OT] Cancel OT error',
  props<{ error: any }>()
);

export const finalizeOTJobs = createAction(
  '[OT] Finalize OT Jobs',
  props<{ otID: number }>()
);

export const finalizeOTJobsSuccess = createAction(
  '[OT] Finalize OT Jobs success'
);

export const finalizeOTJobsError = createAction(
  '[OT] Finalize OT Jobs error',
  props<{ error: any }>()
);

// Aprobar la generación del acta
export const approveOTMinutesGeneration = createAction(
  '[OT] Approve OT minutes generation',
  props<{ otID: number }>()
);

export const approveOTMinutesGenerationSuccess = createAction(
  '[OT] Approve OT minutes generation success'
);

export const approveOTMinutesGenerationError = createAction(
  '[OT] Approve OT minutes generation error',
  props<{ error: any }>()
);

// Rechazar la generación del acta
export const rejectOTMinutesGeneration = createAction(
  '[OT] Reject OT minutes generation',
  props<{ otID: number }>()
);

export const rejectOTMinutesGenerationSuccess = createAction(
  '[OT] Reject OT minutes generation success'
);

export const rejectOTMinutesGenerationError = createAction(
  '[OT] Reject OT minutes generation error',
  props<{ error: any }>()
);

// Aprobar la validación del acta
export const approveOTMinutesValidation = createAction(
  '[OT] Approve OT minutes validation',
  props<{ otID: number }>()
);

export const approveOTMinutesValidationSuccess = createAction(
  '[OT] Approve OT minutes validation success'
);

export const approveOTMinutesValidationError = createAction(
  '[OT] Approve OT minutes validation error',
  props<{ error: any }>()
);

// Rechazar la validación del acta
export const rejectOTMinutesValidation = createAction(
  '[OT] Reject OT minutes validation',
  props<{ otID: number }>()
);

export const rejectOTMinutesValidationSuccess = createAction(
  '[OT] Reject OT minutes validation success'
);

export const rejectOTMinutesValidationError = createAction(
  '[OT] Reject OT minutes validation error',
  props<{ error: any }>()
);

// Autorizar pagos
export const authorizePayments = createAction(
  '[OT] Authorize payments',
  props<{ user_id: number; otID: number }>()
);

export const authorizePaymentsSuccess = createAction(
  '[OT] Authorize payments success'
);

export const authorizePaymentsError = createAction(
  '[OT] Authorize payments error',
  props<{ error: any }>()
);

// Rechazar pagos
export const rejectPayments = createAction(
  '[OT] Reject payments',
  props<{ otID: number }>()
);

export const rejectPaymentsSuccess = createAction(
  '[OT] Reject payments success'
);

export const rejectPaymentsError = createAction(
  '[OT] Reject payments error',
  props<{ error: any }>()
);

// Coordinadores
export const getCoordinators = createAction(
  '[OT] get coordinators',
  props<{ otID: number }>()
);

export const getCoordinatorsSuccess = createAction(
  '[OT] get coordinators success',
  props<{ coordinators: Data.User[] }>()
);

export const getCoordinatorsError = createAction(
  '[OT] get coordinators error',
  props<{ error: any }>()
);

export const assignCoordinator = createAction(
  '[OT] assign coordinator',
  props<{ otID: number; coordinador_id: number }>()
);

export const assignCoordinatorSuccess = createAction(
  '[OT] assign coordinator success'
);

export const assignCoordinatorError = createAction(
  '[OT] assign coordinator error',
  props<{ error: any }>()
);

// Trabajadores
export const getTrabajadores = createAction(
  '[OT] get trabajadores',
  props<{ otID: number }>()
);

export const getTrabajadoresSuccess = createAction(
  '[OT] get trabajadores success',
  props<{ trabajadores: Data.User[] }>()
);

export const getTrabajadoresError = createAction(
  '[OT] get trabajadores error',
  props<{ error: any }>()
);

export const assignTrabajador = createAction(
  '[OT] assign trabajador',
  props<{ otID: number; trabajadorID: number }>()
);

export const assignTrabajadorSuccess = createAction(
  '[OT] assign trabajador success'
);

export const assignTrabajadorError = createAction(
  '[OT] assign trabajador error',
  props<{ error: any }>()
);

// finalizar OT
export const finalizeOT = createAction(
  '[OT] finalize OT',
  props<{ otID: number }>()
);

export const finalizeOTSuccess = createAction('[OT] finalize OT success');

export const finalizeOTError = createAction(
  '[OT] finalize OT error',
  props<{ error: any }>()
);

// Registrar en el libro de obras
export const registrarLibroObra = createAction(
  '[OT] Registrar en el libro de obras',
  props<{ registro: Data.RegistroLibroObraRequest }>()
);

export const registrarLibroObraSuccess = createAction(
  '[OT] Registrar en el libro de obras success'
);

export const registrarLibroObraError = createAction(
  '[OT] Registrar en el libro de obras error',
  props<{ error: any }>()
);

// Registros libro de obra
export const getRegistrosLibroObra = createAction(
  '[OT] get registros libro de obra',
  props<{ ot_id: number }>()
);

export const getRegistrosLibroObraSuccess = createAction(
  '[OT] get registros libro de obra success',
  props<{ registroslibroobras: Data.RegistroLibroObra[] }>()
);

export const getRegistrosLibroObraError = createAction(
  '[OT] get registros libro de obra error',
  props<{ error: any }>()
);

// // Inicializar informe avance
// export const inicializarInformeAvance = createAction(
//   '[OT] inicializar informe avance',
//   props<{ ot_id: number }>()
// );

// export const inicializarInformeAvanceSuccess = createAction(
//   '[OT] inicializar informe avance success',
//   props<{ status: StatusResponse }>()
// );

// export const inicializarInformeAvanceError = createAction(
//   '[OT] inicializar informe avance error',
//   props<{ error: any }>()
// );

// Get data informe avance
export const getDataInformeAvanceTrabajador = createAction(
  '[OT] GET data informe avance trabajador',
  props<{ ot_id: number }>()
);
