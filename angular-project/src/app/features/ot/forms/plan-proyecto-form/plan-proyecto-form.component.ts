import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Plan, Site } from '@storeOT/features/ot/ot.model';

@Component({
  selector: 'app-plan-proyecto-form',
  templateUrl: './plan-proyecto-form.component.html',
  styleUrls: ['./plan-proyecto-form.component.scss'],
})
export class PlanProyectoFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  planes$: Observable<Plan[]> = of([]);
  sitios$: Observable<Site[]> = of([]);

  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
