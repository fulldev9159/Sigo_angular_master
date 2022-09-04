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

  it('if put "D" in search by nombre should return 3 item in the list', (done: DoneFn) => {
    component.formFilter.get('nombre').setValue('D');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(3);
        done();
      },
    });
  });

  it('if put "" after search "D" in search by nombre should return 8 item in the list', (done: DoneFn) => {
    component.formFilter.get('nombre').setValue('D');
    fixture.detectChanges();
    component.formFilter.get('nombre').setValue('');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(8);
        done();
      },
    });
  });

  it('if put "2" in search by id should return 1 item in the list', (done: DoneFn) => {
    component.formFilter.get('cubicacion_id').setValue(2);
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(1);
        done();
      },
    });
  });

  it('if put "" after search "2" in search by id should return 8 item in the list', (done: DoneFn) => {
    component.formFilter.get('cubicacion_id').setValue(2);
    fixture.detectChanges();
    component.formFilter.get('cubicacion_id').setValue('');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(8);
        done();
      },
    });
  });

  it('if put "BUCLE" in search by contrato marco should return 6 item in the list', (done: DoneFn) => {
    component.formFilter.get('contrato_marco').setValue('BUCLE');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(6);
        done();
      },
    });
  });

  it('if put "" after search "BUCLE" in search by contrato marco should return 8 item in the list', (done: DoneFn) => {
    component.formFilter.get('contrato_marco').setValue('BUCLE');
    fixture.detectChanges();
    component.formFilter.get('contrato_marco').setValue('');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(8);
        done();
      },
    });
  });

  it('if put "FULL" in search by contrato marco should return 3 item in the list', (done: DoneFn) => {
    component.formFilter.get('tipo_cubicacion').setValue('Full');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(3);
        done();
      },
    });
  });

  it('if put "" after search "FULL" in search by contrato marco should return 8 item in the list', (done: DoneFn) => {
    component.formFilter.get('tipo_cubicacion').setValue('Full');
    fixture.detectChanges();
    component.formFilter.get('tipo_cubicacion').setValue('');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(8);
        done();
      },
    });
  });

  it('if put "APOQUINDO" in search by contrato marco should return 6 item in the list', (done: DoneFn) => {
    component.formFilter.get('agencia').setValue('APOQUINDO');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(6);
        done();
      },
    });
  });

  it('if put "" after search "APOQUINDO" in search by contrato marco should return 8 item in the list', (done: DoneFn) => {
    component.formFilter.get('agencia').setValue('APOQUINDO');
    fixture.detectChanges();
    component.formFilter.get('agencia').setValue('');
    fixture.detectChanges();
    component.cubicaciones$.subscribe({
      next: res => {
        expect(res.length).toEqual(8);
        done();
      },
    });
  });
});
