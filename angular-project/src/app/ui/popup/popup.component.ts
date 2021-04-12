import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  providers: [ConfirmationService],
})
export class PopupComponent implements OnInit {
  @Input() public event: Event;
  @Output() public CloseEvent: EventEmitter<any> = new EventEmitter();
  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.confirmationService.confirm({
      target: this.event.target as EventTarget,
      message: `Si cambia de valor se borrara todos los sevicios seleccionados. Está seguro que desea proceder?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {},
      reject: () => {},
    });
  }
}
