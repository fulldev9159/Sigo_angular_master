import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ContratosUser, TipoCubicacion } from '@model';
import { CubicacionFacade } from '@storeOT/cubicacion/cubicacion.facades';
import { UsuarioFacade } from '@storeOT/usuario/usuario.facades';
import { Observable, Subscription } from 'rxjs';
import { FormularioService } from 'src/app/core/service/formulario.service';

@Component({
  selector: 'zwc-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  contratoUsuarios$: Observable<ContratosUser[]> =
    this.usuarioFacade.getContratosUsuario$();
  tipoCubicacion$: Observable<TipoCubicacion[]> =
    this.cubicacionFacade.getTipoCubicacion$();

  formCubControl = {
    id: new FormControl(null),
    nombre: new FormControl(null, [
      Validators.required,
      this.formularioService.noWhitespace,
      Validators.maxLength(300),
    ]),
    tipocubicacion: new FormControl(null, [Validators.required]),
    direcciondesde: new FormControl(null, []),
    direcciondesdealtura: new FormControl(null, []),
    direccionhasta: new FormControl(null, []),
    direccionhastaaltura: new FormControl(null, []),
    descripcion: new FormControl(null, [Validators.required]),
    contrato: new FormControl(null, [Validators.required]),
    agencia_id: new FormControl(null, [Validators.required]),
    cmarcoproveedor_id: new FormControl(null, [Validators.required]),
    table: new FormArray([]),
  };

  constructor(
    private formularioService: FormularioService,
    private usuarioFacade: UsuarioFacade,
    private cubicacionFacade: CubicacionFacade
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
