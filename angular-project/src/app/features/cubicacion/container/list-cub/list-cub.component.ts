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
import { AllCubs, Cubicacion, SessionData } from '@data';
import { CloneCubageFormComponent } from '../../forms/clone-cubage-form/clone-cubage-form.component';
import { ListCubTableService } from './list-cub-table.service';

@Component({
  selector: 'app-list-cub',
  templateUrl: './list-cub.component.html',
  styleUrls: ['./list-cub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCubComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  cubicaciones$: Observable<AllCubs[]>;

  // DISPLAY MODALS
  displayClonatedCubageNameModal = false;
  DisplayModalDetalleCubicacion = false;

  // FORMULARIO

  // TABLE
  configTable = null;

  // EXTRAS

  authLogin: SessionData = null;

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
    private listCubTableService: ListCubTableService
  ) {}

  ngOnInit(): void {
    this.onInitReset();
    this.onInitGetData();
    this.onInitSetData();
    this.onInitAccionesAdicionales();
    // this.subscription.add(
    //   this.authFacade.getLogin$().subscribe(authLogin => {
    //     if (authLogin) {
    //       this.authLogin = authLogin;
    //     }
    //   })
    // );
    // this.cubageFacade.getCubicacionAction();
    // this.cubicaciones$ = this.cubageFacade.getCubicacionSelector$();
  }

  onInitReset(): void {
    this.cubageFacade.resetData();
  }
  onInitGetData(): void {
    this.cubageFacade.AllCubs();
  }
  onInitSetData(): void {
    this.configTable = this.listCubTableService.getTableConfig();
    (this.configTable.body.actions as Array<any>).push({
      type: 'alldisplay',
      label: 'Detalles',
      onClick: (event: Event, item: AllCubs) => {
        if (item) {
          this.DisplayModalDetalleCubicacion = true;
          this.cubageFacade.DetalleCub(item.cubicacion_id);
        }
      },
    });
    this.cubicaciones$ = this.cubageFacade.AllCubs$();
  }
  onInitAccionesAdicionales(): void {}

  closeModalDetalles() {
    this.DisplayModalDetalleCubicacion = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // cloneCubabeFormSubmit(): void {
  //   this.cloneCubageForm.submit();
  //   this.displayClonatedCubageNameModal = false;
  // }
}

// public configTable = {
//     actions: (cub: Cubicacion) => {
//       const actions = [
//         {
//           disabled: false,
//           tooltipDisabled: '',
//           icon: 'p-button-icon pi pi-copy',
//           class: 'p-button p-button-help p-mr-2',
//           onClick: (event: Event, item: Cubicacion) => {
//             this.cloneCubageForm.reset();
//             this.cubageFacade.selectCubicacion(item);
//             this.displayClonatedCubageNameModal = true;
//           },
//         },
//         {
//           icon: 'p-button-icon pi pi-eye',
//           class: 'p-button p-button-info p-mr-2',
//           onClick: (event: Event, item: Cubicacion) => {
//             this.DisplayModalDetalleCubicacion = true;
//             this.cubageFacade.getDetallesCubicacionAction(item.id);
//           },
//         },
//       ];

//       let disabled = false;
//       let tooltipTextEdit = '';
//       let tooltipTextDelete = '';
//       if (cub.asignado) {
//         disabled = true;
//         tooltipTextEdit = 'No puede editar una cubicacion asignada a una OT';
//         tooltipTextDelete =
//           'No puede eliminar una cubicacion asignada a una OT';
//       } else if (this.authLogin.usuario_id !== cub.creador_usuario_id) {
//         disabled = true;
//         tooltipTextEdit = 'No puede editar cubicaciones de otro usuario';
//         tooltipTextDelete = 'No puede eliminar cubicaciones de otro usuario';
//       }

//       actions.push(
//         {
//           disabled,
//           tooltipDisabled: tooltipTextEdit,
//           icon: 'p-button-icon pi pi-pencil',
//           class: 'p-button p-button-warning p-mr-2',
//           onClick: (event: Event, item: Cubicacion) => {
//             if (item) {
//               this.router.navigate(['/app/cubicacion/form-cub', item.id]);
//             }
//           },
//         },
//         {
//           disabled,
//           tooltipDisabled: tooltipTextDelete,
//           icon: 'p-button-icon pi pi-trash',
//           class: 'p-button p-button-danger',
//           onClick: (event: Event, item: Cubicacion) => {
//             this.confirmationService.confirm({
//               target: event.target as EventTarget,
//               message: '¿Está seguro que desea eliminar esta cubicación?',
//               icon: 'pi pi-exclamation-triangle',
//               acceptLabel: 'Confirmar',
//               rejectLabel: 'Cancelar',
//               accept: () => {
//                 this.cubageFacade.deleteCubicacion(item.id);
//               },
//             });
//           },
//         }
//       );
//       return actions;
//     },
//   },
// };
