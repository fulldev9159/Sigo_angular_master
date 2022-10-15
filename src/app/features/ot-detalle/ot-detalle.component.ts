import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@storeOT/auth/auth.facades';

// 91 TODO: VER MANERA DE OBTENER LAS ACCIONES DE LA OT
@Component({
  selector: 'zwc-ot-detalle',
  templateUrl: './ot-detalle.component.html',
  styleUrls: ['./ot-detalle.component.scss'],
})
export class OtDetalleComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
  }
}
