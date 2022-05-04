import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter, withLatestFrom, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Cubicacion, ContratosUser, Cubs4OT } from '@data';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  contratosUser4OT$: Observable<ContratosUser[]>;
  // cubicaciones$: Observable<Cubs4OT[]>;
  cubicaciones$: Observable<Cubicacion[]> = of([
    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 1,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Móvil',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 1,
      cubicacion_nombre: 'CubMovil',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },

    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 2,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Ordinario',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 2,
      cubicacion_nombre: 'CubOrdinario',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },
    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 3,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Fijo',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 3,
      cubicacion_nombre: 'CubFijo',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },
    {
      agencia_codigo: '25',
      agencia_estado: true,
      agencia_id: 25,
      agencia_nombre: 'RANCAGUA',
      agencia_region_id: 6,
      agencia_region_nombre: 'Región del Libertador General Bernardo O’Higg',
      altura_desde: 'Edit 1714',
      altura_hasta: 'Edit 1817',
      asignado: 0,
      cmarco_has_proveedor_id: 1,
      codigo_acuerdo: '12121212',
      contrato_id: 4,
      contrato_marco_nombre: 'SBE',
      contrato_marco_tipo_id: 1,
      contrato_marco_tipo_nombre: 'Bucle',
      creador_username: 'mgestor1',
      creador_usuario_id: 2,
      creador_usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
      cubicacion_descripcion: 'Edit Cub descripción',
      cubicacion_fecha_creacion: null,
      cubicacion_id: 4,
      cubicacion_nombre: 'CubBucle',
      direccion_desde: 'Edit las casas norte',
      direccion_hasta: 'Edit las casas sur',
      ot_id: -1,
      ot_nombre: '',
      proveedor_id: 2,
      proveedor_nombre: 'COASIN',
      tipo_cubicacion_descripcion: 'Construcción',
      tipo_cubicacion_id: 1,
      total: 72240,
      total_tipo_moneda: 'CLP',
    },
  ]);

  // DISPLAY MODALS

  // FORMULARIO

  // TABLE

  // EXTRAS
  usuario_id = null;

  @Input() form: FormGroup;

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private otFacade: OtFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.form.get('cubicacion_id').disable({ emitEvent: false });
    this.onInitGetData();
    this.onInitSetData();
    this.onInitAccionesInicialesAdicionales();
  }

  onInitGetData(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        this.usuario_id = loginAuth.usuario_id;
        this.otFacade.contratosUser4OT(+loginAuth.usuario_id);
      })
    );
  }

  onInitSetData(): void {
    this.contratosUser4OT$ = this.otFacade.contratosUser4OT$();
    this.cubicaciones$ = this.otFacade
      .cubicaciones4OT$()
      .pipe(tap(data => this.checkAndEnable('cubicacion_id', data)));
  }

  onInitAccionesInicialesAdicionales(): void {
    this.subscription.add(
      this.form.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.form.get('cubicacion_id').enable();
          this.otFacade.cubicaciones4OT(+contrato_id);
        } else {
          // this.checkAndEnable('agencia_id', []);
        }
      })
    );
  }

  checkAndEnable(key: string, array: any[]): void {
    if (array.length > 0) {
      this.form.get(key).enable();
    } else {
      this.form.get(key).disable();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }
}
