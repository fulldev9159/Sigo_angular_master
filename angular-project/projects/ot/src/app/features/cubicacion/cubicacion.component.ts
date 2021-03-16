import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';
import { CubicacionService } from '@coreOT/services/cubicacion.service';
import { SharedService } from '@coreOT/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
@Component({
  selector: 'ot-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./cubicacion.component.scss'],
  providers: [ConfirmationService],
})
export class CubicacionComponent implements OnInit {
  public cubicaciones: CubicacionModel.Cubicacion[] = [];
  showModalDetaillesCubicacion = false;
  cubicacionSelected: CubicacionModel.Cubicacion = {} as CubicacionModel.Cubicacion;
  public detallesCubicacionSelected: CubicacionModel.DetalleCubicacion[] = [];

  constructor(
    private cubicacionService: CubicacionService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.cubicacionService.getCubicaciones().subscribe(
      (response) => {
        this.cubicaciones = response.data.cubicaciones;
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  displayModalDetaillesCubicacion(id: number): void {
    this.showModalDetaillesCubicacion = true;
    this.cubicacionSelected = this.cubicaciones.filter(
      (x) => x.cubicacion_id === id
    )[0];
    this.cubicacionService
      .getDetalleCubicacion(this.cubicacionSelected.cubicacion_id)
      .subscribe((response) => {
        this.detallesCubicacionSelected = response.data.detalle_cubicacion;
      });
  }

  clonar(id: number): void {
    this.cubicacionSelected = this.cubicaciones.filter(
      (x) => x.cubicacion_id === id
    )[0];
    const NombreClon = `Copia de ${this.cubicacionSelected.nombre}`;

    this.cubicacionService.getDetalleCubicacion(id).subscribe(
      (detallesCubicacion) => {
        const lpus: CubicacionModel.Lpus[] = detallesCubicacion.data.detalle_cubicacion.map(
          (x) => ({ id_lpu: x.id_lpu, cantidad: x.cantidad })
        );

        this.cubicacionService
          .saveCubicacion(
            NombreClon,
            this.cubicacionSelected.total,
            this.cubicacionSelected.region_id,
            this.cubicacionSelected.region,
            this.cubicacionSelected.contrato_marco,
            this.cubicacionSelected.proveedor,
            this.cubicacionSelected.subcontrato_id,
            lpus
          )
          .subscribe(
            (responseSave) => {
              this.sharedService.showMessage(
                'cubicación copiada exitosamente',
                'ok'
              );
              this.cubicaciones = [];
              this.cubicacionService.getCubicaciones().subscribe(
                (response) => {
                  this.cubicaciones = response.data.cubicaciones;
                },
                (err: HttpErrorResponse) => {
                  this.sharedService.showMessage(
                    this.sharedService.getErrorMessage(err),
                    'error'
                  );
                }
              );
            },
            (err: HttpErrorResponse) => {
              this.sharedService.showMessage(
                this.sharedService.getErrorMessage(err),
                'error'
              );
            }
          );
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  confirmEliminacion(event: Event, idCubicacion: number): any {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Está seguro que desea eliminar esta cubicación?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cubicacionService.eliminarCubicacion(idCubicacion).subscribe(
          (x) => {
            this.sharedService.showMessage(
              'cubicación eliminada exitosamente',
              'ok'
            );
            this.cubicaciones = [];
            this.cubicacionService.getCubicaciones().subscribe(
              (response) => {
                this.cubicaciones = response.data.cubicaciones;
              },
              (err: HttpErrorResponse) => {
                this.sharedService.showMessage(
                  this.sharedService.getErrorMessage(err),
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
      },
      reject: () => {},
    });
  }
}
