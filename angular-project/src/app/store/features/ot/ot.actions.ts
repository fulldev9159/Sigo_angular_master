import { createAction, props } from '@ngrx/store';
import * as OtModel from './ot.model';
import * as Data from '@data';
import {
  DataInformeAvance,
  LpuInformeAvanceDetalle,
  OT,
  Plan,
  PMO,
  RequestGetOTs,
  RequestSaveBorradorInformeAvance,
  RequestSaveInformeAvance,
  RequestSaveInformeAvanceAdmin,
  Sitio,
  StatusResponse,
} from '@data';
import {
  DetalleActa,
  RequestSaveInformeActaGestor,
  RequestSolicitudPagoActa,
} from '@data/model/acta';

// GET OTs init

export const getOts = createAction(
  '[OT] Get Ots',
  props<{
    request: RequestGetOTs;
  }>()
);

export const getOtEjecucionSuccess = createAction(
  '[OT] GET Ot Success Ejecucion',
  props<{ ots: OT[]; status: StatusResponse }>()
);

export const getOtAbiertasSuccess = createAction(
  '[OT] GET Ot Success Abiertas',
  props<{ ots: OT[]; status: StatusResponse }>()
);

export const getOtSuccessCerradas = createAction(
  '[Ot GetAll] GET Ot Success Cerradas',
  props<{ ots: OT[]; status: StatusResponse }>()
);
export const getOtsError = createAction(
  '[Ot GetAll] GET Ot Error',
  props<{ error: any }>()
);
// GET OTs end

// GET Planes init
export const getPlans = createAction(
  '[OT] GET Planes',
  props<{ region_id: number }>()
);

export const getPlansSuccess = createAction(
  '[OT] GET Planes Success',
  props<{ plans: Plan[]; status: StatusResponse }>()
);

export const getPlansError = createAction(
  '[OT] GET Planes Error',
  props<{ error: any }>()
);
// GET Planes end

// GET Sitio init
export const getSite = createAction(
  '[Sites Get By Id Plan] GET By Id Plan',
  props<{ plan_proyecto_id: number; region_id: number }>()
);

export const getSiteSuccess = createAction(
  '[Sites Get By Id Plan] GET By Id Plan Success',
  props<{ sitio: Sitio[]; status: StatusResponse }>()
);

export const getSiteError = createAction(
  '[Sites Get By Id Plan] GET By Id Plan Error',
  props<{ error: any }>()
);
// GET Sitio end

// GET PMO init
export const getPmo = createAction(
  '[OT] GET PMO',
  props<{ sitio_codigo: string }>()
);

export const getPmoSuccess = createAction(
  '[OT] GET PMO Success',
  props<{ pmos: PMO[]; status: StatusResponse }>()
);

export const getPmoError = createAction(
  '[OT] GET PMO Error',
  props<{ error: any }>()
);

// GET PMO end

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

export const replyOt = createAction(
  '[Ot Reply] POST Reply Ot',
  props<{ ot: OtModel.RequestCreateOT }>()
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

export const postOt = createAction(
  '[Ot Post] CREATE Ot',
  props<{ ot: OtModel.RequestCreateOT | OtModel.RequestCreateOTFijo }>()
);

export const postOtSuccess = createAction(
  '[Ot Post] CREATE Ot Success',
  props<{ ot: Data.OT }>()
);

export const postOtError = createAction(
  '[Ot Post] CREATE Ot Error',
  props<{ error: any }>()
);

// IngreOT con SCE **
export const postOtSCE = createAction(
  '[Ot Post] CREATE Ot SCE',
  props<{ ot: OtModel.RequestCreateOT }>()
);

export const postOtSCESuccess = createAction(
  '[Ot Post] CREATE Ot SCE Success',
  props<{ ot: Data.OT }>()
);

// OT LIST

// OT FORM

export const getIDOpex = createAction('[IDOpex Get All] GET All');

export const getIDOpexSuccess = createAction(
  '[IDOpex Get All] GET All Success',
  props<{ ids_opex: OtModel.IDOpex[] }>()
);

export const getIDOpexError = createAction(
  '[IDOpex Get Al] GET All Error',
  props<{ error: any }>()
);

export const getCuentaSAP = createAction(
  '[CuentaSAP Get By Id IDOpex] GET By Id IDOpex',
  props<{ id_opex_codigo: string }>()
);

export const getCuentaSAPSuccess = createAction(
  '[CuentaSAP Get By Id IDOpex] GET By Id IDOpex Success',
  props<{ cuentas_sap: OtModel.CuentaSap[] }>()
);

export const getCuentaSAPError = createAction(
  '[CuentaSAP Get By Id IDOpex] GET By Id IDOpex Error',
  props<{ error: any }>()
);

export const getCECO = createAction(
  '[CECO Get By Id CuentaSAP] GET By Id CuentaSAP',
  props<{ id_opex_codigo: string; cuenta_sap_codigo: string }>()
);

export const getCECOSuccess = createAction(
  '[CECO Get By Id CuentaSAP] GET By Id CuentaSAP Success',
  props<{ cecos: OtModel.CECO[] }>()
);

export const getCECOError = createAction(
  '[CECO Get By Id CuentaSAP] GET By Id CuentaSAP Error',
  props<{ error: any }>()
);

export const getBudgetLine = createAction(
  '[BudgetLine Get By Id Pmo] GET By Id Pmo',
  props<{ token: string; pmo_id: number }>()
);

export const getBudgetLineSuccess = createAction(
  '[BudgetLine Get By Id Pmo] GET By Id Pmo Success',
  props<{ lp: OtModel.Lp[] }>()
);

export const getBudgetLineError = createAction(
  '[BudgetLine Get By Id Pmo] GET By Id Pmo Error',
  props<{ error: any }>()
);

export const getPep2 = createAction(
  '[getPep2 Get By Id BudgetLine] GET By Id BudgetLine',
  props<{ token: string; pmo_codigo: number; lp_codigo: string }>()
);

export const getPep2Success = createAction(
  '[getPep2 Get By Id BudgetLine] GET By Id BudgetLine Success',
  props<{ pep2: OtModel.Pep2[] }>()
);

export const getPep2Error = createAction(
  '[getPep2 Get By Id BudgetLine] GET By Id BudgetLine Error',
  props<{ error: any }>()
);

export const getProyecto = createAction('[Proyecto Get All] GET All');

export const getProyectoSuccess = createAction(
  '[Proyecto Get All] GET All Success',
  props<{ proyectos: OtModel.Proyecto[] }>()
);

export const getProyectoError = createAction(
  '[Proyecto Get All] GET All Error',
  props<{ error: any }>()
);

export const getDetalleOt = createAction(
  '[OT Get Detalle OT] GET Detalle OT',
  props<{ id: number }>()
);

export const getDetalleOtSuccess = createAction(
  '[OT Get Detalle OT] GET Detalle OT Success',
  props<{ detalleot: Data.DataRspDetalleOT }>()
);

export const getDetalleOtError = createAction(
  '[OT Get Detalle OT] GET Detalle OT  Error',
  props<{ error: any }>()
);

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

export const resetData = createAction('[ResetData] ResetData');
export const resetPlan = createAction('[ResetData] ResetPlan');
export const resetSitio = createAction('[ResetData] ResetSitio');
export const resetPMO = createAction('[ResetData] ResetPMO');
export const resetSAP = createAction('[ResetData] ResetSAP');
export const resetLPs = createAction('[ResetData] ResetLPs');
export const resetPEP2 = createAction('[ResetData] ResetPEP2');
export const resetCECO = createAction('[ResetData] ResetCECO');

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
