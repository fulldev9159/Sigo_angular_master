import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environment';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { modalPermisosPerfil } from '@storeOT/perfil/perfil.selectors';

import { ListPerfilesContainerComponent } from './list-perfiles-container.component';

let initialState: any = { example: [] };

describe('ListPerfilesContainerComponent', () => {
  let component: ListPerfilesContainerComponent;
  let fixture: ComponentFixture<ListPerfilesContainerComponent>;

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
              selector: modalPermisosPerfil,
              value: null,
            },
          ],
        }),
      ],
      declarations: [ListPerfilesContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPerfilesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
