import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableServiciosComponent } from './table-servicios.component';

describe('TableServiciosComponent', () => {
  let component: TableServiciosComponent;
  let fixture: ComponentFixture<TableServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
