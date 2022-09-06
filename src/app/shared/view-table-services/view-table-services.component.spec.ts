import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTableServicesComponent } from './view-table-services.component';

describe('ViewTableServicesComponent', () => {
  let component: ViewTableServicesComponent;
  let fixture: ComponentFixture<ViewTableServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTableServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
