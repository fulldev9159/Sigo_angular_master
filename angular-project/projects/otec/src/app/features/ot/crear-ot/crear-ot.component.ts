import { Component, OnInit } from '@angular/core';
import { CubicacionService } from '../../../core/services/cubicacion.service';
import { AuthService } from '../../../core/services/auth.service';
import { SharedService } from '../../../core/services/shared.service';
import * as CubicacionModel from '../../cubicacion/cubicacion.model';

import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'otec-crear-ot',
  templateUrl: './crear-ot.component.html',
  styleUrls: ['./crear-ot.component.css'],
})
export class CrearOtComponent implements OnInit {
  public nombreOT = '';
  public tipoOT = 'OT';
  public username = this.authService.getItemStorage('username') as string;
  public token = this.authService.getItemStorage('otec_token') as string;
  public cubicacionesArr: CubicacionModel.Cubicacion[] = [];
  public cubicacionId = '';
  public contrato = '';
  public proveedor = '';
  public region = '';
  public administradorContrato = 'Juan Perez';

  constructor(
    private cubicacionService: CubicacionService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.cubicacionService.getCubicaciones(this.username, this.token).subscribe(
      (cubicacion) => {
        const id = 'cubicaciones';
        cubicacion.data[id].forEach((x) => {
          this.cubicacionesArr.push(x);
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

  selectedCubicacion(): void {
    const cubicacionSelected = this.cubicacionesArr.filter(
      (x) => x.cubicacion_id === parseInt(this.cubicacionId, 10)
    );
    this.contrato = cubicacionSelected[0].contrato_marco;
    this.proveedor = cubicacionSelected[0].proveedor;
    this.region = cubicacionSelected[0].region;
  }
}
