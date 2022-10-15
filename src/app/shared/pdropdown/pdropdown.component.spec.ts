import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdropdownComponent } from './pdropdown.component';

describe('PdropdownComponent', () => {
  let component: PdropdownComponent;
  let fixture: ComponentFixture<PdropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdropdownComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
