import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[zwcColorPrecargado]',
})
export class ColorPrecargadoDirective implements AfterViewInit {
  @Input() condicion: boolean;
  constructor(private elemetRef: ElementRef) {}

  ngAfterViewInit(): void {
    if (this.condicion)
      this.elemetRef.nativeElement.style.background = '#738ff52e';
  }
}
