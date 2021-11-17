import { createAction, props } from '@ngrx/store';
import * as OtModel from './ot.model';
import * as Data from '@data';
import {
  DataInformeAvance,
  LpuInformeAvance,
  OT,
  RequestGetOTs,
  StatusResponse,
} from '@data';

// GET OTs EJECUCION init

export const getOtEjecucion = createAction(
  '[Ot Get Ejecucion] GET Ot Ejecucion',
  props<{
    filtro_pestania: string;
    filtro_propietario: string;
    filtro_tipo: string;
  }>()
);
export const getOtSuccessEjecucion = createAction(
  '[Ot GetAll] GET Ot Success Ejecucion',
  props<{ ots: OT[] }>()
);
// GET OTs EJECUCION end

export const getOtAbiertas = createAction(
  '[Ot Get Abiertas] GET Ot Abiertas',
  props<{
    filtro_pestania: string;
    filtro_propietario: string;
    filtro_tipo: string;
  }>()
);

export const getOtCerradas = createAction(
  '[Ot Get Cerradas] GET Ot Cerradas',
  props<{
    filtro_pestania: string;
    filtro_propietario: string;
    filtro_tipo: string;
  }>()
);

export const getOtSuccessAbiertas = createAction(
  '[Ot GetAll] GET Ot Success Abiertas',
  props<{ ots: OT[] }>()
);

export const getOtSuccessCerradas = createAction(
  '[Ot GetAll] GET Ot Success Cerradas',
  props<{ ots: OT[] }>()
);
export const getOtError = createAction(
  '[Ot GetAll] GET Ot Error',
  props<{ error: any }>()
);

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
export const getPlans = createAction(
  '[Plans Get By Id Cobage] GET By Id Cobage',
  props<{ token: string; region_id: number }>()
);

export const getPlansSuccess = createAction(
  '[Plans Get By Id Cobage] GET By Id Cobage Success',
  props<{ plan: OtModel.Plan[] }>()
);

export const getPlansError = createAction(
  '[Plans Get By Id Cobage] GET By Id Cobage Error',
  props<{ error: any }>()
);

export const getSite = createAction(
  '[Sites Get By Id Plan] GET By Id Plan',
  props<{ plan_proyecto_id: number; region_id: number }>()
);

export const getSiteSuccess = createAction(
  '[Sites Get By Id Plan] GET By Id Plan Success',
  props<{ site: OtModel.Site[] }>()
);

export const getSiteError = createAction(
  '[Sites Get By Id Plan] GET By Id Plan Error',
  props<{ error: any }>()
);

export const getPmo = createAction(
  '[Pmo Get By Id Site] GET By Id Site',
  props<{ sitio_codigo: number }>()
);

export const getPmoSuccess = createAction(
  '[Pmo Get By Id Site] GET By Id Site Success',
  props<{ pmo: OtModel.PMO[] }>()
);

export const getPmoError = createAction(
  '[Pmo Get By Id Site] GET By Id Site Error',
  props<{ error: any }>()
);

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
  props<{ otID: number }>()
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

// Save borrador informe avance
export const saveBorradorInformeAvance = createAction(
  '[OT] SAVE borrador informe avance',
  props<{ lpus: LpuInformeAvance[] }>()
);

export const saveBorradorInformeAvanceSuccess = createAction(
  '[OT] SAVE borrador informe avance success',
  props<{ status: StatusResponse }>()
);

export const saveBorradorInformeAvanceError = createAction(
  '[OT] SAVE borrador informe avance error',
  props<{ error: any }>()
);

// Save informe avance
export const saveInformeAvance = createAction(
  '[OT] SAVE informe avance',
  props<{ lpus: LpuInformeAvance[] }>()
);

export const saveInformeAvanceSuccess = createAction(
  '[OT] SAVE informe avance success',
  props<{ status: StatusResponse }>()
);

export const saveInformeAvanceError = createAction(
  '[OT] SAVE informe avance error',
  props<{ error: any }>()
);

// Get data informe avance
export const getDataInformeAvance = createAction(
  '[OT] GET data informe avance',
  props<{ ot_id: number }>()
);

export const getDataInformeAvanceSuccess = createAction(
  '[OT] GET data informe avance success',
  props<{ dataInformeAvance: DataInformeAvance[]; status: StatusResponse }>()
);

export const getDataInformeAvanceError = createAction(
  '[OT] GET data informe avance error',
  props<{ error: any }>()
);
