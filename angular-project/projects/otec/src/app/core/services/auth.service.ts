import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    constructor() { }

    getToken(): string|null {
          return localStorage.getItem('otec_token') 
    }

    isLogin():boolean{
      if(localStorage.getItem('otec_token') === null){
        return false
      }
      return true
    }
}
