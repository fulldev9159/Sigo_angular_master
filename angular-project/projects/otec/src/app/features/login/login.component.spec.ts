import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import * as LoginModel from './login.model';
import { of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [LoginComponent],
      providers: [{ provide: 'environment', useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      username: new FormControl('jcastill', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
    });
    service = TestBed.inject(AuthService);

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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements', () => {
    const compiled = fixture.debugElement.nativeElement;
    const usernameInput = compiled.querySelector('input[id="username"]');
    const passwordInput = compiled.querySelector('input[id="password"]');

    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('get values() should return values of the form ', () => {
    expect(component.values.username).toBe('jcastill');
  });

  it('get valid() should return true for a valid form', () => {
    const username = 'username';
    const password = 'password';
    component.form.controls[username].setValue('jcastill');
    component.form.controls[password].setValue('password');
    expect(component.valid).toBe(true);
  });

  it('get valid() should return false for a valid form', () => {
    const username = 'username';
    const password = 'password';
    component.form.controls[username].setValue('jcastill');
    component.form.controls[password].setValue('');
    expect(component.valid).toBe(false);
  });

  it('should return false for maxlength', () => {
    const username = 'username';
    const password = 'password';
    component.form.controls[username].setValue(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );
    component.form.controls[password].setValue(
      'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'
    );
    expect(component.valid).toBe(false);
  });

  xit('show message when username is empty');
  xit('show username when username is empty');

  it('should submit user to storage an redirect to dashboard', fakeAsync(() => {
    const username = 'username';
    const password = 'password';
    component.form.controls[username].setValue('jcastill');
    component.form.controls[password].setValue('password');
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    const authResponse: LoginModel.AuthLoginResponse = {
      data: {
        token: '01EXND28AQ6ZF4ER4JVMWTB7YV',
        nombre_usuario: 'Carlos Alberto Campos Jaraquemada',
        roles_modulos: {
          Trabajador: {
            id: 5,
            nombre: 'Trabajador',
            modulos: {
              OT: {
                nombre: 'OT',
                privilegio: {
                  ver: false,
                  editar: false,
                },
              },
            },
          },
        },
      },
      status: {
        responseCode: 0,
        description: '',
      },
    };

    spyOn(service, 'auth').and.returnValue(of(authResponse));

    component.submit();

    tick();
    fixture.detectChanges();
    expect(service.getItemStorage('username')).toBe('jcastill');
    expect(service.getItemStorage('otec_token')).toBe(
      '01EXND28AQ6ZF4ER4JVMWTB7YV'
    );
    expect(service.getItemStorage('nombreCompleto')).toBe(
      'Carlos Alberto Campos Jaraquemada'
    );
    expect(service.getItemStorage('modulos')).toBe('OT');
    expect(service.getItemStorage('rol')).toBe('Trabajador');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  }));
});
