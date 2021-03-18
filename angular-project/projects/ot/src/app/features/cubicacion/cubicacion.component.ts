import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';
import { CubicacionService } from '@coreOT/services/cubicacion.service';
import { SharedService } from '@coreOT/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { Observable, of } from 'rxjs';
@Component({
  selector: 'ot-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./crear-cubicacion/crear-cubicacion.component.scss'],
  providers: [ConfirmationService],
})
export class CubicacionComponent implements OnInit {
  public cubicaciones: CubicacionModel.Cubicacion[] = [];
  showModalDetalleCubicacion = false;
  cubicacionSelected: CubicacionModel.Cubicacion = {} as CubicacionModel.Cubicacion;
  public detallesCubicacionSelected: CubicacionModel.DetalleCubicacion[] = [];
  showModalEditarCubicacion = false;

  form: FormGroup;
  public contratosArr: CubicacionModel.ContratoMarco[] = [];
  public proveedorArr: CubicacionModel.Proveedores[] = [];
  public regionArr: CubicacionModel.Region[] = [];
  public tipoServicioArr: CubicacionModel.TipoServicio[] = [];
  public sourceProducts$: Observable<CubicacionModel.LPU[]> = of([]);
  public sourcePtemp: CubicacionModel.LPU[] = [];
  public selectedServicios: CubicacionModel.LPU[] = [];
  public total = 0;
  public contratoId = '';
  public proveedorId = '';
  public subcontratoId = 0;
  public regionId = '';
  public tipoServicioId = '';
  public totalEdit = 0;
  public contratoDisabled = true;
  public proveedorDisabled = true;
  public regionDisabled = true;
  public idCubicacion = 0;
  public nombreCubicacion = '';

  constructor(
    private cubicacionService: CubicacionService,
    private sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      contratoId: ['', [Validators.required]],
      proveedorId: ['', [Validators.required]],
      subcontratoId: [0, [Validators.required]],
      regionId: ['', [Validators.required]],
      tiposervicioId: ['', [Validators.required]],
      // lpus: [this.fb.array([this.createItem()]), Validators.required],
    });
  }

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
    this.cubicacionService.getContratos().subscribe(
      (response) => {
        this.contratosArr = response.data.contratos_marco;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );
  }

  displayModalDetaillesCubicacion(id: number): void {
    this.showModalDetalleCubicacion = true;
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

  editar(id: number): void {
    // this.showModalEditarCubicacion = true;

    this.cubicacionSelected = this.cubicaciones.filter(
      (x) => x.cubicacion_id === id
    )[0];
    this.proveedorId = '';
    this.contratoId = '';
    this.regionId = '';
    this.selectedServicios = [];
    this.idCubicacion = id;
    this.nombreCubicacion = this.cubicacionSelected.nombre;
    this.reset();

    this.cubicacionService.getContratos().subscribe(
      (response) => {
        this.contratosArr = response.data.contratos_marco;
      },
      (err: HttpErrorResponse) => {
        this.sharedService.showMessage(
          this.sharedService.getErrorMessage(err),
          'error'
        );
      }
    );

    this.cubicacionService
      .getDetalleCubicacion(id)
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
            region: this.cubicacionSelected.region.split('-')[1].substring(1),
            tiposervicio: lpu.tipo_servicio,
          });
        });
        this.getTotal();
      });

    this.cubicacionService.getContratos().subscribe(
      (response) => {
        this.contratosArr = response.data.contratos_marco;
        this.contratoId = this.contratosArr
          .filter(
            (contratos) =>
              contratos.nombre === this.cubicacionSelected.contrato_marco
          )[0]
          .id.toString();
        this.cubicacionService
          .getProveedoresSubcontrato(parseInt(this.contratoId, 10))
          .subscribe(
            (responseProveedorSubcontrato) => {
              const idProveedorSubcontrato = 'proveedores';
              this.proveedorArr =
                responseProveedorSubcontrato.data[idProveedorSubcontrato];
              console.log(this.proveedorArr);
              // setTimeout(()=>{
              this.proveedorId = this.cubicacionSelected.proveedor_id.toString();
              console.log('se llena proveedorId');
              // },3000)

              this.subcontratoId = this.cubicacionSelected.subcontrato_id;
              this.cubicacionService
                .getRegionesSubcontrato(this.subcontratoId)
                .subscribe(
                  (responseRegionSubcontrato) => {
                    const idRegionSubcontrato = 'regiones';
                    this.regionArr =
                      responseRegionSubcontrato.data[idRegionSubcontrato];
                    this.regionId = this.cubicacionSelected.region_id.toString();

                    // console.log(this.regionArr)
                    // console.log(`regionId: ${this.regionId}`)
                    this.cubicacionService
                      .getTipoServicioSubcontrato(
                        this.subcontratoId,
                        parseInt(this.regionId, 10)
                      )
                      .subscribe(
                        (responseTipoServicioSubcontrato) => {
                          this.showModalEditarCubicacion = true;
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

    // this.form.controls.contratoId.setValue(
    //   this.contratosArr.filter(
    //     (x) => x.nombre === this.cubicacionSelected.contrato_marco
    //   )[0].id.toString()
    // );

    // this.reset();

    // this.form.controls.nombre.setValue(this.cubicacionSelected.nombre);

    //     this.cubicacionService
    //       .getProveedoresSubcontrato(parseInt(this.values.contratoId, 10))
    //       .subscribe(
    //         (response) => {
    //           this.proveedorArr = response.data.proveedores;
    //           this.form.controls.proveedorId.setValue(
    //             this.cubicacionSelected.proveedor_id.toString()
    //           );
    //           this.form.controls.subcontratoId.setValue(
    //             this.cubicacionSelected.subcontrato_id
    //           );
    //           this.cubicacionService
    //             .getRegionesSubcontrato(this.values.subcontratoId)
    //             .subscribe(
    //               (response) => {
    //                 this.regionArr = response.data.regiones;
    //                 this.form.controls.regionId.setValue(this.cubicacionSelected.region_id.toString() )

    //                 this.cubicacionService
    //                 .getTipoServicioSubcontrato(
    //                   this.values.subcontratoId,
    //                   parseInt(this.values.regionId, 10)
    //                 )
    //                 .subscribe(
    //                   (response) => {
    //                     this.tipoServicioArr = response.data.tipo_servicios;
    //                   },
    //                   (err: HttpErrorResponse) => {
    //                     this.sharedService.showMessage(
    //                       this.sharedService.getErrorMessage(err),
    //                       'error'
    //                     );
    //                   }
    //                 );
    //               },
    //               (err: HttpErrorResponse) => {
    //                 this.sharedService.showMessage(
    //                   this.sharedService.getErrorMessage(err),
    //                   'error'
    //                 );
    //               }
    //             );
    //         },
    //         (err: HttpErrorResponse) => {
    //           this.sharedService.showMessage(
    //             this.sharedService.getErrorMessage(err),
    //             'error'
    //           );
    //         }
    //       );

    // this.cubicacionService
    //   .getDetalleCubicacion(this.cubicacionSelected.cubicacion_id)
    //   .subscribe((response) => {
    //     response.data.detalle_cubicacion.forEach((lpu) => {
    //       this.selectedServicios.push({
    //         id_lpu: lpu.id_lpu,
    //         nombre: lpu.nombre,
    //         tipo_moneda: lpu.tipo_moneda,
    //         precio: lpu.precio,
    //         // numero_producto: 'servicio.numero_producto',
    //         cantidad: lpu.cantidad,
    //         unidad: 'UNIDAD',
    //         region: this.cubicacionSelected.region.split('-')[1].substring(1),
    //         tiposervicio: lpu.tipo_servicio,
    //       });
    //     });
    //     this.getTotal();
    //   });
  }

  get values(): CubicacionModel.CubiciacionForm {
    const data = this.form.getRawValue();
    return {
      nombre: data.nombre.trim(),
      contratoId: data.contratoId.trim(),
      proveedorId: data.proveedorId.trim(),
      subcontratoId: data.subcontratoId,
      regionId: data.regionId.trim(),
      tiposervicioId: data.tiposervicioId.trim(),
      // lpus: data.lpus,
    } as CubicacionModel.CubiciacionForm;
  }

  get valid(): boolean {
    return this.form.valid;
  }

  confirm(event: Event, input: string): any {
    if (this.form.controls[input].disabled) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Si cambia de ${input} borrara todos los sevicios seleccionados. Está seguro que desea proceder?`,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.form.controls[input].enable();
          this.reset();
          if (input === 'contratoId') {
            this.form.controls.proveedorId.setValue('');
            this.form.controls.proveedorId.enable();
            this.form.controls.regionId.setValue('');
            this.form.controls.regionId.enable();
            this.form.controls.tiposervicioId.setValue('');
          } else if (input === 'proveedorId') {
            this.form.controls.regionId.setValue('');
            this.form.controls.regionId.enable();
            this.form.controls.tiposervicioId.setValue('');
          }
        },
        reject: () => {},
      });
    }
  }

  disableInput(input: string): void {
    if (this.values[input] !== '') {
      this.form.controls[input].disable();
    }
  }

  reset(): any {
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];
    // this.form.controls.lpus.setValue([]);
    this.selectedServicios = [];
  }

  getTotal(): any {
    this.total = 0;
    this.selectedServicios.forEach((servicio) => {
      this.total = this.total + servicio.precio * servicio.cantidad;
    });
  }

  elimnarLPU(index: number): void {
    this.selectedServicios = this.selectedServicios.filter(
      (value, indice) => indice !== index
    );
  }

  limpiarCarro(event: Event): any {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Se borraran todos los sevicios seleccionados. Está seguro que desea proceder?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // this.form.controls.lpus.setValue([]);
        this.selectedServicios = [];
      },
      reject: () => {},
    });
  }

  counter(i: number): Array<number> {
    return new Array(i);
  }

  selectedContrato(): void {
    this.reset();
    this.disableInput('contratoId');
    this.form.controls.proveedorId.setValue('');
    // this.form.controls.proveedorId.enable();
    this.form.controls.regionId.setValue('');
    // this.form.controls.regionId.enable();
    this.form.controls.tiposervicioId.setValue('');
    this.cubicacionService
      .getProveedoresSubcontrato(parseInt(this.values.contratoId, 10))
      .subscribe(
        (response) => {
          this.proveedorArr = response.data.proveedores;
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
    this.disableInput('proveedorId');
    this.form.controls.regionId.setValue('');
    // this.form.controls.regionId.enable();
    this.form.controls.tiposervicioId.setValue('');
    this.form.controls.subcontratoId.setValue(
      this.proveedorArr.filter(
        (x) => x.id === parseInt(this.values.proveedorId, 10)
      )[0].subcontrato_id[0]
    );
    this.cubicacionService
      .getRegionesSubcontrato(this.values.subcontratoId)
      .subscribe(
        (response) => {
          this.regionArr = response.data.regiones;
        },
        (err: HttpErrorResponse) => {
          this.sharedService.showMessage(
            this.sharedService.getErrorMessage(err),
            'error'
          );
        }
      );
  }

  selectedRegion(): void {
    this.reset();
    // this.disableInput('regionId');
    this.form.controls.tiposervicioId.setValue('');
    this.cubicacionService
      .getTipoServicioSubcontrato(
        this.values.subcontratoId,
        parseInt(this.values.regionId, 10)
      )
      .subscribe(
        (response) => {
          this.tipoServicioArr = response.data.tipo_servicios;
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
    // const tipoServicioName = this.tipoServicioArr.filter(
    //   (x) => x.id === parseInt(this.values.tiposervicioId, 10)
    // )[0].nombre;
    // const regionName = this.regionArr.filter(
    //   (x) => x.id === parseInt(this.values.regionId, 10)
    // )[0].nombre;
    const tipoServicioName = this.tipoServicioArr.filter(
      (x) => x.id === parseInt(this.tipoServicioId, 10)
    )[0].nombre;
    const regionName = this.regionArr.filter(
      (x) => x.id === parseInt(this.regionId, 10)
    )[0].nombre;
    this.sourceProducts$ = of([]);
    this.sourcePtemp = [];

    this.cubicacionService
      .getServicioSubcontrato(
        this.subcontratoId,
        parseInt(this.regionId, 10),
        parseInt(this.tipoServicioId, 10)
      )
      .subscribe(
        (response) => {
          response.data.servicios.forEach((servicio) => {
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

  save(): any {
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
        this.cubicacionSelected.cubicacion_id,
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
          this.showModalEditarCubicacion = false;
          this.sharedService.showMessage(
            'cubicación editada exitosamente',
            'ok'
          );
          this.cubicaciones = [];
          this.cubicacionService.getCubicaciones().subscribe(
            (cubicacion) => {
              cubicacion.data.cubicaciones.forEach((cub) => {
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
}
