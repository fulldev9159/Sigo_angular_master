import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'otec-crear-ot',
  templateUrl: './crear-ot.component.html',
  styleUrls: ['./crear-ot.component.css'],
  providers: [MessageService],
})
export class CrearOtComponent implements OnInit {
  public items: MenuItem[] = [];

  constructor(
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Cubicacion',
        routerLink: 'cubicacion-proyecto',
      },
      {
        label: 'Plan de proyecto',
        routerLink: 'proyecto',
      },
      {
        label: 'Pep2',
        routerLink: 'pep2',
      },
      {
        label: 'Organigrama',
        routerLink: 'organigrama',
      },
      {
        label: 'Confirmación',
        routerLink: 'confirmacion',
      },
    ];
  }
}
