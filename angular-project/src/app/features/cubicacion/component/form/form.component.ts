import { Component, OnInit } from '@angular/core';
import { SeleccionType } from '@uiOT/seleccion/seleccion.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // declarations
  dataRealRecibida = [
    { ciudad: 'New York', id: 'NY', contratos: 1 },
    { ciudad: 'Rome', id: 'RM', contratos: 5 },
    { ciudad: 'London', id: 'LDN', contratos: 4 },
    { ciudad: 'Istanbul', id: 'IST', contratos: 12 },
    { ciudad: 'Paris', id: 'PRS', contratos: 12 },
  ];
  itemsExample: SeleccionType[];

  constructor() {
    this.itemsExample = this.dataRealRecibida.map((x) => ({
      name: x.ciudad,
      code: x.id,
    }));
  }

  ngOnInit(): void {
  }

  itemSelected(event: string | Array<any>): void {
    console.log(event);
    // console.log((eventd.target as HTMLInputElement).value);
  }

}
