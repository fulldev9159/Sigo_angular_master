import { Component, OnInit } from '@angular/core';


interface City {
  name: string,
  code: string,
  inactive: boolean,
  checkbox: boolean
}

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.scss']
})
export class FormProComponent implements OnInit {

  // declarations
  cities: City[];

  selectedCities: City[];

  constructor() { }

  ngOnInit(): void {
    this.cities = [
      { name: 'Listar Ot', code: 'NY', inactive: false, checkbox: true },
      { name: 'Crear Ot', code: 'RM', inactive: true, checkbox: true },
      { name: 'Editar Ot', code: 'LDN', inactive: false, checkbox: true },
      { name: 'Eliminar Ot', code: 'IST', inactive: true, checkbox: true },
      { name: 'Aceptar Ot', code: 'PRS', inactive: false, checkbox: true },
      { name: 'Rechazar Ot', code: 'PRS', inactive: false, checkbox: true }
    ];
  }

}
