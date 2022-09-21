import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { getPosibleSupervisorDeTrabajos } from '@storeOT/flujo-ot/flujo-ot.selectors';
import { sendingGetPosibleSupervisorTrabajos } from '@storeOT/loadings/loadings.selectors';

import { ListOtTableOperacionesComponent } from './list-ot-table-operaciones.component';

let initialState: any = { example: [] };

describe('ListOtTableOperacionesComponent', () => {
  let component: ListOtTableOperacionesComponent;
  let fixture: ComponentFixture<ListOtTableOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), FormsModule, ReactiveFormsModule],
      declarations: [ListOtTableOperacionesComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getPosibleSupervisorDeTrabajos,
              value: [], // TODO
            },
            {
              selector: sendingGetPosibleSupervisorTrabajos,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOtTableOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
