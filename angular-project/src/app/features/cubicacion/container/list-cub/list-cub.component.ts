import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { Cubicacion, SessionData } from '@data';
import { CloneCubageFormComponent } from '../../forms/clone-cubage-form/clone-cubage-form.component';
import { ListCubTableService } from './list-cub-table.service';
import { BaseFacade } from '@storeOT/features/base/base.facade';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCubComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  cubicaciones$: Observable<Cubicacion[]>;
  loading$: Observable<boolean>;

  // DISPLAY MODALS
  displayClonatedCubageNameModal = false;
  DisplayModalDetalleCubicacion = false;
  displayModalDeleteCub = false;

  // FORMULARIO

  // TABLE
  configTable = null;

  // EXTRAS
  usuario_id = null;
  cubicacion_id = null;
  authLogin: SessionData = null;
  trashICon = faTrash;

  @ViewChild('cloneCubageForm', {
    read: CloneCubageFormComponent,
    static: false,
  })
  cloneCubageForm: CloneCubageFormComponent;

  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private cubageFacade: CubicacionFacade,
    private confirmationService: ConfirmationService,
    private listCubTableService: ListCubTableService,
    private baseFacade: BaseFacade
  ) {}

  ngOnInit(): void {
    this.onInitReset();
    this.onInitGetData();
    this.onInitSetData();
    this.onInitAccionesAdicionales();
  }

  onInitReset(): void {
    this.cubageFacade.resetData();
  }
  onInitGetData(): void {
    this.cubageFacade.AllCubs();
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        } else {
          this.usuario_id = loginAuth.usuario_id;
        }
      })
    );
  }
  onInitSetData(): void {
    this.configTable = this.listCubTableService.getTableConfig();
    this.configTable.body.actions = (cub: Cubicacion) => {
      const actions: any[] = [
        {
          type: 'alldisplay',
          label: 'Detalles',
          onClick: (event: Event, item: Cubicacion) => {
            if (item) {
              this.DisplayModalDetalleCubicacion = true;
              this.cubageFacade.DetalleCub(item.cubicacion_id);
            }
          },
        },
        {
          type: 'alldisplay',
          label: 'Clonar',
          onClick: (event: Event, item: Cubicacion) => {
            if (item) {
              this.displayClonatedCubageNameModal = true;
              this.cubageFacade.DetalleCub(item.cubicacion_id);
            }
          },
        },
      ];

      let msg = '';
      if (cub.asignado !== 0) {
        msg = 'No puede editar una cubicación asignada a una OT';
      }
      if (cub.creador_usuario_id !== this.usuario_id) {
        msg = 'No puede editar cubicaciones de sus colegas';
      }

      actions.push({
        type: 'button-condicional',
        label: 'Editar',
        condicion:
          cub.asignado === 0 && cub.creador_usuario_id === this.usuario_id,
        tooltipDisabled: msg,
        onClick: (event: Event, item: Cubicacion) => {
          if (item) {
            this.router.navigate([
              '/app/cubicacion/form-cub',
              item.cubicacion_id,
            ]);
          }
        },
      });

      if (cub.asignado !== 0) {
        msg = 'No puede eliminar una cubicación asignada a una OT';
      }
      if (cub.creador_usuario_id !== this.usuario_id) {
        msg = 'No puede eliminar cubicaciones de sus colegas';
      }

      actions.push({
        type: 'button-icon-condicional',
        icon: 'trashICon',
        tooltipDisabled: msg,
        condicion:
          cub.asignado === 0 && cub.creador_usuario_id === this.usuario_id,
        label: 'Eliminar',
        onClick: (event: Event, item: Cubicacion) => {
          if (item) {
            this.displayModalDeleteCub = true;
            this.cubicacion_id = item.cubicacion_id;
          }
        },
      });

      return actions;
    };

    this.cubicaciones$ = this.cubageFacade.AllCubs$();
    this.loading$ = this.baseFacade.loading$();
  }
  onInitAccionesAdicionales(): void {}

  closeModalDetalles(): void {
    this.DisplayModalDetalleCubicacion = false;
  }

  closeModalClonar(): void {
    this.displayClonatedCubageNameModal = false;
  }

  closeModalDeleteCub(): void {
    this.displayModalDeleteCub = false;
    this.cubicacion_id = null;
  }
  cloneCubabeFormSubmit(): void {
    this.cloneCubageForm.submit();
    this.closeModalClonar();
  }

  DeleteCub(): void {
    this.cubageFacade.deleteCub(this.cubicacion_id);
    this.displayModalDeleteCub = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
