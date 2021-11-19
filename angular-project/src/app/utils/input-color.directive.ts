import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[inputColor]',
})
export class InputColorDirective {
  constructor(private elemetRef: ElementRef) {}
  @HostListener('input') logChange() {
    this.elemetRef.nativeElement.style.border = '2px solid #d3d309';
    this.elemetRef.nativeElement.parentElement.parentElement.style.background =
      '#fdfd286b';
  }
}
