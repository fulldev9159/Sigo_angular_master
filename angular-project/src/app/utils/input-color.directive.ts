import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
  OnInit,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appInputColor]',
})
export class InputColorDirective implements AfterViewInit {
  constructor(private elemetRef: ElementRef) {}

  ngAfterViewInit(): void {
    // console.log('inf', this.elemetRef.nativeElement.value);
    // console.log(
    //   'pen',
    //   +this.elemetRef.nativeElement.parentElement.parentElement.children[10]
    //     .textContent
    // );
    const pendiente =
      +this.elemetRef.nativeElement.parentElement.parentElement.children[10]
        .textContent;
    const informado = +this.elemetRef.nativeElement.value;
    if (pendiente !== informado) {
      this.elemetRef.nativeElement.style.border = '2px solid #667ef3';
      this.elemetRef.nativeElement.parentElement.parentElement.style.background =
        '#738ff52e';
    }
  }

  @HostListener('input') logChange(): void {
    this.elemetRef.nativeElement.style.border = '2px solid #d3d309';
    this.elemetRef.nativeElement.parentElement.parentElement.style.background =
      '#fdfd286b';
  }
}
