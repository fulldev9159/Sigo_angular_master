import { Injectable } from '@angular/core';
import {
  AreaDeNegocio,
  Comuna,
  CubicacionContrato,
  OficinaCentralWithAgenciaModel,
  OT,
  PlanProyecto,
  RequestBandejaOT,
  RequestCreateOTBucle,
  RequestCreateOTFijo,
  RequestCreateOTMovil,
  RequestCreateOTOrdinario,
  Sitio,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  FiltroPropietarioOT,
  FiltroTipoOT,
  FiltroPestaniaOT,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otSelectors from './ot.selectors';
import * as otActions from './ot.actions';

@Injectable({
  providedIn: 'root',
})
export class OTFacade {
  constructor(private store: Store<any>) {}

  // CREATE OT
  public createOT(
    request:
      | RequestCreateOTBucle
      | RequestCreateOTFijo
      | RequestCreateOTMovil
      | RequestCreateOTOrdinario
  ): void {
    this.store.dispatch(otActions.createOT({ request }));
  }

  // GET CUBICACION SELECCIONADA
  public cubicacionSelected(cubicacionSelected: CubicacionContrato): void {
    this.store.dispatch(otActions.cubicacionSelected({ cubicacionSelected }));
  }

  public cubicacionSelected$(): Observable<CubicacionContrato> {
    return this.store.select(otSelectors.cubicacionSelected);
  }

  // CREATE OT CONTRATO BUCLE : GET OFICINA CENTRAL
  public getOficinaCentral(agencia_id: number): void {
    this.store.dispatch(otActions.getOficinaCentral({ agencia_id }));
  }

  public getOficinaCentral$(): Observable<OficinaCentralWithAgenciaModel[]> {
    return this.store.select(otSelectors.getOficinaCentral);
  }

  // CREATE OT CONTRATO BUCLE : GET SOLICITADO POR
  public getSolicitadoPor(): void {
    this.store.dispatch(otActions.getSolicitadoPor());
  }

  public getSolicitadoPor$(): Observable<SolicitadoPor[]> {
    return this.store.select(otSelectors.getSolicitadoPor);
  }

  // CREATE OT CONTRATO BUCLE : GET COUMNAS FROM CUBICACION
  public getComunasFromCub(cubicacion_id: number): void {
    this.store.dispatch(otActions.getComunasFromCub({ cubicacion_id }));
  }

  public getComunasFromCub$(): Observable<Comuna[]> {
    return this.store.select(otSelectors.getComunasFromCub);
  }

  // CREATE OT CONTRATO BUCLE : GET TIPO DE RED
  public getTipoDeRed(): void {
    this.store.dispatch(otActions.getTipoDeRed());
  }

  public getTipoDeRed$(): Observable<TipoDeRed[]> {
    return this.store.select(otSelectors.getTipoDeRed);
  }

  // CREATE OT CONTRATO BUCLE : GET TIPO DE TRABAJO
  public getTipoDeTrabajoFromCub(cubicacion_id: number): void {
    this.store.dispatch(otActions.getTipoDeTrabajoFromCub({ cubicacion_id }));
  }

  public getTipoDeTrabajoFromCub$(): Observable<TipoDeTrabajo[]> {
    return this.store.select(otSelectors.getTipoDeTrabajoFromCub);
  }

  // CREATE OT CONTRATO BUCLE : GET AREA DE NEGOCIO
  public getAreaDeNegocio(): void {
    this.store.dispatch(otActions.getAreaDeNegocio());
  }

  public getAreaDeNegocio$(): Observable<AreaDeNegocio[]> {
    return this.store.select(otSelectors.getAreaDeNegocio);
  }

  // CREATE OT CONTRATO MOVIL : GET PLANES DE PROYECTO
  public getPlanDeProyecto(): void {
    this.store.dispatch(otActions.getPlanDeProyecto());
  }

  public getPlanDeProyecto$(): Observable<PlanProyecto[]> {
    return this.store.select(otSelectors.getPlanDeProyecto);
  }

  // CREATE OT CONTRATO MOVIL : GET SITIOS DE UN PLAN PROYECTO
  public getSitioPlanProyecto(plan_id: number): void {
    this.store.dispatch(otActions.getSitioPlanProyecto({ plan_id }));
  }

  public getSitioPlanProyecto$(): Observable<Sitio[]> {
    return this.store.select(otSelectors.getSitioPlanProyecto);
  }

  // FILTROS OT
  public updateFiltros({
    filtro_propietario,
    filtro_tipo,
  }: {
    filtro_propietario: FiltroPropietarioOT;
    filtro_tipo: FiltroTipoOT;
  }): void {
    this.store.dispatch(
      otActions.updateFiltrosOT({
        filtro_propietario,
        filtro_tipo,
      })
    );
  }

  public updateFiltrosPestania(filtro_pestania: FiltroPestaniaOT): void {
    this.store.dispatch(
      otActions.updateFiltrosPestaniaOT({
        filtro_pestania,
      })
    );
  }

  public getFiltrosOT$(): Observable<{
    filtro_propietario: FiltroPropietarioOT;
    filtro_tipo: FiltroTipoOT;
    filtro_pestania: FiltroPestaniaOT;
    currentPageEjecucion: number;
    currentPageAbiertas: number;
    currentPageCerradas: number;
    currentPageAnuladas: number;
    currentPageQuebradas: number;
  }> {
    return this.store.select(otSelectors.getFiltrosOT);
  }

  // BANDEJAS
  public getBandejaOT(filtro_pestania: FiltroPestaniaOT): void {
    if (filtro_pestania === FiltroPestaniaOT.EN_EJECUCION)
      this.store.dispatch(otActions.getBandejaOTEjecucion());
    else if (filtro_pestania === FiltroPestaniaOT.ABIERTAS)
      this.store.dispatch(otActions.getBandejaOTAbiertas());
    else if (filtro_pestania === FiltroPestaniaOT.CERRADAS)
      this.store.dispatch(otActions.getBandejaOTCerradas());
    else if (filtro_pestania === FiltroPestaniaOT.ANULADAS)
      this.store.dispatch(otActions.getBandejaOTAnuladas());
    else if (filtro_pestania === FiltroPestaniaOT.EN_TRAMITE)
      this.store.dispatch(otActions.getBandejaOTQuebradas());
  }

  public setPageEjecucion(page: number): void {
    this.store.dispatch(
      otActions.setPageEjecucion({
        page,
      })
    );
  }
  public setPageAbiertas(page: number): void {
    this.store.dispatch(
      otActions.setPageAbiertas({
        page,
      })
    );
  }
  public setPageCerradas(page: number): void {
    this.store.dispatch(
      otActions.setPageCerradas({
        page,
      })
    );
  }
  public setPageAnuladas(page: number): void {
    this.store.dispatch(
      otActions.setPageAnuladas({
        page,
      })
    );
  }
  public setPageQuebradas(page: number): void {
    this.store.dispatch(
      otActions.setPageQuebradas({
        page,
      })
    );
  }

  public getBandejaOTEjecucion$(): Observable<OT[]> {
    return this.store.select(otSelectors.getBandejaOTEjecucion);
  }
  public getBandejaOTAbiertas$(): Observable<OT[]> {
    return this.store.select(otSelectors.getBandejaOTAbiertas);
  }
  public getBandejaOTCerradas$(): Observable<OT[]> {
    return this.store.select(otSelectors.getBandejaOTCerradas);
  }
  public getBandejaOTAnuladas$(): Observable<OT[]> {
    return this.store.select(otSelectors.getBandejaOTAnuladas);
  }
  public getBandejaOTQuebradas$(): Observable<OT[]> {
    return this.store.select(otSelectors.getBandejaOTQuebradas);
  }

  public downloadOTsAsignadas(
    fecha_inicio_real_ot__desde: string,
    fecha_inicio_real_ot__hasta: string
  ): void {
    this.store.dispatch(
      otActions.downloadOTsAsignadas({
        fecha_inicio_real_ot__desde,
        fecha_inicio_real_ot__hasta,
      })
    );
  }

  public downloadActivosFijos(
    fecha_cierre_ot__desde: string,
    fecha_cierre_ot__hasta: string
  ): void {
    this.store.dispatch(
      otActions.downloadActivosFijos({
        fecha_cierre_ot__desde,
        fecha_cierre_ot__hasta,
      })
    );
  }
}
