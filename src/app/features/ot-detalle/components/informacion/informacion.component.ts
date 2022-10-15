import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleOT, InfoOT, NumeroInterno, UsuarioInvolucrado } from '@model';
import { Subscription } from 'rxjs';

// TODO: VERIFICAR LAS FECHAS
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ detalleOT }) => {
        this.infoOT = detalleOT?.data?.ot;
        this.numeros_internos = detalleOT?.data?.numeros_interno;
        this.usuarios_involucrados = detalleOT?.data?.usuarios_involucrados;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
