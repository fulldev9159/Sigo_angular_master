import { Injectable, Optional, Inject } from '@angular/core';
import * as LoginModel from '../../features/login/login.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBase = 'http://localhost:8021';
  constructor(
    @Inject('environment') environment,
    @Optional() private httpClient?: HttpClient
  ) {
    this.apiBase = environment.api || 'http://localhost:8021';
  }

  getToken(): string | null {
    console.log(localStorage.getItem('otec_token'));
    return localStorage.getItem('otec_token');
  }

  deleteToken(): void {
    localStorage.clear();
  }

  isLogin(): boolean {
    console.log(localStorage.getItem('otec_token'));
    if (localStorage.getItem('otec_token') === null) {
      return false;
    }
    return true;
  }

  authmock(user: string): Observable<LoginModel.AuthLoginResponse> {
    const arrayMock: { [key: string]: LoginModel.AuthLoginResponse } = {};
    arrayMock['jcastill'] = {
      data: {
        token: '0xestasdad',
        nombre_usuario: 'JESSICA LORENA CASTILLO GONZÁLEZ',
        roles_modules: [
          {
            id: 2,
            nombre: 'Gestor',
            modulos: [
              {
                id: 1,
                nombre: 'OT',
              },
              {
                id: 2,
                nombre: 'Cubicacion',
              },
            ],
          },
        ],
      },
      status: {
        responseCode: 0,
        description: 'Consulta OK',
      },
    };

    arrayMock['carloscj'] = {
      data: {
        token: '0xestasdad',
        nombre_usuario: 'Carlos Alberto Campos Jaraquemada',
        roles_modules: [
          {
            id: 5,
            nombre: 'Trabajador',
            modulos: [
              {
                id: 1,
                nombre: 'OT',
              }
            ],
          },
        ],
      },
      status: {
        responseCode: 0,
        description: 'Consulta OK',
      },
    };

    arrayMock['erickuc'] = {
      data: {
        token: '0xestasdad',
        nombre_usuario: 'Erick Urrutia Correa',
        roles_modules: [
          {
            id: 3,
            nombre: 'Administrador de Contrato',
            modulos: [
              {
                id: 1,
                nombre: 'OT',
              }
            ],
          },
        ],
      },
      status: {
        responseCode: 0,
        description: 'Consulta OK',
      },
    };

    arrayMock['jaimecc'] = {
      data: {
        token: '0xestasdad',
        nombre_usuario: 'Jaime Contreras Cortes',
        roles_modules: [
          {
            id: 4,
            nombre: 'Coordinador',
            modulos: [
              {
                id: 1,
                nombre: 'OT',
              }
            ],
          },
        ],
      },
      status: {
        responseCode: 0,
        description: 'Consulta OK',
      },
    };

    arrayMock['admin'] = {
      data: {
        token: '0xestasdad',
        nombre_usuario: 'Admin',
        roles_modules: [
          {
            id: 4,
            nombre: 'Administrador OTEC',
            modulos: [
              {
                id: 1,
                nombre: 'OT',
              },
              {
                id: 2,
                nombre: 'Cubicacion',
              },
              {
                id: 3,
                nombre: 'Reportería',
              },
              {
                id: 4,
                nombre: 'Administracion',
              },
            ],
          },
        ],
      },
      status: {
        responseCode: 0,
        description: 'Consulta OK',
      },
    };

    arrayMock['carlosvb'] = {
      data: {
        token: '0xestasdad',
        nombre_usuario: 'Carlos Antonio Valdivia Bustamante',
        roles_modules: [
          {
            id: 6,
            nombre: 'Reporteria',
            modulos: [
              {
                id: 3,
                nombre: 'Reportería',
              }
            ],
          },
        ],
      },
      status: {
        responseCode: 0,
        description: 'Consulta OK',
      },
    };

    return of(arrayMock[user])
  }

  auth(
    user: string,
    password: string
  ): Observable<LoginModel.AuthLoginResponse> {
    console.log('iniciando login...');
    const data = {
      User: user,
      Password: password,
    };
    return (this.httpClient as HttpClient).post<LoginModel.AuthLoginResponse>(
      `${this.apiBase}/Test/OTEC/login`,
      JSON.stringify(data)
    );
  }

  setToken(token: string): void {
    localStorage.setItem('otec_token', token);
  }

  setPrivilegios(privilegios: LoginModel.RolesSectionResponse[]): void {
    const privilegiosJSON = JSON.stringify(privilegios);
    localStorage.setItem('privilegios_user', privilegiosJSON);
  }

  getPrivilegios(): LoginModel.RolesSectionResponse[] {
    const privilegios = localStorage.getItem('privilegios_user');
    return JSON.parse(privilegios as string);
  }

  setNombre(nombre:string): void {
    localStorage.setItem('nombre_usuario', nombre);
  }

  getNombre():string{
    return localStorage.getItem('nombre_usuario') as string
  }

  getMenu(rol:string):string[]{
    const MenuRol:{[key:string]:Array<string>}={}

    MenuRol["Gestor"]=['OT','Cubicación'];
    MenuRol["Coordinador"]=['OT'];
    MenuRol["Trabajador"]=['OT'];
    MenuRol["Administrador de Contrato"]=['OT']
    MenuRol["Administrador OTEC"]=['OT','Cubicación','Reportería','Administración']
    MenuRol["Reporteria"]=['Reportería']

    return MenuRol[rol]

  }

  getRol():string{
    const local=localStorage.getItem('privilegios_user');
    const json:LoginModel.RolesSectionResponse=JSON.parse(local as string)
       
    return json[0].nombre
  }
}
