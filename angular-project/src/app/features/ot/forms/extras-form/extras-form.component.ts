import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { AdminContrato4OT, Proyectos } from '@data';

import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-extras-form',
  templateUrl: './extras-form.component.html',
  styleUrls: ['./extras-form.component.scss'],
})
export class ExtrasFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  proyectos$: Observable<Proyectos[]> = of([]);
  adminContrato$: Observable<AdminContrato4OT[]> = of([]);
  alertIcon = faExclamationTriangle;

  msgsWrongDates = [
    {
      severity: 'error',
      summary: 'ERROR',
      detail: 'La fecha de fin no puede ser inferior a la fecha de inicio',
    },
  ];

  @Input() form: FormGroup;

  constructor(private otFacade: OtFacade) {}

  ngOnInit(): void {
    this.otFacade.getProyecto();
    this.proyectos$ = this.otFacade.getProyecto$();
    this.adminContrato$ = this.otFacade.getAdminContrato$();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get invalidDates(): boolean {
    if (
      this.form.get('fecha_inicio').valid &&
      this.form.get('fecha_fin').valid
    ) {
      const { fecha_inicio, fecha_fin } = this.form.getRawValue();
      const sdDay = fecha_inicio.getDate();
      const sdMonth = fecha_inicio.getMonth() + 1;
      const sdYear = fecha_inicio.getFullYear();

      const edDay = fecha_fin.getDate();
      const edMonth = fecha_fin.getMonth() + 1;
      const edYear = fecha_fin.getFullYear();

      if (sdYear > edYear) {
        return true;
      }
      if (sdYear === edYear && sdMonth > edMonth) {
        return true;
      }
      if (sdYear === edYear && sdMonth === edMonth && sdDay > edDay) {
        return true;
      }
    }

    return false;
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
    return this.form.valid && !this.invalidDates;
  }
}
