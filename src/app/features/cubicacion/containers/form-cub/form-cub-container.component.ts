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
import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import localeEsCl from '@angular/common/locales/es-CL';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { combineLatest, Observable, Subscription, take } from 'rxjs';
import {
  CarritoService,
  DetalleCubicacion,
  ProveedorAgenciaContrato,
  RequestCreateCubicacion,
  SessionData,
} from '@model';
import { FormTableServicesComponent } from '@sharedOT/form-table-services/form-table-services.component';
import { ActivatedRoute, Route } from '@angular/router';

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
    read: FormTableServicesComponent,
    static: false,
  })
  tableServicios: FormTableServicesComponent;

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
    private loadingFacade: LoadingsFacade,
    private route: ActivatedRoute
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

    this.serviciosFacade.resetCarritoServices();
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

    this.subscription.add(
      this.route.data.subscribe(({ detalleCubicacion }) => {
        const detalle = detalleCubicacion.data;
        if (detalle) {
          if (this.formulario.formCub && detalle) {
            const cubicacion = detalle as DetalleCubicacion;
            const servicios = cubicacion.many_cubicacion_has_servicio ?? [];

            const formData = {
              id: `${cubicacion.id}`,

              nombre: cubicacion.nombre,
              tipocubicacion: cubicacion.tipo_cubicacion_id,
              direcciondesde: cubicacion.direccion_desde,
              direcciondesdealtura: cubicacion.altura_desde,
              direccionhasta: cubicacion.direccion_hasta,
              direccionhastaaltura: cubicacion.altura_hasta,
              descripcion: cubicacion.descripcion,

              contrato: cubicacion.contrato_id,
            };

            this.formulario.formCub.patchValue(formData);

            setTimeout(() => {
              this.formulario.formCub
                .get('agencia_id')
                .setValue(cubicacion.agencia_id);
            }, 10);
            setTimeout(() => {
              this.formulario.formCub
                .get('cmarcoproveedor_id')
                .setValue(cubicacion.cmarco_has_proveedor_id);
            }, 10);

            cubicacion.many_cubicacion_has_servicio.forEach(service => {
              service.many_cubicacion_has_uob.forEach(uo => {
                let new_service: CarritoService = {
                  servicio_id: service.id,
                  servicio_codigo: service.model_servicio_id.codigo,
                  servicio_precio_final_clp: service.valor_unitario_clp,
                  servicio_nombre: service.model_servicio_id.descripcion,
                  tipo_servicio_descripcion:
                    service.model_tipo_servicio_id.descripcion,
                  tipo_servicio_id: service.tipo_servicio_id,
                  servicio_cantidad: service.cantidad,
                  unidad_obras: [
                    {
                      uo_codigo: uo.unidad_obra_cod,
                      uo_nombre: uo.model_unidad_obra_cod.descripcion,
                      uo_precio_total_clp: uo.valor_unitario_clp,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                      uo_cantidad: uo.cantidad,
                    },
                  ],
                };
                this.serviciosFacade.addDirectServiceCarrito(new_service);
              });
            });
          }

          // table: servicios.map(data_servicio => ({
          //   precargado: true,
          //   servicio_rowid: data_servicio.id,

          //   servicio_id: data_servicio.servicio_id,
          //   servicio_cantidad: data_servicio.cantidad,
          //   servicio_precio_final_clp: data_servicio.valor_unitario_clp,
          //   actividad_id: data_servicio.actividad_id,
          //   servicio_tipo: data_servicio.tipo_servicio_id,

          //   unidades_obras: data_servicio.many_cubicacion_has_uob.map(
          //     data_unidad_obra => ({
          //       precargado: true,
          //       uo_rowid: data_unidad_obra.id,

          //       uo_codigo: data_unidad_obra.unidad_obra_cod,
          //       uo_cantidad: data_unidad_obra.cantidad,
          //       uo_precio_total_clp: data_unidad_obra.valor_unitario_clp,
          //     })
          //   ),
          // })),
          // this.mode = 'edit';
          // this.onInitEditionData(detalle);
        }
      })
    );
  }

  createCubicacion(): void {
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
