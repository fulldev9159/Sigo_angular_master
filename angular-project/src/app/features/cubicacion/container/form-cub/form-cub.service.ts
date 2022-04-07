import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    };
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
