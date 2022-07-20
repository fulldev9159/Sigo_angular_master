import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/features/cubicacion/cubicacion.facade';
import { AuthFacade } from '@storeOT/features/auth/auth.facade';
import { NuevoServicio, NuevoUO, RequestCreateCubicacion } from '@data';

@Component({
  selector: 'app-clone-cubage-form',
  templateUrl: './clone-cubage-form.component.html',
  styleUrls: ['./clone-cubage-form.component.scss'],
})
export class CloneCubageFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  submitSubscription: Subscription = new Subscription();
  formControls = {
    nombre: new FormControl(null, [
      Validators.required,
      Validators.maxLength(300),
      this.noWhitespace,
    ]),
  };
  form: FormGroup = new FormGroup(this.formControls);

  usuario_id = null;

  noWhitespace(control: FormControl): any {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  constructor(
    private cubageFacade: CubicacionFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authFacade.getLogin$().subscribe(loginAuth => {
        // if (
        //   loginAuth?.token === undefined &&
        //   loginAuth?.proxy_id === undefined
        // ) {
        //   this.router.navigate(['/auth/login']);
        // } else {
        this.usuario_id = loginAuth.usuario_id;
        // }
      })
    );
    this.subscription.add(
      this.cubageFacade.DetalleCub$().subscribe(cubicacion => {
        if (cubicacion !== null) {
          this.form.get('nombre').setValue(cubicacion.nombre);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.submitSubscription.unsubscribe();
  }

  reset(): void {
    this.submitSubscription.unsubscribe();
    // this.form.reset();
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.setValue('');
      control.markAsUntouched();
      control.markAsPristine();
    });
  }

  get valid(): boolean {
    return this.form.valid;
  }

  touch(): void {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsTouched({
        onlySelf: true,
      });
    });

    this.form.markAsTouched({
      onlySelf: true,
    });
  }

  submit(): void {
    this.touch();
    if (this.valid) {
      const { nombre } = this.form.getRawValue();
      this.submitSubscription.add(
        this.cubageFacade.DetalleCub$().subscribe(cubicacion => {
          if (cubicacion !== null) {
            const cubicacion_detalle: NuevoServicio[] =
              cubicacion.many_cubicacion_has_servicio.map(servicios => {
                const uo: NuevoUO[] = servicios.many_cubicacion_has_uob.map(
                  uos => ({
                    uob_codigo: uos.unidad_obra_cod,
                    cantidad: uos.cantidad,
                  })
                );
                return {
                  servicio_id: servicios.servicio_id,
                  actividad_id: servicios.actividad_id,
                  tipo_servicio_id: servicios.tipo_servicio_id,
                  cantidad: servicios.cantidad,
                  unidad_obra: uo,
                };
              });
            const request: RequestCreateCubicacion = {
              cubicacion_datos: {
                nombre: nombre.trim(),
                tipo_cubicacion_id: +cubicacion.tipo_cubicacion_id,
                contrato_id: +cubicacion.contrato_id,
                agencia_id: +cubicacion.agencia_id,
                proveedor_id: +cubicacion.proveedor_id,
                codigo_acuerdo: cubicacion.codigo_acuerdo,
                cmarco_has_proveedor_id: +cubicacion.cmarco_has_proveedor_id,
                usuario_creador_id: this.usuario_id,
                direccion_desde: cubicacion.direccion_desde,
                altura_desde: cubicacion.altura_desde,
                direccion_hasta: cubicacion.direccion_hasta,
                altura_hasta: cubicacion.altura_hasta,
                descripcion: cubicacion.descripcion,
              },
              cubicacion_detalle: {
                nuevo: cubicacion_detalle,
              },
            };
            this.cubageFacade.clonCub(request);
          }
        })
      );
    } else {
      console.error('invalid form');
    }
  }
}
