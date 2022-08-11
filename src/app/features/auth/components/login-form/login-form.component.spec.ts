import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@sharedOT/shared.module';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { sendingLogin } from '@storeOT/loadings/loadings.selectors';
// import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let facade: AuthFacade;
  const initialState: any = { sendingLogin: false };

  beforeEach(async () => {
    const env = { production: true, api: '' };
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RecaptchaFormsModule,
        RecaptchaModule,
        SharedModule.forRoot(env),
        StoreModule.forRoot({}),
      ],
      declarations: [LoginFormComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: sendingLogin,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(AuthFacade);
    // loadingFacade = TestBed.inject(LoadingsFacade);
    fixture.detectChanges();
    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          nombre_perfil_select: 'Gestor/JP',
          perfil_proxy_id: 2,
          permisos: [
            {
              id: 1,
              slug: 'OT_LISTAR',
              nombre_corto: 'Listar',
              descripcion: 'Poder visualizar OT',
            },
          ],
          rol: 'Gestor/JP (Telefónica)',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjAxODU3NjYsImlzcyI6InNpZ28iLCJuYmYiOjE2NjAxODIxNjY',
          usuario_id: 2,
          usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        },
      })
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Acceda utilizando su cuenta GUIA" ', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Acceda utilizando su cuenta GUIA'
    );
  });

  it('should display a input name username as enabled ', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('input[name="username"]').disabled
    ).toBeFalsy();
  });

  it('should display a input name password as enabled ', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('input[name="password"]').disabled
    ).toBeFalsy();
  });

  it('should display a button Login as disabled ', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#login-button').disabled).toBeTruthy();
  });

  it('"Recuperar contraseña GUIA should redirect to url GUIA"', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#recuperar-guia').href).toContain(
      'https://guia.telefonicachile.cl/login.jsf'
    );
  });

  it('form username control should be valid if insert a correct username', () => {
    component.formLogin.get('username').setValue('asdasdasdasdas');
    expect(component.formLogin.get('username').valid).toBeTrue();
  });

  it('form username control should be invalid if insert a empty username', () => {
    component.formLogin.get('username').setValue('');
    expect(component.formLogin.get('username').valid).toBeFalse();
  });

  it('form password control should be valid if insert a correct password', () => {
    component.formLogin.get('password').setValue('asdasdasdasdas');
    expect(component.formLogin.get('password').valid).toBeTrue();
  });

  it('form password control should be invalid if insert a empty password', () => {
    component.formLogin.get('password').setValue('');
    expect(component.formLogin.get('password').valid).toBeFalse();
  });

  it('in production mode recaptcha should be required and button should be disabled', () => {
    component.formLogin.get('username').setValue('asdasdasdasdas');
    component.formLogin.get('password').setValue('asdasdasdasdas');
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(component.formLogin.valid).toBeFalse();
    expect(compiled.querySelector('#login-button').disabled).toBeTruthy();
  });

  it('in production mode form to be valid if all form include recaptcha have data ', () => {
    component.formLogin.get('username').setValue('asdasdasdasdas');
    component.formLogin.get('password').setValue('asdasdasdasdas');
    component.formLogin.get('recaptcha').setValue('asdasdasdasdas');
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    expect(component.formLogin.valid).toBeTruthy();
    expect(compiled.querySelector('#login-button').disabled).toBeFalsy();
  });

  it('should call login method if press login buttton', () => {
    spyOn(component, 'login');
    component.formLogin.get('username').setValue('asdasdasdasdas');
    component.formLogin.get('password').setValue('asdasdasdasdas');
    component.formLogin.get('recaptcha').setValue('asdasdasdasdas');
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    compiled.querySelector('#login-button').click();
    expect(component.login).toHaveBeenCalled();
  });

  it('should call login facade if method login is invoke', () => {
    let spyFacade = spyOn(facade, 'Login');
    component.login();
    expect(spyFacade).toHaveBeenCalled();
  });
});
