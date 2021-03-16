import { TestBed, getTestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
declare let Snackbar: object | any;

describe('SharedService', () => {
  let service: SharedService;
  let injector: TestBed;
  let router: Router;

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

  it('OKMessage Open', () => {
    spyOn(Snackbar, 'show');
    const a = 'TODO OK';
    const b = 'ok';
    service.showMessage(a, b);
    expect(Snackbar.show).toHaveBeenCalled();
  });

  it('should redirect to page given', () => {
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    service.navegateTo('/dashboard/cubicacion/crear-cubicacion');
    expect(router.navigate).toHaveBeenCalledWith([
      '/dashboard/cubicacion/crear-cubicacion',
    ]);
  });

  it('should return "Api Caida" ', () => {
    const errorResponse = new HttpErrorResponse({
      error: '404 error',
      status: undefined,
      statusText: 'Not Found',
    });

    expect(service.getErrorMessage(errorResponse)).toBe('API caída');
  });

  it('should return "404 Not Found" ', () => {
    const errorResponse = new HttpErrorResponse({
      error: { status: { description: 'Not Found' } },
      status: 404,
    });

    expect(service.getErrorMessage(errorResponse)).toBe(
      '(HTTP code: 404) Not Found'
    );
  });
});
