import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { getTipoCubicacion } from '@storeOT/cubicacion/cubicacion.selectors';
import { getContratosUsuario } from '@storeOT/usuario/ususario.selectors';
import { FormularioComponent } from './formulario.component';
import {
  getAgenciasContratoMOCK200OK,
  getProveedoresAgenciaContratoMOCK200OK,
  tipoCubicacionMOCK200OK,
} from '@mocksOT';
import { ContratosUsuarioMOCK200OK } from 'src/mocks/usuario';
import { FormularioService } from 'src/app/core/service/formulario.service';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { getProveedoresAgenciasContrato } from '@storeOT/proveedor/proveedor.selectors';
import { ProveedorFacade } from '@storeOT/proveedor/proveedor.facades';
import { getAgenciasContrato } from '@storeOT/contrato/contrato.selectors';
import {
  sendingGetAgenciasContrato,
  sendingGetProveedorAgenciasContrato,
} from '@storeOT/loadings/loadings.selectors';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let usuarioFacade: UsuarioFacade;
  let cubicacionFacade: CubicacionFacade;
  let contratoFacade: ContratoFacade;
  let initialState: any = { tipoCubicaciones: [] };
  let formService: FormularioService;
  let proveedorFacade: ProveedorFacade;

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
            {
              selector: getContratosUsuario,
              value: ContratosUsuarioMOCK200OK.data.items,
            },
            {
              selector: sendingGetAgenciasContrato,
              value: false,
            },
            {
              selector: getAgenciasContrato,
              value: getAgenciasContratoMOCK200OK.data.items,
            },
            {
              selector: getProveedoresAgenciasContrato,
              value: getProveedoresAgenciaContratoMOCK200OK.data.items,
            },
            { selector: sendingGetProveedorAgenciasContrato, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    usuarioFacade = TestBed.inject(UsuarioFacade);
    cubicacionFacade = TestBed.inject(CubicacionFacade);
    formService = TestBed.inject(FormularioService);
    contratoFacade = TestBed.inject(ContratoFacade);
    proveedorFacade = TestBed.inject(ProveedorFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call resetControls with agencia, cmarcoproveedor_id,table as parameters if change contrato', () => {
    let formServiceSpy = spyOn(formService, 'resetControls');
    component.formCub.get('contrato').setValue(1);
    fixture.detectChanges();
    expect(formServiceSpy).toHaveBeenCalledWith(component.formCub, [
      'agencia_id',
      'cmarcoproveedor_id',
      'table',
    ]);
  });

  it('should disabled controls agencia', () => {});

  it('should call getAgencias if change contrato', () => {
    let getAgenciaSpy = spyOn(contratoFacade, 'getAgenciasContrato');
    component.formCub.get('contrato').setValue(1);
    fixture.detectChanges();
    expect(getAgenciaSpy).toHaveBeenCalled();
  });
  // si no trae contratos debe bloquear todo
  // dependiendo del contrato debe desplegar direccion

  it('should call getProveedoresAgenciaContrato if change agencia', () => {
    let getSpy = spyOn(proveedorFacade, 'getProveedoresAgenciaContrato');
    component.formCub.get('agencia_id').setValue(1);
    fixture.detectChanges();
    expect(getSpy).toHaveBeenCalled();
  });
});
