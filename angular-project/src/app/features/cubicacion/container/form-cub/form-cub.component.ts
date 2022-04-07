import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agencias4Cub, ContratosUser, Proveedores4Cub } from '@data';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { Observable, of, Subscription } from 'rxjs';
import { FormCubService } from './form-cub.service';

@Component({
  selector: 'app-form-cub',
  templateUrl: './form-cub.component.html',
  styleUrls: ['./form-cub.component.scss'],
})
export class FormCubContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  // DATOS A USAR
  tipoCubicacion = [
    {
      id: 1,
      nombre: 'Ingeniería',
    },
    {
      id: 2,
      nombre: 'Construcción',
    },
    {
      id: 3,
      nombre: 'Full',
    },
  ];
  contratosUser4Cub$: Observable<ContratosUser[]>;
  agencias4Cub$: Observable<Agencias4Cub[]> = of([]);
  proveedores4Cub$: Observable<Proveedores4Cub[]> = of([]);

  // DISPLAY MODALS

  // FORMULARIO
  formControls: any;
  formCub: FormGroup;

  // TABLE

  // EXTRAS
  usuario_id = null;

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private authFacade: AuthFacade,
    private router: Router,
    private formcubService: FormCubService
  ) {}

  ngOnInit(): void {
    this.onInitResetInicial();
    this.onInitGetInitialData();
    this.onInitSetInitialData();
    this.onInitAccionesInicialesAdicionales();
  }

  onInitResetInicial(): void {
    this.cubicacionFacade.resetData();
  }

  onInitGetInitialData(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        if (
          loginAuth?.token === undefined &&
          loginAuth?.proxy_id === undefined
        ) {
          this.router.navigate(['/auth/login']);
        } else {
          this.usuario_id = loginAuth.usuario_id;
          this.cubicacionFacade.contratosUser4Cub(+loginAuth.usuario_id);
        }
      })
    );
  }

  onInitSetInitialData(): void {
    this.formControls = this.formcubService.FormConfig();
    this.formCub = new FormGroup(this.formControls);
    this.contratosUser4Cub$ = this.cubicacionFacade.contratosUser4Cub$();
    this.agencias4Cub$ = this.cubicacionFacade.agencias4cub$();
    this.proveedores4Cub$ = this.cubicacionFacade.proveedores4Cub$();
  }

  onInitAccionesInicialesAdicionales(): void {
    this.subscription.add(
      this.formCub.get('contrato').valueChanges.subscribe(contrato_id => {
        if (contrato_id) {
          this.cubicacionFacade.agencias4cub(+contrato_id);
        }
      })
    );

    this.subscription.add(
      this.formCub.get('agencia_id').valueChanges.subscribe(agencia_id => {
        if (agencia_id) {
          const contrato_id = this.formCub.get('contrato').value;
          this.cubicacionFacade.proveedores4Cub(+agencia_id, +contrato_id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.cubicacionFacade.resetData();
    this.router.navigate(['/app/cubicacion/list-cub']);
  }
}
