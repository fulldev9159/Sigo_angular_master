import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { ProyectosFacade } from '@storeOT/proyectos/proyectos.facades';
import { RequestCreateProyecto } from '@model';
import { FormProService } from './form-pro.service';
import { LogService } from '@log';

@Component({
  selector: 'zwc-form-proyectos-container',
  templateUrl: './form-proyectos-container.component.html',
  styleUrls: ['./form-proyectos-container.component.scss'],
})
export class FormProyectosContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  // FORMULARIO
  formControls?: any;
  formProyecto?: FormGroup;
  maxDecimals = 2;

  // EXTRAS
  proyecto_id: number | null = null;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private proyectoFacade: ProyectosFacade,
    private router: Router,
    private detector: ChangeDetectorRef,
    private formProService: FormProService,
    private logger: LogService
  ) {}

  ngOnInit(): void {
    this.proyectoFacade.resetData();

    this.onInitGetInitialData();
    this.onInitSetInitialData();
  }

  onInitGetInitialData(): void {
    this.formControls = this.formProService.FormConfig();
    this.formProyecto = new FormGroup(this.formControls);

    this.subscription.add(
      this.route.paramMap?.subscribe(params => {
        const proyecto_id = params.get('id');
        if (proyecto_id !== null) {
          this.editMode = true;
          this.formProyecto.get('id').setValue(proyecto_id);
          this.proyecto_id = +proyecto_id;
          this.proyectoFacade.getProyectos();
        }
      })
    );
  }

  onInitSetInitialData(): void {
    this.subscription.add(
      this.proyectoFacade.getProyectos$().subscribe(proyectos => {
        if (proyectos && proyectos.length > 0 && this.proyecto_id) {
          const proyecto = proyectos.find(p => p.id === +this.proyecto_id);

          this.formProyecto.get('nombre').setValue(proyecto.nombre);
          this.formProyecto.get('descripcion').setValue(proyecto.descripcion);
          this.formProyecto
            .get('costo_estimado')
            .setValue(proyecto.costo_estimado);

          this.detector.detectChanges();
        }
      })
    );

    setTimeout(() => {
      this.detector.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goBack(): void {
    this.proyectoFacade.resetData();
    if (this.formProyecto) {
      this.formProyecto.reset();
    }
    this.router.navigate(['/administracion/proyectos/list-proyectos']);
  }

  get valid(): boolean {
    return this.formProyecto?.valid ?? false;
  }

  get createRequest(): RequestCreateProyecto | undefined {
    if (this.formProyecto) {
      const { nombre, descripcion, costo_estimado } =
        this.formProyecto.getRawValue();
      return {
        nombre,
        descripcion,
        costo_estimado: +costo_estimado,
      };
    }

    return undefined;
  }

  saveProyecto(): void {
    if (this.valid) {
      const createRequest = this.createRequest;
      if (this.proyecto_id === null) {
        this.logger.debug('create proyecto', createRequest);
        this.proyectoFacade.createProyecto(createRequest);
      } else {
        this.logger.debug(
          `update proyecto [${this.proyecto_id}]`,
          createRequest
        );
        this.proyectoFacade.updateProyecto(this.proyecto_id, createRequest);
      }
    }
  }
}
