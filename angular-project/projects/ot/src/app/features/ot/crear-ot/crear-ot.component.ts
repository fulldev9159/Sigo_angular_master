import { Component, OnInit } from '@angular/core';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';
import * as OTModel from '@coreOT/models/ot.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CubicacionService } from '@coreOT/services/cubicacion.service';
import { SharedService } from '@coreOT/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { of, Observable } from 'rxjs';
import { OtService } from '@coreOT/services/ot.service';

@Component({
  selector: 'ot-crear-ot',
  templateUrl: './crear-ot.component.html',
  styleUrls: [
    '../../cubicacion/crear-cubicacion/crear-cubicacion.component.scss',
  ],
  providers: [ConfirmationService],
})
export class CrearOtComponent implements OnInit {
  form: FormGroup;
  public cubicaciones: CubicacionModel.Cubicacion[] = [];
  cubicacionSelected: CubicacionModel.Cubicacion = {} as CubicacionModel.Cubicacion;
  public PlanArr: OTModel.Planes[] = [];
  planSelected: OTModel.Planes = {} as OTModel.Planes;
  public SitiosArr: OTModel.Sitios[] = [];
  sitioSelected: OTModel.Sitios = {} as OTModel.Sitios;

  constructor(
    private readonly fb: FormBuilder,
    private cubicacionService: CubicacionService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService,
    private otService: OtService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      tipoOT: ['OT', [Validators.required]],
      cubicacionId: ['', [Validators.required]],
      planId: ['', [Validators.required]],
      sitioId: ['', [Validators.required]],
      tiposervicioId: ['', [Validators.required]],
    });
  }

  get values(): OTModel.OTForm {
    const data = this.form.getRawValue();
    return {
      nombre: data.nombre.trim(),
      tipoOT: data.tipoOT.trim(),
      cubicacionId: data.cubicacionId.trim(),
      planId: data.planId.trim(),
      sitioId: data.sitioId.trim(),
    } as OTModel.OTForm;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.cubicacionService.getCubicaciones().subscribe(
      (response) => {
        this.cubicaciones = response.data.cubicaciones;
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  selectedCubicacion(): void {
    this.cubicacionSelected = this.cubicaciones.filter(
      (x) => x.cubicacion_id === parseInt(this.values.cubicacionId, 10)
    )[0];
    this.otService
      .getPlanes(this.cubicacionSelected.region_id)
      .subscribe((response) => {
        this.PlanArr = response.data.planes;
      });
  }

  selectedPlan(): void {
    this.planSelected = this.PlanArr.filter(
      (x) => x.plandespliegue_id === parseInt(this.values.planId, 10)
    )[0];
    this.otService
      .getSitios(parseInt(this.values.planId, 10))
      .subscribe((sitios) => {
        this.SitiosArr = sitios.data.sitios;
      });
  }

  selectedSitio(): void {
    console.log(this.values.sitioId);
    this.sitioSelected = this.SitiosArr.filter(
      (x) => x.sitio_id === parseInt(this.values.sitioId, 10)
    )[0];
  }
}
