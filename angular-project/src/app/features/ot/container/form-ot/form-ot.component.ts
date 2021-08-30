import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

@Component({
  selector: 'app-form-ot',
  templateUrl: './form-ot.component.html',
  styleUrls: ['./form-ot.component.scss'],
})
export class FormOtComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  contractType$ = new BehaviorSubject<string>('MOVIL');

  form: FormGroup = new FormGroup({
    general: new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        this.noWhitespace,
        Validators.maxLength(100),
      ]),
      tipo: new FormControl(null, [Validators.required]),
      cubicacion_id: new FormControl(null, [Validators.required]),
    }),
    planProyecto: new FormGroup({
      plan_proyecto_id: new FormControl(null, [Validators.required]),
      sitio_id: new FormControl(null, [Validators.required]),
    }),
    sustentoFinanciero: new FormGroup({
      costos: new FormControl('capex', []),

      pmo_codigo: new FormControl(null, [Validators.required]),
      lp_codigo: new FormControl(null, [Validators.required]),
      pep2_capex_id: new FormControl(null, [Validators.required]),
      pep2_provisorio: new FormControl(null, []),

      id_opex_codigo: new FormControl(null, []),
      cuenta_sap_codigo: new FormControl(null, []),
      ceco_codigo: new FormControl(null, []),
      ceco_provisorio: new FormControl(null, []),
    }),
    extras: new FormGroup({
      fecha_inicio: new FormControl(null, [Validators.required]),
      fecha_fin: new FormControl(null, [Validators.required]),
      proyecto_id: new FormControl(null, [Validators.required]),
      observaciones: new FormControl(null, []),
    }),
  });

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private otFacade: OtFacade
  ) {}

  ngOnInit(): void {
    this.otFacade.resetData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.otFacade.resetData();
    // this.cubicacionSeleccionada = null;
    // this.nombre_plan_proyecto = '';
    // this.sitioSeleccionado = null;
    this.router.navigate(['/app/ot/list-ot']);
  }
}
