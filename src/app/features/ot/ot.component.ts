import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@storeOT/auth/auth.facades';

@Component({
  selector: 'zwc-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss'],
})
export class OtComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(false);
  }
}
