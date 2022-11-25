import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
//// import { AuthFacade } from '@storeOT/auth/auth.facades';

@Component({
  selector: 'zwc-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //// this.authFacade.showMenuDetalleOT(false);
  }
}
