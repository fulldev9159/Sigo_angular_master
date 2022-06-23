import { createAction, props } from '@ngrx/store';
import * as Data from '@data';
import {
  DataInformeAvance,
  DataRespGetContratosUser,
  LpuInformeAvanceDetalle,
  OT,
  PMO,
  RequestGetOTs,
  RequestSaveBorradorInformeAvance,
  RequestSaveInformeAvance,
  RequestSaveInformeAvanceAdmin,
  Sitio,
  StatusResponse,
  Response,
  DataRespGetPMO,
  DataRespGetLP,
  DataRespGetPEP2,
  DataRespGetOPEX,
  DataRespGetSAP,
  DataRespGetCECO,
  DataRespGetCubicaciones,
  DataRespGetProyectos,
  DataRespGetAdminContrato,
  Cubs4OT,
  DataRespGetOficinaCentral,
  DataRespGetSolicitadoPor,
  DataRespGetComuna,
  DataRespGetTipoDeRed,
  DataRespGetTipoDeTrabajo,
  DataRespGetAreaDeNegocio,
  DataRespGetPlanDeProyecto,
  DataRespGetSitio,
  DataRespGetTipoNumeroInterno,
  DataRespGetNumeroInternoHasOT,
  RequestCreateOTMovil,
  RequestCreateOTFijo,
  RequestCreateOTOrdinario,
  RequestCreateOTBucle,
  DataRespGetOTs,
  DataRespGetDetalleOT,
  DataRespGetMotivoRechazo,
  RequestAceptarRechazarOT,
  DataRespPosiblesTrabajadores,
} from '@data';

import {
  DetalleActa,
  RequestSaveInformeActaGestor,
  RequestSolicitudPagoActa,
} from '@data/model/acta';

export const getOts = createAction(
  '[OT] Get Ots',
  props<{
    request: RequestGetOTs;
  }>()
);

export const getOtEjecucionSuccess = createAction(
  '[OT] GET Ot Success Ejecucion',
  props<{ response: Response<DataRespGetOTs> }>()
);

export const getOtAbiertasSuccess = createAction(
  '[OT] GET Ot Success Abiertas',
  props<{ response: Response<DataRespGetOTs> }>()
);

export const getOtSuccessCerradas = createAction(
  '[Ot GetAll] GET Ot Success Cerradas',
  props<{ response: Response<DataRespGetOTs> }>()
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
  props<{ response: Response<DataRespGetCubicaciones> }>()
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
  props<{ response: Response<DataRespGetProyectos> }>()
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
  props<{ response: Response<DataRespGetAdminContrato> }>()
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
  props<{ response: Response<DataRespGetOficinaCentral> }>()
);

export const getOficinaCentralError = createAction(
  '[OT] GET getOficinaCentral Error',
  props<{ error: any }>()
);

// GET SOLICITADO POR
export const getSolicitadoPor = createAction('[OT] GET getSolicitadoPor');

export const getSolicitadoPorSuccess = createAction(
  '[OT] GET getSolicitadoPor Success',
  props<{ response: Response<DataRespGetSolicitadoPor> }>()
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
  props<{ response: Response<DataRespGetComuna> }>()
);

export const getComunaError = createAction(
  '[OT] GET getComuna Error',
  props<{ error: any }>()
);

// GET TIPO DE RED
export const getTipoDeRed = createAction('[OT] GET getTipoDeRed');

export const getTipoDeRedSuccess = createAction(
  '[OT] GET getTipoDeRed Success',
  props<{ response: Response<DataRespGetTipoDeRed> }>()
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
  props<{ response: Response<DataRespGetTipoDeTrabajo> }>()
);

export const getTipoDeTrabajoError = createAction(
  '[OT] GET getTipoDeTrabajo Error',
  props<{ error: any }>()
);

// GET TIPO DE NEGOCIO
export const getAreaDeNegocio = createAction('[OT] GET getAreaDeNegocio');

export const getAreaDeNegocioSuccess = createAction(
  '[OT] GET getAreaDeNegocio Success',
  props<{ response: Response<DataRespGetAreaDeNegocio> }>()
);

export const getAreaDeNegocioError = createAction(
  '[OT] GET getAreaDeNegocio Error',
  props<{ error: any }>()
);

// GET PLAN DE PROYECTO
export const getPlanDeProyecto = createAction('[OT] GET getPlanDeProyecto');

export const getPlanDeProyectoSuccess = createAction(
  '[OT] GET getPlanDeProyecto Success',
  props<{ response: Response<DataRespGetPlanDeProyecto> }>()
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
  props<{ response: Response<DataRespGetSitio> }>()
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
  props<{ response: Response<DataRespGetTipoNumeroInterno> }>()
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
  props<{ response: Response<DataRespGetNumeroInternoHasOT> }>()
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
  props<{ response: Response<DataRespGetMotivoRechazo> }>()
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
  props<{ response: Response<DataRespPosiblesTrabajadores> }>()
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
  props<{ ot_id: number; data: any }>()
);

export const updateDetalleInformeAvanceSuccess = createAction(
  '[OT] GET updateDetalleInformeAvance Success',
  props<{ ot_id: number }>()
);

export const updateDetalleInformeAvanceError = createAction(
  '[OT] GET updateDetalleInformeAvance Error',
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

export const getDataInformeAvanceTrabajadorSuccess = createAction(
  '[OT] GET data informe avance trabajador success',
  props<{ dataInformeAvance: DataInformeAvance[]; status: StatusResponse }>()
);

export const getDataInformeAvanceAdminEC = createAction(
  '[OT] GET data informe avance Admin EC',
  props<{ ot_id: number }>()
);

export const getDataInformeAvanceAdminECSuccess = createAction(
  '[OT] GET data informe avance Admin EC success',
  props<{ dataInformeAvance: DataInformeAvance[]; status: StatusResponse }>()
);

export const getDataInformeAvanceError = createAction(
  '[OT] GET data informe avance error',
  props<{ error: any }>()
);

// Save borrador informe avance
export const saveBorradorInformeAvance = createAction(
  '[OT] SAVE borrador informe avance',
  props<{ request: RequestSaveBorradorInformeAvance }>()
);

export const saveBorradorInformeAvanceSuccess = createAction(
  '[OT] SAVE borrador informe avance success',
  props<{ ot_id: number; status: StatusResponse }>()
);

export const saveBorradorInformeAvanceError = createAction(
  '[OT] SAVE borrador informe avance error',
  props<{ error: any }>()
);

// Save informe avance
export const saveInformeAvanceTrabajador = createAction(
  '[OT] SAVE informe avance trabajador',
  props<{ request: RequestSaveInformeAvance }>()
);

export const saveInformeAvanceTrabajadorSuccess = createAction(
  '[OT] SAVE informe avance trabajador success',
  props<{ ot_id: number; status: StatusResponse }>()
);

export const saveInformeAvanceAdminEC = createAction(
  '[OT] SAVE informe avance Admin EC',
  props<{ request: RequestSaveInformeAvanceAdmin }>()
);

export const saveInformeAvanceAdminECSuccess = createAction(
  '[OT] SAVE informe avance Admin EC success',
  props<{ status: StatusResponse }>()
);

export const saveInformeAvanceError = createAction(
  '[OT] SAVE informe avance error',
  props<{ error: any }>()
);

// Rechazar informe avance
export const rechazarInformeAvance = createAction(
  '[OT] rechazar informe avance',
  props<{ informe_id: number }>()
);

export const rechazarInformeAvanceSuccess = createAction(
  '[OT] rechazar informe avance success',
  props<{ status: StatusResponse }>()
);

export const rechazarInformeAvanceError = createAction(
  '[OT] rechazar informe avance error',
  props<{ error: any }>()
);

// GET información informe acta
export const getDataInformeActa = createAction(
  '[OT] GET data informe acta',
  props<{ ot_id: number }>()
);

export const getDataInformeActaSuccess = createAction(
  '[OT] GET data informe acta success',
  props<{ dataInformeActa: DataInformeAvance[]; status: StatusResponse }>()
);

export const getDataInformeActaError = createAction(
  '[OT] GET data informe acta error',
  props<{ error: any }>()
);

// SAVE informe acta
export const saveInformeActa = createAction(
  '[OT] SAVE informe acta',
  props<{ request: RequestSaveInformeActaGestor }>()
);

export const saveInformeActaSuccess = createAction(
  '[OT] SAVE informe acta success',
  props<{ status: StatusResponse }>()
);

export const saveInformeActaError = createAction(
  '[OT] SAVE informe acta error',
  props<{ error: any }>()
);

// Rechazar informe acta
export const rechazarInformeActa = createAction(
  '[OT] rechazar informe acta',
  props<{ informe_id: number }>()
);

export const rechazarInformeActaSuccess = createAction(
  '[OT] rechazar informe acta success',
  props<{ status: StatusResponse }>()
);

export const rechazarInformeActaError = createAction(
  '[OT] rechazar informe acta error',
  props<{ error: any }>()
);

// GET detalle acta
export const getDetalleActaMezcla = createAction(
  '[OT] GET detalle acta mezcla',
  props<{ ot_id: number }>()
);

export const getDetalleActa = createAction(
  '[OT] GET detalle acta',
  props<{ ot_id: number }>()
);

export const getDetalleActaSuccess = createAction(
  '[OT] GET detalle acta success',
  props<{ dataInformeActa: DetalleActa[]; status: StatusResponse }>()
);

export const getDetalleActaError = createAction(
  '[OT] GET detalle acta error',
  props<{ error: any }>()
);

// SEND solicitud pago acta
export const sendSolicitudPagoActa = createAction(
  '[OT] Send solicitud pago acta',
  props<{ request: RequestSolicitudPagoActa }>()
);

export const sendSolicitudPagoActaSuccess = createAction(
  '[OT] Send solicitud pago acta success',
  props<{ status: StatusResponse }>()
);

export const sendSolicitudPagoActaError = createAction(
  '[OT] Send solicitud pago acta error',
  props<{ error: any }>()
);
