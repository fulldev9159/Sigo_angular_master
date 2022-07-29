import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { PrimeNgModule } from '@sharedOT/primeng/primeng.module';

import { PbuttonSendingComponent } from './pbutton-sending.component';

describe('PbuttonSendingComponent', () => {
  let componentHost: HostComponent;
  let fixtureHost: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeNgModule],
      declarations: [PbuttonSendingComponent, HostComponent],
    }).compileComponents();

    fixtureHost = TestBed.createComponent(HostComponent);
    componentHost = fixtureHost.componentInstance;
    fixtureHost.detectChanges();
  });

  it('button should be displayed without spin', () => {
    const compiled = fixtureHost.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).not.toBeNull();
    expect(compiled.querySelector('i')).toBeNull();
  });

  it('should display button with spin if sending is true', () => {
    componentHost.sendingLogin = true;
    fixtureHost.detectChanges();
    const compiled = fixtureHost.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')).not.toBeNull();
    expect(compiled.querySelector('i')).not.toBeNull();
  });

  it('should call callclick who call login', () => {
    spyOn(componentHost, 'login');
    const compiled = fixtureHost.nativeElement as HTMLElement;
    compiled.querySelector('button').click();
    expect(componentHost.login).toHaveBeenCalled();
  });

  it('should id been "login-button"', () => {
    const compiled = fixtureHost.nativeElement as HTMLElement;
    expect(compiled.querySelector('button').id).toBe('login-button');
  });

  it('label should be "Login"', () => {
    const compiled = fixtureHost.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Login');
  });

  @Component({
    selector: 'zwc-host-component',
    template: `<zwc-pbutton-sending
      Pid="login-button"
      content="Login"
      Pclass="p-button-info p-button-sm mt-4"
      [sending]="sendingLogin"
      [Pdisabled]="!formLogin.valid"
      (call)="login()"
    ></zwc-pbutton-sending>`,
  })
  class HostComponent {
    formLoginControls = {
      username: new FormControl('', []),
    };
    formLogin: FormGroup = new FormGroup(this.formLoginControls);
    sendingLogin = false;

    login(): void {}
  }
});
