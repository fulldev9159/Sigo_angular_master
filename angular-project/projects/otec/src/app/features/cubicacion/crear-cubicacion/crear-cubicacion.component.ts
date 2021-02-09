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
  public proveedorId = '';
  public regionId = '';
  public tipoServicioId = '';

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
    console.log(this.contratoId);
  }
}
