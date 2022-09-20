import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthFacade } from '@storeOT/auth/auth.facades';

@Component({
  selector: 'zwc-cubicacion',
  templateUrl: './cubicacion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./cubicacion.component.scss'],
})
export class CubicacionComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(false);
  }
}
