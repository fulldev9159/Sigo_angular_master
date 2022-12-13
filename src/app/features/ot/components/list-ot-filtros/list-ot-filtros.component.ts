import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-ot-filtros',
  templateUrl: './list-ot-filtros.component.html',
  styleUrls: ['./list-ot-filtros.component.scss'],
})
export class ListOtFiltrosComponent implements OnInit, OnDestroy, OnChanges {
  subscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup({
    filtro_propietario: new FormControl('TODAS', {}),
    filtro_tipo: new FormControl('0', {}),
  });

  @Input() filters: {
    filtro_propietario: string;
    filtro_tipo: number;
  };

  @Output() valueChanges = new EventEmitter<{
    filtro_propietario: string;
    filtro_tipo: number;
  }>();

  constructor() {}

  ngOnInit(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe(() =>
        this.valueChanges.emit(this.values)
      )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      const previous = changes['filters'].previousValue;
      const current = changes['filters'].currentValue;

      const previousFiltroPropietario =
        previous?.filtro_propietario ?? undefined;
      const currentFiltroPropietario = current?.filtro_propietario ?? undefined;
      if (
        previousFiltroPropietario !== currentFiltroPropietario &&
        currentFiltroPropietario !== null &&
        currentFiltroPropietario !== undefined
      ) {
        this.form
          .get('filtro_propietario')
          .setValue(currentFiltroPropietario, { emitEvent: false });
      }

      const previousFiltroTipo = previous?.filtro_tipo ?? undefined;
      const currentFiltroTipo = current?.filtro_tipo ?? undefined;
      if (
        previousFiltroTipo !== currentFiltroTipo &&
        currentFiltroTipo !== null &&
        currentFiltroTipo !== undefined
      ) {
        this.form
          .get('filtro_tipo')
          .setValue(`${currentFiltroTipo}`, { emitEvent: false });
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get values(): {
    filtro_propietario: string;
    filtro_tipo: number;
  } {
    const { filtro_propietario, filtro_tipo } = this.form.getRawValue();

    return {
      filtro_propietario,
      filtro_tipo: +filtro_tipo,
    };
  }
}
