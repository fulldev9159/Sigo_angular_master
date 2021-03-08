import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtService } from '../../../../core/services/ot.service';
import { CubicacionService } from '../../../../core/services/cubicacion.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SharedService } from '../../../../core/services/shared.service';
import * as CubicacionModel from '../../../cubicacion/cubicacion.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'otec-cubicacion-proyecto',
  templateUrl: './cubicacion-proyecto.component.html',
  styleUrls: ['./cubicacion-proyecto.component.css'],
})
export class CubicacionProyectoComponent implements OnInit {
  public cubicacionProyecto: any;
  public tipoOT = 'OT';
  public username = this.authService.getItemStorage('username') as string;
  public token = this.authService.getItemStorage('otec_token') as string;
  public cubicacionesArr: CubicacionModel.Cubicacion[] = [];

  constructor(
    private router: Router,
    private otService: OtService,
    private cubicacionService: CubicacionService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.cubicacionProyecto = this.otService.getOTInformation().cubicacionProyecto;
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

  next(): void {
    this.router.navigate(['dashboard/ot/crear-ot/proyecto']);

    return;
  }

  selectedCubicacion(): void {
    // console.log(this.cubicacionProyecto);
    const cubicacionSelected = this.cubicacionesArr.filter(
      (x) =>
        x.cubicacion_id ===
        parseInt(this.cubicacionProyecto.cubicacion.cubicacion_id, 10)
    );
    this.cubicacionProyecto.cubicacion = {
      cubicacion_id: cubicacionSelected[0].cubicacion_id,
      contrato: cubicacionSelected[0].contrato_marco,
      proveedor: cubicacionSelected[0].proveedor,
      region: cubicacionSelected[0].region,
      region_id: cubicacionSelected[0].region_id,
      total: cubicacionSelected[0].total,
    };
    // console.log(this.cubicacionProyecto);
  }
}
