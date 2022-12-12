import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  AgenciaContrato,
  AgregarUOAdicionalAServicio,
  CarritoService,
  CarritoUO,
  ContratosUser,
  DetalleInformeAvance,
  DetalleOT,
  Dropdown,
  ItemSerivioUO,
  MotivoRechazo,
  NuevoServicioAdicional,
  ProveedorAgenciaContrato,
  RequestAdicionales,
  RequestAutorizarInformeAvance,
  RequestUpdateInformeAvance,
  ServicioAdicionalActualizar,
  SessionData,
  UOAdicionalActualizar,
  MaterialesManoObra,
  ReqSubirEvidencia,
} from '@model';
import { FormAgregarServiciosComponent } from '@sharedOT/form-agregar-servicios/form-agregar-servicios.component';
import { TableServiciosComponent } from '@sharedOT/table-servicios/table-servicios.component';
import { ViewRechazoComponent } from '@sharedOT/view-rechazo/view-rechazo.component';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { FlujoOTFacade } from '@storeOT/flujo-ot/flujo-ot.facades';
import { InformeAvanceFacade } from '@storeOT/informe-avance/informe-avance.facades';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { map, Observable, Subscription, take, tap } from 'rxjs';
import { LogService } from '@log';
import { FormControl, FormGroup } from '@angular/forms';
import { SubirEvidenciasFormComponent } from '../subir-evidencias-form/subir-evidencias-form.component';

interface TableService {
  precargado: boolean;
  servicio_cantidad: number;
  servicio_id: number;
  servicio_precio_final_clp: number;
  servicio_rowid: number;
  unidad_obras: {
    precargado: boolean;
    uo_rowid: number;
    uo_codigo: string;
    uo_cantidad: number;

    uo_precio_total_clp: number;
  }[];
}

// 92 TODO: CREAR LAS RESTRICCIONES DE ACCESO POR USUARIO Y ADEMÁS POR ETAPA
// 92 TODO: SOLO DBE PERMITIR ENTRAR EN LA ETAPA DE EJECUCIÓN DE TRABAJOS
// 105 TODO: VER SI ES MEJOR UX REFRESCAR EL NGRX QUE LA PÁGINA AL GUARDAR BORRADOR
// 106 TODO: CONFIRMAR: SI EL ADMIN EECC REALIZA MODIFICACIONES AL INFORME DE AVANCE Y LO RECHAZA ESOS CAMBIOS TAMBIÉN SE DEBERAN GUARDAR
// 108 TODO: IMPLEMENTAR BOTON RECHAZAR INFORME DE AVANCE
// 109 TODO: PROBAR QUE OTROS USUARIOS DE OTRAS EMPRESAS NO PUEDAN ACCEDER AL ID DE UNA OT QUE NO ES DE SU EMPRESA
// 110 TODO: PROBAR SI AL CAMBIAR INFORMACION DEL INFORME Y APROBAR/RECHAZAR GUARDA EL CAMBIO
// 111 TODO: AGREGAR UN MODAL DE VALIDACIÓN DE ACCIÓN AL AUTORIZAR INFORME DE AVANCE
// 156 TODO: EL MENSAJE DE SERVICIO YA EXISTENTE PARECE PERO DESAPARECE SI VUELVO A ESCOGER OTRO SERVICIO YA EXISTENTE
@Component({
  selector: 'zwc-informe-avance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './informe-avance.component.html',
  styleUrls: ['./informe-avance.component.scss'],
})
export class InformeAvanceComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;

  @ViewChild('agregarServiciosForm', {
    read: FormAgregarServiciosComponent,
    static: false,
  })
  agregarServiciosForm: FormAgregarServiciosComponent;

  @ViewChild('tableServiciosAdicionales', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServiciosAdicionales: TableServiciosComponent;

  @ViewChild('tableServiciosInformeAvance', {
    read: TableServiciosComponent,
    static: false,
  })
  tableServiciosInformeAvance: TableServiciosComponent;

  @ViewChild('rechazoInformeAvanceForm', {
    read: ViewRechazoComponent,
    static: false,
  })
  rechazoInformeAvanceForm: ViewRechazoComponent;

  @ViewChild('subirEvidenciasForm', {
    read: SubirEvidenciasFormComponent,
    static: false,
  })
  subirEvidenciasForm: SubirEvidenciasFormComponent;

  subscription: Subscription = new Subscription();
  serviciosInformeAvance: CarritoService[] = [];
  // 112 TODO: MEJORAR MANERA DE ARMAR LOS DATOS DEL SERVICIO A AGREGAR, ACTUALMENTE SE BUSCA DESDE EL CARRITO HACIA EL CARRITO, TIENE UNA VUELTA MEDIA RARA
  carrito$ = this.serviciosFacade.carrito$();
  detalleInformeAvance$: Observable<DetalleInformeAvance> =
    this.informeAvanceFacade.getDetalleInformeAvance$();
  otDetalle$: Observable<DetalleOT> = this.otDetalleDFacade.getDetalleOT$();
  motivosRechazo$: Observable<Dropdown[]> = this.flujoOTFacade
    .getMotivosRechazo$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) => (a.motivo > b.motivo ? 1 : -1));
      }),
      map(values =>
        values.map(value => ({
          name: value.motivo,
          code: value.id,
        }))
      )
    );
  accionesOT: Accion[] = [];
  ot_id: number;
  contrato: string;

  materialesSelected: MaterialesManoObra[] | null;
  materialSelected: MaterialesManoObra | null;
  displayModalMateriales = false;
  displayModalConfirmacionOrigen = false;

  // LOADINGS
  sendingSendInformeAvance$: Observable<boolean> =
    this.loadingsFacade.sendingCreateOT$();

  sendingSendBorradorInformeAvance$: Observable<boolean> =
    this.loadingsFacade.sendingSendBorradorInformeAvance$();

  // MODAL
  showModalRechazarInformeAvance = false;
  displayModalEnvioInformeAvance = false;
  displayModalAprobacionInformeAvance = false;
  displaySubirEvidencia = false;

  permisos: string[] = (
    JSON.parse(localStorage.getItem('auth')).sessionData as SessionData
  ).permisos.map(value => value.slug);

  totalFinalInformeAvance = 0;

  servicio_subir_evidencia: { servicio: CarritoService };

  constructor(
    private serviciosFacade: ServiciosFacade,
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private loadingsFacade: LoadingsFacade,
    private informeAvanceFacade: InformeAvanceFacade,
    private otDetalleDFacade: OTDetalleFacade,
    private flujoOTFacade: FlujoOTFacade,
    private authFacade: AuthFacade,
    private route: ActivatedRoute,
    private detector: ChangeDetectorRef,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
    this.serviciosFacade.resetCarritoServices();
    this.subscription.add(
      this.route.data.subscribe(
        ({ detalleOT, detalleInformeAvance, accionesOT }) => {
          this.logger.debug('acciones', accionesOT);
          if (accionesOT) this.accionesOT = accionesOT;
          if (detalleOT) {
            const ot = detalleOT.data as DetalleOT;
            this.contrato =
              ot.ot.model_cubicacion_id.model_contrato_id.model_tipo_contrato_id.nombre;

            this.ot_id = ot.ot.id;

            // PRECARGAR DATOS FILTROS PARA AGREGAR SERVICIOS
            this.contratoFacade.getActividadesContratoProveedor(
              +ot.ot.model_cubicacion_id.cmarco_has_proveedor_id
            );

            let contrato: ContratosUser = {
              contrato_id: +ot.ot.model_cubicacion_id.contrato_id,
            };
            this.cubicacionFacade.contratoSelected(contrato);

            let agencia: AgenciaContrato = {
              id: ot.ot.model_cubicacion_id.agencia_id,
              nombre: '',
            };
            this.cubicacionFacade.agenciaSelected(agencia);

            let proveedor: ProveedorAgenciaContrato = {
              cmarco_has_proveedor_id:
                ot.ot.model_cubicacion_id.cmarco_has_proveedor_id,
              id: ot.ot.model_cubicacion_id.proveedor_id,
            };
            this.cubicacionFacade.proveedorSelected(proveedor);
          }
        }
      )
    );
    this.subscription.add(
      this.detalleInformeAvance$.subscribe(detalleInforme => {
        if (detalleInforme) {
          if (this.tableServiciosAdicionales) {
            this.tableServiciosAdicionales.uos_eliminar = [];
            this.tableServiciosAdicionales.servicios_eliminar = [];
          }
          // CARGAR CARRITO
          detalleInforme?.many_informe_has_servicio?.forEach(service => {
            service.many_informe_has_uob.forEach(uo => {
              let new_service: CarritoService = {
                precargado: true,
                servicio_rowid: service.id,
                servicio_cantidad: service.cantidad,
                adicional: service.adicional_aceptacion_estado,

                servicio_id: service.servicio_id,
                servicio_codigo: service.model_servicio_id.codigo,
                numero_producto: service.numero_producto,
                servicio_precio_final_clp: service.valor_unitario_clp,
                servicio_nombre: service.model_servicio_id.descripcion,
                tipo_servicio_descripcion:
                  service.model_servicio_id.model_tipo_servicio_id.descripcion,
                tipo_servicio_id: service.tipo_servicio_id,
                servicio_unidad_cod: service.model_unidad_id.codigo,
                servicio_unidad_descripcion:
                  service.model_unidad_id.descripcion,
                prov_has_serv_precio: service.prov_has_serv_precio,
                puntos_baremos: service.puntos_baremos,
                requiere_evidencia: service.requiere_evidencia,
                unidad_obras: [
                  {
                    precargado: true,
                    uo_rowid: uo.id,
                    uo_cantidad: uo.cantidad,

                    uo_codigo: uo.unidad_obra_cod,
                    uo_nombre: uo.model_unidad_obra_cod.descripcion,
                    uo_precio_total_clp: uo.valor_unitario_clp,
                    actividad_descripcion:
                      service.model_actividad_id.descripcion,
                    actividad_id: service.actividad_id,
                    uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                    uob_unidad_medida_descripcion:
                      uo.model_unidad_id.descripcion,

                    // TODO Revisar
                    material_arr: uo.many_informe_has_material.map(m => {
                      return {
                        material_id: m.id,
                        material_codigo: m.material_cod,
                        material_nombre: m.model_material_cod.descripcion,
                        material_origen: m.origen,
                        material_precio_clp: m.valor_unitario_clp, // ?

                        material_cantidad: m.cantidad,
                        material_precio: m.valor, // ?
                        material_tipo_moneda_id: m.model_tipo_moneda_id.id,
                        material_unidad_id: m.model_unidad_id.id,
                        material_unidad_medida_cod: '--', // ?
                        material_valor: m.valor,
                        material_unidad_codigo: m.model_unidad_id.codigo,
                        material_unidad_descripcion:
                          m.model_unidad_id.descripcion,
                      };
                    }),
                  },
                ],
              };

              // PARA CARGAR INFORME DE AVANCE
              if (new_service.adicional === 'ORIGINAL')
                this.serviciosInformeAvance.push(new_service);
              // PARA PRE CARGAR SERVICIOS ADICIONALES
              if (new_service.adicional !== 'ORIGINAL')
                this.serviciosFacade.addDirectServiceCarrito(new_service);
            });
          });
          let valueInitial: CarritoService[] = [];
          this.serviciosInformeAvance = this.serviciosInformeAvance.reduce(
            (acc, curr) => {
              let indexService = acc.findIndex(
                value => value.servicio_id === curr.servicio_id
              );
              if (indexService === -1) {
                acc.push(curr);
              } else {
                let temp = [
                  ...acc.map(item => ({
                    ...item,
                    unidad_obras: [...item.unidad_obras],
                  })),
                ];
                temp[indexService].unidad_obras.push(...curr.unidad_obras);
                acc[indexService] = temp[indexService];
              }

              return acc;
            },
            valueInitial
          );
        }
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

    this.subscription.add(
      this.tableServiciosInformeAvance?.formTable
        .get('table')
        .valueChanges.subscribe(v => {
          this.calcularTotalFinal();
        })
    );

    this.subscription.add(
      this.tableServiciosAdicionales?.formTable
        .get('table')
        .valueChanges.subscribe(v => {
          this.calcularTotalFinal();
        })
    );
    this.calcularTotalFinal();
  }

  calcularTotalFinal(): void {
    let totalInformeAvance =
      +this.tableServiciosInformeAvance?.totalServicios +
      +this.tableServiciosInformeAvance?.totalUOs;
    let totalAdicionales =
      +this.tableServiciosAdicionales?.totalServicios +
      +this.tableServiciosAdicionales?.totalUOs;

    this.totalFinalInformeAvance = totalInformeAvance + totalAdicionales;
  }

  // 157 TODO: MOVER A UN PLANO GLOBAL
  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  getRequestServiciosAdicionales(
    formularioServiciosAdicionales: TableService[],
    carrito: CarritoService[]
  ): RequestAdicionales {
    // SERVICIOS/UO COMPLETAMENTE NUEVOS
    let nuevosAdicionales: NuevoServicioAdicional[] =
      formularioServiciosAdicionales
        .filter(value => !value.precargado)
        .map(value => ({
          servicio_id: +value.servicio_id,
          actividad_id: +carrito.find(
            servicio => servicio.servicio_id === +value.servicio_id
          ).unidad_obras[0].actividad_id, // 116 TODO: CONSULTAR SI EXISTE LA POSIBILIDAD DE QUE EXISTA UNA UO CON DISTINTOS TIPOS DE SERVICIO/ACTIVIDAD
          tipo_servicio_id: +carrito.find(
            servicio => servicio.servicio_id === +value.servicio_id
          ).tipo_servicio_id,
          // cantidad: value.dummy ? 0 : value.servicio_cantidad,
          cantidad: value.servicio_cantidad,
          unidad_obra: value.unidad_obras.map(uo => ({
            uob_codigo: uo.uo_codigo,
            cantidad: uo.uo_cantidad,
          })),
        }));

    // ACTUALIZAR
    // TODO: SE PODRIA COMPARAR LA CANTIDAD CON $CARRITO PARA DETERMINAR SI REALMENTE SE HIZO UN CAMBIO
    // SERVICIOS
    let servicios_actualizar: ServicioAdicionalActualizar[] =
      formularioServiciosAdicionales
        .filter(value => value.precargado)
        .map(value => ({
          rowid: value.servicio_rowid,
          cantidad: value.servicio_cantidad,
        }));

    // UOS
    let valueIntial: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = [];

    let uosAdicionalesPrecargadas: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = formularioServiciosAdicionales.reduce((acc, curr) => {
      acc.push(...curr.unidad_obras.filter(v => v.precargado));
      return acc;
    }, valueIntial);

    let uos_actualizar: UOAdicionalActualizar[] = uosAdicionalesPrecargadas.map(
      v => ({
        rowid: v.uo_rowid,
        cantidad: v.uo_cantidad,
      })
    );

    // 196 TODO: UO A AGREGAR A ADICIONAL EXISTENTE EN EL CARRITO
    // UO NUEVO EN SERVICIO EXISTE
    let s = formularioServiciosAdicionales.filter(value => value.precargado);
    let initialVal: {
      servicio_rowid: number;
      uob_codigo: string;
      uob_cantidad: number;
    }[] = [];
    let agregar_uob_a_servicio: AgregarUOAdicionalAServicio[] = s.reduce(
      (acc, curr) => {
        let uosNuevos = curr.unidad_obras.filter(v => !v.precargado);
        if (uosNuevos.length > 0) {
          acc.push(
            ...uosNuevos.map(v => ({
              servicio_rowid: curr.servicio_rowid,
              uob_codigo: v.uo_codigo,
              uob_cantidad: v.uo_cantidad,
            }))
          );
        }
        return acc;
      },
      initialVal
    );

    this.logger.debug('servicios a actualizar', agregar_uob_a_servicio);

    // REQUEST SERVICIOS ADICONALES
    let request_adicionales: RequestAdicionales = {
      ot_id: this.ot_id,
      adicionales_solicitados: {
        nuevo: nuevosAdicionales,
        actualizar: {
          servicio: servicios_actualizar,
          unidad_obra: uos_actualizar,
          agregar_uob_a_servicio,
        },
      },
    };

    return request_adicionales;
  }

  getRequestUpdateInformeAvance(
    formularioInformeAvance: TableService[]
  ): RequestUpdateInformeAvance {
    let servicio: ItemSerivioUO[] = formularioInformeAvance.map(v => ({
      row_id: v.servicio_rowid,
      cantidad: v.servicio_cantidad,
    }));

    let valueIntial: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = [];

    let uos: {
      precargado: boolean;
      uo_cantidad: number;
      uo_codigo: string;
      uo_precio_total_clp: number;
      uo_rowid: number;
    }[] = formularioInformeAvance.reduce((acc, curr) => {
      acc.push(...curr.unidad_obras);
      return acc;
    }, valueIntial);

    let unidad_obra: ItemSerivioUO[] = uos.map(v => ({
      row_id: v.uo_rowid,
      cantidad: v.uo_cantidad,
    }));

    return {
      servicio,
      unidad_obra,
    };
  }

  guardarBorrador(): void {
    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        // TODO: PROBAR QUE OCURRE SI ELIMINA UN SERVICIO Y LUEGO LO VUELVE A AGREGAR

        // ELIMINAR ADICIONALES ESCOGIDOS PARA ELIMINAR
        this.eliminarAdicionalesEscogidos();

        // GUARDAR BORRADOR
        let formularioServiciosAdicionales =
          this.tableServiciosAdicionales.formTable.get('table')
            .value as Array<TableService>;

        let formularioInformeAvance =
          this.tableServiciosInformeAvance.formTable.get('table')
            .value as Array<TableService>;

        let request_informe_avance: any = this.getRequestUpdateInformeAvance(
          formularioInformeAvance
        );

        if (formularioServiciosAdicionales.length > 0) {
          //  ACTUALIZAR INFORME DE AVANCE Y ADICIONALES SI ES QUE EXISTEN ADICIONALES
          let request_adicionales: RequestAdicionales =
            this.getRequestServiciosAdicionales(
              formularioServiciosAdicionales,
              carrito
            );

          this.informeAvanceFacade.actualizarInformeAvanceYAdicionales(
            request_informe_avance,
            request_adicionales
          );
        } else {
          // ACTUALIZAR SOLO EL INFORME DE AVANCE
          this.informeAvanceFacade.actualizarInformeAvance(
            request_informe_avance,
            this.ot_id
          );
        }
      })
    );
  }

  enviarInformeAvance(): void {
    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        // GUARDAR CAMBIOS Y ENVIAR INFORME AVANCE

        // ELIMINAR ADICIONALES ESCOGIDOS PARA ELIMINAR
        this.eliminarAdicionalesEscogidos();

        // GUARDAR BORRADOR
        let formularioServiciosAdicionales =
          this.tableServiciosAdicionales.formTable.get('table')
            .value as Array<TableService>;

        let formularioInformeAvance =
          this.tableServiciosInformeAvance.formTable.get('table')
            .value as Array<TableService>;

        let request_informe_avance: any = this.getRequestUpdateInformeAvance(
          formularioInformeAvance
        );

        if (formularioServiciosAdicionales.length > 0) {
          //  ACTUALIZAR INFORME DE AVANCE ADICIONALES SI ES QUE EXISTEN ADICIONALES Y ENVIAR IA
          let request_adicionales: RequestAdicionales =
            this.getRequestServiciosAdicionales(
              formularioServiciosAdicionales,
              carrito
            );

          this.informeAvanceFacade.actualizarInformeAvanceAdicionalesYenviar(
            request_informe_avance,
            request_adicionales,
            this.ot_id
          );
        } else {
          // ACTUALIZAR SOLO EL INFORME DE AVANCE
          this.informeAvanceFacade.actualizarInformeAvanceYenviar(
            request_informe_avance,
            this.ot_id
          );
        }

        this.displayModalEnvioInformeAvance = false;
      })
    );
  }

  eliminarAdicionalesEscogidos(): void {
    if (
      this.tableServiciosAdicionales.servicios_eliminar.length > 0 ||
      this.tableServiciosAdicionales.uos_eliminar.length > 0
    ) {
      this.serviciosFacade.eliminarAdicional(
        this.tableServiciosAdicionales.servicios_eliminar,
        this.tableServiciosAdicionales.uos_eliminar
      );
    }
  }

  displayModalRechazarInformeAvance(): void {
    this.flujoOTFacade.getMotivosRechazo('INFORME_AVANCE');
    this.showModalRechazarInformeAvance = true;
  }

  rechazarInformeAvance(): void {
    const request: RequestAutorizarInformeAvance = {
      ot_id: this.ot_id,
      estado: 'RECHAZADO',
      observacion:
        this.rechazoInformeAvanceForm.formRechazo.get('motivo').value,
      tipo: +this.rechazoInformeAvanceForm.formRechazo.get('tipo_id').value,
    };

    this.informeAvanceFacade.AceptarRechazarInformeAvanceOT(request);
    this.showModalRechazarInformeAvance = false;

    // this.subscription.add(
    //   this.carrito$.pipe(take(1)).subscribe(carrito => {
    //     // GUARDAR CAMBIOS Y ENVIAR INFORME AVANCE

    //     // ELIMINAR ADICIONALES ESCOGIDOS PARA ELIMINAR
    //     this.eliminarAdicionalesEscogidos();

    //     // GUARDAR BORRADOR
    //     let formularioServiciosAdicionales =
    //       this.tableServiciosAdicionales.formTable.get('table')
    //         .value as Array<TableService>;

    //     let formularioInformeAvance =
    //       this.tableServiciosInformeAvance.formTable.get('table')
    //         .value as Array<TableService>;

    //     let request_informe_avance: any = this.getRequestUpdateInformeAvance(
    //       formularioInformeAvance
    //     );

    //     const request_autorizacion: RequestAutorizarInformeAvance = {
    //       ot_id: this.ot_id,
    //       estado: 'RECHAZADO',
    //       observacion:
    //         this.rechazoInformeAvanceForm.formRechazo.get('motivo').value,
    //       tipo: +this.rechazoInformeAvanceForm.formRechazo.get('tipo_id').value,
    //     };

    //     if (formularioServiciosAdicionales.length > 0) {
    //       //  ACTUALIZAR INFORME DE AVANCE ADICIONALES SI ES QUE EXISTEN ADICIONALES Y ENVIAR IA
    //       let request_adicionales: RequestAdicionales =
    //         this.getRequestServiciosAdicionales(
    //           formularioServiciosAdicionales,
    //           carrito
    //         );

    //       this.informeAvanceFacade.actualizarInformeAvanceAdicionalesYautorizar(
    //         request_informe_avance,
    //         request_adicionales,
    //         request_autorizacion
    //       );
    //     } else {
    //       // ACTUALIZAR SOLO EL INFORME DE AVANCE
    //       this.informeAvanceFacade.actualizarInformeAvanceYautorizar(
    //         request_informe_avance,
    //         request_autorizacion
    //       );
    //     }

    //     this.showModalRechazarInformeAvance = false;
    //   })
    // );
  }

  autorizarInformeAvance(): void {
    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        // GUARDAR CAMBIOS Y ENVIAR INFORME AVANCE

        // ELIMINAR ADICIONALES ESCOGIDOS PARA ELIMINAR
        this.eliminarAdicionalesEscogidos();

        // GUARDAR BORRADOR
        let formularioServiciosAdicionales =
          this.tableServiciosAdicionales.formTable.get('table')
            .value as Array<TableService>;

        let formularioInformeAvance =
          this.tableServiciosInformeAvance.formTable.get('table')
            .value as Array<TableService>;

        let request_informe_avance: any = this.getRequestUpdateInformeAvance(
          formularioInformeAvance
        );

        const request_autorizacion: RequestAutorizarInformeAvance = {
          ot_id: this.ot_id,
          estado: 'APROBADO',
        };

        if (formularioServiciosAdicionales.length > 0) {
          //  ACTUALIZAR INFORME DE AVANCE ADICIONALES SI ES QUE EXISTEN ADICIONALES Y ENVIAR IA
          let request_adicionales: RequestAdicionales =
            this.getRequestServiciosAdicionales(
              formularioServiciosAdicionales,
              carrito
            );

          this.informeAvanceFacade.actualizarInformeAvanceAdicionalesYautorizar(
            request_informe_avance,
            request_adicionales,
            request_autorizacion
          );
        } else {
          // ACTUALIZAR SOLO EL INFORME DE AVANCE
          this.informeAvanceFacade.actualizarInformeAvanceYautorizar(
            request_informe_avance,
            request_autorizacion
          );
        }
      })
    );
    this.displayModalAprobacionInformeAvance = false;
  }

  canSeePrices(): boolean {
    return this.permisos.find(v => v === 'OT_VER_VALOR_SERV') !== undefined;
  }

  showSubirEvidenciaAction(servicio: { servicio: CarritoService }) {
    console.log(servicio);
    this.servicio_subir_evidencia = servicio;
    this.displaySubirEvidencia = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  canEditMaterials(otDetalle: DetalleOT): boolean {
    const rol = this.sessionData?.rol_slug ?? '';
    const etapa = otDetalle?.ot?.model_tipo_etapa_ot_id?.slug ?? '';
    return (
      (rol === 'TRABAJADOR' && etapa === 'OT_ET_EJECUCION_TRABAJOS') ||
      (rol === 'ADM_EECC' && etapa === 'OT_ET_PAGO_ACEPTACION_IA')
    );
  }

  showMateriales({
    servicio,
    uo,
  }: {
    servicio: CarritoService;
    uo: CarritoUO;
  }): void {
    this.logger.debug('servicio', servicio);
    this.logger.debug('uo', uo);
    this.materialesSelected = [...(uo?.material_arr ?? [])];
    this.logger.debug('materiales', this.materialesSelected);
    this.displayModalMateriales = true;
  }

  closeModalMateriales(): void {
    this.materialesSelected = null;
    this.displayModalMateriales = false;
    this.closeModalCambiarMaterialOrigenAProveedor();
  }

  openChangeToProveedorConfirmation(material: MaterialesManoObra): void {
    this.materialSelected = material;
    this.displayModalConfirmacionOrigen = true;
  }

  closeModalCambiarMaterialOrigenAProveedor(): void {
    this.materialSelected = null;
    this.displayModalConfirmacionOrigen = false;
  }

  confirmarCambiarMaterialOrigenAProveedor(): void {
    if (this.materialSelected) {
      const { material_id } = this.materialSelected;
      if (material_id !== undefined) {
        this.informeAvanceFacade.cambiarMaterialOrigenAProveedor(material_id);
        this.closeModalCambiarMaterialOrigenAProveedor();
        this.closeModalMateriales();
      }
    }
  }

  closeSubirEvidencias(): void {
    this.subirEvidenciasForm.form.reset();
  }

  registrarEvidencia(): void {
    if (this.subirEvidenciasForm.form.valid) {
      const request_subir_evidencia: ReqSubirEvidencia = {
        ot_id: this.ot_id,
        observaciones: this.subirEvidenciasForm.form.get('observaciones').value,
        informe_has_servicio_id:
          this.servicio_subir_evidencia.servicio.servicio_rowid,
        archivos: [],
      };

      console.log(request_subir_evidencia);

      // this.otDetalleFacade.subirArchivoLibroObrasYregistrarLibroObras(
      //   +this.registrarLibroObraForm.form.get('categoria').value,
      //   this.registrarLibroObraForm.uploadedFiles['files'],
      //   request_registrar_libroObras
      // );

      // this.registrarLibroObraForm.filesform.clear();
      // this.registrarLibroObraForm.form.reset();

      // this.displayModalAgregarRegistroLibroDeObras = false;
    }
  }
}
