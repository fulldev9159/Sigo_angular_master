import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SeleccionType } from '@uiOT/seleccion/seleccion.model';
@Component({
  selector: 'app-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./cubicacion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CubicacionComponent implements OnInit {
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

  ngOnInit(): void {}

  itemSelected(event: string | Array<any>): void {
    console.log(event);
    // console.log((eventd.target as HTMLInputElement).value);
  }
}
