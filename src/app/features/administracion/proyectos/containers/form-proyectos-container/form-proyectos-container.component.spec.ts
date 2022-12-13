import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';

import { FormPerfilesContainerComponent } from './form-perfiles-container.component';
import { of } from 'rxjs';
import { environment } from '@environment';
import {
  AllRoles4createEditPerfil,
  PermisosRol4createEditPerfil,
  getPermisosPerfil,
  getProfiles,
} from '@storeOT/perfil/perfil.selectors';

let initialState: any = { example: [] };
const route = { data: of({}) };

describe('FormPerfilesContainerComponent', () => {
  let component: FormPerfilesContainerComponent;
  let fixture: ComponentFixture<FormPerfilesContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      providers: [
        { provide: 'environment', useValue: environment },
        { provide: ActivatedRoute, useValue: route },
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: PermisosRol4createEditPerfil,
              value: null,
            },
            {
              selector: AllRoles4createEditPerfil,
              value: null,
            },
            {
              selector: getPermisosPerfil,
              value: null,
            },
            {
              selector: getProfiles,
              value: null,
            },
          ],
        }),
      ],
      declarations: [FormPerfilesContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormPerfilesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
