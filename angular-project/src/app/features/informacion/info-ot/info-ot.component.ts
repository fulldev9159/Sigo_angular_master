import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import {
  Carrito,
  DataRespGetDetalleOT,
  DatosUnidadObra4Cub,
  Materiales4Cub,
} from '@data';

@Component({
  selector: 'app-info-ot',
  templateUrl: './info-ot.component.html',
  styleUrls: ['./info-ot.component.scss'],
})
export class InfoOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  detalleOT$: Observable<DataRespGetDetalleOT> = this.otFacade.getDetalleOT$();
  carrito$: Observable<Carrito[]>;
  totalServicios: number;
  totalUO: number;

  constructor(
    private otFacade: OtFacade,
    private cubageFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.detalleOT$
        .pipe(
          filter(detalleot => detalleot !== null && detalleot !== undefined)
        )
        .subscribe(detalleot =>
          this.cubageFacade.DetalleCub(detalleot.ot.cubicacion_id)
        )
    );

    this.carrito$ = this.cubageFacade.DetalleCub$().pipe(
      map(detalles => {
        if (detalles) {
          this.totalServicios = 0;
          this.totalUO = 0;
          return detalles.servicios.map(servicios => {
            if (servicios) {
              this.totalServicios =
                this.totalServicios +
                servicios.data_servicio.servicio_precio_final_clp;
              const uos: DatosUnidadObra4Cub[] = servicios.unidades_obra.map(
                uo => {
                  if (uo) {
                    this.totalUO =
                      this.totalUO + uo.data_unidad_obra.uo_precio_total_clp;
                    const materiales: Materiales4Cub[] = uo.data_materiales.map(
                      material => {
                        return {
                          material_cantidad: material.material_cantidad,
                          material_codigo: material.material_cod,
                          material_nombre: material.material_desc,
                          material_origen: material.origen,
                          material_precio: material.material_valor_clp,
                          material_precio_clp: material.material_valor_clp,
                          material_tipo_moneda_id: material.tipo_moneda_id,
                          material_unidad_id:
                            material.material_unidad_medida_id,
                          material_unidad_medida_cod:
                            material.material_unidad_medida_cod,
                          material_valor: material.valor,
                          material_unidad_codigo:
                            material.material_unidad_medida_cod,
                          material_unidad_descripcion: 'TODO',
                        };
                      }
                    );
                    return {
                      material_arr: materiales,
                      uo_codigo: uo.data_unidad_obra.unidad_obra_cod,
                      uo_nombre: uo.data_unidad_obra.unidad_obra_desc,
                      uo_precio_total_clp:
                        uo.data_unidad_obra.uo_precio_total_clp,
                      uo_unidad_id: uo.data_unidad_obra.cub_has_uob_id,
                      uob_unidad_medida_cod:
                        uo.data_unidad_obra.uob_unidad_medida_cod,
                      uo_cantidad: uo.data_unidad_obra.uob_cantidad,
                      uo_unidad_codigo:
                        uo.data_unidad_obra.uob_unidad_medida_cod,
                      uo_unidad_descripcion: 'TODO',
                    };
                  }
                }
              );
              return {
                precio_agencia: 0,
                precio_proveedor: servicios.data_servicio.prov_has_serv_precio,
                servicio_baremos: servicios.data_servicio.puntos_baremos,
                servicio_codigo: servicios.data_servicio.servicio_cod,
                servicio_id: servicios.data_servicio.servicio_id,
                servicio_nombre: servicios.data_servicio.servicio_desc,
                servicio_precio_final:
                  servicios.data_servicio.servicio_precio_final,
                servicio_precio_final_clp:
                  servicios.data_servicio.servicio_precio_final_clp,
                servicio_tipo: servicios.data_servicio.tipo_servicio_id,
                servicio_unidad_id: servicios.data_servicio.unidad_medida_id,
                servicio_unidad_cod: servicios.data_servicio.unidad_medida_cod,
                tipo_moneda_id: servicios.data_servicio.precio_tipo_moneda_id,
                actividad_descripcion: servicios.data_servicio.actividad_desc,
                actividad_id: servicios.data_servicio.actividad_id.toString(),
                servicio_tipo_moneda_codigo: '', // TODO: UNIFICAR EL TIPO DE DATO DE CARRITO Y SERVICIOS
                servicio_tipo_moneda_id: 1,
                tipo_servicio_descripcion:
                  servicios.data_servicio.tipo_servicio_desc,
                servicio_cantidad: servicios.data_servicio.servicio_cantidad,
                numero_producto: 'TODO',
                servicio_unidad_codigo:
                  servicios.data_servicio.unidad_medida_cod,
                servicio_unidad_descripcion: 'TODO',
                unidades_obras: uos,
              };
            }
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
