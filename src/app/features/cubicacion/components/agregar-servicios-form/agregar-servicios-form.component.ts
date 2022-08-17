import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AgenciaContrato,
  ContratosUser,
  ProveedorAgenciaContrato,
  RequestGetServiciosAgenciaContratoProveedor,
  ServicioAgenciaContratoProveedor,
} from '@model';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { RequestGetUnidadObraServicio } from 'src/app/core/model/unidad-obra';

interface Dropdown {
  name: string;
  code: number | string;
}
@Component({
  selector: 'zwc-agregar-servicios-form',
  templateUrl: './agregar-servicios-form.component.html',
  styleUrls: ['./agregar-servicios-form.component.scss'],
})
export class AgregarServiciosFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  actividadesContratoProveedor$: Observable<Dropdown[]> = this.contratoFacade
    .getActividadesContratoProveedor$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.descripcion > b.descripcion
                ? 1
                : b.descripcion > a.descripcion
                ? -1
                : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: value.descripcion,
              code: value.actividad_id,
            }))
          : []
      )
    );

  contratoSelected$: Observable<ContratosUser> =
    this.cubicacionFacade.contratoSelected$();

  tipoServicioContrato$: Observable<Dropdown[]> = this.contratoFacade
    .getTipoServiciosContrato$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.descripcion > b.descripcion
                ? 1
                : b.descripcion > a.descripcion
                ? -1
                : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: value.descripcion,
              code: value.id,
            }))
          : []
      )
    );

  agenciaSelected$: Observable<AgenciaContrato> =
    this.cubicacionFacade.agenciaSelected$();
  proveedorSelected$: Observable<ProveedorAgenciaContrato> =
    this.cubicacionFacade.proveedorSelected$();

  serviciosAgenciaContratoProveedor$: Observable<Dropdown[]> =
    this.serviciosFacade.getServiciosAgenciaContratoProveedor$().pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.numero_producto > b.numero_producto
                ? 1
                : b.numero_producto > a.numero_producto
                ? -1
                : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: `${value.numero_producto} - ${value.descripcion}`,
              code: value.codigo,
            }))
          : []
      )
    );
  unidadesObraServicio$: Observable<Dropdown[]> = this.serviciosFacade
    .getUnidadesObraServicio$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.unidad_obra_cod > b.unidad_obra_cod
                ? 1
                : b.unidad_obra_cod > a.unidad_obra_cod
                ? -1
                : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: `${value.unidad_obra_cod} - ${value.model_unidad_obra_cod.descripcion}`,
              code: value.id,
            }))
          : []
      )
    );

  // FORMULARIO
  formFilterControls: any = {
    actividad_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, [Validators.required]),
    servicio_cod: new FormControl('', [Validators.required]),
    unidad_obra_cod: new FormControl(null, [Validators.required]),
  };
  formFilter: FormGroup = new FormGroup(this.formFilterControls);

  // LOADINGS
  loadingGetActividadesContratoProveedor$ =
    this.loadingsFacade.sendingGetActividadesContratoProveedor$();
  loadingGetTipoServiciosContrato$ =
    this.loadingsFacade.sendingGetTipoServiciosContrato$();
  loadingGetServiciosAgenciaContratoProveedor$ =
    this.loadingsFacade.sendingGetServiciosAgenciaContratoProveedor$();
  loadingGetUnidadesObraServicio$ =
    this.loadingsFacade.sendingGetUnidadesObraServicios$();

  constructor(
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private serviciosFacade: ServiciosFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.contratoSelected$,
        this.formFilter.get('actividad_id').valueChanges,
      ]).subscribe(([contratoSelected, actividad_id]) => {
        if (
          actividad_id &&
          actividad_id !== null &&
          contratoSelected &&
          contratoSelected !== null
        ) {
          this.contratoFacade.getTipoServiciosContrato(
            actividad_id,
            contratoSelected.contrato_id
          );
        }
      })
    );

    this.subscription.add(
      combineLatest([
        this.proveedorSelected$,
        this.agenciaSelected$,
        this.formFilter.get('tipo_servicio_id').valueChanges,
      ]).subscribe(([proveedorSelected, agenciaSelected, tipo_servicio_id]) => {
        if (
          agenciaSelected &&
          agenciaSelected !== null &&
          proveedorSelected &&
          proveedorSelected !== null &&
          tipo_servicio_id &&
          tipo_servicio_id !== null
        ) {
          let request: RequestGetServiciosAgenciaContratoProveedor = {
            actividad_id: +this.formFilter.get('actividad_id').value,
            agencia_id: agenciaSelected.id,
            cmarco_has_prov_id: proveedorSelected.cmarco_has_proveedor_id,
            tipo_servicio_id,
          };
          this.serviciosFacade.getServiciosAgenciaContratoProveedor(request);
        }
      })
    );

    this.subscription.add(
      this.formFilter
        .get('servicio_cod')
        .valueChanges.subscribe(servicio_cod => {
          if (servicio_cod && servicio_cod !== null) {
            let request: RequestGetUnidadObraServicio = {
              servicio_cod,
              actividad_id: +this.formFilter.get('actividad_id').value,
            };
            this.serviciosFacade.getUnidadesObraServicio(request);
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
