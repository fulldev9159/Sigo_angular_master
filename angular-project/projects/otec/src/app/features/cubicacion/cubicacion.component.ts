import { Component, OnInit } from '@angular/core';
import * as CubicacionModel from './cubicacion.model';
import { CubicacionService } from '../../core/services/cubicacion.service';
import { AuthService } from '../../core/services/auth.service';
import { SharedService } from '../../core/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

import { of, Observable } from 'rxjs';

@Component({
  selector: 'otec-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./cubicacion.component.css'],
  providers: [ConfirmationService],
})
export class CubicacionComponent implements OnInit {
  public username = this.authService.getItemStorage('username') as string;
  public token = this.authService.getItemStorage('otec_token') as string;
  public cubicaciones: CubicacionModel.Cubicacion[] = [];
  public displayModal = false;
  public detallesCubicacion: CubicacionModel.DetalleCubicacion[] = [];
  public total = 0;
  public nombreCubicacion = '';

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
          this.cubicaciones.push(x);
        });
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          `(HTTP code: ${err.status}) ${err.error.status.description}`,
          'error'
        );
      }
    );
  }

  displayDetaill(id: number, totalC: number, nombreC: string): void {
    this.displayModal = true;
    this.cubicacionService
      .getDetalleCubicacion(this.username, this.token, id)
      .subscribe((lpus) => {
        this.total = totalC;
        this.nombreCubicacion = nombreC;
        const idArray = 'detalle_cubicacion';
        this.detallesCubicacion = lpus.data[idArray];
      });
  }

  clonar(
    idCubicacion: number,
    totalC: number,
    nombreC: string,
    regionC: string,
    contratoC: string
  ): void {
    const NombreClon = `Clon de ${nombreC}`;
    const lpus: CubicacionModel.Lpus[] = [];
    this.cubicacionService
      .getDetalleCubicacion(this.username, this.token, idCubicacion)
      .subscribe(
        (detallesCubicacion) => {
          const idArray = 'detalle_cubicacion';
          detallesCubicacion.data[idArray].forEach((detalles) => {
            lpus.push({ id_lpu: detalles.id_lpu, cantidad: detalles.cantidad });
          });
          this.cubicacionService
            .saveCubicacion(
              this.token,
              'ss',
              NombreClon,
              totalC,
              regionC,
              contratoC,
              lpus
            )
            .subscribe(
              (responseSave) => {
                this.sharedService.showMessage(
                  'cubicación clonada exitosamente',
                  'ok'
                );
                this.cubicaciones = [];
                this.cubicacionService
                  .getCubicaciones(this.username, this.token)
                  .subscribe((cubicacion) => {
                    const id = 'cubicaciones';
                    cubicacion.data[id].forEach((x) => {
                      this.cubicaciones.push(x);
                    });
                  });
              },
              (err: HttpErrorResponse) => {
                this.sharedService.showMessage(
                  `(HTTP code: ${err.status}) ${err.error.status.description}`,
                  'error'
                );
              }
            );
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
