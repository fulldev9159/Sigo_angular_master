import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter, withLatestFrom, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Cubicacion, ContratosUser, AllCubs } from '@data';
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
  cubicaciones$: Observable<AllCubs[]>;
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
    this.cubicaciones$ = this.cubicacionFacade
      .AllCubs$()
      .pipe(tap(data => this.checkAndEnable('cubicacion_id', data)));
  }

  onInitAccionesInicialesAdicionales(): void {
    this.subscription.add(
      this.form.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id !== null && contrato_id !== undefined) {
          this.cubicacionFacade.AllCubs();
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
