import {
  AfterViewInit,
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
  DetalleInformeAvance,
  DetalleOT,
  NuevoServicioAdicional,
  ProveedorAgenciaContrato,
  RequestAdicionales,
} from '@model';
import { TableAgregarServiciosComponent } from '@sharedOT/table-agregar-servicios/table-agregar-servicios.component';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { Subscription, take } from 'rxjs';

// 92 TODO: CREAR LAS RESTRICCIONES DE ACCESO POR USUARIO Y ADEMÁS POR ETAPA
// 92 TODO: SOLO DBE PERMITIR ENTRAR EN LA ETAPA DE EJECUCIÓN DE TRABAJOS
@Component({
  selector: 'zwc-informe-avance',
  templateUrl: './informe-avance.component.html',
  styleUrls: ['./informe-avance.component.scss'],
})
export class InformeAvanceComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  subscription: Subscription = new Subscription();
  dataServicios: CarritoService[] = [];
  // TODO: MEJORAR MANERA DE ARMAR LOS DATOS DEL SERVICIO A AGREGAR, ACTUALMENTE SE BUSCA DESDE EL CARRITO HACIA EL CARRITO, TIENE UNA VUELTA MEDIA RARA
  carrito$ = this.serviciosFacade.carrito$();
  accionesOT: Accion[] = [];
  ot_id: number;

  @ViewChild('tableAgregarServiciosAdicionales', {
    read: TableAgregarServiciosComponent,
    static: false,
  })
  tableAgregarServiciosAdicionales: TableAgregarServiciosComponent;

  constructor(
    private serviciosFacade: ServiciosFacade,
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serviciosFacade.resetCarritoServices();
    this.subscription.add(
      this.route.data.subscribe(
        ({ detalleOT, detalleInformeAvance, accionesOT }) => {
          console.log(accionesOT);
          if (accionesOT) this.accionesOT = accionesOT;
          if (detalleInformeAvance) {
            const detalleInforme =
              detalleInformeAvance.data as DetalleInformeAvance;
            const ot = detalleOT.data as DetalleOT;

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

            // CARGAR CARRITO
            detalleInforme.many_informe_has_servicio.forEach(service => {
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
                  tipo_servicio_descripcion: 'TODO',
                  tipo_servicio_id: service.tipo_servicio_id,
                  servicio_unidad_cod: service.model_unidad_id.codigo,
                  servicio_unidad_descripcion:
                    service.model_unidad_id.descripcion,
                  unidad_obras: [
                    {
                      precargado: true,
                      uo_rowid: uo.id,
                      uo_cantidad: uo.cantidad,

                      uo_codigo: uo.unidad_obra_cod,
                      uo_nombre: uo.model_unidad_obra_cod.descripcion,
                      uo_precio_total_clp: uo.valor_unitario_clp,
                      actividad_descripcion: 'TODO',
                      actividad_id: -1,
                      uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                      uob_unidad_medida_descripcion:
                        uo.model_unidad_id.descripcion,
                    },
                  ],
                };

                // PARA CARGAR INFORME DE AVANCE
                this.dataServicios.push(new_service);
                // PARA PRE CARGAR SERVICIOS ADICIONALES
                if (new_service.adicional !== 'ORIGINAL')
                  this.serviciosFacade.addDirectServiceCarrito(new_service);
              });
            });
            let valueInitial: CarritoService[] = [];
            this.dataServicios = this.dataServicios.reduce((acc, curr) => {
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
            }, valueInitial);
          }
        }
      )
    );
  }

  ngAfterViewInit(): void {
    //SETTING INIT FORMULARIOS
    this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .disable({ emitEvent: false });
    this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
      .get('servicio_cod')
      .disable({ emitEvent: false });
    this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
      .get('unidad_obra_cod')
      .disable({ emitEvent: false });

    // RESET
    this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
      .get('actividad_id')
      .valueChanges.subscribe(() => {
        this.contratoFacade.resetTipoServiciosContrato();
        this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
        this.serviciosFacade.resetServicioSelected();
        this.serviciosFacade.resetUnidadesObraServicio();

        this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
          .get('tipo_servicio_id')
          .setValue(null, { emitEvent: false });
        this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });

    this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .valueChanges.subscribe(() => {
        this.serviciosFacade.resetServiciosAgenciaContratoProveedor();
        this.serviciosFacade.resetServicioSelected();
        this.serviciosFacade.resetUnidadesObraServicio();

        this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.tableAgregarServiciosAdicionales?.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });
  }

  accionExist(accion: string): boolean {
    return this.accionesOT.find(v => v.slug === accion) !== undefined;
  }

  guardarBorrador(): void {
    this.subscription.add(
      this.carrito$.pipe(take(1)).subscribe(carrito => {
        // TODO: IMPLEMENTAR LA ELIMINACIÓN DE ADICIONALES ESCOGIDOS
        // TODO: IMPLEMENTAR EL GUARDAR CAMBIOS DE INFORME DE AVANCE

        console.log(
          this.tableAgregarServiciosAdicionales.tableServicios.formTable.value
        );

        // SERVICIOS ADICIONALES
        let formularioCarrito =
          this.tableAgregarServiciosAdicionales.tableServicios.formTable.get(
            'table'
          ).value as Array<{
            servicio_rowid: number;
            servicio_id: number;
            servicio_cantidad: number;
            actividad_id: number;
            servicio_tipo: number;
            adicional: string;
            dummy: string;
            unidad_obras: {
              precargado: boolean;
              uo_rowid: number;
              uo_codigo: string;
              uo_cantidad: number;
            }[];
          }>;

        console.log('form', formularioCarrito);
        if (formularioCarrito.length > 0) {
          // SERVICIOS/UO COMPLETAMENTE NUEVOS
          let nuevosAdicionales: NuevoServicioAdicional[] = formularioCarrito
            .filter(value => value.adicional === undefined)
            .map(value => ({
              servicio_id: +value.servicio_id,
              actividad_id: +carrito.find(
                servicio => servicio.servicio_id === +value.servicio_id
              ).unidad_obras[0].actividad_id, // TODO: CONSULTAR SI EXISTE LA POSIBILIDAD DE QUE EXISTA UNA UO CON DISTINTOS TIPOS DE SERVICIO/ACTIVIDAD
              tipo_servicio_id: +carrito.find(
                servicio => servicio.servicio_id === +value.servicio_id
              ).tipo_servicio_id,
              cantidad: value.dummy ? 0 : value.servicio_cantidad,
              unidad_obra: value.unidad_obras.map(uo => ({
                uob_codigo: uo.uo_codigo,
                cantidad: uo.uo_cantidad,
              })),
            }));

          console.log('nuevos', nuevosAdicionales);

          // SERVICIOS A ACTUALIZAR

          // UO A ACTUALIZAR

          // UO A AGREGAR

          let request: RequestAdicionales = {
            ot_id: this.ot_id,
            adicionales_solicitados: {
              nuevo: nuevosAdicionales,
              // actualizar: {
              //   servicio: servicio_actualizar,
              //   unidad_obra: [...uo_actualizar.flat()].filter(
              //     value => value !== undefined
              //   ),
              //   agregar_uob_a_servicio: [...uo_agregar.flat()].filter(
              //     value => value !== undefined
              //   ),
              // },
            },
          };

          this.serviciosFacade.agregarAdicionales(request);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
