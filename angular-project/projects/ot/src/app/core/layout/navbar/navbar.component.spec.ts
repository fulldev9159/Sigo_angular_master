import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@coreOT/services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import * as LoginModel from '@coreOT/models/login.model';
import { of } from 'rxjs';
declare var $: any;

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: 'environment', useValue: {} }, AuthService],
    }).compileComponents();
  });

  beforeEach(() => {
    let store: { [key: string]: string } = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    service = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should get menu for user profile', () => {
  //   service.setItemStorage('modulos', 'cubicación,ot');
  //   const menuexpect = ['cubicación', 'ot'];
  //   component.ngOnInit();
  //   expect(component.Menu).toEqual(menuexpect);
  // });

  it('should get nombre completo for user profile', () => {
    const nombreExpect = 'Jorge Retamal Aburto';
    service.setItemStorage('nombreCompleto', nombreExpect);
    component.ngOnInit();
    expect(component.nombreUsuario).toEqual(nombreExpect);
  });

  it('should get rol completo for user profile', () => {
    const nombreExpect = 'Gertor';
    service.setItemStorage('rol', nombreExpect);
    component.ngOnInit();
    expect(component.rol).toEqual(nombreExpect);
  });

  it('should logout delete token and redirect to login', fakeAsync(() => {
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const response: LoginModel.LogoutResponse = {
      user: '',
      token: '',
      modifiedat: '',
      createdat: '',
    };
    spyOn(service, 'logOut').and.returnValue(of(response));
    const token = 'testtoken';
    service.setItemStorage('otec_token', token);
    component.logout();
    tick();
    fixture.detectChanges();
    expect(service.getItemStorage('otec_token')).toBe(null);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  }));

  it('should showOnlyForRol return true for a especific rol', () => {
    component.rol = 'Gestor';
    expect(component.showOnlyForRol('Gestor')).toBe(true);
  });

  it('should navegate to direction given', () => {
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.navegateTo('/dashboard/cubicacion/crear-cubicacion');
    expect(router.navigate).toHaveBeenCalledWith([
      '/dashboard/cubicacion/crear-cubicacion',
    ]);
  });
});
