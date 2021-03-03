import { Component, OnInit } from '@angular/core';
import * as CubicacionModel from './cubicacion.model';
import { CubicacionService } from '../../core/services/cubicacion.service';
import { AuthService } from '../../core/services/auth.service';
import { SharedService } from '../../core/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

import { of, Observable } from 'rxjs';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';

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
  public idCubicacion = 0;

  constructor(
    private cubicacionService: CubicacionService,
    private authService: AuthService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService
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
    this.reset();
    this.proveedorId = '';
    this.contratoId = '';
    this.regionId = '';
    console.log(`Proveedor: ${proveedorSubcontratoID} region: ${regionID}`);
    this.nombreCubicacion = nombreC;
    this.selectedServicios = [];
    this.idCubicacion = idCubicacion;

    this.cubicacionService.getContratos(this.username, this.token).subscribe(
      (response) => {
        const id = 'contratos_marco';
        this.contratosArr = response.data[id];
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );

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
            // numero_producto: 'servicio.numero_producto',
            cantidad: lpu.cantidad,
            unidad: 'UNIDAD',
            region: regionC.split('-')[1].substring(1),
            tiposervicio: lpu.tipo_servicio,
          });
        });
        this.getTotal();
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
              console.log(this.proveedorArr);
              // setTimeout(()=>{
              this.proveedorId = proveedorSubcontratoID.toString();
              console.log('se llena proveedorId');
              // },3000)

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

                    // console.log(this.regionArr)
                    // console.log(`regionId: ${this.regionId}`)
                    this.cubicacionService
                      .getTipoServicioSubcontrato(
                        this.username,
                        this.token,
                        this.subcontratoId,
                        parseInt(this.regionId, 10)
                      )
                      .subscribe(
                        (responseTipoServicioSubcontrato) => {
                          this.displayModalEdit = true;
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
    this.proveedorId = '';
    this.regionId = '';
    this.tipoServicioId = '';
    this.reset();
    this.contratoDisabled = true;
    this.cubicacionService
      .getProveedoresSubcontrato(
        this.username,
        this.token,
        parseInt(this.contratoId, 10)
      )
      .subscribe(
        (response) => {
          const id = 'proveedores';
          this.proveedorArr = response.data[id];
          // console.log(response);
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedProveedor(): void {
    this.reset();
    this.proveedorDisabled = true;
    this.proveedorArr.forEach((x) => {
      const provID = parseInt(this.proveedorId, 10);
      if (x.id === provID) {
        const ids = 'subcontrato_id';
        x[ids].forEach((sub: number) => {
          this.subcontratoId = sub;
        });
        this.cubicacionService
          .getRegionesSubcontrato(this.username, this.token, this.subcontratoId)
          .subscribe(
            (response) => {
              const id = 'regiones';
              this.regionArr = response.data[id];
            },
            (err: HttpErrorResponse) => {
              this.sharedService.showMessage(
                this.sharedService.getErrorMessage(err),
                'error'
              );
            }
          );
      }
    });
  }

  selectedRegion(): void {
    this.regionDisabled = true;
    this.reset();
    this.cubicacionService
      .getTipoServicioSubcontrato(
        this.username,
        this.token,
        this.subcontratoId,
        parseInt(this.regionId, 10)
      )
      .subscribe(
        (response) => {
          const id = 'tipo_servicios';
          this.tipoServicioArr = response.data[id];
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedTipoServicio(): void {
    console.log(this.selectedServicios);
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
              // numero_producto: servicio.numero_producto,
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

  getTotal(): void {
    this.total = 0;
    this.selectedServicios.forEach((servicio) => {
      this.total = this.total + servicio.precio * servicio.cantidad;
    });
  }
  limpiarCarro(event: Event): any {}
  saveEdit(): any {
    this.getTotal();
    const lpus: CubicacionModel.Lpus[] = [];
    this.selectedServicios.forEach((x) => {
      lpus.push({
        id_lpu: x.id_lpu,
        cantidad: parseInt(x.cantidad.toString(), 10),
      });
    });
    let regionName = '';
    this.regionArr.forEach((region) => {
      if (parseInt(this.regionId, 10) === region.id) {
        regionName = `${region.codigo} - ${region.nombre}`;
      }
    });
    let contratoName = '';
    this.contratosArr.forEach((contrato) => {
      if (parseInt(this.contratoId, 10) === contrato.id) {
        contratoName = contrato.nombre;
      }
    });
    const proveedorName = this.proveedorArr.filter(
      (x) => x.id === parseInt(this.proveedorId, 10)
    )[0].nombre;
    this.cubicacionService
      .editCubicacion(
        this.token,
        'ss',
        this.idCubicacion,
        this.nombreCubicacion,
        this.total,
        parseInt(this.regionId, 10),
        regionName,
        contratoName,
        proveedorName,
        this.subcontratoId,
        lpus
      )
      .subscribe(
        (x) => {
          this.displayModalEdit = false;
          this.sharedService.showMessage(
            'cubicación editada exitosamente',
            'ok'
          );
          this.cubicaciones = [];
          this.cubicacionService
            .getCubicaciones(this.username, this.token)
            .subscribe(
              (cubicacion) => {
                const id = 'cubicaciones';
                cubicacion.data[id].forEach((cub) => {
                  this.cubicaciones.push(cub);
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
            `(HTTP code: ${err.status}) ${err.error.status.description}`,
            'error'
          );
        }
      );
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  elimnarLPU(index: number): void {
    this.selectedServicios = this.selectedServicios.filter(
      (value, indice) => indice !== index
    );
    this.getTotal();
  }

  confirm(event: Event, input: string): any {
    let permitirMensaje = false;
    if (input === 'contrato' && this.contratoDisabled) {
      permitirMensaje = true;
    }
    if (input === 'proveedor' && this.proveedorDisabled) {
      permitirMensaje = true;
    }
    if (input === 'region' && this.regionDisabled) {
      permitirMensaje = true;
    }
    if (this.selectedServicios.length > 0 && permitirMensaje) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Si cambia de ${input} borrara todos los sevicios seleccionados. Está seguro que desea proceder?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (input === 'contrato') {
            this.contratoDisabled = false;
          }
          if (input === 'proveedor') {
            this.proveedorDisabled = false;
          }
          if (input === 'region') {
            this.regionDisabled = false;
          }
        },
        reject: () => {},
      });
    } else {
      if (input === 'contrato') {
        this.contratoDisabled = false;
      }
      if (input === 'proveedor') {
        this.proveedorDisabled = false;
      }
      if (input === 'region') {
        this.regionDisabled = false;
      }
    }
  }

  reset(): any {
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];
    this.selectedServicios = [];
  }

  confirmEliminacion(event: Event, idCubicacion: number): any {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Está seguro que desea eliminar esta cubicación?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cubicacionService
          .eliminarCubicacion(this.username, this.token, idCubicacion)
          .subscribe(
            (x) => {
              this.sharedService.showMessage(
                'cubicación eliminada exitosamente',
                'ok'
              );
              this.cubicaciones = [];
              this.cubicacionService
                .getCubicaciones(this.username, this.token)
                .subscribe(
                  (cubicacion) => {
                    const id = 'cubicaciones';
                    cubicacion.data[id].forEach((cub) => {
                      this.cubicaciones.push(cub);
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
