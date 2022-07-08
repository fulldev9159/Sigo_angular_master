import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import {
  Carrito,
  DatosUnidadObra4Cub,
  DetalleCubicacion,
  Materiales4Cub,
  RespDataGetDetalleCubs,
} from '@data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-cubicacion-table',
  templateUrl: './detalle-cubicacion-table.component.html',
  styleUrls: ['./detalle-cubicacion-table.component.scss'],
})
export class DetalleCubicacionTableComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  detalleCubicacion$: Observable<RespDataGetDetalleCubs>;
  carrito$: Observable<Carrito[]>;

  constructor(
    private cubageFacade: CubicacionFacade,
    private permissionsService: NgxPermissionsService
  ) {
    // this.subscription.add(
    //   this.permissionsService.permissions$.subscribe(permissions => {
    //     if (permissions.OT_VER_VALOR_LPU) {
    //     }
    //   })
    // );
  }

  ngOnInit(): void {
    this.detalleCubicacion$ = this.cubageFacade.DetalleCub$();
    this.carrito$ = this.cubageFacade.DetalleCub$().pipe(
      map(detalles => {
        if (detalles) {
          return detalles.servicios.map(servicios => {
            if (servicios) {
              const uos: DatosUnidadObra4Cub[] = servicios.unidades_obra.map(
                uo => {
                  if (uo) {
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
                servicio_tipo_moneda_codigo:
                  servicios.data_servicio.precio_tipo_moneda_cod,
                servicio_tipo_moneda_id:
                  servicios.data_servicio.precio_tipo_moneda_id,
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
