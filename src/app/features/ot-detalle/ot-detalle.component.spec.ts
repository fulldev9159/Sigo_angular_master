import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtComponent } from './ot-detalle.component';

describe('OtComponent', () => {
  let component: OtComponent;
  let fixture: ComponentFixture<OtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
