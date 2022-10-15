import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthFacade } from '@storeOT/auth/auth.facades';
import { isLoggin } from '@storeOT/auth/auth.selectors';

import { MainLayoutComponent } from './main-layout.component';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  const initialState: any = { isLoggin: null };
  let authFacade: AuthFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        StoreModule.forRoot({}),
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          {
            path: 'home',
            loadChildren: () =>
              import('../../../features/home/home.module').then(
                m => m.HomeModule
              ),
          },
          {
            path: 'login',
            loadChildren: () =>
              import('../../../features/auth/auth.module').then(
                m => m.AuthModule
              ),
          },
        ]),
      ],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: isLoggin,
              value: true,
            },
          ],
        }),
      ],
      declarations: [MainLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.inject(AuthFacade);
    fixture.detectChanges();
    localStorage.setItem('auth', JSON.stringify({ sessionData: null }));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('main layout text did show if isLoggin return true', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.layout-container')).not.toBeNull();
  });

  it('should listening resize window', () => {
    window.dispatchEvent(new Event('resize'));
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main').classList.length).toEqual(1);
    expect(compiled.querySelector('main').classList[0]).toEqual(
      'layout-container'
    );
  });

  it('should togle add class layout-static-inactive and remove if call again', () => {
    component.toggle();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main').classList.length).toEqual(2);
    expect(compiled.querySelector('main').classList[0]).toEqual(
      'layout-container'
    );
    expect(compiled.querySelector('main').classList[1]).toEqual(
      'layout-static-inactive'
    );
    component.toggle();
    expect(compiled.querySelector('main').classList.length).toEqual(1);
    expect(compiled.querySelector('main').classList[0]).toEqual(
      'layout-container'
    );
  });

  it('logout should call logout facade', () => {
    spyOn(authFacade, 'Logout');
    const compiled = fixture.nativeElement;
    component.logout();
    expect(authFacade.Logout).toHaveBeenCalled();
  });

  it('closeToggle should be trusthy', () => {
    component.closeToggle();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main').classList.length).toEqual(1);
    expect(compiled.querySelector('main').classList[0]).toEqual(
      'layout-container'
    );
  });

  it('change perfil should call reset perfil and redirect to perfil select', () => {
    spyOn(authFacade, 'resetPerfil');
    component.changePerfil();
    expect(authFacade.resetPerfil).toHaveBeenCalled();
  });

  it('should call toggle with mobile parameters class', () => {
    spyOn(component, 'getInnerWidth').and.returnValue(900);
    spyOn(component, 'setClassListToggle');
    component.toggle();
    expect(component.setClassListToggle).toHaveBeenCalledWith(
      'layout-mobile-active',
      'layout-static-inactive'
    );
  });

  it('should call toggle with desktop parameters class', () => {
    spyOn(component, 'getInnerWidth').and.returnValue(1000);
    let toggleSpy = spyOn(component, 'setClassListToggle');
    component.toggle();
    expect(toggleSpy).toHaveBeenCalledWith(
      'layout-static-inactive',
      'layout-mobile-active'
    );
  });
});
