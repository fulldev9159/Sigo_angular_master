import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import localeEsCl from '@angular/common/locales/es-CL';

@Component({
  selector: 'zwc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private primeConfig: PrimeNGConfig) {
    registerLocaleData(localeEsCl, 'es-CL');
  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
    this.primeConfig.setTranslation({
      emptyMessage: 'Sin resultados',
    });
  }
}
