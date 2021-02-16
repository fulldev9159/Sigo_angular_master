import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import * as CubicacionModel from '../cubicacion.model';
import { SelectItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { identifierModuleUrl, templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'otec-crear-cubicacion',
  templateUrl: './crear-cubicacion.component.html',
  styleUrls: ['./crear-cubicacion.component.css'],
  providers: [ConfirmationService],
})
export class CrearCubicacionComponent implements OnInit {
  public contratos: SelectItem[] = [];
  public contratosArr: CubicacionModel.ContratoMarco[] = [];
  public contratoId = '';
  public proveedorArr: CubicacionModel.Proveedores[] = [];
  public proveedorId = '';
  public subcontratoId = 0;
  public regionArr: CubicacionModel.Region[] = [];
  public regionId = '';
  public regionName = '';
  public tipoServicioArr: CubicacionModel.TipoServicio[] = [];
  public tipoServicioId = '';
  public tipoServicioName = '';
  public servicioArr: CubicacionModel.Servicio[] = [];
  public servicioId = '';
  public sourceProducts$: Observable<CubicacionModel.Product[]> = of([]);
  public sourcePtemp: CubicacionModel.Product[] = [];
  public targetProducts: CubicacionModel.Product[] = [];
  public servicios: CubicacionModel.Product[] = [];
  public selectedServicios: CubicacionModel.Product[] = [];
  public total = 0;
  public contratoDisabled = false;
  public proveedorDisabled = false;
  public regionDisabled = false;
  public nombreCubicacion = '';

  constructor(
    private authService: AuthService,
    private cubicacionService: CubicacionService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.cubicacionService
      .getContratos(
        this.authService.getItemStorage('username') as string,
        this.authService.getItemStorage('otec_token') as string
      )
      .subscribe((response) => {
        const id = 'contratos_marco';
        this.contratosArr = response.data[id];
        console.log(response);
      });
  }

  acentos(nombre: string): string {
    nombre = nombre.replace('Ã³', 'ó');
    nombre = nombre.replace('Ã¡', 'á');
    nombre = nombre.replace('Ã', 'í');
    return nombre;
  }

  selectedContrato(): void {
    console.log(`getProveedoresSubcontrato -> ${this.contratoId}`);
    this.proveedorId = '';
    this.sourcePtemp = [];
    this.regionId = '';
    this.tipoServicioId = '';
    this.servicioId = '';
    this.sourceProducts$ = of([]);
    this.targetProducts = [];
    this.servicios = [];
    this.selectedServicios = [];
    this.contratoDisabled = true;
    this.cubicacionService
      .getProveedoresSubcontrato(
        this.authService.getItemStorage('username') as string,
        this.authService.getItemStorage('otec_token') as string,
        parseInt(this.contratoId, 10)
      )
      .subscribe((response) => {
        const id = 'proveedores';
        this.proveedorArr = response.data[id];
        console.log(response);
      });
  }

  selectedProveedor(): void {
    console.log(`getRegionesSubcontrato -> ${this.proveedorId}`);
    this.sourceProducts$ = of([]);
    this.targetProducts = [];
    this.sourcePtemp = [];
    this.servicios = [];
    this.selectedServicios = [];
    this.proveedorDisabled = true;
    this.proveedorArr.forEach((x) => {
      const provID = parseInt(this.proveedorId, 10);
      if (x.id === provID) {
        const ids = 'subcontrato_id';
        x[ids].forEach((sub: number) => {
          this.subcontratoId = sub;
        });
        this.cubicacionService
          .getRegionesSubcontrato(
            this.authService.getItemStorage('username') as string,
            this.authService.getItemStorage('otec_token') as string,
            this.subcontratoId
          )
          .subscribe((response) => {
            const id = 'regiones';
            this.regionArr = response.data[id];
            this.regionArr.forEach((value, index) => {
              this.regionArr[index].nombre = this.acentos(
                this.regionArr[index].nombre
              );
            });
            console.log(response);
          });
      }
    });
  }

  selectedRegion(): void {
    console.log(`getTipoServicioSubcontrato -> ${this.regionId}`);
    this.sourceProducts$ = of([]);
    this.targetProducts = [];
    this.sourcePtemp = [];
    this.servicios = [];
    this.selectedServicios = [];
    this.regionDisabled = true;
    this.regionArr.forEach((region) => {
      if (parseInt(this.regionId, 10) === region.id) {
        this.regionName = region.nombre;
      }
    });
    this.cubicacionService
      .getTipoServicioSubcontrato(
        this.authService.getItemStorage('username') as string,
        this.authService.getItemStorage('otec_token') as string,
        this.subcontratoId,
        parseInt(this.regionId, 10)
      )
      .subscribe((response) => {
        console.log(response);
        const id = 'tipo_servicios';
        this.tipoServicioArr = response.data[id];
      });
  }

  selectedTipoServicio(): void {
    console.log(`getServicioSubcontrato -> ${this.tipoServicioId}`);
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];
    this.servicios = [];
    this.tipoServicioArr.forEach((tipo) => {
      if (parseInt(this.tipoServicioId, 10) === tipo.id) {
        this.tipoServicioName = tipo.nombre;
      }
    });
    this.cubicacionService
      .getServicioSubcontrato(
        this.authService.getItemStorage('username') as string,
        this.authService.getItemStorage('otec_token') as string,
        this.subcontratoId,
        parseInt(this.regionId, 10),
        parseInt(this.tipoServicioId, 10)
      )
      .subscribe((response) => {
        const id = 'servicios';
        this.servicioArr = response.data[id];
        response.data[id].forEach((servicio) => {
          this.sourcePtemp.push({
            id_lpu: servicio.id_lpu,
            nombre: this.acentos(servicio.nombre),
            tipo_moneda: servicio.tipo_moneda,
            precio: servicio.precio,
            numero_producto: servicio.numero_producto,
            cantidad: 1,
            unidad: 'UNIDAD',
            region: this.regionName,
            tiposervicio: this.tipoServicioName,
          });
        });
        this.sourceProducts$ = of(this.sourcePtemp);
        console.log(response);
        // console.log("productos")
        // console.log(this.sourceProducts$)
      });
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  getTotal(): any {
    console.log(this.selectedServicios);
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
        this.selectedServicios = [];
        this.proveedorId = '';
        this.sourcePtemp = [];
        this.regionId = '';
        this.tipoServicioId = '';
        this.servicioId = '';
        this.sourceProducts$ = of([]);
        this.targetProducts = [];
        this.servicios = [];
        this.selectedServicios = [];
      },
      reject: () => {},
    });
  }

  confirm(event: Event, input: string): any {
    console.log(this.selectedServicios.length);
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
    console.log(this.authService.getItemStorage('username') as string);
    console.log(this.nombreCubicacion);
    console.log(this.total);
    console.log(this.selectedServicios);
  }
}
