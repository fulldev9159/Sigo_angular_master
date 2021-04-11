import { Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit, OnDestroy {

  // declarations
  public es: any;
  private destroyInstance: Subject<boolean> = new Subject();
  @Output() selected: EventEmitter<any> = new EventEmitter();
  constructor(private config: PrimeNGConfig) { }


  ngOnInit(): void {
    this.es = {
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',

      timeOnlyTitle: 'Elegir una hora',
      timeText: 'Hora',
      hourText: 'Horas',
      minuteText: 'Minutos',
      secondText: 'Segundos',
      millisecText: 'Milisegundos',
      microsecText: 'Microsegundos',
      timezoneText: 'Uso horario',
      timeFormat: 'HH:mm',
      timeSuffix: '',
      amNames: ['a.m.', 'AM', 'A'],
      pmNames: ['p.m.', 'PM', 'P'],
    };

    this.config.setTranslation({
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      weekHeader: 'Sm',
    });
  }

  ngOnDestroy(): void {
    this.destroyInstance.next(true);
    this.destroyInstance.complete();
  }

  itemSelected(event: Event): void {
    this.selected.emit(event);
  }
}
