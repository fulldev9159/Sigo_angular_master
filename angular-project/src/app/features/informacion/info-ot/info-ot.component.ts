import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import {
  Carrito,
  DataRespGetDetalleOT,
  DatosUnidadObra4Cub,
  Materiales4Cub,
  RespDataGetDetalleCubs,
} from '@data';
import { map } from 'rxjs/operators';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';

@Component({
  selector: 'app-info-ot',
  templateUrl: './info-ot.component.html',
  styleUrls: ['./info-ot.component.scss'],
})
export class InfoOtComponent implements OnInit {
  detalleOT$: Observable<DataRespGetDetalleOT>;
  // detalleCubicacion$: Observable<RespDataGetDetalleCubs>;
  carrito$: Observable<Carrito[]>;

  constructor(
    private otFacade: OtFacade,
    private cubageFacade: CubicacionFacade
  ) {}

  ngOnInit(): void {
    this.detalleOT$ = this.otFacade.getDetalleOT$().pipe(
      map(detalleot => {
        if (detalleot) {
          this.cubageFacade.DetalleCub(detalleot.ot.cubicacion_id);
        }
        return detalleot;
      })
    );

    // this.detalleCubicacion$ = this.cu/bageFacade.DetalleCub$();
    // this.carrito$ = this.cubageFacade.DetalleCub$().pipe(
    //   map(detalles => {
    //     if (detalles) {
    //       return detalles.servicios.map(servicios => {
    //         if (servicios) {
    //           console.log(servicios);
    //           const uos: DatosUnidadObra4Cub[] = servicios.unidades_obra.map(
    //             uo => {
    //               if (uo) {
    //                 const materiales: Materiales4Cub[] = uo.data_materiales.map(
    //                   material => {
    //                     // console.log(material);
    //                     return {
    //                       material_cantidad: material.material_cantidad,
    //                       material_codigo: material.material_cod,
    //                       material_nombre: material.material_desc,
    //                       material_origen: material.origen,
    //                       material_precio: material.material_valor_clp,
    //                       material_precio_clp: material.material_valor_clp,
    //                       material_tipo_moneda_id: material.tipo_moneda_id,
    //                       material_unidad_id:
    //                         material.material_unidad_medida_id,
    //                       material_valor: material.valor,
    //                     };
    //                   }
    //                 );
    //                 // console.log(uo);
    //                 return {
    //                   material_arr: materiales,
    //                   uo_codigo: uo.data_unidad_obra.unidad_obra_cod,
    //                   uo_nombre: uo.data_unidad_obra.unidad_obra_desc,
    //                   uo_precio_total_clp:
    //                     uo.data_unidad_obra.uo_precio_total_clp,
    //                   uo_unidad_id: uo.data_unidad_obra.cub_has_uob_id,
    //                   uo_cantidad: uo.data_unidad_obra.uob_cantidad,
    //                 };
    //               }
    //             }
    //           );
    //           return {
    //             precio_agencia: servicios.data_servicio.agencia_preciario_monto,
    //             precio_proveedor: servicios.data_servicio.prov_has_serv_precio,
    //             servicio_baremos: servicios.data_servicio.puntos_baremos,
    //             servicio_codigo: servicios.data_servicio.servicio_cod,
    //             servicio_id: servicios.data_servicio.servicio_id,
    //             servicio_nombre: servicios.data_servicio.servicio_desc,
    //             servicio_precio_final:
    //               servicios.data_servicio.prov_has_serv_precio,
    //             servicio_precio_final_clp:
    //               servicios.data_servicio.servicio_precio_final_clp,
    //             servicio_tipo: servicios.data_servicio.tipo_servicio_id,
    //             servicio_unidad_id: servicios.data_servicio.unidad_medida_id,
    //             tipo_moneda_id: servicios.data_servicio.precio_tipo_moneda_id,
    //             actividad_descripcion: servicios.data_servicio.actividad_desc,
    //             actividad_id: servicios.data_servicio.actividad_id.toString(),
    //             servicio_tipo_moneda_codigo:
    //               servicios.data_servicio.monto_tipo_moneda_cod,
    //             servicio_tipo_moneda_id:
    //               servicios.data_servicio.monto_tipo_moneda_id,
    //             tipo_servicio_descripcion:
    //               servicios.data_servicio.tipo_servicio_desc,
    //             servicio_cantidad: servicios.data_servicio.servicio_cantidad,
    //             unidades_obras: uos,
    //           };
    //         }
    //       });
    //     }
    //   })
    // );
  }
}
