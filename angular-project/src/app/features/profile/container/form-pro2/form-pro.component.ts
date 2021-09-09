import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-form-pro',
  templateUrl: './form-pro.component.html',
  styleUrls: ['./form-pro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPro2Component implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
