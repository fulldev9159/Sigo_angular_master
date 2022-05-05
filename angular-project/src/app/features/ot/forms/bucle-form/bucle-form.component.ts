import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { map, filter, withLatestFrom, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { Cubicacion, ContratosUser, Cubs4OT } from '@data';
import { OtFacade } from '@storeOT/features/ot/ot.facade';

@Component({
  selector: 'app-bucle-form',
  templateUrl: './bucle-form.component.html',
  styleUrls: ['./bucle-form.component.scss'],
})
export class BucleFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR

  // DISPLAY MODALS

  // FORMULARIO

  // TABLE

  // EXTRAS

  @Input() form: FormGroup;

  constructor(private otFacade: OtFacade, private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.onInitGetData();
    this.onInitSetData();
    this.onInitAccionesInicialesAdicionales();
  }

  onInitGetData(): void {
    this.subscription.add();
  }

  onInitSetData(): void {}

  onInitAccionesInicialesAdicionales(): void {}

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
