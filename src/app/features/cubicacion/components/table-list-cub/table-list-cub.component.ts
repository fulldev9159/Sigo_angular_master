import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Cubicacion } from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';
import { filter, map, Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'zwc-table-list-cub',
  templateUrl: './table-list-cub.component.html',
  styleUrls: ['./table-list-cub.component.scss'],
})
export class TableListComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  cubicaciones$: Observable<Cubicacion[]> =
    this.cubicacionFacade.listarCubicaciones$();

  // LOADINGS
  getCubicacioneSending$ = this.loadingFacade.sendingGetCubicaciones$();

  // FORMULARIO
  formFilterControl = {
    id: new FormControl(null, []),
    nombre: new FormControl('', []),
    tipo_cubicacion: new FormControl(''),
    contrato_marco: new FormControl(''),
    agencia: new FormControl(''),
    creado_por: new FormControl(''),
    fecha_creacion: new FormControl(''),
    total: new FormControl(''),
  };

  formFilter: FormGroup = new FormGroup(this.formFilterControl);
  constructor(
    private cubicacionFacade: CubicacionFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.formFilter.get('nombre').valueChanges.subscribe(nombre => {
        this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$();
        if (nombre !== undefined && nombre) {
          this.cubicaciones$ = this.cubicacionFacade.listarCubicaciones$().pipe(
            map(values =>
              values.filter(value => {
                const pattern = new RegExp(`^${nombre}`, 'g');
                return pattern.test(value.cubicacion_nombre) ? true : false;
              })
            )
          );
        }
      })
    );
  }

  getcubs() {
    this.cubicacionFacade.listarCubicaciones();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
