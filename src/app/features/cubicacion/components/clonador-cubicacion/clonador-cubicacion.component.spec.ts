import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonadorCubicacionComponent } from './clonador-cubicacion.component';

describe('ClonadorCubicacionComponent', () => {
  let component: ClonadorCubicacionComponent;
  let fixture: ComponentFixture<ClonadorCubicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClonadorCubicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClonadorCubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
