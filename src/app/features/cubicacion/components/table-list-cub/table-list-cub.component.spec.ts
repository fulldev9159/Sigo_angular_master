import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { listaCubicacionesMOCK200ok } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { listarCubicaciones } from '@storeOT/cubicacion/cubicacion.selectors';
import { sendingGetCubicaciones } from '@storeOT/loadings/loadings.selectors';

import { TableListComponent } from './table-list-cub.component';
let initialState: any = { example: [] };

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      providers: [
        { provide: LOCALE_ID, useValue: 'es-CL' },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: listarCubicaciones,
              value: listaCubicacionesMOCK200ok.data.items,
            },
            {
              selector: sendingGetCubicaciones,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if put "D" in search by nombre should return 2 item in the list', (done: DoneFn) => {
    component.formFilter.get('nombre').setValue('D');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(3);
        done();
      },
    });
  });
});
