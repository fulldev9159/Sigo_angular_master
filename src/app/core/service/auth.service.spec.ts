import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { UtilsService } from './utils.service';

describe('Auth Service', () => {
  let service: AuthService;
  let utilsService: UtilsService;
  let facade: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
    });
    facade = TestBed.inject(AuthFacade);
    utilsService = TestBed.inject(UtilsService);

    service = new AuthService(facade, utilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isLoggin should return false if sessionData doest exist', () => {
    spyOn(facade, 'getSessionData$').and.returnValue(of(null));
    service.isLoggin().subscribe(val => expect(val).toBeFalse());
  });

  it('isLoggin should return true if sessionData exist and all data is complete', () => {
    spyOn(facade, 'getSessionData$').and.returnValue(
      of({
        token: '12231',
        usuario_nombre: '1',
        usuario_id: 1,
        nombre_perfil_select: 'asda',
        permisos: [],
        perfil_proxy_id: 1,
        multiperfiles: false,
        rol: 'asdas',
      })
    );

    service.isLoggin().subscribe(val => expect(val).toBeTrue());
  });

  it('isLoggin should return false if sessionData does have usuario_id null', () => {
    spyOn(facade, 'getSessionData$').and.returnValue(
      of({
        token: '12231',
        usuario_nombre: '1',
        usuario_id: null,
        nombre_perfil_select: 'asda',
        permisos: [],
        perfil_proxy_id: 1,
        multiperfiles: false,
        rol: 'asdas',
      })
    );

    service.isLoggin().subscribe(val => expect(val).toBeFalse());
  });

  it('isLoggin should return false if sessionData does have rol empty', () => {
    spyOn(facade, 'getSessionData$').and.returnValue(
      of({
        token: '12231',
        usuario_nombre: '1',
        usuario_id: 1,
        nombre_perfil_select: 'asda',
        permisos: [],
        perfil_proxy_id: 1,
        multiperfiles: false,
        rol: '',
      })
    );

    service.isLoggin().subscribe(val => expect(val).toBeFalse());
  });
});
