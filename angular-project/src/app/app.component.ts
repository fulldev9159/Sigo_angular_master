import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  // declarations
  title = '';

  constructor(private primengConfig: PrimeNGConfig) {
    registerLocaleData(localeEsCl, 'es-CL');
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
