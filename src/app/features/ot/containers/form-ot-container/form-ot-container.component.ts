import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'zwc-form-ot-container',
  templateUrl: './form-ot-container.component.html',
  styleUrls: ['./form-ot-container.component.scss'],
})
export class FormOtContainerComponent implements OnInit {
  navbarHeader: MenuItem[];

  form: FormGroup = new FormGroup({
    base: new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        // this.noWhitespace,
        Validators.maxLength(255),
      ]),
      contrato: new FormControl(null, [Validators.required]),
      cubicacion_id: new FormControl(null, [Validators.required]),
    }),
  });

  constructor() {}

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      {
        label: 'Listar OT',
        icon: 'pi pi-briefcase',
        routerLink: ['/ot'],
      },
      { label: 'Formulario OT', styleClass: 'last-route' },
    ];
  }
}
