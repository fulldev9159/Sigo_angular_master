import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ContratosUser, TipoCubicacion } from '@model';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
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

  constructor(
    private formularioService: FormularioService,
    private usuarioFacade: UsuarioFacade,
    private cubicacionFacade: CubicacionFacade,
    private contratoFacade: ContratoFacade
  ) {}

  ngOnInit(): void {
    this.formObserver();
  }

  formObserver(): void {
    this.subscription.add(
      this.formCub.get('contrato').valueChanges.subscribe(contrato_id => {
        this.formularioService.resetControls(this.formCub, [
          'agencia_id',
          'cmarcoproveedor_id',
          'table',
        ]);
        if (contrato_id && contrato_id !== null) {
          this.contratoFacade.getAgenciasContrato(+contrato_id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
