import { Component, OnInit, Input } from '@angular/core';
import { Site } from '@storeOT/features/ot/ot.model';

@Component({
  selector: 'app-plan-proyecto-detail',
  templateUrl: './plan-proyecto-detail.component.html',
  styleUrls: ['./plan-proyecto-detail.component.scss'],
})
export class PlanProyectoDetailComponent implements OnInit {
  @Input() nombrePlan: string;
  @Input() sitio: Site;

  constructor() {}

  ngOnInit(): void {}
}
