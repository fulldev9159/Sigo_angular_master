import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Cubicacion } from '@storeOT/features/cubicacion/cubicacion.model';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  cubicaciones$: Observable<Cubicacion[]> = of([]);

  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
