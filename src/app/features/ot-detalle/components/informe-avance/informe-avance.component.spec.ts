import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { InformeAvanceComponent } from './informe-avance.component';

describe('InformeAvanceComponent', () => {
  let component: InformeAvanceComponent;
  let fixture: ComponentFixture<InformeAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [InformeAvanceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InformeAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
