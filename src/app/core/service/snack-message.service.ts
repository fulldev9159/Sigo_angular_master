import { Injectable } from '@angular/core';
declare let Snackbar: object | any;

@Injectable({
  providedIn: 'root',
})
export class SnackMessageService {
  constructor() {}

  showMessage(message: string, type: string, duration: number = 0): void {
    Snackbar.show({
      pos: 'top-center',
      text: message,
      backgroundColor: '#212121',
      actionText: type,
      actionTextColor: (color => {
        if (color === 'error') {
          return '#DB2828';
        } else if (color === 'war') {
          return '#e3f742';
        } else if (color === 'info') {
          return '#4c5fed';
        }
        return '#28960c';
      })(type),
      duration
    });
  }
}
