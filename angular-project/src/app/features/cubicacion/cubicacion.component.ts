import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cubicacion',
  templateUrl: './cubicacion.component.html',
  styleUrls: ['./cubicacion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CubicacionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
