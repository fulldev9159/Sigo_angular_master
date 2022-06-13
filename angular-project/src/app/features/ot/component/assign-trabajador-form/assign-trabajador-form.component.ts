import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as Data from '@data';
import { PosibleTrabajador, RequestAceptarRechazarOT } from '@data';

@Component({
  selector: 'app-assign-trabajador-form',
  templateUrl: './assign-trabajador-form.component.html',
  styleUrls: ['./assign-trabajador-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignTrabajadorFormComponent implements OnInit, OnDestroy {
  ot$: Observable<Data.OT>;
  otID: number;
  etapa: string;
  trabajadores$: Observable<PosibleTrabajador[]>;
  subscription: Subscription = new Subscription();
  formControls = {
    trabajadorID: new FormControl('', [Validators.required]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    }
    return 'Este campo es inválido';
  }; // tslint:disable-line

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.ot$ = this.otFacade.getSelectedOT$().pipe(filter(ot => ot !== null));
    this.trabajadores$ = this.otFacade
      .getPosibleTrabajador$()
      .pipe(map(trabajadores => trabajadores || []));

    this.subscription.add(
      this.ot$.subscribe(ot => {
        this.otID = ot.id;
        this.etapa = ot.etapa_slug;
        this.reset();
        this.otFacade.getPosibleTrabajador(ot.id);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  reset(): void {
    // this.form.reset();
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.setValue('');
      control.markAsUntouched();
      control.markAsPristine();
    });
  }

  get valid(): boolean {
    return this.form.valid;
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

  submit(): void {
    this.touch();
    if (this.valid) {
      const { trabajadorID } = this.form.getRawValue();
      if (this.etapa === 'OT_ET_AUTORIZACION_PROVEEDOR') {
        const request: RequestAceptarRechazarOT = {
          ot_id: this.otID,
          values: {
            estado: 'ACEPTADO',
          },
        };
        this.otFacade.AceptarProveedorOT(
          request,
          this.otID,
          trabajadorID,
          'SUPERVISOR_DE_TRABAJOS'
        );
      } else if (this.etapa === 'OT_ET_ASIGNACION_TRABAJADOR') {
        this.otFacade.AsignarSupervisorTrabajos(
          this.otID,
          trabajadorID,
          'SUPERVISOR_DE_TRABAJOS'
        );
      }
    } else {
      console.error('invalid form');
    }
  }
}
