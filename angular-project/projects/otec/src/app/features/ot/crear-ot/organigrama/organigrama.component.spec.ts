import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {OrganigramaComponent } from './organigrama.component';

describe('CubicacionPlanComponent', () => {
  let component: OrganigramaComponent;
  let fixture: ComponentFixture<OrganigramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers:[ {
        provide: 'environment',
        useValue: {},
      }],
      declarations: [ OrganigramaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganigramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});