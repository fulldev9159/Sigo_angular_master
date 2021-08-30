import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Proyecto } from '@storeOT/features/ot/ot.model';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

@Component({
  selector: 'app-extras-form',
  templateUrl: './extras-form.component.html',
  styleUrls: ['./extras-form.component.scss'],
})
export class ExtrasFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  proyectos$: Observable<Proyecto[]> = of([]);

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
    this.otFacade.getProyectoAction();

    this.proyectos$ = this.otFacade.getProyectoSelector$();
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
      if (sdMonth > edMonth) {
        return true;
      }
      if (sdDay > edDay) {
        return true;
      }
    }

    return false;
  }
}
