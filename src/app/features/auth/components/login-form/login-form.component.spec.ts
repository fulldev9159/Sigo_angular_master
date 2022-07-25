import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      providers: [{ provide: Location }],
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
});
