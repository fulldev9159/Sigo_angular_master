import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Area, RequestEditArea } from '@model';
import { Observable, Subscription } from 'rxjs';
import { AreaFacade } from '@storeOT/area/area.facades';

import * as CustomValidators from '@sharedOT/validators';

@Component({
  selector: 'zwc-form-areas-container',
  templateUrl: './form-areas-container.component.html',
  styleUrls: ['./form-areas-container.component.scss'],
})
export class FormAreasContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  areaSelected$: Observable<Area>;

  formControls = {
    id: new FormControl(null),
    nombre: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
      // Validators.maxLength(20),
    ]),
    descripcion: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
      // Validators.maxLength(20),
    ]),
    interno: new FormControl(null, [
      Validators.required,
      CustomValidators.NoWhitespace,
      // Validators.maxLength(20),
    ]),
    activa: new FormControl(null, [
      Validators.required,
      // Validators.maxLength(20),
    ]),
  };

  formArea: FormGroup = new FormGroup(this.formControls);

  constructor(
    private areaFacade: AreaFacade,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.areaFacade.reset();
    this.subscription.add(
      this.route.paramMap.subscribe(params => {
        if (params.get('id') != null) {
          this.areaFacade.getAreaSelected(+params.get('id'));
        }
      })
    );

    this.subscription.add(
      this.areaFacade.getAreaSelected$().subscribe(area => {
        if (area) {
          this.formArea.get('id').setValue(area.id);
          this.formArea.get('nombre').setValue(area.nombre);
          this.formArea.get('descripcion').setValue(area.descripcion);
          this.formArea
            .get('interno')
            .setValue(area.interno ? 'interno' : 'externo');
          this.formArea
            .get('activa')
            .setValue(area.activa ? 'activa' : 'inactiva');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.areaFacade.reset();
    this.router.navigate(['/administracion/areas/list-areas']);
  }

  save(): void {
    // console.log(this.formArea.value);
    const request: RequestEditArea = {
      area_id: +this.formArea.get('id').value,
      values: {
        nombre: this.formArea.get('nombre').value,
        descripcion: this.formArea.get('descripcion').value,
        interno:
          this.formArea.get('interno').value === 'interno' ? true : false,
        activa: this.formArea.get('activa').value === 'activa' ? true : false,
      },
    };
    // console.log(request);
    this.areaFacade.updateArea(request);
  }
}
