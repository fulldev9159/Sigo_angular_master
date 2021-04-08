import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Output() selected: EventEmitter<any> = new EventEmitter();
  constructor(private config: PrimeNGConfig) { }

  ngOnInit(): void {
    this.config.setTranslation({
      monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
      //translations
  });
  }

  itemSelected(event: Event): void {
    this.selected.emit(event)
  }
}
