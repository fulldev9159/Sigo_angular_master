import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as Data from '@data';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getNotificaciones(): Observable<Data.Notificaciones> {
    console.log('Get Notificaciones');
    return this.http.post<Data.Notificaciones>(
      `${this.apiUrl}/notification_tray/get`,
      {}
    );
  }
}
