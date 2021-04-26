import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCubComponent implements OnInit, OnDestroy {

  // declarations
  public items$: Observable<Cubicacion[]>;
  private destroyInstance: Subject<boolean> = new Subject();
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...'
    },
    body: {
      headers: [
        {
          field: 'Nombre',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false
        },
        {
          field: 'Fecha creación',
          type: 'DATE',
          sort: 'fecha_creacion',
          header: 'fecha_creacion',
          editable: false
        },
        {
          field: 'Región',
          type: 'TEXT',
          sort: 'region_nombre',
          header: 'region_nombre',
          editable: false
        },
        {
          field: 'Contrato marco',
          type: 'TEXT',
          sort: 'contrato_marco_nombre',
          header: 'contrato_marco_nombre',
          editable: false
        },
        {
          field: 'Total',
          type: 'NUMBER',
          sort: 'total',
          header: 'total',
          editable: false
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          editable: false
        }
      ],
      sort: ['nombre', 'fecha', 'region_nombre', 'contrato_marco_nombre', 'total'],
      actions: [
        {
          icon: 'p-button-icon pi pi-copy',
          class: 'p-button-rounded p-button-info p-mr-2',
          onClick: (item) => {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: '¿Está seguro que desea realizar copia de esta cubicación?',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                const cubicacion = {
                  ...item,
                  id: (+(new Date())).toString()
                };
                this.cubageFacade.replyCubicacion(cubicacion);
              },
            });
          }
        },
        {
          icon: 'p-button-icon pi pi-pencil',
          class: 'p-button-rounded p-button-warning p-mr-2',
          onClick: (item) => {
            if (item) {
              this.router.navigate(['/app/cubicacion/form-cub', item.id]);
            }
          }
        },
        {
          icon: 'p-button-icon pi pi-trash',
          class: 'p-button-rounded p-button-danger',
          onClick: (item, position) => {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: '¿Está seguro que desea eliminar esta cubicación?',
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
                this.cubageFacade.deleteCubicacion(position);
              },
            });
          }
        }
      ]
    }
  };

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private cubageFacade: CubicacionFacade,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.authFacade.getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(authLogin => {
        if (authLogin) {
          this.cubageFacade.getCubicacion({ token: authLogin.token });
        }
      });

    this.items$ = this.cubageFacade.getCubicacion$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

}
