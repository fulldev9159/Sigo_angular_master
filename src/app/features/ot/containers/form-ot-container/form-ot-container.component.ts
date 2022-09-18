import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormularioOtBaseComponent } from '../../components/formulario-ot-base/formulario-ot-base.component';
import { FormularioOtMovilComponent } from '../../components/formulario-ot-movil/formulario-ot-movil.component';

// TODO: VERIFIXAR COMPORTAMIENTO AL NAVEGAR: RESETEO DE TODO
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
  @ViewChild('baseForm', {
    read: FormularioOtBaseComponent,
    static: false,
  })
  baseForm: FormularioOtBaseComponent;

  @ViewChild('movilForm', {
    read: FormularioOtMovilComponent,
    static: false,
  })
  movilForm: FormularioOtMovilComponent;

  // DATA
  cubiacionSelected$ = this.otFacade.cubicacionSelected$();

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
    extras: new FormGroup({
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
      proyecto_id: new FormControl(null, []),
      observaciones: new FormControl(null, []),
      admin_contrato_id: new FormControl(null, []),
    }),
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
    return true;
  }

  createOT(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
