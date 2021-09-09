import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ProfileFacade } from '@storeOT/features/profile/profile.facade';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.scss'],
})
export class FormPro2Component implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  formControls = {
    id: new FormControl(null),
    nombre: new FormControl(null, [Validators.required]),
    descripcion: new FormControl(null, [Validators.required]),
    permisos: new FormControl(null),
  };

  formPerfil: FormGroup = new FormGroup(this.formControls);

  constructor(private profileFacade: ProfileFacade, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  goBack(): void {
    this.profileFacade.resetData();
    this.router.navigate(['/app/profile/list-pro']);
  }
}
