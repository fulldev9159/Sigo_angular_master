import { Component, OnInit } from '@angular/core';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CubicacionService } from '@coreOT/services/cubicacion.service';
import { SharedService } from '@coreOT/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ot-crear-cubicacion',
  templateUrl: './crear-cubicacion.component.html',
  styleUrls: ['./crear-cubicacion.component.scss'],
  providers: [ConfirmationService],
})
export class CrearCubicacionComponent implements OnInit {
  form: FormGroup;
  public contratosArr: CubicacionModel.ContratoMarco[] = [];
  // public contratoId = '';
  public proveedorArr: CubicacionModel.Proveedores[] = [];
  // public proveedorId = '';
  // public subcontratoId = 0;
  public regionArr: CubicacionModel.Region[] = [];
  // public regionId = '';
  public tipoServicioArr: CubicacionModel.TipoServicio[] = [];
  // public tipoServicioId = '';
  // public sourceProducts$: Observable<CubicacionModel.Product[]> = of([]);
  // public sourcePtemp: CubicacionModel.Product[] = [];
  // public selectedServicios: CubicacionModel.Product[] = [];
  // public total = 0;
  // public proveedorDisabled = false;
  // public regionDisabled = false;
  // public nombreCubicacion = '';

  constructor(
    private readonly fb: FormBuilder,
    // private authService: AuthService,
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
      tipoServicioId: ['', [Validators.required]],
    });
  }

  get values(): CubicacionModel.CubiciacionForm {
    const data = this.form.getRawValue();
    return {
      nombre: data.nombre.trim(),
      contratoId: data.contratoId.trim(),
      proveedorId: data.proveedorId.trim(),
      // subcontratoId: data.subcontratoId.trim(),
      regionId: data.regionId.trim(),
      tipoServicioId: data.tipoServicioId.trim(),
    } as CubicacionModel.CubiciacionForm;
  }

  get valid(): boolean {
    return this.form.valid;
  }

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
    // if (this.nombreCubicacion === '') {
    //   this.NombreErr = true;
    // }
    // // console.log(this.selectedServicios.length);
    // let permitirMensaje = false;
    // if (input === 'contrato' && this.contratoDisabled) {
    //   permitirMensaje = true;
    // }
    // if (input === 'proveedor' && this.proveedorDisabled) {
    //   permitirMensaje = true;
    // }
    // if (input === 'region' && this.regionDisabled) {
    //   permitirMensaje = true;
    // }
    // if (this.selectedServicios.length > 0 && permitirMensaje) {
    //   this.confirmationService.confirm({
    //     target: event.target as EventTarget,
    //     message: `Si cambia de ${input} borrara todos los sevicios seleccionados. Está seguro que desea proceder?`,
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //       if (input === 'contrato') {
    //         this.contratoDisabled = false;
    //       }
    //       if (input === 'proveedor') {
    //         this.proveedorDisabled = false;
    //       }
    //       if (input === 'region') {
    //         this.regionDisabled = false;
    //       }
    //     },
    //     reject: () => {},
    //   });
    // } else {
    //   if (input === 'contrato') {
    //     this.contratoDisabled = false;
    //   }
    //   if (input === 'proveedor') {
    //     this.proveedorDisabled = false;
    //   }
    //   if (input === 'region') {
    //     this.regionDisabled = false;
    //   }
    // }
    console.log(input);
    console.log(this.form.controls[input].disabled);
    if (this.form.controls[input].disabled) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Si cambia de ${input} borrara todos los sevicios seleccionados. Está seguro que desea proceder?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.form.controls[input].enable();
        },
        reject: () => {},
      });
    }
  }

  selectedContrato(): void {
    // this.proveedorId = '';
    // this.regionId = '';
    // this.tipoServicioId = '';
    // this.reset();
    this.form.controls.contratoId.disable();
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
}
