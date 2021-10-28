import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Cubicacion } from '@data';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  cubicaciones$: Observable<Cubicacion[]> = of([]);

  @Input() form: FormGroup;

  constructor(
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.cubicaciones$ = this.cubageFacade.getCubicacionSelector$().pipe(
      withLatestFrom(
        this.authFacade
          .getLogin$()
          .pipe(filter(profile => profile !== undefined && profile !== null))
      ),
      map(([cubicaciones, profile]) =>
        cubicaciones.filter(
          cubicacion =>
            !cubicacion.asignado &&
            profile.usuario_id === cubicacion.creador_usuario_id
        )
      )
    );

    this.cubageFacade.getCubicacionAction();
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
