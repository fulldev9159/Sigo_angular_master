import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Ot } from '@storeOT/features/ot/ot.model';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-ot',
  templateUrl: './list-ot.component.html',
  styleUrls: ['./list-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOtComponent implements OnInit, OnDestroy {

  // declarations
  public items$: Observable<Ot[]>;
  private destroyInstance: Subject<boolean> = new Subject();
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...'
    },
    body: {
      headers: [
        // {
        //   field: null,
        //   type: 'CHECKBOX',
        //   sort: 'id',
        //   header: 'id',
        //   editable: false
        // },
        {
          field: 'Sesión SCE',
          type: 'TEXT',
          sort: 'sesion_sce',
          header: 'sesion_sce',
          editable: false
        },
        {
          field: 'Nombre',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false
        },
        {
          field: 'Fecha inicio',
          type: 'DATE',
          sort: 'fecha_inicio',
          header: 'fecha_inicio',
          editable: false
        },
        {
          field: 'Fecha termino',
          type: 'DATE',
          sort: 'fecha_termino',
          header: 'fecha_termino',
          editable: false
        },
        {
          field: 'Contrato',
          type: 'TEXT',
          sort: 'contrato_marco_nombre',
          header: 'contrato_marco_nombre',
          editable: false
        },
        {
          field: 'Proveedor',
          type: 'TEXT',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
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
      sort: ['sesion_sce', 'nombre', 'fecha_inicio', 'contrato_marco_nombre', 'proveedor_nombre'],
      actions: [
        {
          icon: 'p-button-icon pi pi-check',
          class: 'p-button-rounded p-button-success p-mr-2',
          onClick: (item, event) => {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Desea aceptar Orden de trabajo?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
              },
            });
          }
        },
        {
          icon: 'p-button-icon pi pi-times',
          class: 'p-button-rounded p-button-danger p-mr-2',
          onClick: (item, event) => {
            this.confirmationService.confirm({
              target: event.target as EventTarget,
              message: `¿Desea rechazar Orden de trabajo?`,
              icon: 'pi pi-exclamation-triangle',
              acceptLabel: 'Confirmar',
              rejectLabel: 'Cancelar',
              accept: () => {
              },
            });
          }
        }
      ]
    }
  };

  public data = [];

  constructor(
    private otFacade: OtFacade,
    private authFacade: AuthFacade,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.authFacade.getLogin$()
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(authLogin => {
        if (authLogin) {
          this.otFacade.getOt({ token: authLogin.token, usuario_id: authLogin.usuario_id, tipo_usuario: 'gestor' });
        }
      });

    this.items$ = this.otFacade.getOt$();
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

}
