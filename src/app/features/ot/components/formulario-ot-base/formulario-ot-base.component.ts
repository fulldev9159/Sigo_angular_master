import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { map, Observable, Subscription, take, tap } from 'rxjs';
interface Dropdown {
  name: string;
  code: number;
}

@Component({
  selector: 'zwc-formulario-ot-base',
  templateUrl: './formulario-ot-base.component.html',
  styleUrls: ['./formulario-ot-base.component.scss'],
})
export class FormularioOtBaseComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  @Input() form: FormGroup;

  contratoUsuarios$: Observable<Dropdown[]> = this.usuarioFacade
    .getContratosUsuario$()
    .pipe(
      // tap(values => (this.contratosUsuario = values)),
      map(values => {
        let tmp = [...values];
        return tmp.sort((a, b) =>
          a.model_contrato_id.nombre > b.model_contrato_id.nombre ? 1 : -1
        );
      }),
      map(values =>
        values.map(value => ({
          name: value.model_contrato_id.nombre,
          code: value.contrato_id,
        }))
      ),
      take(1)
    );

  constructor(
    private cubicacionFacade: CubicacionFacade,
    private usuarioFacade: UsuarioFacade
  ) {}

  // ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
