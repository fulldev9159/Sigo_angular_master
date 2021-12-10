import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeAvanceComponent } from './informe-avance.component';

describe('InformeAvanceComponent', () => {
  let component: InformeAvanceComponent;
  let fixture: ComponentFixture<InformeAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformeAvanceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
