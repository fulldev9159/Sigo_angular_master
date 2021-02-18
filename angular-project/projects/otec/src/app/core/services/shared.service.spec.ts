import { TestBed, getTestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
declare let Snackbar: object | any;

describe('SharedService', () => {
  let service: SharedService;
  let injector: TestBed;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: 'environment', useValue: {} }, SharedService],
    });
    injector = getTestBed();
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ErrMessage Open', () => {
    spyOn(Snackbar, 'show');
    const a = 'No fue posible iniciar sesión';
    const b = 'error';
    service.showMessage(a, b);
    expect(Snackbar.show).toHaveBeenCalled();
  });
});
