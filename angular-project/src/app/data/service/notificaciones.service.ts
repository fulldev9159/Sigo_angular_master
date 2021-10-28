import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificaciones } from '@data';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getNotificaciones(): Observable<Notificaciones> {
    console.log('Get Notificaciones');
    return this.http.post<Notificaciones>(
      `${this.apiUrl}/notification_tray/get`,
      {}
    );
  }

  markNotificacion(id: number[]): Observable<any> {
    console.log(`Se va a marcar la notificación id: ${id}`);
    return this.http.post<any>(`${this.apiUrl}/notification_tray/check`, {
      id,
    });
  }
}
