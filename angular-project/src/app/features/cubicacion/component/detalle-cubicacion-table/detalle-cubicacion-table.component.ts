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
  // DetalleCubicacion,
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
          return detalles.many_cubicacion_has_servicio.map(servicios => {
            if (servicios) {
              const uos: DatosUnidadObra4Cub[] =
                servicios.many_cubicacion_has_uob.map(uo => {
                  if (uo) {
                    const materiales: Materiales4Cub[] =
                      uo.many_cubicacion_has_material.map(material => {
                        return {
                          material_cantidad: material.cantidad,
                          material_codigo: material.material_cod,
                          material_nombre:
                            material.model_material_cod.descripcion, //TODO
                          material_origen: material.origen,
                          material_precio: material.valor_unitario_clp,
                          material_precio_clp: material.valor_unitario_clp,
                          material_tipo_moneda_id: material.tipo_moneda_id,
                          material_unidad_id: material.model_unidad_id.id,
                          material_unidad_medida_cod:
                            material.model_unidad_id.codigo,
                          material_valor: material.valor,
                          material_unidad_codigo:
                            material.model_unidad_id.codigo,
                          material_unidad_descripcion: 'TODO',
                        };
                      });
                    return {
                      material_arr: materiales,
                      uo_codigo: uo.unidad_obra_cod,
                      uo_nombre: uo.model_unidad_obra_cod.descripcion,
                      uo_precio_total_clp: uo.valor_unitario_clp,
                      uo_unidad_id: uo.unidad_id,
                      uob_unidad_medida_cod: uo.model_unidad_id.codigo,
                      uo_cantidad: uo.cantidad,
                      uo_unidad_codigo: uo.model_unidad_id.codigo,
                      uo_unidad_descripcion: 'TODO',
                    };
                  }
                });
              return {
                precio_agencia: 0,
                precio_proveedor: 0,
                servicio_baremos: servicios.puntos_baremos,
                servicio_codigo: servicios.model_servicio_id.codigo,
                servicio_id: servicios.servicio_id,
                servicio_nombre: servicios.model_servicio_id.descripcion,
                servicio_precio_final: servicios.valor_unitario_clp,
                servicio_precio_final_clp: servicios.valor_unitario_clp,
                servicio_tipo: servicios.tipo_servicio_id,
                servicio_unidad_id: servicios.unidad_id,
                servicio_unidad_cod: servicios.model_unidad_id.codigo,
                tipo_moneda_id: servicios.model_precio_tipo_moneda_id.id,
                actividad_descripcion: 'TODO',
                actividad_id: servicios.actividad_id.toString(),
                servicio_tipo_moneda_codigo:
                  servicios.model_precio_tipo_moneda_id.codigo,
                servicio_tipo_moneda_id:
                  servicios.model_precio_tipo_moneda_id.id,
                tipo_servicio_descripcion: 'TODO',
                servicio_cantidad: servicios.cantidad,
                numero_producto: 'TODO',
                servicio_unidad_codigo: servicios.model_unidad_id.codigo,
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
