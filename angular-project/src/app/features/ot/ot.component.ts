import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
