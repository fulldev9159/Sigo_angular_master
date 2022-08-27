import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { carrito } from '@storeOT/servicios/servicios.selectors';

import { TableServicesComponent } from './table-services.component';

describe('TableServicesComponent', () => {
  let component: TableServicesComponent;
  let fixture: ComponentFixture<TableServicesComponent>;
  let initialState: any = { example: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [TableServicesComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: carrito,
              value: [
                {
                  servicio_id: 196,
                  servicio_precio_final_clp: 4913.72,
                  servicio_nombre:
                    'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
                  actividad_descripcion: 'MATRIZ',
                  tipo_servicio_descripcion: 'CABLES',
                  unidad_obras: [
                    {
                      uo_codigo: 'D241',
                      uo_nombre: 'BLOCK PROT.100/P QDF MONDRAGON',
                      uo_precio_total_clp: 57200.64,
                    },
                  ],
                },
                {
                  servicio_id: 196,
                  servicio_precio_final_clp: 4913.72,
                  servicio_nombre:
                    'PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
                  actividad_descripcion: 'MATRIZ',
                  tipo_servicio_descripcion: 'CABLES',
                  unidad_obras: [
                    {
                      uo_codigo: 'D240',
                      uo_nombre: 'MODULO PROT.GAS. QDF MONDRAGON',
                      uo_precio_total_clp: 3200,
                    },
                  ],
                },
              ],
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TableServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
