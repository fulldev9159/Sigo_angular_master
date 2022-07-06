import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DetalleInformeAvance, SessionData } from '@data';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-informe-avance-table',
  templateUrl: './detalle-informe-avance-table.component.html',
  styleUrls: ['./detalle-informe-avance-table.component.scss'],
})
export class DetalleInformeAvanceTableComponent implements OnInit {
  @Input() error: any;
  @Input() detalle: DetalleInformeAvance;
  sessionData$: Observable<SessionData> = this.authFacade.getLogin$();
  @Input() totalServicios: number;
  @Input() totalUO: number;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {}
}
