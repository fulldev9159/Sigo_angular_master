import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DetalleActaServicio, DetalleActaUob } from '@data';
import { OtFacade } from '@storeOT/index';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-pre-acta-admin',
  templateUrl: './pre-acta-admin.component.html',
  styleUrls: ['./pre-acta-admin.component.scss'],
})
export class PreActaAdminComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  detalleActa$: Observable<{
    ultimo_tipo_pago: string;
    servicios: DetalleActaServicio[];
    unidades_obra: DetalleActaUob[];
  }> = this.otFacade.getDetalleActa$();
  ot$: Observable<any> = this.otFacade.getDetalleOT$();
  saving$: Observable<boolean> = this.otFacade.sendingGeneracionActa$();
  totalServicios = 0;
  totalUO = 0;
  comentarios$ = this.otFacade.getComentariosFinalizacionTrabajos$();

  formComentario: FormGroup = new FormGroup({
    comentarios: new FormControl('', [Validators.required]),
  });

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.detalleActa$.pipe(take(1)).subscribe(detalle => {
        detalle.servicios.forEach(servicio => {
          this.totalServicios =
            this.totalServicios +
            servicio.faltante_cantidad * servicio.valor_unitario_clp;
        });

        detalle.unidades_obra.forEach(uo => {
          this.totalUO = this.totalUO =
            this.totalUO + uo.faltante_cantidad * uo.valor_unitario_clp;
        });
      })
    );

    this.subscription.add(
      this.comentarios$.pipe(take(1)).subscribe(comentario => {
        if (comentario)
          this.formComentario.get('comentarios').setValue(comentario);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
