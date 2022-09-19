import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOtFiltrosComponent } from './list-ot-filtros.component';

describe('ListOtFiltrosComponent', () => {
  let component: ListOtFiltrosComponent;
  let fixture: ComponentFixture<ListOtFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOtFiltrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOtFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
