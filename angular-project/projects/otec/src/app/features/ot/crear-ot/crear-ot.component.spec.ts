import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOtComponent } from './crear-ot.component';

describe('CrearOtComponent', () => {
  let component: CrearOtComponent;
  let fixture: ComponentFixture<CrearOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
