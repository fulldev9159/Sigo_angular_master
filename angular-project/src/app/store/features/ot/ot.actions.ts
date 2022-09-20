import { createAction, props } from '@ngrx/store';
import * as Data from '@data';
import {
  ContratosUser,
  OT,
  PMO,
  RequestGetOTs,
  Response,
  LP,
  PEP2,
  OPEX,
  SAP,
  CECO,
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
  CategoriaArchivo,
  DataRespSubirArchivo,
  ReqCreateRegistroLibroObra,
  ActaTipoPago,
  DetalleActaServicio,
  DetalleActaUob,
  RegistroLibroDeObras,
  RequestAutorizarInformeAvance,
  LastActa,
  RequestAprobacionRechazoSolicitudPago,
  QuienAutorizoActa,
  RequestAceptarRechazarAdicionales,
  RequestAprobarRechazarOperaciones,
  RequestValidateActa,
  RequestAdicionales,
} from '@data';

// GET OTS
export const getOTs = createAction(
  '[OT] Get OTs',
  props<{ request: RequestGetOTs }>()
);

export const getOtEjecucionSuccess = createAction(
  '[OT] GET OT Success Ejecucion',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getOtAbiertasSuccess = createAction(
  '[OT] GET OT Success Abiertas',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getOtSuccessCerradas = createAction(
  '[Ot GetAll] GET Ot Success Cerradas',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getOtSuccessAnuladas = createAction(
  '[Ot GetAll] GET Ot Success Anuladas',
  props<{ response: Response<{ items: OT[] }> }>()
);

export const getOtSuccessQuebradas = createAction(
  '[Ot GetAll] GET Ot Success Quebradas',
  props<{ response: Response<{ items: OT[] }> }>()
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
  props<{ response: Response<{ items: ContratosUser[] }> }>()
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
  props<{ response: Response<{ items: Cubs4OT[] }> }>()
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
  props<{ response: Response<{ items: PMO[] }> }>()
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
  props<{ response: Response<{ items: LP[] }> }>()
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
  props<{ response: Response<{ items: PEP2[] }> }>()
);

export const getPEP2Error = createAction(
  '[OT] GET getPEP2 Error',
  props<{ error: any }>()
);

// OPEX
export const getIDOpex = createAction('[OT] GET getIDOpex');

export const getIDOpexSuccess = createAction(
  '[OT] GET getIDOpex Success',
  props<{ response: Response<{ items: OPEX[] }> }>()
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
  props<{ response: Response<{ items: SAP[] }> }>()
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
  props<{ response: Response<{ items: CECO[] }> }>()
);

export const getCECOError = createAction(
  '[OT] GET getCECO Error',
  props<{ error: any }>()
);

// GET PROYECTOS
export const getProyecto = createAction('[OT] GET getProyecto');

export const getProyectoSuccess = createAction(
  '[OT] GET getProyecto Success',
  props<{ response: Response<{ items: Proyectos[] }> }>()
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
  props<{ response: Response<{ items: AdminContrato4OT[] }> }>()
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
  props<{ response: Response<{ items: OficinaCentral[] }> }>()
);

export const getOficinaCentralError = createAction(
  '[OT] GET getOficinaCentral Error',
  props<{ error: any }>()
);

// GET SOLICITADO POR
export const getSolicitadoPor = createAction('[OT] GET getSolicitadoPor');

export const getSolicitadoPorSuccess = createAction(
  '[OT] GET getSolicitadoPor Success',
  props<{ response: Response<{ items: SolicitadoPor[] }> }>()
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
  props<{ response: Response<{ items: Comuna[] }> }>()
);

export const getComunaError = createAction(
  '[OT] GET getComuna Error',
  props<{ error: any }>()
);

// GET TIPO DE RED
export const getTipoDeRed = createAction('[OT] GET getTipoDeRed');

export const getTipoDeRedSuccess = createAction(
  '[OT] GET getTipoDeRed Success',
  props<{ response: Response<{ items: TipoDeRed[] }> }>()
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
  props<{ response: Response<{ items: TipoDeTrabajo[] }> }>()
);

export const getTipoDeTrabajoError = createAction(
  '[OT] GET getTipoDeTrabajo Error',
  props<{ error: any }>()
);

// GET TIPO DE NEGOCIO
export const getAreaDeNegocio = createAction('[OT] GET getAreaDeNegocio');

export const getAreaDeNegocioSuccess = createAction(
  '[OT] GET getAreaDeNegocio Success',
  props<{ response: Response<{ items: AreaDeNegocio[] }> }>()
);

export const getAreaDeNegocioError = createAction(
  '[OT] GET getAreaDeNegocio Error',
  props<{ error: any }>()
);

// GET PLAN DE PROYECTO
export const getPlanDeProyecto = createAction('[OT] GET getPlanDeProyecto');

export const getPlanDeProyectoSuccess = createAction(
  '[OT] GET getPlanDeProyecto Success',
  props<{ response: Response<{ items: ModelPlan[] }> }>()
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
  props<{ response: Response<{ items: Sitio[] }> }>()
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
  props<{ response: Response<{ items: TipoNumeroInterno[] }> }>()
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
  props<{ response: Response<{ items: NumeroInternoHasOT[] }> }>()
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
  props<{ response: Response<{ items: MotivoRechazo[] }> }>()
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
  props<{ response: Response<{ items: PosibleTrabajador[] }> }>()
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

//  GET TIPOS ACTA
export const getActaTiposPagoSuccess = createAction(
  '[OT] GET getActaTiposPago Success',
  props<{ response: Response<{ items: ActaTipoPago[] }> }>()
);

//  GET DETALLE SERVICIO POR ACTA
export const getDetalleServicioPorActaSuccess = createAction(
  '[OT] GET getDetalleServicioPorActa Success',
  props<{ response: Response<{ items: DetalleActaServicio[] }> }>()
);

//  GET DETALLE UOB POR ACTA
export const getDetalleUobPorActaSuccess = createAction(
  '[OT] GET getDetalleUobPorActa Success',
  props<{ response: Response<{ items: DetalleActaUob[] }> }>()
);

//  GET ULTIMO TIPO PAGO ACTA
export const getUltimoTipoPagoActaSuccess = createAction(
  '[OT] GET getUltimoTipoPagoActa Success',
  props<{ tipoPago: string }>()
);

//  ENVIAR GENERACION ACTA
export const sendGeneracionActa = createAction(
  '[OT] GET sendGeneracionActa',
  props<{
    request: any;
  }>()
);

export const sendGeneracionActaSuccess = createAction(
  '[OT] GET sendGeneracionActa Success',
  props<{ response: Response<any> }>()
);

export const sendGeneracionActaError = createAction(
  '[OT] GET sendGeneracionActa Error',
  props<{ error: any }>()
);

//  ENVIAR GENERACION ACTA OLD
export const sendGeneracionActaOLD = createAction(
  '[OT] GET sendGeneracionActaOLD',
  props<{
    request: RequestValidateActa;
  }>()
);

export const sendGeneracionActaSuccessOLD = createAction(
  '[OT] GET sendGeneracionActaSuccessOLD Success',
  props<{ response: Response<any> }>()
);

export const sendGeneracionActaErrorOLD = createAction(
  '[OT] GET sendGeneracionActaErrorOLD Error',
  props<{ error: any }>()
);

//  GET CATEGORIAS DE ARCHIVOS
export const getCategoriasArchivos = createAction(
  '[OT] GET getCategoriasArchivos'
);

export const getCategoriasArchivosSuccess = createAction(
  '[OT] GET getCategoriasArchivos Success',
  props<{ response: Response<{ items: CategoriaArchivo[] }> }>()
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
  props<{ response: Response<RegistroLibroDeObras[]> }>()
);

export const getLibroObrasError = createAction(
  '[OT] GET getLibroObras Error',
  props<{ error: any }>()
);

//  GET LAST ACTA
export const getLastActaSuccess = createAction(
  '[OT] GET getLastActa Success',
  props<{ response: Response<LastActa> }>()
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

export const selectOT = createAction(
  '[OT] select OT',
  props<{
    ot: Data.OT;
  }>()
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

//  ACEPTAR/RECHAZAR INFORME DE AVANCE
export const AceptarRechazarInformeAvanceOT = createAction(
  '[OT] GET AceptarRechazarInformeAvanceOT',
  props<{ request: RequestAutorizarInformeAvance }>()
);

export const AceptarRechazarInformeAvanceOTSuccess = createAction(
  '[OT] GET AceptarRechazarInformeAvanceOT Success',
  props<{ response: Response<any> }>()
);

export const AceptarRechazarInformeAvanceOTError = createAction(
  '[OT] GET AceptarRechazarInformeAvanceOT Error',
  props<{ error: any }>()
);

//  RECHAZAR ACTA
export const AprobarRechazarActaOT = createAction(
  '[OT] GET AprobarRechazarActaOT',
  props<{ request: RequestAceptarRechazarOT }>()
);

export const AprobarRechazarActaOTSuccess = createAction(
  '[OT] GET AprobarRechazarActaOT Success',
  props<{ response: Response<any> }>()
);
export const AprobarRechazarActaOTError = createAction(
  '[OT] GET AprobarRechazarActaOT Error',
  props<{ error: any }>()
);

//  SOLICITAR PAGO
export const solicitarPago = createAction(
  '[OT] GET solicitarPago',
  props<{ ot_id: number }>()
);

export const solicitarPagoSuccess = createAction(
  '[OT] GET  solicitarPago Success',
  props<{ response: Response<any> }>()
);

export const solicitarPagoError = createAction(
  '[OT] GET  solicitarPago Error',
  props<{ error: any }>()
);

//  QUIEN AUTORIZO PAGO
export const quienAutorizoPago = createAction(
  '[OT] GET quienAutorizoPago',
  props<{ ot_id: number }>()
);

export const quienAutorizoPagoSuccess = createAction(
  '[OT] GET  quienAutorizoPago Success',
  props<{ response: Response<{ items: QuienAutorizoActa[] }> }>()
);

export const quienAutorizoPagoError = createAction(
  '[OT] GET  quienAutorizoPago Error',
  props<{ error: any }>()
);

//  APROBAR RECHAZAR SOLICITUD PAGO
export const AprobarRechazarSolicitudPago = createAction(
  '[OT] GET AprobarRechazarSolicitudPago',
  props<{ request: RequestAprobacionRechazoSolicitudPago }>()
);

export const AprobarRechazarSolicitudPagoSuccess = createAction(
  '[OT] GET AprobarRechazarSolicitudPago Success',
  props<{ response: Response<any> }>()
);
export const AprobarRechazarSolicitudPagoError = createAction(
  '[OT] GET AprobarRechazarSolicitudPago Error',
  props<{ error: any }>()
);

//  CERRAR OT
export const cerrarOT = createAction(
  '[OT] GET CerrarOT',
  props<{ ot_id: number }>()
);

export const cerrarOTSuccess = createAction(
  '[OT] GET CerrarOT Success',
  props<{ response: Response<any> }>()
);
export const cerrarOTError = createAction(
  '[OT] GET CerrarOT Error',
  props<{ error: any }>()
);

//  ACEPTAR RECHAZAR ADICIONALES
export const aceptarRechazarAdcionales = createAction(
  '[OT] GET aceptarRechazarAdcionales',
  props<{ request: RequestAceptarRechazarAdicionales }>()
);

export const aceptarRechazarAdcionalesSuccess = createAction(
  '[OT] GET aceptarRechazarAdcionales Success',
  props<{ response: Response<any> }>()
);
export const aceptarRechazarAdcionalesError = createAction(
  '[OT] GET aceptarRechazarAdcionales Error',
  props<{ error: any }>()
);

//  ANULAR OT
export const anularOT = createAction(
  '[OT] GET anularOT',
  props<{ ot_id: number }>()
);

export const anularOTSuccess = createAction(
  '[OT] GET anularOT Success',
  props<{ response: Response<any> }>()
);
export const anularOTError = createAction(
  '[OT] GET anularOT Error',
  props<{ error: any }>()
);

//  APROBAR RECHAZAR OPERACIONES
export const AprobarRechazarOperaciones = createAction(
  '[OT] GET AprobarRechazarOperaciones',
  props<{ request: RequestAprobarRechazarOperaciones }>()
);

export const AprobarRechazarOperacionesSuccess = createAction(
  '[OT] GET AprobarRechazarOperaciones Success',
  props<{ response: Response<any> }>()
);
export const AprobarRechazarOperacionesError = createAction(
  '[OT] GET AprobarRechazarOperaciones Error',
  props<{ error: any }>()
);

//  CONFIRMAR RECHAZO OBRAS
export const confirmarRechazoObras = createAction(
  '[OT] GET ConfirmarRechazoObras',
  props<{ ot_id: number }>()
);

export const confirmarRechazoObrasSuccess = createAction(
  '[OT] GET ConfirmarRechazoObras Success',
  props<{ response: Response<any> }>()
);
export const confirmarRechazoObrasError = createAction(
  '[OT] GET confirmarRechazoObras Error',
  props<{ error: any }>()
);

//  COMENTARIOS FINALIZACION DE TRABAJOS
export const getComentariosFinalizacionTrabajos = createAction(
  '[OT] GET getComentariosFinalizacionTrabajos',
  props<{ ot_id: number }>()
);

export const getComentariosFinalizacionTrabajosSuccess = createAction(
  '[OT] GET getComentariosFinalizacionTrabajos Success',
  props<{
    response: Response<{ ot_id: number; acta_id: number; observacion: string }>;
  }>()
);
export const getComentariosFinalizacionTrabajosError = createAction(
  '[OT] GET getComentariosFinalizacionTrabajos Error',
  props<{ error: any }>()
);

// SOLICITAR INFORME TRABAJOS FINALIZADOS
export const solicitarInformeTrabajosFinalizados = createAction(
  '[OT] GET solicitarInformeTrabajosFinalizados',
  props<{ ot_id: number }>()
);

export const solicitarInformeTrabajosFinalizadosSuccess = createAction(
  '[OT] GET solicitarInformeTrabajosFinalizados Success',
  props<{ response: Response<any> }>()
);
export const solicitarInformeTrabajosFinalizadosError = createAction(
  '[OT] GET solicitarInformeTrabajosFinalizados Error',
  props<{ error: any }>()
);

// SOLICITAR INFORME TRABAJOS FINALIZADOS
export const informarTrabajosFinalizados = createAction(
  '[OT] GET informarTrabajosFinalizados',
  props<{ ot_id: number; observacion: string }>()
);

export const informarTrabajosFinalizadosSuccess = createAction(
  '[OT] GET informarTrabajosFinalizados Success',
  props<{ response: Response<any> }>()
);
export const informarTrabajosFinalizadosError = createAction(
  '[OT] GETinformarTrabajosFinalizados Error',
  props<{ error: any }>()
);

// ELIMINAR SERVICIOS ADICIONALES
export const eliminarAdicional = createAction(
  '[OT] GET eliminarAdicional',
  props<{ servicios: number[] }>()
);

export const eliminarAdicionalSuccess = createAction(
  '[OT] GET eliminarAdicional Success',
  props<{ response: Response<any> }>()
);
export const eliminarAdicionalError = createAction(
  '[OT] eliminarAdicional Error',
  props<{ error: any }>()
);

// APROBAR RECHAZAR ADICIONALES
export const aprobarRechazarAdicional = createAction(
  '[OT] GET aprobarRechazarAdicional',
  props<{ servicios: number[] }>()
);

export const aprobarRechazarAdicionalSuccess = createAction(
  '[OT] GET aprobarRechazarAdicional Success',
  props<{ response: Response<any> }>()
);
export const aprobarRechazarAdicionalError = createAction(
  '[OT] aprobarRechazarAdicional Error',
  props<{ error: any }>()
);

// AGREGAR ADICIONALES
export const agregarAdicionales = createAction(
  '[OT] GET agregarAdicionales',
  props<{ request: RequestAdicionales }>()
);

export const agregarAdicionalesSuccess = createAction(
  '[OT] GET agregarAdicionales Success',
  props<{ response: Response<any> }>()
);
export const agregarAdicionalesError = createAction(
  '[OT] agregarAdicionales Error',
  props<{ error: any }>()
);
