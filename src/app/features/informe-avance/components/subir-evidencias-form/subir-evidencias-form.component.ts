import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-subir-evidencias-form',
  templateUrl: './subir-evidencias-form.component.html',
  styleUrls: ['./subir-evidencias-form.component.scss'],
})
export class SubirEvidenciasFormComponent implements OnDestroy {
  subscription: Subscription = new Subscription();

  formControls = {
    observaciones: new FormControl('', [Validators.required]),
    files: new FormControl([]),
  };

  form: FormGroup = new FormGroup(this.formControls);

  uploadedFiles: { [key: string]: any[] } = {};

  constructor() {}

  onUpload(event: any): void {
    this.uploadedFiles = event;
  }

  get valid(): boolean {
    return this.form.valid;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
