import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/core/service/formulario.service';

@Component({
  selector: 'zwc-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  formCubControl = {
    id: new FormControl(null),
    nombre: new FormControl(null, [
      Validators.required,
      this.formularioService.noWhitespace,
      Validators.maxLength(300),
    ]),
    tipocubicacion: new FormControl(null, [Validators.required]),
    direcciondesde: new FormControl(null, []),
    direcciondesdealtura: new FormControl(null, []),
    direccionhasta: new FormControl(null, []),
    direccionhastaaltura: new FormControl(null, []),
    descripcion: new FormControl(null, [Validators.required]),
    contrato: new FormControl(null, [Validators.required]),
    agencia_id: new FormControl(null, [Validators.required]),
    cmarcoproveedor_id: new FormControl(null, [Validators.required]),
    table: new FormArray([]),
  };

  constructor(private formularioService: FormularioService) {}
}
