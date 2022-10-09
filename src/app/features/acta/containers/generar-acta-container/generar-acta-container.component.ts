import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService, DetalleServicio4Acta, DetalleUO4Acta } from '@model';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { Subscription } from 'rxjs';

// 124 TODO: CONFIRMAR SI SOLO SE VAN A UTILIZAR LOS ENDPOINTS DE GET SERVICIOS FOR ACTA Y GET UOS FOR ACTA
// 125 TODO: GENERAR REGLAS PARA DETERMINAR EN QUE CONDICION ESTÁ EL SERVICIO Y LA UO
// TODO: CONFIRMAR SI NECESITO SABER EL TIPO DE PAGO
@Component({
  selector: 'zwc-generar-acta-container',
  templateUrl: './generar-acta-container.component.html',
  styleUrls: ['./generar-acta-container.component.scss'],
})
export class GenerarActaContainerComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  acta: CarritoService[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ servicios4acta, uos4acta, accionesOT }) => {
        console.log(accionesOT);

        let servicios = servicios4acta.data.items as DetalleServicio4Acta[];
        let uob = uos4acta.data.items as DetalleUO4Acta[];

        servicios.forEach(service => {
          let servicioCarrito: CarritoService = {
            precargado: true,
            servicio_rowid: service.id,
            servicio_cantidad: service.faltante_cantidad, // TODO: CONFIRMAR SI DEBO USAR CANTIDAD FALTANTE O TOTAL
            adicional: service.adicional_aceptacion_estado,

            servicio_id: service.servicio_id,
            numero_producto: service.servicio_numero_producto,
            servicio_precio_final_clp: service.valor_unitario_clp,
            servicio_nombre: service.servicio_descripcion,
            tipo_servicio_descripcion: 'TODO',
            tipo_servicio_id: -1,
            servicio_unidad_cod: service.unidad_codigo,
            servicio_unidad_descripcion: service.unidad_descripcion,
            unidad_obras: [],
          };

          let uobs = uob.filter(
            v => v.servicio_numero_producto === service.servicio_numero_producto
          );
          uobs.map(uo =>
            this.acta.push({
              ...servicioCarrito,
              unidad_obras: [
                {
                  precargado: true,
                  uo_rowid: uo.id,
                  uo_cantidad: uo.faltante_cantidad,

                  uo_codigo: uo.unidad_obra_cod,
                  uo_nombre: uo.unidad_obra_desc,
                  uo_precio_total_clp: uo.valor_unitario_clp,
                  actividad_descripcion: 'TODO',
                  actividad_id: -1,
                  uob_unidad_medida_cod: uo.unidad_codigo,
                  uob_unidad_medida_descripcion: uo.unidad_obra_desc,
                },
              ],
            })
          );
        });

        console.log(this.acta);
      })
    );
  }

  // SI NO SE ENCUENTRAN UOS PARA EL SERVICIO ENTONCES TIENE TODOS LAS UO PAGADAS

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
