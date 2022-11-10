import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriaArchivo, Dropdown } from '@model';
import { Subscription } from 'rxjs';

// 168 TODO: CONFIRMAR DINÁMICA CUANDO SOLO SE QUIERE REGISTRAR UNA OBSERVACION
// 169 TODO: MEJORAR RESPONSIVE DEL ERROR FORMATO ARCHIVO EN CELULAR
@Component({
  selector: 'zwc-registrar-libro-obras',
  templateUrl: './registrar-libro-obras.component.html',
  styleUrls: ['./registrar-libro-obras.component.scss'],
})
export class RegistrarLibroObrasComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  @ViewChild('filesform', { static: true }) filesform: any;

  formControls = {
    observaciones: new FormControl('', [Validators.required]),
    categoria: new FormControl('', []),
    files: new FormControl([]),
  };

  form: FormGroup = new FormGroup(this.formControls);

  categoriaArchivos: Dropdown[] = [];
  uploadedFiles: { [key: string]: any[] } = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ categoriaArchivos }) => {
        let data = categoriaArchivos
          ? (categoriaArchivos?.data.items as CategoriaArchivo[])
          : [];
        let tmp = [...data];
        this.categoriaArchivos = tmp
          .sort((a, b) => (a.nombre > b.nombre ? 1 : -1))
          .map(value => ({
            name: value.nombre,
            code: value.id,
          }));
      })
    );
  }

  onUpload(event: any): void {
    this.form.get('categoria').setValidators([Validators.required]);
    this.form.get('categoria').updateValueAndValidity();
    this.uploadedFiles = event;
  }

  removeFile(event: any): void {
    if (this.uploadedFiles['files'].length === 0) {
      this.form.get('categoria').clearValidators();
      this.form.get('categoria').updateValueAndValidity();
    }
  }

  get valid(): boolean {
    return this.form.valid;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
