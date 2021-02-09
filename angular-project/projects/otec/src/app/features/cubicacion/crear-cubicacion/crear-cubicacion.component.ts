import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import * as CubicacionModel from '../cubicacion.model';
@Component({
  selector: 'otec-crear-cubicacion',
  templateUrl: './crear-cubicacion.component.html',
  styleUrls: ['./crear-cubicacion.component.css'],
})
export class CrearCubicacionComponent implements OnInit {
  public contratosArr: CubicacionModel.ContratoMarco[] = [];
  public contratoId = '';
  public proveedorArr: CubicacionModel.Proveedores[] = [];
  public proveedorId = '';
  public subcontratoId = 0;
  public regionArr: CubicacionModel.Region[] = [];
  public regionId = '';
  public tipoServicioArr: CubicacionModel.TipoServicio[] = [];
  public tipoServicioId = '';
  public servicioArr: CubicacionModel.Servicio[] = [];
  public servicioId = '';

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
        console.log(response);
      });
  }

  selectedContrato(): void {
    console.log(`getProveedoresSubcontrato -> ${this.contratoId}`);
    this.proveedorId = '';
    this.regionId = '';
    this.tipoServicioId = '';
    this.servicioId = '';
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
            console.log(response);
          });
      }
    });
  }

  selectedRegion(): void {
    console.log(`getTipoServicioSubcontrato -> ${this.regionId}`);
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
        console.log(response);
      });
  }

  selectedServicio(): void {
    console.log('servicio');
  }
}
