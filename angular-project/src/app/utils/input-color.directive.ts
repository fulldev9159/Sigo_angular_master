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
  selector: '[inputColor]',
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
      this.elemetRef.nativeElement.style.border = '2px solid #f36666';
      this.elemetRef.nativeElement.parentElement.parentElement.style.background =
        '#f1606024';
    }
  }

  @HostListener('input') logChange() {
    this.elemetRef.nativeElement.style.border = '2px solid #d3d309';
    this.elemetRef.nativeElement.parentElement.parentElement.style.background =
      '#fdfd286b';
  }
}
