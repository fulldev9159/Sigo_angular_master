import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-validar-ingenieria-container',
  templateUrl: './validar-ingenieria-container.component.html',
  styleUrls: ['./validar-ingenieria-container.component.scss'],
})
export class ValidarIngenieriaContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
