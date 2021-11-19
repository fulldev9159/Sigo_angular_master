import { Component, OnInit, Input } from '@angular/core';
import { Sitio } from '@data';

@Component({
  selector: 'app-plan-proyecto-detail',
  templateUrl: './plan-proyecto-detail.component.html',
  styleUrls: ['./plan-proyecto-detail.component.scss'],
})
export class PlanProyectoDetailComponent implements OnInit {
  @Input() nombrePlan: string;
  @Input() sitio: Sitio;

  constructor() {}

  ngOnInit(): void {}
}
