import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AgenciaContrato,
  CarritoService,
  ContratosUser,
  ProveedorAgenciaContrato,
  RequestGetDetallesServicioTipoAgenciaContratoProveedor,
  RequestGetServicioTipoAgenciaContratoProveedor,
  ServicioAgenciaContratoProveedor,
} from '@model';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { combineLatest, map, Observable, Subscription, take, tap } from 'rxjs';
import { RequestGetUnidadObraServicio } from 'src/app/core/model/unidad-obra';
import { FormularioService } from 'src/app/core/service/formulario.service';

interface Dropdown {
  name: string;
  code: number | string;
}

/**
 * @description
 *   FORMULARIO QUE PERMITE AGREGAR UN SERVICIO/UO AL CARRITO
 *   DATOS QUE PERMITE USAR:
 *    - Actividad
 *    - Tipo de servicio
 *       Necesita:
 *          - Actividad (interno en esta clase)
 *          - Contrato marco (se debe obtener por NGRX)
 *    - Servicios
 *          - Actividad (interno en esta clase)
 *          - Agencia (se debe obtener por NGRX)
 *          - SubContrato  (se debe obtener por NGRX)
 *          - Tipo de servicio (interno en esta clase)
 *    - UO de un servicio
 *          - Actividad (interno en esta clase)
 *          - Servicio Cod(interno en esa clase)
 *
 * Datos previos necesarios:
 *     - Actividades de un contrato/agencia/proveedor (NGRX)
 */
@Component({
  selector: 'zwc-agregar-servicios-form',
  templateUrl: './agregar-servicios-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./agregar-servicios-form.component.scss'],
})
export class AgregarServiciosFormComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  actividadesContratoProveedor$: Observable<Dropdown[]> = this.contratoFacade
    .getActividadesContratoProveedor$()
    .pipe(
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'actividad_id',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.descripcion,
          code: value.actividad_id,
        }))
      )
    );

  contratoSelected$: Observable<ContratosUser> =
    this.cubicacionFacade.contratoSelected$();

  tipoServicioContrato$: Observable<Dropdown[]> = this.contratoFacade
    .getTipoServiciosContrato$()
    .pipe(
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'tipo_servicio_id',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.descripcion,
          code: value.id,
        }))
      )
    );

  agenciaSelected$: Observable<AgenciaContrato> =
    this.cubicacionFacade.agenciaSelected$();
  proveedorSelected$: Observable<ProveedorAgenciaContrato> =
    this.cubicacionFacade.proveedorSelected$();

  serviciosAgenciaContratoProveedor: ServicioAgenciaContratoProveedor[];
  serviciosAgenciaContratoProveedor$: Observable<Dropdown[]> =
    this.serviciosFacade.getServiciosAgenciaContratoProveedor$().pipe(
      tap(values => (this.serviciosAgenciaContratoProveedor = values)),
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'servicio_cod',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.descripcion > b.descripcion ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: `${value.numero_producto} - ${value.descripcion}`,
          code: value.codigo,
        }))
      )
    );
  unidadesObraServicio$: Observable<Dropdown[]> = this.serviciosFacade
    .getUnidadesObraServicio$()
    .pipe(
      tap(values =>
        this.formularioService.checkAndEnable(
          this.formFilter,
          'unidad_obra_cod',
          values
        )
      ),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) =>
          a.model_unidad_obra_cod.descripcion >
          b.model_unidad_obra_cod.descripcion
            ? 1
            : -1
        );
      }),
      map(values =>
        values.map(value => ({
          name: `${value.unidad_obra_cod} - ${value.model_unidad_obra_cod.descripcion}`,
          code: value.unidad_obra_cod,
        }))
      )
    );

  carrito$: Observable<CarritoService[]> = this.serviciosFacade.carrito$();

  // FORMULARIO
  formFilterControls: any = {
    actividad_id: new FormControl(null, [Validators.required]),
    tipo_servicio_id: new FormControl(null, [Validators.required]),
    servicio_cod: new FormControl(null, [Validators.required]),
    unidad_obra_cod: new FormControl(null, [Validators.required]),
  };
  formFilter: FormGroup = new FormGroup(this.formFilterControls);

  // LOADINGS
  loadingGetActividadesContratoProveedor$: Observable<boolean> =
    this.loadingsFacade.sendingGetActividadesContratoProveedor$();
  loadingGetTipoServiciosContrato$: Observable<boolean> =
    this.loadingsFacade.sendingGetTipoServiciosContrato$();
  loadingGetServiciosAgenciaContratoProveedor$: Observable<boolean> =
    this.loadingsFacade.sendingGetServiciosAgenciaContratoProveedor$();
  loadingGetUnidadesObraServicio$: Observable<boolean> =
    this.loadingsFacade.sendingGetUnidadesObraServicios$();
  loadingAgregarServicioCarrito$: Observable<boolean> =
    this.loadingsFacade.sendingAgregarServicioCarrito$();

  // EXTRAS
  alertServicioExistenteCarrito$: Observable<boolean> =
    this.serviciosFacade.alertServicioExistenteCarrito$();

  constructor(
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private serviciosFacade: ServiciosFacade,
    private loadingsFacade: LoadingsFacade,
    private formularioService: FormularioService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      combineLatest([
        this.contratoSelected$,
        this.formFilter.get('actividad_id').valueChanges,
      ]).subscribe(([contratoSelected, actividad_id]) => {
        // TODO: WA para determinar si es efectivamente un cambio de actividad escogido en el formulario o es un cambio de contrato
        let preValues = this.formFilter.value;
        let actualValue = this.formFilter.get('actividad_id').value;

        let actividad_id_change = false;
        if (
          (preValues.actividad_id === null && actualValue !== null) ||
          (preValues.actividad_id !== null &&
            preValues.actividad_id !== actividad_id)
        ) {
          actividad_id_change = true;
        }

        // CALL GET TIPOS DE SERVICIOS
        if (
          actividad_id &&
          actividad_id !== null &&
          contratoSelected &&
          contratoSelected !== null &&
          actividad_id_change
        ) {
          this.serviciosFacade.alertServicioExistenteCarrito(false);
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
        // TODO: WA
        let preValues = this.formFilter.value;
        let actualValue = this.formFilter.get('tipo_servicio_id').value;

        let tipo_servicio_id_change = false;
        if (
          (preValues.tipo_servicio_id === null && actualValue !== null) ||
          (preValues.tipo_servicio_id !== null &&
            preValues.tipo_servicio_id !== tipo_servicio_id)
        ) {
          tipo_servicio_id_change = true;
        }

        // CALL GET SERVICIOS
        if (
          agenciaSelected &&
          agenciaSelected !== null &&
          proveedorSelected &&
          proveedorSelected !== null &&
          tipo_servicio_id &&
          tipo_servicio_id !== null &&
          tipo_servicio_id_change
        ) {
          let request: RequestGetServicioTipoAgenciaContratoProveedor = {
            actividad_id: +this.formFilter.get('actividad_id').value,
            agencia_id: agenciaSelected.id,
            cmarco_has_prov_id: proveedorSelected.cmarco_has_proveedor_id,
            tipo_servicio_id,
          };
          this.serviciosFacade.alertServicioExistenteCarrito(false);
          this.serviciosFacade.getServiciosAgenciaContratoProveedor(request);
        }
      })
    );

    this.subscription.add(
      this.formFilter
        .get('servicio_cod')
        .valueChanges.subscribe(servicio_cod => {
          // CALL UNIDADES DE OBRAS
          if (servicio_cod && servicio_cod !== null) {
            this.serviciosFacade.alertServicioExistenteCarrito(false);
            let request: RequestGetUnidadObraServicio = {
              servicio_cod,
              actividad_id: +this.formFilter.get('actividad_id').value,
            };
            this.serviciosFacade.getUnidadesObraServicio(request);
          }
        })
    );

    this.subscription.add(
      this.formFilter
        .get('unidad_obra_cod')
        .valueChanges.subscribe(unidad_obra_cod => {
          // CALL UNIDADES DE OBRAS
          if (unidad_obra_cod && unidad_obra_cod !== null) {
            this.serviciosFacade.alertServicioExistenteCarrito(false);
          }
        })
    );
  }

  agregarServicio(): void {
    this.subscription.add(
      combineLatest([
        this.proveedorSelected$,
        this.agenciaSelected$,
        this.carrito$,
      ])
        .pipe(take(1))
        .subscribe(([proveedorSelected, agenciaSelected, carrito]) => {
          // console.log(carrito);
          const unidad_obra_cod = this.formFilter.get('unidad_obra_cod').value;
          const servicio_id = this.serviciosAgenciaContratoProveedor.find(
            value => value.codigo === this.formFilter.get('servicio_cod').value
          ).id;

          const servicioExiste = carrito.find(
            servicio =>
              servicio.servicio_id === servicio_id &&
              servicio.unidad_obras[0].uo_codigo === unidad_obra_cod
          );
          // console.log(servicioExiste);
          if (servicioExiste !== undefined) {
            this.serviciosFacade.alertServicioExistenteCarrito(true);
          } else {
            // console.log('nuevo', this.formFilter.get('unidad_obra_cod').value);
            this.serviciosFacade.alertServicioExistenteCarrito(false);
            const request_service: RequestGetDetallesServicioTipoAgenciaContratoProveedor =
              {
                agencia_id: agenciaSelected.id,
                cmarco_has_proveedor_id:
                  proveedorSelected.cmarco_has_proveedor_id,
                servicio_id: +servicio_id,
                tipo_servicio_id: this.formFilter.get('tipo_servicio_id').value,
                actividad_id: this.formFilter.get('actividad_id').value,
              };

            this.serviciosFacade.addServicioCarrito(
              request_service,
              this.formFilter.get('unidad_obra_cod').value
            );
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
