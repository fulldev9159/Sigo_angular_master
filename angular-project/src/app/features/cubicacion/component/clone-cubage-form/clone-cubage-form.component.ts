import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import * as cubModel from '@storeOT/features/cubicacion/cubicacion.model';

@Component({
  selector: 'app-clone-cubage-form',
  templateUrl: './clone-cubage-form.component.html',
  styleUrls: ['./clone-cubage-form.component.scss'],
})
export class CloneCubageFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  submitSubscription: Subscription = new Subscription();
  formControls = {
    nombre: new FormControl(null, [
      Validators.required,
      Validators.maxLength(300),
      this.noWhitespace,
    ]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  errorMessageFn = errors => {
    if (errors.required) {
      return 'Este campo es requerido';
    } else if (errors.whitespace) {
      return 'Este campo es requerido';
    } else if (errors.maxlength) {
      return `Debe tener a lo más ${errors.maxlength.requiredLength} caracteres`;
    }
    return 'Este campo es inválido';
  }; // tslint:disable-line

  constructor(private cubageFacade: CubicacionFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cubageFacade.getSelectedCubicacion$().subscribe(cubicacion => {
        if (cubicacion !== null) {
          this.form.get('nombre').setValue(cubicacion.nombre);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.submitSubscription.unsubscribe();
  }

  reset(): void {
    this.submitSubscription.unsubscribe();
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
      const { nombre } = this.form.getRawValue();
      this.submitSubscription.add(
        this.cubageFacade.getSelectedCubicacion$().subscribe(cubicacion => {
          if (cubicacion !== null) {
            const nuevo = { ...cubicacion };
            nuevo.nombre = nombre.trim();
            this.cubageFacade.ClonarCubicacionAction(nuevo, nuevo.id);
          }
        })
      );
    } else {
      console.error('invalid form');
    }
  }
}
