import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from '@sharedOT/validators';
import {
  CreateOTBase,
  CubicacionContrato,
  RequestCreateOTBucle,
  RequestCreateOTFijo,
  RequestCreateOTMovil,
  RequestCreateOTOrdinario,
} from '@model';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { FormularioOtBaseComponent } from '../../components/formulario-ot-base/formulario-ot-base.component';
import { FormularioOtBucleComponent } from '../../components/formulario-ot-bucle/formulario-ot-bucle.component';
import { FormularioOtExtrasComponent } from '../../components/formulario-ot-extras/formulario-ot-extras.component';
import { FormularioOtFijoComponent } from '../../components/formulario-ot-fijo/formulario-ot-fijo.component';
import { FormularioOtMovilComponent } from '../../components/formulario-ot-movil/formulario-ot-movil.component';
import { FormularioOtOrdinarioComponent } from '../../components/formulario-ot-ordinario/formulario-ot-ordinario.component';
import { FormularioOtSustentoFinancieroComponent } from '../../components/formulario-ot-sustento-financiero/formulario-ot-sustento-financiero.component';

// 89 TODO: VERIFICAR COMPORTAMIENTO AL NAVEGAR: RESETEO DE TODO
// 90 TODO: PROBAR LAS DEMAS CREACIONES DE OT
@Component({
  selector: 'zwc-form-ot-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-ot-container.component.html',
  styleUrls: ['./form-ot-container.component.scss'],
})
export class FormOtContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  navbarHeader: MenuItem[];

  // contractType$ = new BehaviorSubject<string>('');

  // VIEW CHILDS
  @ViewChild(FormularioOtBaseComponent)
  baseForm: FormularioOtBaseComponent;

  @ViewChild(FormularioOtMovilComponent)
  movilForm: FormularioOtMovilComponent;

  @ViewChild(FormularioOtFijoComponent)
  fijaForm: FormularioOtFijoComponent;

  @ViewChild(FormularioOtOrdinarioComponent)
  ordinarioForm: FormularioOtOrdinarioComponent;

  @ViewChild(FormularioOtBucleComponent)
  bucleForm: FormularioOtBucleComponent;

  @ViewChild(FormularioOtSustentoFinancieroComponent)
  sustentoFinancieroForm: FormularioOtSustentoFinancieroComponent;

  @ViewChild(FormularioOtExtrasComponent)
  extrasForm: FormularioOtExtrasComponent;

  // DATA
  cubicacionSelected: CubicacionContrato;
  cubiacionSelected$ = this.otFacade
    .cubicacionSelected$()
    .pipe(tap(values => (this.cubicacionSelected = values)));

  form: FormGroup = new FormGroup({
    base: new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      contrato: new FormControl(null, [Validators.required]),
      cubicacion_id: new FormControl(null, [Validators.required]),
    }),
    bucle: new FormGroup({
      oficina_central_id: new FormControl(null, [Validators.required]),
      solicitante_id: new FormControl(null, [Validators.required]),
      direccion: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      altura: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      piso: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      departamento: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      comuna_id: new FormControl(null, [Validators.required]),
      tipo_red_id: new FormControl(null, [Validators.required]),
      tipo_trabajo_id: new FormControl(null, [Validators.required]),
      tiene_boleta_garantia: new FormControl(false, [Validators.required]),
      tiene_permisos: new FormControl(false, [Validators.required]),
      area_negocio: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      nombre_proyectista: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
    }),
    ordinario: new FormGroup({
      carta_adjudicacion: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      fecha_adjudicacion: new FormControl(null, [Validators.required]),
      numero_pedido: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      materia: new FormControl(null, [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
    }),
    fijo: new FormGroup({
      tipo_numero_interno_id: new FormControl(null, [Validators.required]),
      numero_interno: new FormControl('', [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      ots_numero_interno: new FormControl([]),
    }),
    movil: new FormGroup({
      plan_proyecto_id: new FormControl(null, [Validators.required]),
      sitio_id: new FormControl(null, [Validators.required]),
    }),
    sustentoFinanciero: new FormGroup({
      costos: new FormControl('capex', []),

      pmo_codigo: new FormControl(null, []),
      lp_codigo: new FormControl(null, []),
      pep2_capex_id: new FormControl(null, []),
      pep2_provisorio: new FormControl(null, []),

      id_opex_codigo: new FormControl(null, []),
      cuenta_sap_codigo: new FormControl(null, []),
      ceco_codigo: new FormControl(null, []),
      ceco_provisorio: new FormControl(null, []),
    }),
    extras: new FormGroup(
      {
        fecha_inicio: new FormControl(null, [Validators.required]),
        fecha_fin: new FormControl(null, [Validators.required]),
        proyecto_id: new FormControl(null, []),
        observaciones: new FormControl(null, []),
        admin_contrato_id: new FormControl(null, [Validators.required]),
      },
      [CustomValidators.DateGreaterOrEqualThan('fecha_fin', 'fecha_inicio')]
    ),
  });

  // LOADINGS
  sendingCreateOT$: Observable<boolean> =
    this.loadingsFacade.sendingCreateOT$();

  constructor(
    private otFacade: OTFacade,
    private loadingsFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      {
        label: 'Listar OT',
        icon: 'pi pi-briefcase',
        routerLink: ['/ot'],
      },
      { label: 'Formulario OT', styleClass: 'last-route' },
    ];
  }

  get valid(): boolean {
    if (this.cubicacionSelected)
      if (this.cubicacionSelected.tipo_contrato_marco_nombre === 'Móvil')
        return (
          this.formGeneralValid() && this.movilForm && this.movilForm.valid
        );
      else if (this.cubicacionSelected.tipo_contrato_marco_nombre === 'Fijo')
        return this.formGeneralValid() && this.fijaForm && this.fijaForm.valid;
      else if (
        this.cubicacionSelected.tipo_contrato_marco_nombre === 'Ordinario'
      )
        return (
          this.formGeneralValid() &&
          this.ordinarioForm &&
          this.ordinarioForm.valid
        );
      else if (this.cubicacionSelected.tipo_contrato_marco_nombre === 'Bucle')
        return (
          this.formGeneralValid() && this.bucleForm && this.bucleForm.valid
        );
      else return false;
    else return false;
  }

  formGeneralValid(): boolean {
    return (
      this.baseForm &&
      this.baseForm.valid &&
      this.extrasForm &&
      this.extrasForm.valid &&
      this.sustentoFinancieroForm &&
      this.sustentoFinancieroForm.valid
    );
  }

  createOT(): void {
    const {
      base: { nombre, tipo, cubicacion_id },
      sustentoFinanciero: {
        costos,

        pmo_codigo,
        lp_codigo,
        pep2_capex_id,
        pep2_provisorio,

        id_opex_codigo,
        cuenta_sap_codigo,
        ceco_codigo,
        ceco_provisorio,
      },
      extras: {
        fecha_inicio,
        fecha_fin,
        proyecto_id,
        observaciones,
        admin_contrato_id,
      },
    } = this.form.getRawValue();

    let requestBase: CreateOTBase = {
      adm_contrato_proxy_id: +admin_contrato_id,
      proyecto_id: proyecto_id === null ? null : +proyecto_id,
      nombre: nombre.trim(),
      cubicacion_id: +cubicacion_id,
      observaciones: observaciones === null ? '' : observaciones.trim(),
      fecha_inicio,
      fecha_fin,
      tipo_sustento: costos.toUpperCase(),
      es_sustento_provisorio:
        costos.toUpperCase() === 'CAPEX' ? pep2_provisorio : ceco_provisorio,
      pmo_codigo: costos.toUpperCase() === 'CAPEX' ? +pmo_codigo : pmo_codigo,
      id_opex: id_opex_codigo,
      lp: lp_codigo,
      cuenta_sap:
        costos.toUpperCase() === 'CAPEX'
          ? cuenta_sap_codigo
          : +cuenta_sap_codigo,
      pep2: pep2_capex_id,
      ceco: ceco_codigo,
    };

    if (this.cubicacionSelected)
      this.otFacade.createOT(
        this.makeRequest(
          requestBase,
          this.cubicacionSelected.tipo_contrato_marco_nombre
        )
      );
  }

  makeRequest(
    base: CreateOTBase,
    contrato: string
  ):
    | RequestCreateOTBucle
    | RequestCreateOTFijo
    | RequestCreateOTMovil
    | RequestCreateOTOrdinario
    | undefined {
    if (contrato === 'Móvil') {
      const {
        movil: { plan_proyecto_id, sitio_id },
      } = this.form.getRawValue();
      let request: RequestCreateOTMovil = {
        ot_datos: {
          ...base,
          plan_id: +plan_proyecto_id,
          sitio_plan_id: +sitio_id,
        },
      };
      return request;
    } else if (contrato === 'Fijo') {
      const {
        fijo: { tipo_numero_interno_id },
      } = this.form.getRawValue();
      let request: RequestCreateOTFijo = {
        ot_datos: {
          ...base,
        },
        ot_numero_interno: {
          tipo_numero_interno_id: +tipo_numero_interno_id,
          numero_interno: this.fijaForm.OTsNumetoInterno.map(
            numeros => numeros.numero_interno
          ),
        },
      };
      return request;
    } else if (contrato === 'Ordinario') {
      const {
        ordinario: {
          carta_adjudicacion,
          fecha_adjudicacion,
          numero_pedido,
          materia,
        },
      } = this.form.getRawValue();
      let request: RequestCreateOTOrdinario = {
        ot_datos: {
          ...base,
          carta_adjudicacion: carta_adjudicacion.trim(),
          fecha_adjudicacion,
          numero_pedido: numero_pedido.trim(),
          materia: materia.trim(),
        },
      };
      return request;
    } else if (contrato === 'Bucle') {
      const {
        bucle: {
          oficina_central_id,
          solicitante_id,
          direccion,
          altura,
          piso,
          departamento,
          comuna_id,
          tipo_red_id,
          tipo_trabajo_id,
          tiene_boleta_garantia,
          tiene_permisos,
          area_negocio,
          nombre_proyectista,
        },
      } = this.form.getRawValue();
      let request: RequestCreateOTBucle = {
        ot_datos: {
          ...base,
          oficina_central_id: +oficina_central_id,
          solicitante_id: +solicitante_id,
          direccion: direccion.trim(),
          altura: altura.trim(),
          piso: piso.trim(),
          departamento: departamento.trim(),
          comuna_id: +comuna_id,
          tipo_red_id: +tipo_red_id,
          tipo_trabajo_id: +tipo_trabajo_id,
          tiene_boleta_garantia,
          tiene_permisos,
          area_negocio: area_negocio.toString(),
          nombre_proyectista: nombre_proyectista.trim(),
        },
      };
      return request;
    } else {
      return undefined;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
