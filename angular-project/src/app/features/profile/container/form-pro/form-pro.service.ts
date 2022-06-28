import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FormProService {
  constructor() {}

  FormConfig(): any {
    return {
      id: new FormControl(null),
      nombre: new FormControl(null, [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      descripcion: new FormControl(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      rol: new FormControl(null, [Validators.required]),
      permisos_OT: new FormControl(null),
      permisos_CUBICACION: new FormControl(null),
      permisos_PERFIL: new FormControl(null),
    };
  }

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
}
