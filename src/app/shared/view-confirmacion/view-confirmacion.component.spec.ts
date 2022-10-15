import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfirmacionComponent } from './view-confirmacion.component';

describe('ViewConfirmacionComponent', () => {
  let component: ViewConfirmacionComponent;
  let fixture: ComponentFixture<ViewConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConfirmacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
