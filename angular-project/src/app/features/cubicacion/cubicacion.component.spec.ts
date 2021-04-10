import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CubicacionComponent } from './cubicacion.component';

describe('CubicacionComponent', () => {
  let component: CubicacionComponent;
  let fixture: ComponentFixture<CubicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CubicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CubicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
