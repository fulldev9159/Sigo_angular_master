import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OTFacade } from '@storeOT/ot/ot.facades';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Subscription } from 'rxjs';

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
      numeros_internos: new FormControl([]),
    }),
  });

  constructor(private otFacade: OTFacade) {}

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
