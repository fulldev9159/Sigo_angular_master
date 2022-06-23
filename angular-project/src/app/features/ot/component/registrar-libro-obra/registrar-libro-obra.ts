import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import * as Data from '@data';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-libro-obra',
  templateUrl: './registrar-libro-obra.html',
  styleUrls: ['./registrar-libro-obra.scss'],
})
export class RegistrarLibroObraComponent implements OnInit, OnDestroy {
  @ViewChild('filesform', { static: true }) filesform: any;
  ot$: Observable<Data.OT>;
  otID: number;
  uploadedFiles: any[] = [];
  categorias$: Observable<any[]>;
  subscription: Subscription = new Subscription();

  formControls = {
    observaciones: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    files: new FormControl([]),
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
    this.subscription.add(
      this.ot$.subscribe(ot => {
        this.otID = ot.id;
        this.filesform.clear();
        this.reset();
      })
    );
    this.otFacade.getCategoriasArchivos();

    this.categorias$ = this.otFacade.getCategoriasArchivos$();
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

  onUpload(event): void {
    console.log('ADD', event);
    this.uploadedFiles = event;
  }

  onDeleteFile(event): void {}

  submit(): void {
    this.touch();
    if (this.valid) {
      const index = 'files';
      const request: Data.RegistroLibroObraRequest = {
        ot_id: this.otID,
        observaciones: this.form.get('observaciones').value,
        files: this.uploadedFiles[index],
      };
      this.filesform.clear();
      console.log(request);

      this.otFacade.registrarLibroObras(request);
    } else {
      console.error('invalid form');
    }
  }
}
