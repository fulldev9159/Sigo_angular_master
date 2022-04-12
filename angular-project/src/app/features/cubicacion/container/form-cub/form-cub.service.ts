import { Injectable } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormCubService {
  constructor() {}

  FormConfig(): any {
    return {
      id: new FormControl(null),
      nombre: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      tipocubicacion: new FormControl(null, [Validators.required]),
      direcciondesde: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      direcciondesdealtura: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      direccionhasta: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      direccionhastaaltura: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      descripcion: new FormControl(null, [Validators.required]),
      contrato: new FormControl(null, [Validators.required]),
      agencia_id: new FormControl(null, [Validators.required]),
      cmarcoproveedor_id: new FormControl(null, [Validators.required]),
      actividad_id: new FormControl(null, [Validators.required]),
      tipo_servicio_id: new FormControl(null, [Validators.required]),
      servicio_cod: new FormControl(null, [Validators.required]),
      unidad_obra_cod: new FormControl(null, [Validators.required]),
      cantidad_servicio: new FormControl(1, [Validators.required]),
      cantidad_unidad_obra: new FormControl(1, [Validators.required]),
      table: new FormArray([]),
    };
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
