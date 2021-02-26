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
  public displayModalEdit = false;
  public detallesCubicacion: CubicacionModel.DetalleCubicacion[] = [];
  public total = 0;
  public nombreCubicacion = '';

  public contratosArr: CubicacionModel.ContratoMarco[] = [];
  public contratoId = '';
  public proveedorArr: CubicacionModel.Proveedores[] = [];
  public proveedorId = '';
  public subcontratoId = 0;
  public regionArr: CubicacionModel.Region[] = [];
  public regionId = '';
  public tipoServicioArr: CubicacionModel.TipoServicio[] = [];
  public tipoServicioId = '';
  public sourceProducts$: Observable<CubicacionModel.Product[]> = of([]);
  public sourcePtemp: CubicacionModel.Product[] = [];
  public selectedServicios: CubicacionModel.Product[] = [];
  public totalEdit = 0;
  public contratoDisabled = true;
  public proveedorDisabled = true;
  public regionDisabled = true;

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
          this.sharedService.getErrorMessage(err),
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
    nombreC: string,
    totalC: number,
    regionIdC: number,
    regionC: string,
    contratoC: string,
    proveedorC: string,
    subcontratoIDC: number
  ): void {
    const NombreClon = `Copia de ${nombreC}`;
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
              regionIdC,
              regionC,
              contratoC,
              proveedorC,
              subcontratoIDC,
              lpus
            )
            .subscribe(
              (responseSave) => {
                this.sharedService.showMessage(
                  'cubicación copiada exitosamente',
                  'ok'
                );
                this.cubicaciones = [];
                this.cubicacionService
                  .getCubicaciones(this.username, this.token)
                  .subscribe(
                    (cubicacion) => {
                      const id = 'cubicaciones';
                      cubicacion.data[id].forEach((x) => {
                        this.cubicaciones.push(x);
                      });
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

  editar(
    nombreC: string,
    contratoMarco: string,
    proveedorSubcontratoID: number,
    regionC: string,
    regionID: number,
    idCubicacion: number
  ): void {
    this.displayModalEdit = true;
    this.nombreCubicacion = nombreC;
    this.selectedServicios = [];
    this.cubicacionService
      .getDetalleCubicacion(this.username, this.token, idCubicacion)
      .subscribe((detalleCubicaion) => {
        const idDetalleCubicacion = 'detalle_cubicacion';
        detalleCubicaion.data[idDetalleCubicacion].forEach((lpu) => {
          this.selectedServicios.push({
            id_lpu: lpu.id_lpu,
            nombre: lpu.nombre,
            tipo_moneda: lpu.tipo_moneda,
            precio: lpu.precio,
            numero_producto: 'servicio.numero_producto',
            cantidad: 1,
            unidad: 'UNIDAD',
            region: regionC,
            tiposervicio: lpu.tipo_servicio,
          });
        });
      });

    this.cubicacionService.getContratos(this.username, this.token).subscribe(
      (response) => {
        const id = 'contratos_marco';
        this.contratosArr = response.data[id];
        this.contratoId = this.contratosArr
          .filter((contratos) => contratos.nombre === contratoMarco)[0]
          .id.toString();
        this.cubicacionService
          .getProveedoresSubcontrato(
            this.username,
            this.token,
            parseInt(this.contratoId, 10)
          )
          .subscribe(
            (responseProveedorSubcontrato) => {
              const idProveedorSubcontrato = 'proveedores';
              this.proveedorArr =
                responseProveedorSubcontrato.data[idProveedorSubcontrato];
              this.proveedorId = proveedorSubcontratoID.toString();
              this.subcontratoId = responseProveedorSubcontrato.data[
                idProveedorSubcontrato
              ]
                .filter((x) => x.id === proveedorSubcontratoID)
                .map((x) => x.subcontrato_id)[0][0];
              this.cubicacionService
                .getRegionesSubcontrato(
                  this.username,
                  this.token,
                  this.subcontratoId
                )
                .subscribe(
                  (responseRegionSubcontrato) => {
                    const idRegionSubcontrato = 'regiones';
                    this.regionArr =
                      responseRegionSubcontrato.data[idRegionSubcontrato];
                    this.regionId = regionID.toString();
                    this.cubicacionService
                      .getTipoServicioSubcontrato(
                        this.username,
                        this.token,
                        this.subcontratoId,
                        parseInt(this.regionId, 10)
                      )
                      .subscribe(
                        (responseTipoServicioSubcontrato) => {
                          const idTipoServicioSubcontrato = 'tipo_servicios';
                          this.tipoServicioArr =
                            responseTipoServicioSubcontrato.data[
                              idTipoServicioSubcontrato
                            ];
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
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  selectedContrato(): void {
    // console.log(`getProveedoresSubcontrato -> ${this.contratoId}`);
    // if (this.nombreCubicacion === '') {
    //   this.NombreErr = true;
    // }
    // this.proveedorId = '';
    // this.regionId = '';
    // this.tipoServicioId = '';
    // this.reset();
    // this.contratoDisabled = true;
    // this.cubicacionService
    //   .getProveedoresSubcontrato(
    //     this.username,
    //     this.token,
    //     parseInt(this.contratoId, 10)
    //   )
    //   .subscribe(
    //     (response) => {
    //       const id = 'proveedores';
    //       this.proveedorArr = response.data[id];
    //       // console.log(response);
    //     },
    //     (err: HttpErrorResponse) => {
    //       this.sharedService.showMessage(
    //         this.sharedService.getErrorMessage(err),
    //         'error'
    //       );
    //     }
    //   );
  }

  selectedProveedor(): void {}
  selectedRegion(): void {}
  selectedTipoServicio(): void {
    let tipoServicioName: string;
    let regionName: string;
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];
    this.regionArr.forEach((region) => {
      if (parseInt(this.regionId, 10) === region.id) {
        regionName = region.nombre;
      }
    });
    this.tipoServicioArr.forEach((tipo) => {
      if (parseInt(this.tipoServicioId, 10) === tipo.id) {
        tipoServicioName = tipo.nombre;
      }
    });

    this.cubicacionService
      .getServicioSubcontrato(
        this.username,
        this.token,
        this.subcontratoId,
        parseInt(this.regionId, 10),
        parseInt(this.tipoServicioId, 10)
      )
      .subscribe(
        (response) => {
          const id = 'servicios';
          response.data[id].forEach((servicio) => {
            this.sourcePtemp.push({
              id_lpu: servicio.id_lpu,
              nombre: servicio.nombre,
              tipo_moneda: servicio.tipo_moneda,
              precio: servicio.precio,
              numero_producto: servicio.numero_producto,
              cantidad: 1,
              unidad: 'UNIDAD',
              region: regionName,
              tiposervicio: tipoServicioName,
            });
          });
          this.sourceProducts$ = of(this.sourcePtemp);
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  getTotal(): void {}
  limpiarCarro(event: Event): any {}
  save(): any {}

  counter(i: number): Array<number> {
    return new Array(i);
  }

  elimnarLPU(index:number){
    this.selectedServicios = this.selectedServicios.filter(
      (value, indice) => indice != index
    );
  }
}
