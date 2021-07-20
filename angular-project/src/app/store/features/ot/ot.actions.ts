import { createAction, props } from '@ngrx/store';
import * as OtModel from './ot.model';
import * as Data from '@data';

// OT LIST
export const getOt = createAction(
  '[Ot Get Abiertas] GET Ot',
  props<{
    filtro_propietario: string;
    filtro_tipo: string;
  }>()
);

export const getOtSuccess = createAction(
  '[Ot GetAll] GET Ot Success',
  props<{ ot: Data.OT[] }>()
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
  props<{ ot: OtModel.RequestCreateOT }>()
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
  props<{ detalleot: OtModel.DataRspDetalleOT }>()
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
  props<{ otID: number }>()
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
  props<{ otID: number; coordinatorID: number }>()
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
