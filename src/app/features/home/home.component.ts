import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { Observable } from 'rxjs';

@Component({
  selector: 'zwc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.showMenuDetalleOT(false);
  }
}
