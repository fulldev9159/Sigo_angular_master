import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '@environment';
import { SharedModule } from '@sharedOT/shared.module';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    const env = { production: true, api: '' };
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RecaptchaFormsModule,
        RecaptchaModule,
        SharedModule.forRoot(env),
      ],
      declarations: [LoginFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
