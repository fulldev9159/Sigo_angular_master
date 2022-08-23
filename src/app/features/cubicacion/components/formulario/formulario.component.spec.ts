import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { getTipoCubicacion } from '@storeOT/cubicacion/cubicacion.selectors';
import { getContratosUsuario } from '@storeOT/usuario/ususario.selectors';
import { FormularioComponent } from './formulario.component';
import {
  getAgenciasContratoMOCK200OK2,
  getProveedoresAgenciaContratoMOCK200OK2,
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
              value: getAgenciasContratoMOCK200OK2.data.items,
            },
            {
              selector: getProveedoresAgenciasContrato,
              value: getProveedoresAgenciaContratoMOCK200OK2.data.items,
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

  it('should contratoUsuarios$ have to be in order asc', (done: DoneFn) => {
    component.contratoUsuarios$.subscribe({
      next: respose => {
        expect(respose[0].name).toEqual('BUCLE');
        expect(respose[1].name).toEqual('CONTRATO_ORDINARIO');
        expect(respose[2].name).toEqual('SBE_2018');
        expect(respose[3].name).toEqual('UNIFICADO_FIJA');
        expect(respose[4].name).toEqual('UNIFICADO_MOVIL');
        done();
      },
    });
  });

  it('should call contratoSelected facade with data contrato BUCLE', () => {
    spyOn(cubicacionFacade, 'contratoSelected');
    component.formCub.get('contrato').setValue(9); //BUCLE
    fixture.detectChanges();
    let contratoSelected = ContratosUsuarioMOCK200OK.data.items.find(
      contrato => contrato.contrato_id === 9
    );
    expect(cubicacionFacade.contratoSelected).toHaveBeenCalledWith(
      contratoSelected
    );
  });

  it('if contract isnt BUCLE should call removeValidatos for direction section', () => {
    spyOn(formService, 'removeValidators');
    component.formCub.get('contrato').setValue(2); // CONTRATO_ORDINARIO
    fixture.detectChanges();
    expect(formService.removeValidators).toHaveBeenCalledWith(
      component.formCub,
      [
        'direcciondesde',
        'direcciondesdealtura',
        'direccionhasta',
        'direccionhastaaltura',
      ]
    );
  });

  it('should call getAgenciasContrato facade with data contrato BUCLE', () => {
    spyOn(contratoFacade, 'getAgenciasContrato');
    component.formCub.get('contrato').setValue(9); //BUCLE
    fixture.detectChanges();
    expect(contratoFacade.getAgenciasContrato).toHaveBeenCalledWith(9);
  });

  it('should call getProveedoresAgenciaContrato if change agencia', () => {
    spyOn(proveedorFacade, 'getProveedoresAgenciaContrato');
    spyOn(cubicacionFacade, 'agenciaSelected');
    component.formCub.get('contrato').setValue(9); //BUCLE
    component.formCub.get('agencia_id').setValue(20); //APOQUINDO
    fixture.detectChanges();

    let agenciaSelected = getAgenciasContratoMOCK200OK2.data.items.find(
      agencia => agencia.id === 20
    );
    expect(cubicacionFacade.agenciaSelected).toHaveBeenCalledWith(
      agenciaSelected
    );
    expect(proveedorFacade.getProveedoresAgenciaContrato).toHaveBeenCalledWith(
      20,
      9
    );
  });

  // it('should call resetControls with agencia, cmarcoproveedor_id,table as parameters if change contrato', () => {
  //   let formServiceSpy = spyOn(formService, 'resetControls');
  //   component.formCub.get('contrato').setValue(1);
  //   fixture.detectChanges();
  //   expect(formServiceSpy).toHaveBeenCalledWith(component.formCub, [
  //     'agencia_id',
  //     'cmarcoproveedor_id',
  //   ]);
  // });

  // it('should disabled controls agencia', () => {});

  // // si no trae contratos debe bloquear todo
  // // dependiendo del contrato debe desplegar direccion
});
