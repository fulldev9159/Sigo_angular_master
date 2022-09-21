import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  getBandejaOTAbiertas,
  getBandejaOTAnuladas,
  getBandejaOTCerradas,
  getBandejaOTEjecucion,
  getBandejaOTQuebradas,
} from '@storeOT/ot/ot.selectors';

import { ListOtContainerComponent } from './list-ot-container.component';

let initialState: any = { example: [] };

describe('ListOtContainerComponent', () => {
  let component: ListOtContainerComponent;
  let fixture: ComponentFixture<ListOtContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      declarations: [ListOtContainerComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getBandejaOTEjecucion,
              value: [], // TODO
            },
            {
              selector: getBandejaOTAbiertas,
              value: [], // TODO
            },
            {
              selector: getBandejaOTCerradas,
              value: [], // TODO
            },
            {
              selector: getBandejaOTAnuladas,
              value: [], // TODO
            },
            {
              selector: getBandejaOTQuebradas,
              value: [], // TODO
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOtContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
