import { registerLocaleData } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { ProveedorFacade } from '@storeOT/proveedor/proveedor.facades';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { MenuItem } from 'primeng/api';
import { FormAgregarServiciosComponent } from '../../../../shared/form-agregar-servicios/form-agregar-servicios.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { TableServicesComponent } from '../../components/table-services/table-services.component';
import localeEsCl from '@angular/common/locales/es-CL';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { combineLatest, Observable, Subscription, take } from 'rxjs';
import {
  ProveedorAgenciaContrato,
  RequestCreateCubicacion,
  SessionData,
} from '@model';

@Component({
  selector: 'zwc-form-cub',
  templateUrl: './form-cub-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-cub-container.component.scss'],
})
export class FormCubContainerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  subscription: Subscription = new Subscription();
  navbarHeader: MenuItem[];
  @ViewChild('formulario', {
    read: FormularioComponent,
    static: false,
  })
  formulario: FormularioComponent;

  @ViewChild('agregarServiciosForm', {
    read: FormAgregarServiciosComponent,
    static: false,
  })
  agregarServiciosForm: FormAgregarServiciosComponent;

  @ViewChild('tableServicios', {
    read: TableServicesComponent,
    static: false,
  })
  tableServicios: TableServicesComponent;

  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;
  proveedorSelected$: Observable<ProveedorAgenciaContrato> =
    this.cubicacionFacade.proveedorSelected$();
  carrito$ = this.serviciosFacade.carrito$();

  // LOADINGS
  sendingSaveCubicacion$ = this.loadingFacade.sendingSaveCubicacion$();

  constructor(
    private proveedorFacade: ProveedorFacade,
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private serviciosFacade: ServiciosFacade,
    private loadingFacade: LoadingsFacade
  ) {
    registerLocaleData(localeEsCl, 'es-CL');
  }

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      {
        label: 'Listar Cubicaciones',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/cubicacion'],
      },
      { label: 'Formulario Cubicación', styleClass: 'last-route' },
    ];
  }

  ngAfterViewInit(): void {
    //SETTING INIT FORMULARIOS
    this.formulario.formCub.get('agencia_id').disable({ emitEvent: false });
    this.formulario.formCub
      .get('cmarcoproveedor_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('actividad_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('servicio_cod')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('unidad_obra_cod')
      .disable({ emitEvent: false });

    // RESETS
    this.formulario.formCub.get('contrato').valueChanges.subscribe(() => {
      this.cubicacionFacade.resetAgenciaSelected();
      this.proveedorFacade.resetProveedoresAgenciaContrato();
      this.cubicacionFacade.resetProveedorSelected();
      this.contratoFacade.resetActividadesContratoProveedor();
      this.contratoFacade.resetTipoServiciosContrato();
      this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
      this.serviciosFacade.resetServicioSelected();
      this.serviciosFacade.resetUnidadesObraServicio();

      this.formulario.formCub
        .get('agencia_id')
        .setValue(null, { emitEvent: false });

      this.formulario.formCub
        .get('cmarcoproveedor_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('actividad_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('tipo_servicio_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('servicio_cod')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('unidad_obra_cod')
        .setValue(null, { emitEvent: false });
    });

    this.formulario.formCub.get('agencia_id').valueChanges.subscribe(() => {
      this.cubicacionFacade.resetProveedorSelected();
      this.contratoFacade.resetActividadesContratoProveedor();
      this.contratoFacade.resetTipoServiciosContrato();
      this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
      this.serviciosFacade.resetServicioSelected();
      this.serviciosFacade.resetUnidadesObraServicio();

      this.formulario.formCub
        .get('cmarcoproveedor_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('actividad_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('tipo_servicio_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('servicio_cod')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('unidad_obra_cod')
        .setValue(null, { emitEvent: false });
    });

    this.formulario.formCub
      .get('cmarcoproveedor_id')
      .valueChanges.subscribe(() => {
        this.contratoFacade.resetActividadesContratoProveedor();
        this.contratoFacade.resetTipoServiciosContrato();
        this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
        this.serviciosFacade.resetServicioSelected();
        this.serviciosFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm.formFilter
          .get('actividad_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('tipo_servicio_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });

    this.agregarServiciosForm.formFilter
      .get('actividad_id')
      .valueChanges.subscribe(() => {
        this.contratoFacade.resetTipoServiciosContrato();
        this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
        this.serviciosFacade.resetServicioSelected();
        this.serviciosFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm.formFilter
          .get('tipo_servicio_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });

    this.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .valueChanges.subscribe(() => {
        this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
        this.serviciosFacade.resetServicioSelected();
        this.serviciosFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });
  }

  createCubicacion(): void {
    console.log('click');
    this.subscription.add(
      combineLatest([this.proveedorSelected$, this.carrito$])
        .pipe(take(1))
        .subscribe(([proveedorSelected, carrito]) => {
          const request: RequestCreateCubicacion = {
            cubicacion_datos: {
              nombre: this.formulario.formCub.get('nombre').value, // FORMULARIO
              tipo_cubicacion_id:
                +this.formulario.formCub.get('tipocubicacion').value, // FORMULARIO
              contrato_id: +this.formulario.formCub.get('contrato').value, // FORMULARIO
              agencia_id: +this.formulario.formCub.get('agencia_id').value, // FORMULARIO
              proveedor_id: proveedorSelected.id, // NGRX proveedorselected
              codigo_acuerdo: proveedorSelected.codigo_acuerdo, // NGRX proveedorselected
              cmarco_has_proveedor_id:
                +this.formulario.formCub.get('cmarcoproveedor_id').value, // FORMULARIO
              usuario_creador_id: +this.sessionData.usuario_id, // LOCALSTORE
              direccion_desde:
                this.formulario.formCub.get('direcciondesde').value, // FORMULARIO
              altura_desde: this.formulario.formCub.get('direcciondesdealtura')
                .value, // FORMULARIO
              direccion_hasta:
                this.formulario.formCub.get('direccionhasta').value, // FORMULARIO
              altura_hasta: this.formulario.formCub.get('direccionhastaaltura')
                .value, // FORMULARIO
              descripcion: this.formulario.formCub.get('descripcion').value, // FORMULARIO
            },
            cubicacion_detalle: {
              nuevo: (
                this.tableServicios.formTable.get('table').value as Array<{
                  servicio_id: number;
                  servicio_cantidad: number;
                  unidad_obras: Array<{
                    uo_cantidad: number;
                    uo_codigo: string;
                  }>;
                }>
              ).map(servicio => ({
                servicio_id: servicio.servicio_id,
                actividad_id: carrito.find(
                  value =>
                    value.servicio_id === servicio.servicio_id &&
                    value.unidad_obras[0].uo_codigo ===
                      servicio.unidad_obras[0].uo_codigo
                ).unidad_obras[0].actividad_id,
                tipo_servicio_id: carrito.find(
                  value =>
                    value.servicio_id === servicio.servicio_id &&
                    value.unidad_obras[0].uo_codigo ===
                      servicio.unidad_obras[0].uo_codigo
                ).tipo_servicio_id,
                cantidad: servicio.servicio_cantidad,
                unidad_obra: servicio.unidad_obras.map(uo => ({
                  uob_codigo: uo.uo_codigo,
                  cantidad: uo.uo_cantidad,
                })),
              })),
            },
          };
          this.cubicacionFacade.createCubicacion(request);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
