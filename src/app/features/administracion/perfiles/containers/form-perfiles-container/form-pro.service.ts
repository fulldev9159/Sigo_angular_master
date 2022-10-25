import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as CustomValidators from '@sharedOT/validators';

@Injectable({
  providedIn: 'root',
})
export class FormProService {
  constructor() {}

  FormConfig(): any {
    return {
      id: new FormControl(null),
      nombre: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [
          Validators.required,
          CustomValidators.NoWhitespace,
          Validators.maxLength(100),
        ],
      }),
      descripcion: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required, Validators.maxLength(200)],
      }),
      rol: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      permisos_OT: new FormControl(null),
      permisos_CUBICACION: new FormControl(null),
      permisos_PERFIL: new FormControl(null),
    };
  }
}
