import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import { Ot } from '@storeOT/features/ot/ot.model';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Login, Perfil } from '@data';

@Component({
  selector: 'app-list-ot',
  templateUrl: './list-ot.component.html',
  styleUrls: ['./list-ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOtComponent implements OnInit, OnDestroy {
  // declarations
  public items$: Observable<Ot[]>;
  public responsable: 'MIAS';
  public tipoOT: 'OT';
  public selectedIndex = 0;
  public selectedOTs: string;
  private destroyInstance: Subject<boolean> = new Subject();
  public authLogin: Login = null;
  public currentProfile: Perfil = null;
  public configTable = {
    header: true,
    headerConfig: {
      title: '',
      searchText: 'buscar...',
      actionsType: 'Buttons',
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
          field: 'ID',
          type: 'TEXT',
          sort: 'id',
          header: 'id',
          width: '5%',
          editable: false,
        },
        // {
        //   field: 'Sesión SCE',
        //   type: 'TEXT',
        //   sort: 'sesion_sce',
        //   header: 'sesion_sce',
        //   editable: false,
        // },
        {
          field: 'Nombre',
          type: 'TEXT',
          sort: 'nombre',
          header: 'nombre',
          editable: false,
        },
        // {
        //   field: 'Responsable',
        //   type: 'TEXT',
        //   sort: 'responsable',
        //   header: 'responsable',
        //   editable: false,
        // },
        {
          field: 'Estado',
          type: 'TEXT',
          sort: 'estado_otdesc',
          header: 'estado_otdesc',
          editable: false,
        },
        {
          field: 'Etapa',
          type: 'TEXT',
          sort: 'etapa_otdesc',
          header: 'etapa_otdesc',
          editable: false,
        },
        {
          field: 'Fecha inicio',
          type: 'DATE',
          sort: 'fecha_inicio',
          header: 'fecha_inicio',
          editable: false,
        },
        {
          field: 'Fecha termino',
          type: 'DATE',
          sort: 'fecha_termino',
          header: 'fecha_termino',
          editable: false,
        },
        {
          field: 'Contrato',
          type: 'TEXT',
          sort: 'contrato_marco_nombre',
          header: 'contrato_marco_nombre',
          editable: false,
        },
        {
          field: 'Proveedor',
          type: 'TEXT',
          sort: 'proveedor_nombre',
          header: 'proveedor_nombre',
          editable: false,
        },
        {
          field: null,
          type: 'ACTIONS',
          sort: null,
          header: null,
          width: '6%',
          editable: false,
        },
      ],
      sort: [
        'id',
        'nombre',
        'fecha_inicio',
        'contrato_marco_nombre',
        'proveedor_nombre',
      ],
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
              accept: () => {},
            });
          },
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
              accept: () => {},
            });
          },
        },
      ],
    },
  };

  public data = [];

  constructor(
    private otFacade: OtFacade,
    private authFacade: AuthFacade,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.responsable = 'MIAS';
    this.tipoOT = 'OT';
    this.selectedIndex = 0;
    this.selectedOTs = 'ABIERTAS';
    combineLatest([
      this.authFacade.getLogin$(),
      this.authFacade.getCurrentProfile$(),
    ])
      .pipe(takeUntil(this.destroyInstance))
      .subscribe(([authLogin, profile]) => {
        if (authLogin && profile) {
          this.authLogin = authLogin;
          this.currentProfile = profile;
          this.otFacade.getOt({
            perfil_id: +this.currentProfile.id,
            filtro_propietario: this.responsable,
            filtro_tipo: this.tipoOT,
          });
        }
      });

    this.items$ = this.otFacade.getOt$();
  }

  onChange($event): void {
    this.selectedIndex = $event.index;
    if (this.selectedIndex === 0) {
      console.log(this.selectedIndex);
      console.log(this.responsable);
      console.log(this.tipoOT);
      this.selectedOTs = 'CERRADAS';
      this.otFacade.getOt({
        perfil_id: +this.currentProfile.id,
        filtro_propietario: this.responsable,
        filtro_tipo: this.tipoOT,
      });
    } else if (this.selectedIndex === 1) {
      console.log(this.selectedIndex);
      console.log(this.responsable);
      console.log(this.tipoOT);
      this.selectedOTs = 'ABIERTAS';
      this.otFacade.getOt({
        perfil_id: +this.currentProfile.id,
        filtro_propietario: this.responsable,
        filtro_tipo: this.tipoOT,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

  onClick(event): void {
    console.log(this.selectedIndex);
    console.log(this.responsable);
    console.log(this.tipoOT);
    this.otFacade.getOt({
      perfil_id: +this.currentProfile.id,
      filtro_propietario: this.responsable,
      filtro_tipo: this.tipoOT,
    });
  }

  onClickTipo(event): void {
    console.log(this.selectedIndex);
    console.log(this.responsable);
    console.log(this.tipoOT);
    this.otFacade.getOt({
      perfil_id: +this.currentProfile.id,
      filtro_propietario: this.responsable,
      filtro_tipo: this.tipoOT,
    });
  }
}
