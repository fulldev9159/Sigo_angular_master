import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-u',
  templateUrl: './form-u.component.html',
  styleUrls: ['./form-u.component.scss']
})
export class FormUComponent implements OnInit {

  // declarations
  @Input() formUser: FormGroup;
  @Input() areas: any[] = [];
  @Input() providers: any[] = [];
  @Input() profiles: any[] = [];
  @Input() constractsMarco: any[] = [];
  @Input() highers: any[] = [];
  @Input() contracts: any[] = [];
  @Output() public add = new EventEmitter();
  @Output() public delete = new EventEmitter();
  @Output() public save = new EventEmitter();
  @Output() public changeItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addItem(): void {
    this.add.emit();
  }

  deleteItem(index: number): void {
    this.delete.emit(index);
  }

  saveForm(form: any): void {
    this.save.emit(form);
  }

  changePerfil(position: number): void {
    console.log('CHANGE PERFIL!!!!');
    this.changeItem.emit(+this.formUser.value.perfiles[position].perfil_id);
  }

}
