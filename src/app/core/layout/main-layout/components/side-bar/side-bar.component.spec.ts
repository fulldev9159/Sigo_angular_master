import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { showMenuDetalleOT } from '@storeOT/auth/auth.selectors';

import { SideBarComponent } from './side-bar.component';

let initialState: any = { example: [] };

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [StoreModule.forRoot({})],
      declarations: [SideBarComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: showMenuDetalleOT,
              value: false,
            },
          ],
        }),
      ],
    }).compileComponents();

    localStorage.setItem(
      'auth',
      JSON.stringify({
        sessionData: {
          nombre_perfil_select: 'Gestor/JP',
          perfil_proxy_id: 2,
          permisos: [
            {
              id: 1,
              slug: 'OT_LISTAR',
              nombre_corto: 'Listar',
              descripcion: 'Poder visualizar OT',
            },
          ],
          rol: 'Gestor/JP (Telefónica)',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjAxODU3NjYsImlzcyI6InNpZ28iLCJuYmYiOjE2NjAxODIxNjY',
          usuario_id: 2,
          usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
        },
      })
    );

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
