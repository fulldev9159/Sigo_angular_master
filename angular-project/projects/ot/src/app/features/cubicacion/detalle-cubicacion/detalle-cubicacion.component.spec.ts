import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCubicacionComponent } from './detalle-cubicacion.component';

describe('DetalleCubicacionComponent', () => {
  let component: DetalleCubicacionComponent;
  let fixture: ComponentFixture<DetalleCubicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCubicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
