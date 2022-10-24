import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ListPerfilesUserFormService {
  constructor() {}

  FormConfig(): any {
    return {
      id: new FormControl(null),
      perfil_id: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      superior_proxy_id: new FormControl<string | null>(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    };
  }
}
