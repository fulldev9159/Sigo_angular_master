import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { observable, Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { BaseFacade } from '@storeOT/features/base/base.facade';

import { FormCubService } from './form-cub.service';

import { ContratosUser, SessionData } from '@data';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormCubContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // DATOS A USAR
  loginData$: Observable<SessionData>;
  contratosUser4Cub$: Observable<ContratosUser[]>;

  // FORMULARIO
  formControls: any;
  formCub: FormGroup;
  formFiltros: FormGroup;

  // EXTRAS
  // SI EL MODE ES 'EDIT' ENTONCES SE DESPLIEGA UNA PANTALLA EN NEGRO HASTA QUE SE CARGEN TODOS LOS DATOA A EDITAR
  loading$: Observable<boolean>;
  loading_interno = false;
  mode = 'add';

  usuario_id = null;

  totalServicio = 0;
  totalUO = 0;

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private baseFacade: BaseFacade,
    private router: Router,
    private formcubService: FormCubService
  ) {}

  ngOnInit(): void {
    this.onInitReset();
    this.onInitGetData();
    this.onInitForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onInitReset(): void {
    this.cubicacionFacade.resetData();
    this.totalServicio = 0;
    this.totalUO = 0;
  }

  onInitGetData(): void {
    this.baseFacade.loading(true);
    this.loginData$ = this.authFacade.getLogin$().pipe(take(1));
    this.subscription.add(
      this.loginData$.subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        } else {
          this.usuario_id = loginAuth.usuario_id;
          this.cubicacionFacade.contratosUser4Cub(+loginAuth.usuario_id);
          this.cubicacionFacade.tipoCubicacion4cub();
          this.cubicacionFacade.actividad4cub();
        }
      })
    );
  }

  onInitForm(): void {
    this.formControls = this.formcubService.FormConfig();
    this.formCub = new FormGroup(this.formControls);
    this.formFiltros = new FormGroup(this.formcubService.FormFilterConfig());
    this.formCub.get('agencia_id').disable({ emitEvent: false });
    this.formCub.get('cmarcoproveedor_id').disable({ emitEvent: false });
    this.formFiltros.get('tipo_servicio_id').disable({ emitEvent: false });
    this.formFiltros.get('actividad_id').disable({ emitEvent: false });
    this.formFiltros.get('servicio_cod').disable({ emitEvent: false });
    this.formFiltros.get('servicio_id').disable({ emitEvent: false });
    this.formFiltros.get('unidad_obra_cod').disable({ emitEvent: false });
  }

  onInitSetData(): void {
    this.contratosUser4Cub$ = this.cubicacionFacade.contratosUser4Cub$();
  }

  goBack(): void {
    this.cubicacionFacade.resetData();
    this.router.navigate(['/app/cubicacion/list-cub']);
  }
}
