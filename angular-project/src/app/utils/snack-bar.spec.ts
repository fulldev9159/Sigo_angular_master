import { TestBed } from '@angular/core/testing';
import { SnackBarService } from './snack-bar';
declare let Snackbar: object | any;

describe('AppComponent', () => {
  let service: SnackBarService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [SnackBarService],
    }).compileComponents();

    service = TestBed.inject(SnackBarService);
  });

  it('should create the app', () => {
    expect(service).toBeTruthy();
  });

  it('snackbar ErrMessage', () => {
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
});
