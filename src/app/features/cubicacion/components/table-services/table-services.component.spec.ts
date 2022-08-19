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
              value: null,
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
