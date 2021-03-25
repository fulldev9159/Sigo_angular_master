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
  public sitios: any = [{ name: '', code: '' }];
  sitioSelected: OTModel.Sitios = {} as OTModel.Sitios;
  public PMOArr: OTModel.PMO[] = [];
  PMOSelected: OTModel.PMO = {} as OTModel.PMO;
  public LineaPresupuestariaArr: string[] = [];
  LineaPresupuestariaSelected = '';
  public PEP2Arr: OTModel.PEP2[] = [];
  PEP2Selected = '';
  public autoResize = false;

  showModal = false;
  adminContrato = '';

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
      sitioId: [{ name: '', code: '' }, [Validators.required]],
      pmoId: ['', [Validators.required]],
      lineapresupuestariaId: ['', [Validators.required]],
      pep2Id: ['', [Validators.required]],
      fechainicio: ['', [Validators.required]],
      fechatermino: ['', [Validators.required]],
      observacion: [''],
      pep2provisorio: [''],
    });
  }

  get values(): OTModel.OTForm {
    const data = this.form.getRawValue();
    return {
      nombre: data.nombre.trim(),
      tipoOT: data.tipoOT.trim(),
      cubicacionId: data.cubicacionId.trim(),
      planId: data.planId.trim(),
      sitioId: data.sitioId,
      pmoId: data.pmoId.trim(),
      lineapresupuestariaId: data.lineapresupuestariaId.trim(),
      pep2Id: data.pep2Id.trim(),
      fechainicio: data.fechainicio,
      fechatermino: data.fechatermino,
      observacion: data.observacion.trim(),
      pep2provisorio: data.pep2provisorio.trim(),
    } as OTModel.OTForm;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  ngOnInit(): void {
    this.cubicacionService.getCubicaciones().subscribe(
      (response) => {
        this.cubicaciones = response.data.cubicaciones.filter(
          (x) => x.asignado !== true
        );
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
    this.otService.getSitios(parseInt(this.values.planId, 10)).subscribe(
      (sitios) => {
        this.SitiosArr = sitios.data.sitios;
        this.sitios = this.SitiosArr.map((x) => ({
          name: `${x.codigo} - ${x.nombre_sitio}`,
          code: x.sitio_id,
        }));
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  selectedSitio(): void {
    // console.log(`SitioId: ${this.values.sitioId}`)
    // console.log(this.values.sitioId)
    // console.log('event :' + event);
    // console.log(event.value);
    this.sitioSelected = this.SitiosArr.filter(
      (x) => x.sitio_id === parseInt(this.values.sitioId.code, 10)
    )[0];
    this.otService.getPMO(parseInt(this.sitioSelected.codigo, 10)).subscribe(
      (response) => {
        this.PMOArr = response.data.pmo;
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  selectedPMO(): void {
    // console.log(this.values.pmoId)
    // this.PMOSelected = this.PMOArr.filter(
    //   (x) => x.codigo === parseInt(this.values.pmoId, 10)
    // )[0];
    this.otService
      .getLineaPresupuestaria(parseInt(this.values.pmoId, 10))
      .subscribe(
        (response) => {
          this.LineaPresupuestariaArr = response.data.lineas_presupuestarias;
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedLineaPresupuestaria(): void {
    this.LineaPresupuestariaSelected = this.LineaPresupuestariaArr.filter(
      (x) => x === this.values.lineapresupuestariaId
    )[0];
    this.otService
      .getPEP2(this.values.pmoId, this.values.lineapresupuestariaId)
      .subscribe(
        (response) => {
          this.PEP2Arr = response.data.pep2;
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedpep2(): void {}

  save(): void {
    let pep2id = this.values.pep2Id;
    let Isprovisorio = false;
    if (this.values.pep2Id === 'provisorio') {
      Isprovisorio = true;
      pep2id = this.values.pep2provisorio;
    }
    const ot: OTModel.OT = {
      nombre_ot: this.values.nombre,
      tipo_ot: this.values.tipoOT,
      cubicacion_id: parseInt(this.values.cubicacionId, 10),
      plan_despliegue_id: parseInt(this.values.planId, 10),
      emplazamiento_id: parseInt(this.values.sitioId.code, 10),
      fecha_inicio: this.values.fechainicio,
      fecha_fin: this.values.fechatermino,
      observaciones: this.values.observacion,
      linea_presupuestaria_codigo: this.values.lineapresupuestariaId,
      pmo_codigo: this.values.pmoId,
      pep2_codigo: pep2id,
      pep2_provisorio: Isprovisorio,
    };

    console.log(ot);

    this.otService.saveOT(ot).subscribe((x) => {
      this.adminContrato = x.data.admin_contrato_nombre;
      this.showModal = true;
    });
  }

  ok(): void {
    this.sharedService.showMessage('OT almacenada exitosamente', 'ok');
    this.sharedService.navegateTo('dashboard/ot');
  }
}
