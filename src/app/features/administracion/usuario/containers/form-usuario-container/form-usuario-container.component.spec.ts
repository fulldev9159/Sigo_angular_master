import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environment';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  getContratosUsuario,
  getUser,
  getAllProveedores4CreateUser,
  getallAreas4createUser,
  getAllGuiasSubgrupo,
  getPosiblesContratosUser4CreateEdit,
} from '@storeOT/usuario/ususario.selectors';

import { FormUsuarioContainerComponent } from './form-usuario-container.component';

let initialState: any = { example: [] };

describe('FormUsuarioContainerComponent', () => {
  let component: FormUsuarioContainerComponent;
  let fixture: ComponentFixture<FormUsuarioContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        { provide: 'environment', useValue: environment },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getContratosUsuario,
              value: null,
            },
            { selector: getUser, value: null },
            {
              selector: getAllProveedores4CreateUser,
              value: null,
            },
            {
              selector: getallAreas4createUser,
              value: null,
            },
            {
              selector: getAllGuiasSubgrupo,
              value: null,
            },
            {
              selector: getPosiblesContratosUser4CreateEdit,
              value: null,
            },
          ],
        }),
      ],
      declarations: [FormUsuarioContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormUsuarioContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
