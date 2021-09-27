import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  getNotificaciones(): Observable<any> {
    console.log('Get Notificaciones');
    return this.http.post<any>(`${this.apiUrl}/notification_tray/get`, {});
  }
}
