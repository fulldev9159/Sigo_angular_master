import { Component, OnInit } from '@angular/core';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CubicacionService } from '@coreOT/services/cubicacion.service';
import { SharedService } from '@coreOT/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'ot-crear-cubicacion',
  templateUrl: './crear-cubicacion.component.html',
  styleUrls: ['./crear-cubicacion.component.scss'],
  providers: [ConfirmationService],
})
export class CrearCubicacionComponent implements OnInit {
  form: FormGroup;
  public contratosArr: CubicacionModel.ContratoMarco[] = [];
  public proveedorArr: CubicacionModel.Proveedores[] = [];
  public regionArr: CubicacionModel.Region[] = [];
  public tipoServicioArr: CubicacionModel.TipoServicio[] = [];
  public sourceProducts$: Observable<CubicacionModel.LPU[]> = of([]);
  public sourcePtemp: CubicacionModel.LPU[] = [];
  public selectedServicios: CubicacionModel.LPU[] = [];
  public total = 0;

  constructor(
    private readonly fb: FormBuilder,
    private cubicacionService: CubicacionService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      contratoId: ['', [Validators.required]],
      proveedorId: ['', [Validators.required]],
      subcontratoId: [0, [Validators.required]],
      regionId: ['', [Validators.required]],
      tiposervicioId: ['', [Validators.required]],
      // lpus: [this.fb.array([this.createItem()]), Validators.required],
    });
  }

  // createItem(): FormGroup {
  //   return this.fb.group({
  //     id_lpu: 0,
  //     nombre: '',
  //     precio: 0,
  //     tipo_moneda: '',
  //     cantidad: 0,
  //     unidad: '',
  //     region: '',
  //     tiposervicio: '',
  //   });
  // }

  get values(): CubicacionModel.CubiciacionForm {
    const data = this.form.getRawValue();
    return {
      nombre: data.nombre.trim(),
      contratoId: data.contratoId.trim(),
      proveedorId: data.proveedorId.trim(),
      subcontratoId: data.subcontratoId,
      regionId: data.regionId.trim(),
      tiposervicioId: data.tiposervicioId.trim(),
      // lpus: data.lpus,
    } as CubicacionModel.CubiciacionForm;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  // get lpusArr():FormArray {
  //   return this.form.get("lpus") as FormArray;
  // }

  ngOnInit(): void {
    this.cubicacionService.getContratos().subscribe(
      (response) => {
        this.contratosArr = response.data.contratos_marco;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  confirm(event: Event, input: string): any {
    if (this.form.controls[input].disabled) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Si cambia de ${input} borrara todos los sevicios seleccionados. Está seguro que desea proceder?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.form.controls[input].enable();
          this.reset();
          if (input === 'contratoId') {
            this.form.controls.proveedorId.setValue('');
            this.form.controls.proveedorId.enable();
            this.form.controls.regionId.setValue('');
            this.form.controls.regionId.enable();
            this.form.controls.tiposervicioId.setValue('');
          } else if (input === 'proveedorId') {
            this.form.controls.regionId.setValue('');
            this.form.controls.regionId.enable();
            this.form.controls.tiposervicioId.setValue('');
          }
        },
        reject: () => {},
      });
    }
  }

  disableInput(input: string): void {
    if (this.values[input] !== '') {
      this.form.controls[input].disable();
    }
  }

  reset(): any {
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];
    // this.form.controls.lpus.setValue([]);
    this.selectedServicios = [];
  }

  getTotal(): any {
    this.total = 0;
    this.selectedServicios.forEach((servicio) => {
      this.total = this.total + servicio.precio * servicio.cantidad;
    });
  }

  elimnarLPU(index: number): void {
    this.selectedServicios = this.selectedServicios.filter(
      (value, indice) => indice !== index
    );
  }

  limpiarCarro(event: Event): any {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Se borraran todos los sevicios seleccionados. Está seguro que desea proceder?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.form.controls.lpus.setValue([]);
        this.selectedServicios = [];
      },
      reject: () => {},
    });
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  selectedContrato(): void {
    this.reset();
    this.disableInput('contratoId');
    this.form.controls.proveedorId.setValue('');
    this.form.controls.proveedorId.enable();
    this.form.controls.regionId.setValue('');
    this.form.controls.regionId.enable();
    this.form.controls.tiposervicioId.setValue('');
    this.cubicacionService
      .getProveedoresSubcontrato(parseInt(this.values.contratoId, 10))
      .subscribe(
        (response) => {
          this.proveedorArr = response.data.proveedores;
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedProveedor(): void {
    this.reset();
    this.disableInput('proveedorId');
    this.form.controls.regionId.setValue('');
    this.form.controls.regionId.enable();
    this.form.controls.tiposervicioId.setValue('');
    this.form.controls.subcontratoId.setValue(
      this.proveedorArr.filter(
        (x) => x.id === parseInt(this.values.proveedorId, 10)
      )[0].subcontrato_id[0]
    );
    this.cubicacionService
      .getRegionesSubcontrato(this.values.subcontratoId)
      .subscribe(
        (response) => {
          this.regionArr = response.data.regiones;
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedRegion(): void {
    this.reset();
    this.disableInput('regionId');
    this.form.controls.tiposervicioId.setValue('');
    this.cubicacionService
      .getTipoServicioSubcontrato(
        this.values.subcontratoId,
        parseInt(this.values.regionId, 10)
      )
      .subscribe(
        (response) => {
          this.tipoServicioArr = response.data.tipo_servicios;
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedTipoServicio(): void {
    const tipoServicioName = this.tipoServicioArr.filter(
      (x) => x.id === parseInt(this.values.tiposervicioId, 10)
    )[0].nombre;
    const regionName = this.regionArr.filter(
      (x) => x.id === parseInt(this.values.regionId, 10)
    )[0].nombre;
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];

    this.cubicacionService
      .getServicioSubcontrato(
        this.values.subcontratoId,
        parseInt(this.values.regionId, 10),
        parseInt(this.values.tiposervicioId, 10)
      )
      .subscribe(
        (response) => {
          response.data.servicios.forEach((servicio) => {
            this.sourcePtemp.push({
              id_lpu: servicio.id_lpu,
              nombre: servicio.nombre,
              tipo_moneda: servicio.tipo_moneda,
              precio: servicio.precio,
              // numero_producto: servicio.numero_producto,
              cantidad: 1,
              unidad: 'UNIDAD',
              region: regionName,
              tiposervicio: tipoServicioName,
            });
          });
          this.sourceProducts$ = of(this.sourcePtemp);
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  save(): void {
    const lpus: CubicacionModel.Lpus[] = this.selectedServicios.map((e) => ({
      id_lpu: e.id_lpu,
      cantidad: parseInt(e.cantidad.toString(), 10),
    }));
    const regionName = this.regionArr
      .filter((x) => parseInt(this.values.regionId, 10) === x.id)
      .map((x) => `${x.codigo} - ${x.nombre}`)[0];
    const contratoName = this.contratosArr.filter(
      (x) => parseInt(this.values.contratoId, 10) === x.id
    )[0].nombre;
    const proveedorName = this.proveedorArr.filter(
      (x) => x.id === parseInt(this.values.proveedorId, 10)
    )[0].nombre;
    this.cubicacionService
      .saveCubicacion(
        this.values.nombre,
        this.total,
        parseInt(this.values.regionId, 10),
        regionName,
        contratoName,
        proveedorName,
        this.values.subcontratoId,
        lpus
      )
      .subscribe(
        (x) => {
          this.sharedService.showMessage(
            'cubicación almacenada exitosamente',
            'ok'
          );
          this.sharedService.navegateTo('dashboard/cubicacion');
          console.log(x);
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            `(HTTP code: ${err.status}) ${err.error.status.description}`,
            'error'
          );
        }
      );
  }
}
