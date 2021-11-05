import { Injectable } from '@angular/core';
declare let Snackbar: object | any;

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor() {}

  showMessage(message: string, type: string, dur?: number): void {
    Snackbar.show({
      pos: 'top-center',
      text: message,
      backgroundColor: '#212121',
      actionText: type,
      actionTextColor: (color => {
        if (color === 'error') {
          return '#DB2828';
        }
        return '#2185D0';
      })(type),
      duration: dur ? dur : 7000,
    });
  }
}
