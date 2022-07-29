import { TestBed } from '@angular/core/testing';

import { SnackMessageService } from './snack-message.service';
declare let Snackbar: object | any;

describe('SnackMessageService', () => {
  let service: SnackMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call show function for error', () => {
    spyOn(Snackbar, 'show');
    const a = 'No fue posible iniciar sesión';
    const b = 'error';
    const d = 1000;
    service.showMessage(a, b, d);
    expect(Snackbar.show).toHaveBeenCalled();
  });

  it('should call show function for ok', () => {
    spyOn(Snackbar, 'show');
    const a = 'No fue posible iniciar sesión';
    const b = 'ok';
    const d = 1000;
    service.showMessage(a, b, d);
    expect(Snackbar.show).toHaveBeenCalled();
  });

  it('should call show function for warning', () => {
    spyOn(Snackbar, 'show');
    const a = 'No fue posible iniciar sesión';
    const b = 'war';
    const d = 1000;
    service.showMessage(a, b, d);
    expect(Snackbar.show).toHaveBeenCalled();
  });

  it('should call show function for info', () => {
    spyOn(Snackbar, 'show');
    const a = 'No fue posible iniciar sesión';
    const b = 'info';
    const d = 1000;
    service.showMessage(a, b, d);
    expect(Snackbar.show).toHaveBeenCalled();
  });
});
