import { createAction, props } from '@ngrx/store';
import * as OtModel from './ot.model';
import {
  CECO,
  CuentaSap,
  IDOpex,
  Lp,
  Ot,
  Pep2,
  Plan,
  PMO,
  Proyecto,
  Site,
  RequestCreateOT,
} from './ot.model';

// OT LIST
export const getOt = createAction(
  '[Ot Get Abiertas] GET Ot',
  props<{
    perfil_id: number;
    filtro_propietario: string;
    filtro_tipo: string;
  }>()
);

export const getOtSuccess = createAction(
  '[Ot GetAll] GET Ot Success',
  props<{ ot: Ot[] }>()
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
  props<{ ot: Ot }>()
);

export const editOtSuccess = createAction(
  '[Ot EditById] EDIT Ot Success',
  props<{ OtId: string; Ot: Ot }>()
);

export const editOtError = createAction(
  '[Ot EditById] EDIT Ot Error',
  props<{ error: any }>()
);

export const replyOt = createAction(
  '[Ot Reply] POST Reply Ot',
  props<{ ot: RequestCreateOT }>()
);

export const replyOtSuccess = createAction(
  '[Ot Reply] POST Reply Ot Success',
  props<{ ot: Ot }>()
);

export const replyOtError = createAction(
  '[Ot Reply] POST Reply Ot Error',
  props<{ error: any }>()
);

export const stateOt = createAction(
  '[Ot State] POST State Ot',
  props<{ ot: Ot }>()
);

export const stateOtSuccess = createAction(
  '[Ot State] POST State Ot Success',
  props<{ ot: Ot }>()
);

export const stateOtError = createAction(
  '[Ot State] POST State Ot Error',
  props<{ error: any }>()
);

export const postOt = createAction(
  '[Ot Post] CREATE Ot',
  props<{ ot: RequestCreateOT }>()
);

export const postOtSuccess = createAction(
  '[Ot Post] CREATE Ot Success',
  props<{ ot: Ot }>()
);

export const postOtError = createAction(
  '[Ot Post] CREATE Ot Error',
  props<{ error: any }>()
);
// OT LIST

// OT FORM
export const getPlans = createAction(
  '[Plans Get By Id Cobage] GET By Id Cobage',
  props<{ token: string; region_id: number }>()
);

export const getPlansSuccess = createAction(
  '[Plans Get By Id Cobage] GET By Id Cobage Success',
  props<{ plan: Plan[] }>()
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
  props<{ site: Site[] }>()
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
  props<{ pmo: PMO[] }>()
);

export const getPmoError = createAction(
  '[Pmo Get By Id Site] GET By Id Site Error',
  props<{ error: any }>()
);

export const getIDOpex = createAction('[IDOpex Get All] GET All');

export const getIDOpexSuccess = createAction(
  '[IDOpex Get All] GET All Success',
  props<{ ids_opex: IDOpex[] }>()
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
  props<{ cuentas_sap: CuentaSap[] }>()
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
  props<{ cecos: CECO[] }>()
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
  props<{ lp: Lp[] }>()
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
  props<{ pep2: Pep2[] }>()
);

export const getPep2Error = createAction(
  '[getPep2 Get By Id BudgetLine] GET By Id BudgetLine Error',
  props<{ error: any }>()
);

export const getProyecto = createAction('[Proyecto Get All] GET All');

export const getProyectoSuccess = createAction(
  '[Proyecto Get All] GET All Success',
  props<{ proyectos: Proyecto[] }>()
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
