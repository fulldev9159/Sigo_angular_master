import { Component, OnInit } from '@angular/core';
import {
  faBook,
  faCalculator,
  faFileContract,
  faFlask,
  faFolderOpen,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import { DetalleOT, SessionData } from '@model';
import { OTDetalleFacade } from '@storeOT/ot-detalle/ot-detalle.facades';
import { Observable } from 'rxjs';

@Component({
  selector: 'zwc-menu-detalle-ot',
  templateUrl: './menu-detalle-ot.component.html',
  styleUrls: ['./menu-detalle-ot.component.scss'],
})
export class MenuDetalleOtComponent {
  // 67 TODO: PROGRAMAR QUE OCURRE SI FALLA EL GET DETALLE OT
  // 133 TODO: PROGRAMAR QUE SE VISUALICE EN EL MENÚ LA OPCION ESCOGIDA
  otDetalle$: Observable<DetalleOT> = this.otDetalleFacade.getDetalleOT$();
  rol = (JSON.parse(localStorage.getItem('auth')).sessionData as SessionData)
    .rol_slug;

  // ICONS
  infoIcon = faInfo;
  costeosIcon = faCalculator;
  actaInfo = faFileContract;
  libroObrasIcon = faBook;
  anexosIcon = faFolderOpen;
  ingenieriaIcon = faFlask;

  constructor(private otDetalleFacade: OTDetalleFacade) {}
}
