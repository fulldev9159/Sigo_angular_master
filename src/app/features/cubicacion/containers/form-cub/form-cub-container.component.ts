import { registerLocaleData } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContratoFacade } from '@storeOT/contrato/contrato.facades';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { ProveedorFacade } from '@storeOT/proveedor/proveedor.facades';
import { ServiciosFacade } from '@storeOT/servicios/servicios.facades';
import { MenuItem } from 'primeng/api';
import { AgregarServiciosFormComponent } from '../../components/agregar-servicios-form/agregar-servicios-form.component';
import { FormularioComponent } from '../../components/formulario/formulario.component';
import { TableServicesComponent } from '../../components/table-services/table-services.component';
import localeEsCl from '@angular/common/locales/es-CL';

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

  constructor(
    private proveedorFacade: ProveedorFacade,
    private contratoFacade: ContratoFacade,
    private cubicacionFacade: CubicacionFacade,
    private servicioFacade: ServiciosFacade
  ) {
    registerLocaleData(localeEsCl, 'es-CL');
  }

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

    // RESETS
    this.formulario.formCub.get('contrato').valueChanges.subscribe(() => {
      this.cubicacionFacade.resetAgenciaSelected();
      this.proveedorFacade.resetProveedoresAgenciaContrato();
      this.cubicacionFacade.resetProveedorSelected();
      this.contratoFacade.resetActividadesContratoProveedor();
      this.contratoFacade.resetTipoServiciosContrato();
      this.servicioFacade.resetServiciosAgenciaContratoProveedor();
      this.servicioFacade.resetServicioSelected();
      this.servicioFacade.resetUnidadesObraServicio();

      this.formulario.formCub
        .get('agencia_id')
        .setValue(null, { emitEvent: false });

      this.formulario.formCub
        .get('cmarcoproveedor_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('actividad_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('tipo_servicio_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('servicio_cod')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('unidad_obra_cod')
        .setValue(null, { emitEvent: false });
    });

    this.formulario.formCub.get('agencia_id').valueChanges.subscribe(() => {
      this.cubicacionFacade.resetProveedorSelected();
      this.contratoFacade.resetActividadesContratoProveedor();
      this.contratoFacade.resetTipoServiciosContrato();
      this.servicioFacade.resetServiciosAgenciaContratoProveedor();
      this.servicioFacade.resetServicioSelected();
      this.servicioFacade.resetUnidadesObraServicio();

      this.formulario.formCub
        .get('cmarcoproveedor_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('actividad_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('tipo_servicio_id')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('servicio_cod')
        .setValue(null, { emitEvent: false });
      this.agregarServiciosForm.formFilter
        .get('unidad_obra_cod')
        .setValue(null, { emitEvent: false });
    });

    this.formulario.formCub
      .get('cmarcoproveedor_id')
      .valueChanges.subscribe(() => {
        this.contratoFacade.resetActividadesContratoProveedor();
        this.contratoFacade.resetTipoServiciosContrato();
        this.servicioFacade.resetServiciosAgenciaContratoProveedor();
        this.servicioFacade.resetServicioSelected();
        this.servicioFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm.formFilter
          .get('actividad_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('tipo_servicio_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });

    this.agregarServiciosForm.formFilter
      .get('actividad_id')
      .valueChanges.subscribe(() => {
        this.contratoFacade.resetTipoServiciosContrato();
        this.servicioFacade.resetServiciosAgenciaContratoProveedor();
        this.servicioFacade.resetServicioSelected();
        this.servicioFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm.formFilter
          .get('tipo_servicio_id')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });

    this.agregarServiciosForm.formFilter
      .get('tipo_servicio_id')
      .valueChanges.subscribe(() => {
        this.servicioFacade.resetServiciosAgenciaContratoProveedor();
        this.servicioFacade.resetServicioSelected();
        this.servicioFacade.resetUnidadesObraServicio();

        this.agregarServiciosForm.formFilter
          .get('servicio_cod')
          .setValue(null, { emitEvent: false });
        this.agregarServiciosForm.formFilter
          .get('unidad_obra_cod')
          .setValue(null, { emitEvent: false });
      });
  }
}
