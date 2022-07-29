import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Action {
  error?: any;
  response?: {
    data: any;
    status: {
      code: number;
      desc: string;
    };
  };
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AfterHttpService {
  constructor(private router: Router) {}

  afterHttpAction(action: Action): void {
    if (action.error) {
      this.errorHandler(action);
    } else if (action.response) {
      this.successHandler(action);
    } else {
      throw new Error('Formato incorrecto');
    }
  }

  errorHandler(action: Action): void {}

  successHandler(action: Action): void {}

  // console.log(action.type);
  //   if (action && action.type) {
  //     if (action.type === 'loginSuccess') {
  //       this.router.navigate(['/perfil-select']);
  //     }
  //   } else {
  //     throw new Error('No se proporcionó ngrx action type definido');
  //   }
  // afterHttpMessage(action: any): void {
  //   if (action.error) {
  //     this.errMessages(action);
  //   } else {
  //     this.okMessages(action);
  //   }
  // }

  // errMessages(action: any) {}

  // okMessages(action: any) {}
}
