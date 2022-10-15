import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleInt should emit', () => {
    spyOn(component.toggle, 'emit');
    component.toggleInt();
    expect(component.toggle.emit).toHaveBeenCalled();
  });

  it('logoutInt should emit', () => {
    spyOn(component.logout, 'emit');
    component.logoutInt();
    expect(component.logout.emit).toHaveBeenCalled();
  });

  it('changePerfilInt should emit', () => {
    spyOn(component.changePerfil, 'emit');
    component.changePerfilInt();
    expect(component.changePerfil.emit).toHaveBeenCalled();
  });
});
