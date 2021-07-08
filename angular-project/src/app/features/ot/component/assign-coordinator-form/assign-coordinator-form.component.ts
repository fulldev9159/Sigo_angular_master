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

@Component({
  selector: 'app-assign-coordinator-form',
  templateUrl: './assign-coordinator-form.component.html',
  styleUrls: ['./assign-coordinator-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignCoordinatorFormComponent implements OnInit, OnDestroy {
  ot$: Observable<Data.OT>;
  coordinators$: Observable<Data.User[]>;
  subscription: Subscription = new Subscription();
  formControls = {
    coordinator: new FormControl('', [Validators.required]),
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
    this.coordinators$ = this.otFacade
      .getCoordinators$()
      .pipe(map(coordinators => coordinators || []));

    this.subscription.add(
      this.ot$.subscribe(ot => {
        this.reset();
        this.otFacade.getCoordinators(ot.id);
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
    this.subscription.add(
      this.ot$.subscribe(ot => {
        console.log('submit', ot);
      })
    );
  }
}
