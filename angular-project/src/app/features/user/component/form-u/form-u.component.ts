import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

  clearProvider(): void {
    this.formUser.get('proveedor_id').setValue(null);
  }

}
