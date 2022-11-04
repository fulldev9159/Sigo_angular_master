import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'zwc-list-ot-filtros',
  templateUrl: './list-ot-filtros.component.html',
  styleUrls: ['./list-ot-filtros.component.scss'],
})
export class ListOtFiltrosComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  form: FormGroup = new FormGroup({
    filtro_propietario: new FormControl('TODAS', {}),
    filtro_tipo: new FormControl('0', {}),
  });

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
