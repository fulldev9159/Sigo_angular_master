import { Component, OnInit } from '@angular/core';
import * as CubicacionModel from './cubicacion.model';
import { CubicacionService } from '../../core/services/cubicacion.service';
import { AuthService } from '../../core/services/auth.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'otec-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./cubicacion.component.css'],
})
export class CubicacionComponent implements OnInit {
  public username = this.authService.getItemStorage('username') as string;
  public token = this.authService.getItemStorage('otec_token') as string;
  public cubicaciones: CubicacionModel.Cubicacion[] = [];
  public displayModal = false;
  public detallesCubicacion: CubicacionModel.DetalleCubicacion[] = [];
  public total = 0;

  constructor(
    private cubicacionService: CubicacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cubicacionService
      .getCubicaciones(this.username, this.token)
      .subscribe((cubicacion) => {
        console.log(cubicacion);
        const id = 'cubicaciones';
        cubicacion.data[id].forEach((x) => {
          this.cubicaciones.push(x);
        });
      });
  }

  displayDetaill(id: number, totalC: number): void {
    this.displayModal = true;
    this.cubicacionService
      .getDetalleCubicacion(this.username, this.token, id)
      .subscribe((x) => {
        console.log(x);
        this.total = totalC;
        const idArray = 'detalle_cubicacion';
        this.detallesCubicacion = x.data[idArray];
      });
  }
}
