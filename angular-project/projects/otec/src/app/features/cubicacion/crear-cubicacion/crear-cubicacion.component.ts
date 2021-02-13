import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import * as CubicacionModel from '../cubicacion.model';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'otec-crear-cubicacion',
  templateUrl: './crear-cubicacion.component.html',
  styleUrls: ['./crear-cubicacion.component.css'],
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

  constructor(
    private authService: AuthService,
    private cubicacionService: CubicacionService
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
        // response.data[id].forEach(x=>{
        //   console.log(x.nombre)
        //   this.contratos.push({label:x.nombre.toString(),value:x.id.toString()})
        // })
        console.log(response);
        console.log(this.contratosArr);
      });
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
              this.regionArr[index].nombre = value.nombre.replace('Ã³', 'ó');
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
            id: servicio.id,
            nombre: servicio.nombre,
            tipo_moneda: servicio.tipo_moneda,
            precio: servicio.precio,
            numero_producto: servicio.numero_producto,
            cantidad: 0,
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
}
