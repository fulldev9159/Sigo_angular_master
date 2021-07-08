import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OT, OTsResponse } from '../model';
import { User, UsersResponse } from '../model';

@Injectable({
  providedIn: 'root',
})
export class OTService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getOTs(
    perfil_id: number,
    filtro_propietario: string,
    filtro_tipo: string
  ): Observable<OT[]> {
    return this.http
      .post<OTsResponse>(`${this.apiUrl}/mockup/ingreot/ot/get/abiertas`, {
        perfil_id,
        filtro_propietario,
        filtro_tipo,
      })
      .pipe(map(res => res.data.items));
  }

  approveOT(perfil_id: number, otID: number): Observable<any> {
    console.log('[TODO] approve OT still not implemented', {
      perfil_id,
      otID,
    });
    return of({});
  }

  rejectOT(perfil_id: number, otID: number): Observable<any> {
    console.log('[TODO] reject OT still not implemented', {
      perfil_id,
      otID,
    });
    return of({});
  }

  getCoordinators(perfil_id: number, otID: number): Observable<User[]> {
    console.log('[TODO] get OT coordinators still not implemented', {
      perfil_id,
      otID,
    });
    return of([
      {
        id: 3,
        username: 'erickuc',
        rut: '13237732',
        nombres: 'Erick',
        apellidos: 'Urrutia Correa',
        celular: '56987692645',
        activo: true,
        firma: '',
        proveedor_id: 2,
        area_id: 2,
        email: 'erick.urrutia@ericsson.com',
        created_at: '2020-01-01 00:00:00',
        updated_at: '2020-01-01 00:00:00',
        proveedor_nombre: 'COASIN',
        area_nombre: 'Contratista',
      },
      {
        id: 4,
        username: 'jaimecc',
        rut: '6776815',
        nombres: 'Jaime ',
        apellidos: 'Contreras Cortes',
        celular: '56973971516',
        activo: true,
        firma: '',
        proveedor_id: 2,
        area_id: 2,
        email: 'jaime.contreras@ericsson.com',
        created_at: '2020-01-01 00:00:00',
        updated_at: '2020-01-01 00:00:00',
        proveedor_nombre: 'COASIN',
        area_nombre: 'Contratista',
      },
      {
        id: 7,
        username: 'gen175708502',
        rut: '17570850',
        nombres: 'KAREN ELIS',
        apellidos: 'RIQUELME TORRES',
        celular: '56969188330',
        activo: true,
        firma: '',
        proveedor_id: 5,
        area_id: 2,
        email: 'karen.riquelme@generatel.cl',
        created_at: '2020-01-01 00:00:00',
        updated_at: '2020-01-01 00:00:00',
        proveedor_nombre: 'AJ INGENIEROS S.A.',
        area_nombre: 'Contratista',
      },
    ]);
  }

  assignCoordinator(
    perfil_id: number,
    otID: number,
    coordinatorID: number
  ): Observable<any> {
    console.log('[TODO] assign coordinator to OT still not implemented', {
      perfil_id,
      otID,
      coordinatorID,
    });
    return of({});
  }
}
