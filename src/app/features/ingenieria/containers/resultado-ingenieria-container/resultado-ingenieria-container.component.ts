import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-resultado-ingenieria-container',
  templateUrl: './resultado-ingenieria-container.component.html',
  styleUrls: ['./resultado-ingenieria-container.component.scss'],
})
export class ResultadoIngenieriaContainerComponent
  implements OnInit, OnDestroy
{
  subscription: Subscription = new Subscription();

  constructor(
    private authFacade: AuthFacade,
    private cubicacionFacade: CubicacionFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
    this.subscription.add(
      this.route.data.subscribe(({ detalleOT }) => {
        if (detalleOT)
          this.cubicacionFacade.detalleCubicacion(
            detalleOT.data.ot.cubicacion_id
          );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
