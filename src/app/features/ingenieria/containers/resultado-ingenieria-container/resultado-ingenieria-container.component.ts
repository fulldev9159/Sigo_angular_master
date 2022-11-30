import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  AgenciaContrato,
  CarritoService,
  ContratosUser,
  DetalleServicioCubicacion,
  InfoOT,
  ProveedorAgenciaContrato,
  SessionData,
} from '@model';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-resultado-ingenieria-container',
  templateUrl: './resultado-ingenieria-container.component.html',
  styleUrls: ['./resultado-ingenieria-container.component.scss'],
})
export class ResultadoIngenieriaContainerComponent
  implements OnInit, OnDestroy
{
  subscription: Subscription = new Subscription();
  dataOT: InfoOT;
  dataCubicacion: CarritoService[] = [];
  accionesOT: Accion[] = [];
  permisos: string[] = (
    JSON.parse(localStorage.getItem('auth')).sessionData as SessionData
  ).permisos.map(value => value.slug);
  contrato: string;

  constructor(
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private contratoFacade: ContratoFacade,
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

          if (cubicacionIngenieria) {
            // console.log(cubicacionIngenieria);
          }
        }
      )
    );
  }

  canSeePrices(): boolean {
    return this.permisos.find(v => v === 'OT_VER_VALOR_SERV') !== undefined;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
