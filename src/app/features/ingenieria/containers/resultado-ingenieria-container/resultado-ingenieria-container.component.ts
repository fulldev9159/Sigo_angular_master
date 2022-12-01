import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  AgenciaContrato,
  CarritoService,
  ContratosUser,
  DetalleServicioCubicacion,
  InfoOT,
  NuevoServicio,
  NuevoUO,
  ProveedorAgenciaContrato,
  RequestEditCubicacion,
  ServicioUOActualizar,
  SessionData,
  UOAgregar,
} from '@model';
import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
import { TableServiciosComponent } from '@sharedOT/table-servicios/table-servicios.component';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { IngenieriaFacade } from '@storeOT/ingenieria/ingenieria.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'zwc-resultado-ingenieria-container',
  templateUrl: './resultado-ingenieria-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./resultado-ingenieria-container.component.scss'],
})
export class ResultadoIngenieriaContainerComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  subscription: Subscription = new Subscription();

  @ViewChild('tableServicios', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServicios: TableServiciosComponent;

  @ViewChild('agregarServiciosForm', {
    read: FormAgregarServiciosComponent,
    static: false,
  })
  agregarServiciosForm: FormAgregarServiciosComponent;

  dataOT: InfoOT;
  dataCubicacion: CarritoService[] = [];
  dataCubicacionIngenieria: CarritoService[] = [];
  accionesOT: Accion[] = [];
  cubicacion_ingeniria_id: number;
  carrito$ = this.serviciosFacade.carrito$();
  ot_id: number;

  permisos: string[] = (
    JSON.parse(localStorage.getItem('auth')).sessionData as SessionData
  ).permisos.map(value => value.slug);
  rol = (JSON.parse(localStorage.getItem('auth')).sessionData as SessionData)
    .rol_slug;
  contrato: string;

  // MODAL
  displayModalEnvioResultadoIngenieria = false;

  // LOADINGS
  sendingSaveCubicacion$ = this.loadingFacade.sendingSaveCubicacion$();

  constructor(
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private contratoFacade: ContratoFacade,
    private serviciosFacade: ServiciosFacade,
    private loadingFacade: LoadingsFacade,
    private ingenieriaFacade: IngenieriaFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
    this.subscription.add(
      this.route.data.subscribe(
        ({ detalleOT, cubicacion, cubicacionIngenieria, accionesOT }) => {
          if (accionesOT) this.accionesOT = accionesOT;
          if (cubicacion) {
            cubicacion.data.many_cubicacion_has_servicio.forEach(
              (service: DetalleServicioCubicacion) => {
                service.many_cubicacion_has_uob.forEach(uo => {
                  let new_service: CarritoService = {
                    servicio_id: service.id,
                    servicio_codigo: service.model_servicio_id.codigo,
                    numero_producto: service.numero_producto,
                    servicio_precio_final_clp: service.valor_unitario_clp,
                    servicio_nombre: service.model_servicio_id.descripcion,
                    tipo_servicio_descripcion:
                      service.model_tipo_servicio_id.descripcion,
                    tipo_servicio_id: service.tipo_servicio_id,
                    servicio_cantidad: service.cantidad,
                    servicio_unidad_cod: service.model_unidad_id.codigo,
                    servicio_unidad_descripcion:
                      service.model_unidad_id.descripcion,
                    prov_has_serv_precio: service.prov_has_serv_precio,
                    puntos_baremos: service.puntos_baremos,
                    unidad_obras: [
                      {
                        uo_codigo: uo.unidad_obra_cod,
                        uo_nombre: uo.model_unidad_obra_cod.descripcion,
                        uo_precio_total_clp: uo.valor_unitario_clp,
                        actividad_descripcion:
                          service.model_actividad_id.descripcion,
                        actividad_id: -1,
                        uo_cantidad: uo.cantidad,
                        uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                        uob_unidad_medida_descripcion:
                          uo.model_unidad_id.descripcion,
                      },
                    ],
                  };
                  this.dataCubicacion.push(new_service);
                });
              }
            );
          }
          if (detalleOT) {
            this.dataOT = detalleOT.data.ot;
            this.contrato =
              this.dataOT.model_cubicacion_id.model_contrato_id.model_tipo_contrato_id.nombre;
            this.cubicacion_ingeniria_id = this.dataOT.cubicacion_ing_id;
            this.ot_id = this.dataOT.id;

            // PRECARGAR DATOS FILTROS PARA AGREGAR SERVICIOS
            this.contratoFacade.getActividadesContratoProveedor(
              +this.dataOT.model_cubicacion_id.cmarco_has_proveedor_id
            );

            let contrato: ContratosUser = {
              contrato_id: +this.dataOT.model_cubicacion_id.contrato_id,
            };
            this.cubicacionFacade.contratoSelected(contrato);

            let agencia: AgenciaContrato = {
              id: this.dataOT.model_cubicacion_id.agencia_id,
              nombre: '',
            };
            this.cubicacionFacade.agenciaSelected(agencia);

            let proveedor: ProveedorAgenciaContrato = {
              cmarco_has_proveedor_id:
                this.dataOT.model_cubicacion_id.cmarco_has_proveedor_id,
              id: this.dataOT.model_cubicacion_id.proveedor_id,
            };
            this.cubicacionFacade.proveedorSelected(proveedor);
          }

          if (
            cubicacionIngenieria &&
            cubicacionIngenieria.data.many_cubicacion_has_servicio
          ) {
            // console.log(cubicacionIngenieria)
            cubicacionIngenieria.data.many_cubicacion_has_servicio.forEach(
              (service: DetalleServicioCubicacion) => {
                service.many_cubicacion_has_uob.forEach(uo => {
                  let new_service: CarritoService = {
                    precargado: true,
                    servicio_rowid: service.id,
                    servicio_id: service.id,
                    servicio_codigo: service.model_servicio_id.codigo,
                    numero_producto: service.numero_producto,
                    servicio_precio_final_clp: service.valor_unitario_clp,
                    servicio_nombre: service.model_servicio_id.descripcion,
                    tipo_servicio_descripcion:
                      service.model_tipo_servicio_id.descripcion,
                    tipo_servicio_id: service.tipo_servicio_id,
                    servicio_cantidad: service.cantidad,
                    servicio_unidad_cod: service.model_unidad_id.codigo,
                    servicio_unidad_descripcion:
                      service.model_unidad_id.descripcion,
                    prov_has_serv_precio: service.prov_has_serv_precio,
                    puntos_baremos: service.puntos_baremos,
                    unidad_obras: [
                      {
                        precargado: true,
                        uo_rowid: uo.id,
                        uo_codigo: uo.unidad_obra_cod,
                        uo_nombre: uo.model_unidad_obra_cod.descripcion,
                        uo_precio_total_clp: uo.valor_unitario_clp,
                        actividad_descripcion:
                          service.model_actividad_id.descripcion,
                        actividad_id: service.model_actividad_id.id,
                        uo_cantidad: uo.cantidad,
                        uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                        uob_unidad_medida_descripcion:
                          uo.model_unidad_id.descripcion,
                      },
                    ],
                  };
                  if (this.rol === 'ADM_EECC') {
                    // DATOS NO MUTABLES
                    this.dataCubicacionIngenieria.push(new_service);
                  }
                  if (this.rol === 'TRABAJADOR') {
                    // DATOS PARA CARRITO MUTABLE (AGREGAR, EDITAR, ELIMINAR SERVICIOS)
                    this.serviciosFacade.addDirectServiceCarrito(new_service);
                  }
                });
              }
            );
          }
        }
      )
    );
  }

  canSeePrices(): boolean {
    return this.permisos.find(v => v === 'OT_VER_VALOR_SERV') !== undefined;
  }

  editarCubicacion(): void {
    this.serviciosFacade.alertServicioExistenteCarrito(false, null);

    // ELIMINAR SERVICIOS/UO QUE EXISTIAN EN LA CUBICACION SI EL USUARIO DECIDIÖ ELIMINAR UNO
    if (
      this.tableServicios.servicios_eliminar.length > 0 ||
      this.tableServicios.uos_eliminar.length > 0
    ) {
      this.cubicacionFacade.eliminarServicioCarrito(
        this.tableServicios.servicios_eliminar,
        this.tableServicios.uos_eliminar
      );
    }

    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        console.log(carrito);
        const isLocal = (item: { precargado?: boolean }) =>
          item.precargado === undefined || item.precargado === false;

        const notLocal = (item: { precargado?: boolean }) => !isLocal(item);

        const servicios: {
          precargado: boolean;
          servicio_rowid: number;
          servicio_id: number;
          servicio_cantidad: number;
          unidad_obras: Array<{
            precargado: boolean;
            uo_rowid: number;
            uo_cantidad: number;
            uo_codigo: string;
          }>;
        }[] = this.tableServicios.formTable.get('table').value as Array<{
          precargado: boolean;
          servicio_id: number;
          servicio_rowid: number;
          servicio_cantidad: number;
          unidad_obras: Array<{
            precargado: boolean;
            uo_rowid: number;
            uo_cantidad: number;
            uo_codigo: string;
          }>;
        }>;

        const nuevos_servicios: NuevoServicio[] = servicios
          .filter(isLocal)
          .map(servicio => {
            let unidad_obra: NuevoUO[] = [];
            unidad_obra = servicio.unidad_obras.map(uo => ({
              uob_codigo: uo.uo_codigo,
              cantidad: +uo.uo_cantidad,
            }));
            return {
              servicio_id: +servicio.servicio_id,
              actividad_id: carrito.find(
                value =>
                  value.servicio_id === servicio.servicio_id &&
                  value.unidad_obras[0].uo_codigo ===
                    servicio.unidad_obras[0].uo_codigo
              ).unidad_obras[0].actividad_id,
              tipo_servicio_id: +carrito.find(
                value =>
                  value.servicio_id === servicio.servicio_id &&
                  value.unidad_obras[0].uo_codigo ===
                    servicio.unidad_obras[0].uo_codigo
              ).tipo_servicio_id,
              cantidad: +servicio.servicio_cantidad,
              unidad_obra,
            };
          });

        const servicios_actualizar: ServicioUOActualizar[] = servicios
          .filter(notLocal)
          .map(servicio => ({
            rowid: servicio.servicio_rowid,
            cantidad: +servicio.servicio_cantidad,
          }));

        const unidades_obra_actualizar: ServicioUOActualizar[] = servicios
          .filter(notLocal)
          .reduce((ac, servicio) => {
            const unidades_obra = servicio.unidad_obras
              .filter(notLocal)
              .map(uo => ({
                rowid: uo.uo_rowid,
                cantidad: +uo.uo_cantidad,
              }));
            return ac.concat(unidades_obra);
          }, []);

        const nuevas_unidades_obra: UOAgregar[] = servicios
          .filter(notLocal)
          .reduce((ac, servicio) => {
            const unidades_obra = servicio.unidad_obras
              .filter(isLocal)
              .map(uo => ({
                servicio_rowid: servicio.servicio_rowid,
                uob_codigo: uo.uo_codigo,
                uob_cantidad: +uo.uo_cantidad,
              }));
            return ac.concat(unidades_obra);
          }, []);

        let cubicacionData = this.dataOT.model_cubicacion_id;
        const request: RequestEditCubicacion = {
          cubicacion_datos: {
            id: +this.cubicacion_ingeniria_id,
            tipo_cubicacion_id: cubicacionData.tipo_cubicacion_id, // FORMULARIO
            contrato_id: cubicacionData.contrato_id, // FORMULARIO
            agencia_id: cubicacionData.agencia_id, // FORMULARIO
            proveedor_id: cubicacionData.proveedor_id, // NGRX proveedorselected
            codigo_acuerdo: cubicacionData.codigo_acuerdo, // NGRX proveedorselected
            cmarco_has_proveedor_id: cubicacionData.cmarco_has_proveedor_id, // FORMULARIO
            usuario_creador_id: cubicacionData.usuario_creador_id, // LOCALSTORE
            direccion_desde: cubicacionData.direccion_desde, // FORMULARIO
            altura_desde: cubicacionData.altura_desde, // FORMULARIO
            direccion_hasta: cubicacionData.direccion_hasta, // FORMULARIO
            altura_hasta: cubicacionData.altura_hasta, // FORMULARIO
            descripcion: cubicacionData.descripcion, // FORMULARIO
          },
          cubicacion_detalle: {
            nuevo: nuevos_servicios,
            actualizar: {
              servicio: servicios_actualizar,
              unidad_obra: unidades_obra_actualizar,
              agregar_uob_a_servicio: nuevas_unidades_obra,
            },
          },
        };

        this.cubicacionFacade.editCubicacion(request);
      })
    );
  }

  ngAfterViewInit(): void {
    //SETTING INIT FORMULARIOS
    this.agregarServiciosForm?.formFilter
      .get('tipo_servicio_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm?.formFilter
      .get('servicio_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm?.formFilter
      .get('unidad_obra_cod')
      .disable({ emitEvent: false });

    // RESET
    this.subscription.add(
      this.agregarServiciosForm?.formFilter
        .get('actividad_id')
        .valueChanges.subscribe(() => {
          this.contratoFacade.resetTipoServiciosContrato();
          this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
          this.serviciosFacade.resetServicioSelected();
          this.serviciosFacade.resetUnidadesObraServicio();

          this.agregarServiciosForm?.formFilter
            .get('tipo_servicio_id')
            .setValue(null, { emitEvent: false });
          this.agregarServiciosForm?.formFilter
            .get('servicio_id')
            .setValue(null, { emitEvent: false });
          this.agregarServiciosForm?.formFilter
            .get('unidad_obra_cod')
            .setValue(null, { emitEvent: false });
        })
    );

    this.subscription.add(
      this.agregarServiciosForm?.formFilter
        .get('tipo_servicio_id')
        .valueChanges.subscribe(() => {
          this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
          this.serviciosFacade.resetServicioSelected();
          this.serviciosFacade.resetUnidadesObraServicio();

          this.agregarServiciosForm?.formFilter
            .get('servicio_id')
            .setValue(null, { emitEvent: false });
          this.agregarServiciosForm?.formFilter
            .get('unidad_obra_cod')
            .setValue(null, { emitEvent: false });
        })
    );

    // this.subscription.add(
    //   this.tableServiciosInformeAvance?.formTable
    //     .get('table')
    //     .valueChanges.subscribe(v => {
    //       this.calcularTotalFinal();
    //     })
    // );

    // this.subscription.add(
    //   this.tableServiciosAdicionales?.formTable
    //     .get('table')
    //     .valueChanges.subscribe(v => {
    //       this.calcularTotalFinal();
    //     })
    // );
    // this.calcularTotalFinal();
  }

  // calcularTotalFinal(): void {
  //   let totalInformeAvance =
  //     +this.tableServiciosInformeAvance?.totalServicios +
  //     +this.tableServiciosInformeAvance?.totalUOs;
  //   let totalAdicionales =
  //     +this.tableServiciosAdicionales?.totalServicios +
  //     +this.tableServiciosAdicionales?.totalUOs;

  //   this.totalFinalInformeAvance = totalInformeAvance + totalAdicionales;
  // }

  enviarResultadoIngenieria(): void {
    this.displayModalEnvioResultadoIngenieria = false;
    this.ingenieriaFacade.enviarResultadoIngenieria(this.ot_id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
