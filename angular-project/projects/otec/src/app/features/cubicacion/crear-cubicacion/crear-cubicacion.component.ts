import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import * as CubicacionModel from '../cubicacion.model';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from '../../../core/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'otec-crear-cubicacion',
  templateUrl: './crear-cubicacion.component.html',
  styleUrls: ['./crear-cubicacion.component.css'],
  providers: [ConfirmationService],
})
export class CrearCubicacionComponent implements OnInit {
  public username = this.authService.getItemStorage('username') as string;
  public token = this.authService.getItemStorage('otec_token') as string;
  public contratosArr: CubicacionModel.ContratoMarco[] = [];
  public contratoId = '';
  public proveedorArr: CubicacionModel.Proveedores[] = [];
  public proveedorId = '';
  public subcontratoId = 0;
  public regionArr: CubicacionModel.Region[] = [];
  public regionId = '';
  public tipoServicioArr: CubicacionModel.TipoServicio[] = [];
  public tipoServicioId = '';
  public sourceProducts$: Observable<CubicacionModel.Product[]> = of([]);
  public sourcePtemp: CubicacionModel.Product[] = [];
  public selectedServicios: CubicacionModel.Product[] = [];
  public total = 0;
  public contratoDisabled = false;
  public proveedorDisabled = false;
  public regionDisabled = false;
  public nombreCubicacion = '';
  public NombreErr = false;

  constructor(
    private authService: AuthService,
    private cubicacionService: CubicacionService,
    private confirmationService: ConfirmationService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.cubicacionService.getContratos(this.username, this.token).subscribe(
      (response) => {
        const id = 'contratos_marco';
        this.contratosArr = response.data[id];
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  acentos(nombre: string): string {
    nombre = nombre.replace('Ã³', 'ó');
    nombre = nombre.replace('Ã¡', 'á');
    nombre = nombre.replace('Ã', 'í');
    return nombre;
  }

  selectedContrato(): void {
    // console.log(`getProveedoresSubcontrato -> ${this.contratoId}`);
    if (this.nombreCubicacion === '') {
      this.NombreErr = true;
    }
    this.proveedorId = '';
    this.regionId = '';
    this.tipoServicioId = '';
    this.reset();
    this.contratoDisabled = true;
    this.cubicacionService
      .getProveedoresSubcontrato(
        this.username,
        this.token,
        parseInt(this.contratoId, 10)
      )
      .subscribe(
        (response) => {
          const id = 'proveedores';
          this.proveedorArr = response.data[id];
          // console.log(response);
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
    // console.log(`getRegionesSubcontrato -> ${this.proveedorId}`);
    if (this.nombreCubicacion === '') {
      this.NombreErr = true;
    }
    this.reset();
    this.proveedorDisabled = true;
    this.proveedorArr.forEach((x) => {
      const provID = parseInt(this.proveedorId, 10);
      if (x.id === provID) {
        const ids = 'subcontrato_id';
        x[ids].forEach((sub: number) => {
          this.subcontratoId = sub;
        });
        this.cubicacionService
          .getRegionesSubcontrato(this.username, this.token, this.subcontratoId)
          .subscribe(
            (response) => {
              const id = 'regiones';
              this.regionArr = response.data[id];
              this.regionArr.forEach((value, index) => {
                this.regionArr[index].nombre = this.acentos(
                  this.regionArr[index].nombre
                );
              });
            },
            (err: HttpErrorResponse) => {
              this.sharedService.showMessage(
                this.sharedService.getErrorMessage(err),
                'error'
              );
            }
          );
      }
    });
  }

  selectedRegion(): void {
    // console.log(`getTipoServicioSubcontrato -> ${this.regionId}`);
    if (this.nombreCubicacion === '') {
      this.NombreErr = true;
    }
    this.regionDisabled = true;
    this.reset();
    this.cubicacionService
      .getTipoServicioSubcontrato(
        this.username,
        this.token,
        this.subcontratoId,
        parseInt(this.regionId, 10)
      )
      .subscribe(
        (response) => {
          const id = 'tipo_servicios';
          this.tipoServicioArr = response.data[id];
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
    // console.log(`getServicioSubcontrato -> ${this.tipoServicioId}`);
    if (this.nombreCubicacion === '') {
      this.NombreErr = true;
    }
    let tipoServicioName: string;
    let regionName: string;
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];
    this.regionArr.forEach((region) => {
      if (parseInt(this.regionId, 10) === region.id) {
        regionName = region.nombre;
      }
    });
    this.tipoServicioArr.forEach((tipo) => {
      if (parseInt(this.tipoServicioId, 10) === tipo.id) {
        tipoServicioName = tipo.nombre;
      }
    });
    this.cubicacionService
      .getServicioSubcontrato(
        this.username,
        this.token,
        this.subcontratoId,
        parseInt(this.regionId, 10),
        parseInt(this.tipoServicioId, 10)
      )
      .subscribe(
        (response) => {
          const id = 'servicios';
          response.data[id].forEach((servicio) => {
            this.sourcePtemp.push({
              id_lpu: servicio.id_lpu,
              nombre: this.acentos(servicio.nombre),
              tipo_moneda: servicio.tipo_moneda,
              precio: servicio.precio,
              numero_producto: servicio.numero_producto,
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

  counter(i: number): Array<number> {
    return new Array(i);
  }

  reset(): any {
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];
    this.selectedServicios = [];
  }

  getTotal(): any {
    this.total = 0;
    this.selectedServicios.forEach((servicio) => {
      this.total = this.total + servicio.precio * servicio.cantidad;
    });
  }

  limpiarCarro(event: Event): any {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Se borraran todos los sevicios seleccionados. Está seguro que desea proceder?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.proveedorId = '';
        this.regionId = '';
        this.tipoServicioId = '';
        this.reset();
      },
      reject: () => {},
    });
  }

  confirm(event: Event, input: string): any {
    if (this.nombreCubicacion === '') {
      this.NombreErr = true;
    }
    // console.log(this.selectedServicios.length);
    let permitirMensaje = false;
    if (input === 'contrato' && this.contratoDisabled) {
      permitirMensaje = true;
    }
    if (input === 'proveedor' && this.proveedorDisabled) {
      permitirMensaje = true;
    }
    if (input === 'region' && this.regionDisabled) {
      permitirMensaje = true;
    }
    if (this.selectedServicios.length > 0 && permitirMensaje) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Si cambia de ${input} borrara todos los sevicios seleccionados. Está seguro que desea proceder?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (input === 'contrato') {
            this.contratoDisabled = false;
          }
          if (input === 'proveedor') {
            this.proveedorDisabled = false;
          }
          if (input === 'region') {
            this.regionDisabled = false;
          }
        },
        reject: () => {},
      });
    } else {
      if (input === 'contrato') {
        this.contratoDisabled = false;
      }
      if (input === 'proveedor') {
        this.proveedorDisabled = false;
      }
      if (input === 'region') {
        this.regionDisabled = false;
      }
    }
  }

  save(): any {
    const lpus: CubicacionModel.Lpus[] = [];
    this.selectedServicios.forEach((x) => {
      lpus.push({
        id_lpu: x.id_lpu,
        cantidad: parseInt(x.cantidad.toString(), 10),
      });
    });
    let regionName = '';
    this.regionArr.forEach((region) => {
      if (parseInt(this.regionId, 10) === region.id) {
        regionName = `${region.codigo} - ${region.nombre}`;
      }
    });
    let contratoName = '';
    this.contratosArr.forEach((contrato) => {
      if (parseInt(this.contratoId, 10) === contrato.id) {
        contratoName = contrato.nombre;
      }
    });
    this.cubicacionService
      .saveCubicacion(
        this.token,
        'ss',
        this.nombreCubicacion,
        this.total,
        regionName,
        contratoName,
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
