import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-u',
  templateUrl: './form-u.component.html',
  styleUrls: ['./form-u.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Input() profilesMandatory: any[] = [];
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
    this.changeItem.emit(+this.formUser.value.perfiles[position].perfil_id);
  }

  listMandatory(perfil_id: number): any {
    if (perfil_id) {
      if (this.profilesMandatory && this.profilesMandatory.length > 0) {
        const perfilObject = this.profilesMandatory.find(m => +m.perfil_id === +perfil_id);
        if (perfilObject) {
          return perfilObject.perfiles;
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
  }
}
