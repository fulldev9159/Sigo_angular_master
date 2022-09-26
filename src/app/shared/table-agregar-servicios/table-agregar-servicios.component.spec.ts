import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAgregarServiciosComponent } from './table-agregar-servicios.component';

describe('TableAgregarServiciosComponent', () => {
  let component: TableAgregarServiciosComponent;
  let fixture: ComponentFixture<TableAgregarServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAgregarServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAgregarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
