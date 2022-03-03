import { Component, OnInit } from '@angular/core';
import { ContratoFacade } from '@storeOT/features/contratos/contratos.facade';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss'],
})
export class ContratosComponent implements OnInit {
  constructor(
    private contratosFacade: ContratoFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contratosFacade.reset();
    this.contratosFacade.getAllContratos();
  }
}
