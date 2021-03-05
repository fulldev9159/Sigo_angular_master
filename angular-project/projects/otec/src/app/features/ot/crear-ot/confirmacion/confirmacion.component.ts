import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'otec-confirmacion-proyecto',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  

  back():void{
    this.router.navigate(['dashboard/ot/crear-ot/organigrama']);
  }
}