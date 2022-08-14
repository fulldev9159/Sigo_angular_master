import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { ProveedorFacade } from '@storeOT/proveedor/proveedor.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { map, Observable, Subscription, take } from 'rxjs';
import { FormularioService } from 'src/app/core/service/formulario.service';

interface Dropdown {
  name: string;
  code: number;
}
@Component({
  selector: 'zwc-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnDestroy, OnInit {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  contratoUsuarios$: Observable<Dropdown[]> = this.usuarioFacade
    .getContratosUsuario$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.model_contrato_id.nombre > b.model_contrato_id.nombre
                ? 1
                : b.model_contrato_id.nombre > a.model_contrato_id.nombre
                ? -1
                : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: value.model_contrato_id.nombre,
              code: value.contrato_id,
            }))
          : []
      ),
      take(1)
    );

  tipoCubicacion$: Observable<Dropdown[]> = this.cubicacionFacade
    .getTipoCubicacion$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.descripcion > b.descripcion
                ? 1
                : b.descripcion > a.descripcion
                ? -1
                : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: value.descripcion,
              code: value.id,
            }))
          : []
      ),
      take(1)
    );

  agenciasContrato$: Observable<Dropdown[]> = this.contratoFacade
    .getAgenciasContrato$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: value.nombre,
              code: value.id,
            }))
          : []
      )
    );

  proveedoresAgenciaContrato$: Observable<Dropdown[]> = this.proveedorFacade
    .getProveedoresAgenciaContrato$()
    .pipe(
      map(values => {
        let tmp = [...values];
        return tmp.length > 0
          ? tmp.sort((a, b) =>
              a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
            )
          : [];
      }),
      map(values =>
        values.length > 0
          ? values.map(value => ({
              name: `${value.codigo_acuerdo} - ${value.nombre}`,
              code: value.cmarco_has_proveedor_id,
            }))
          : []
      )
    );

  // FORMULARIO

  formCubControl = {
    id: new FormControl(null),
    nombre: new FormControl(null, [
      Validators.required,
      this.formularioService.noWhitespace,
      Validators.maxLength(300),
    ]),
    tipocubicacion: new FormControl(null, [Validators.required]),
    direcciondesde: new FormControl(null, []),
    direcciondesdealtura: new FormControl(null, []),
    direccionhasta: new FormControl(null, []),
    direccionhastaaltura: new FormControl(null, []),
    descripcion: new FormControl(null, [Validators.required]),
    contrato: new FormControl(null, [Validators.required]),
    agencia_id: new FormControl(null, [Validators.required]),
    cmarcoproveedor_id: new FormControl(null, [Validators.required]),
    table: new FormArray([]),
  };

  formCub: FormGroup = new FormGroup(this.formCubControl);

  // LOADINGS
  getAgenciaContratoLoading$: Observable<boolean> =
    this.loadingFacade.sendingGetAgenciasContrato$();
  getProveedoresAgenciaContratoLoading$: Observable<boolean> =
    this.loadingFacade.sendingGetProveedoresAgenciasContrato$();

  constructor(
    private formularioService: FormularioService,
    private usuarioFacade: UsuarioFacade,
    private cubicacionFacade: CubicacionFacade,
    private contratoFacade: ContratoFacade,
    private loadingFacade: LoadingsFacade,
    private proveedorFacade: ProveedorFacade
  ) {}

  ngOnInit(): void {
    this.formObserver();
  }

  formObserver(): void {
    // CONTRATO MARCO
    this.subscription.add(
      this.formCub.get('contrato').valueChanges.subscribe(contrato_id => {
        this.formularioService.resetControls(this.formCub, [
          'agencia_id',
          'cmarcoproveedor_id',
        ]);
        if (contrato_id && contrato_id !== null) {
          this.contratoFacade.getAgenciasContrato(+contrato_id);
        }
      })
    );
    // AGENCIA
    this.subscription.add(
      this.formCub.get('agencia_id').valueChanges.subscribe(agencia_id => {
        this.formularioService.resetControls(this.formCub, [
          'cmarcoproveedor_id',
        ]);
        if (agencia_id && agencia_id !== null) {
          let contrato_id = +this.formCub.get('contrato').value;
          this.proveedorFacade.getProveedoresAgenciaContrato(
            +agencia_id,
            contrato_id
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
