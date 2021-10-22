import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCosteoComponent } from './info-costeo.component';

describe('InfoCosteoComponent', () => {
  let component: InfoCosteoComponent;
  let fixture: ComponentFixture<InfoCosteoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCosteoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCosteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
