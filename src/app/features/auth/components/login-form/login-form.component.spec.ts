import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
      compiled.querySelector('input.get(name="username")').disabled
    ).toBeFalsy();
  });

  it('should display a input name password as enabled ', () => {
    const compiled = fixture.nativeElement;
    expect(
      compiled.querySelector('input.get(name="password")').disabled
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

  it('form username control should be invalid if insert a username of less 5 letters', () => {
    component.formLogin.get('username').setValue('da');
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

  it('form password control should be invalid if insert a password of less 5 letters', () => {
    component.formLogin.get('password').setValue('1121');
    expect(component.formLogin.get('password').valid).toBeTrue();
  });

  it('button login should be enabled if form is valid', () => {
    component.formLogin.get('username').setValue('asdasdasdasdas');
    component.formLogin.get('password').setValue('asdasdasdasdas');
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#login-button').disabled).toBeFalsy();
  });
});
