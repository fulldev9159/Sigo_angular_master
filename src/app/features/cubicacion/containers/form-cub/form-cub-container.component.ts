import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AgregarServiciosFormComponent } from '../../components/agregar-servicios-form/agregar-servicios-form.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { TableServicesComponent } from '../../components/table-services/table-services.component';

@Component({
  selector: 'zwc-form-cub',
  templateUrl: './form-cub-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./form-cub-container.component.scss'],
})
export class FormCubContainerComponent implements OnInit, AfterViewInit {
  navbarHeader: MenuItem[];
  @ViewChild('formulario', {
    read: FormularioComponent,
    static: false,
  })
  formulario: FormularioComponent;

  @ViewChild('agregarServiciosForm', {
    read: AgregarServiciosFormComponent,
    static: false,
  })
  agregarServiciosForm: AgregarServiciosFormComponent;

  @ViewChild('tableServicios', {
    read: TableServicesComponent,
    static: false,
  })
  tableServicios: TableServicesComponent;

  constructor() {}

  ngOnInit(): void {
    this.navbarHeader = [
      { label: 'Home', icon: 'pi pi-home', routerLink: ['/home'] },
      {
        label: 'Cubicación',
        icon: 'pi pi-shopping-bag',
        routerLink: ['/cubicacion'],
      },
      { label: 'Formulario Cubicación', styleClass: 'last-route' },
    ];
  }

  ngAfterViewInit(): void {
    //SETTING INIT FORMULARIOS
    this.formulario.formCub.get('agencia_id').disable({ emitEvent: false });
    this.formulario.formCub
      .get('cmarcoproveedor_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('actividad_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('servicio_cod')
      .disable({ emitEvent: false });
    this.agregarServiciosForm.formFilter
      .get('unidad_obra_cod')
      .disable({ emitEvent: false });
  }
}
