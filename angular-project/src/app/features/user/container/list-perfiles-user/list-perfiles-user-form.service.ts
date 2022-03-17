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
      perfil_id: new FormControl(null, [Validators.required]),
      superior_id: new FormControl(null, [Validators.required]),
    };
  }
}
