import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';

import { FormularioComponent } from './formulario.component';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let usuarioFacade: UsuarioFacade;
  let cubicacionFacade: CubicacionFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [FormularioComponent],
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
