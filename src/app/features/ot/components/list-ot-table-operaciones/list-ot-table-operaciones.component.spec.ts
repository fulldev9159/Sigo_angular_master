import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOtTableOperacionesComponent } from './list-ot-table-operaciones.component';

describe('ListOtTableOperacionesComponent', () => {
  let component: ListOtTableOperacionesComponent;
  let fixture: ComponentFixture<ListOtTableOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOtTableOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOtTableOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
