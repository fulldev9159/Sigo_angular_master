import { ComponentFixture, TestBed } from '@angular/core/testing';
import { detalleCubicacionMOCK200Ok, DetalleOTBucleMOCK200ok } from '@mocksOT';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { detalleOT } from '@storeOT/ot-detalle/ot-detalle.selectors';

import { MenuDetalleOtComponent } from './menu-detalle-ot.component';

let initialState: any = { example: [] };

describe('MenuDetalleOtComponent', () => {
  let component: MenuDetalleOtComponent;
  let fixture: ComponentFixture<MenuDetalleOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [MenuDetalleOtComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: detalleOT,
              value: DetalleOTBucleMOCK200ok.data,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuDetalleOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
