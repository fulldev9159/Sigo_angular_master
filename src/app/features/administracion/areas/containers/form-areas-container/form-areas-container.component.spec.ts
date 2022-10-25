import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { FormAreasContainerComponent } from './form-areas-container.component';

describe('FormAreasContainerComponent', () => {
  let component: FormAreasContainerComponent;
  let fixture: ComponentFixture<FormAreasContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [FormAreasContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAreasContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
