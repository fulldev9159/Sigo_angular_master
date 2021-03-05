import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'otec-pep2',
  templateUrl: './pep2.component.html',
  styleUrls: ['./pep2.component.css']
})
export class Pep2Component implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  next():void{
    this.router.navigate(['dashboard/ot/crear-ot/organigrama']);
  }

  back():void{
    this.router.navigate(['dashboard/ot/crear-ot/proyecto']);
  }

}