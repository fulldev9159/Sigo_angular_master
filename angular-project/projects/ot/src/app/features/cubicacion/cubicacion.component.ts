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
    private sharedService: SharedService
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
}
