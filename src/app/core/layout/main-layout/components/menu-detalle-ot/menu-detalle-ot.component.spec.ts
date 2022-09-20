import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDetalleOtComponent } from './menu-detalle-ot.component';

describe('MenuDetalleOtComponent', () => {
  let component: MenuDetalleOtComponent;
  let fixture: ComponentFixture<MenuDetalleOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDetalleOtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDetalleOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
