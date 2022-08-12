import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { getTipoCubicacion } from '@storeOT/cubicacion/cubicacion.selectors';
import { FormularioComponent } from './formulario.component';
import { tipoCubicacionMOCK200OK } from '@mocksOT';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let usuarioFacade: UsuarioFacade;
  let cubicacionFacade: CubicacionFacade;
  let initialState: any = { tipoCubicaciones: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [FormularioComponent],
      providers: [
        provideMockStore({
          initialState,
          selectors: [
            {
              selector: getTipoCubicacion,
              value: tipoCubicacionMOCK200OK.data.items,
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    usuarioFacade = TestBed.inject(UsuarioFacade);
    cubicacionFacade = TestBed.inject(CubicacionFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
