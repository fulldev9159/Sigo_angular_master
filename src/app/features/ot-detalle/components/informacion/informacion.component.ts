import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Accion,
  Cubicacion,
  DetalleOT,
  InfoOT,
  NumeroInterno,
  UsuarioInvolucrado,
} from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { Observable, Subscription } from 'rxjs';

// 171 TODO: VERIFICAR LAS FECHAS
@Component({
  selector: 'zwc-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  infoOT: InfoOT;
  numeros_internos: NumeroInterno[] = [];
  usuarios_involucrados: UsuarioInvolucrado[] = [];

  accionesOT: Accion[] = [];

  detalleCubicacionFromList$: Observable<Cubicacion> =
    this.cubicacionFacade.getDetalleCubFromList$();

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ detalleOT, accionesOT }) => {
        if (accionesOT) this.accionesOT = accionesOT;
        this.infoOT = detalleOT?.data?.ot;
        this.numeros_internos = detalleOT?.data?.numeros_interno;
        this.usuarios_involucrados = detalleOT?.data?.usuarios_involucrados;
        if (detalleOT)
          this.cubicacionFacade.getDetalleCubFromList(
            detalleOT.data.ot.cubicacion_id
          );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
