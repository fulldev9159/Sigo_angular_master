import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Pep2Component } from './pep2.component';

describe('Pep2Component', () => {
  let component: Pep2Component;
  let fixture: ComponentFixture<Pep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers:[ {
        provide: 'environment',
        useValue: {},
      }],
      declarations: [ Pep2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});