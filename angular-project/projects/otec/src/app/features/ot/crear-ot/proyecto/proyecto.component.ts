import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'otec-proyecto-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  next(): void {
    this.router.navigate(['dashboard/ot/crear-ot/pep2']);
  }

  back(): void {
    this.router.navigate(['dashboard/ot/crear-ot/cubicacion-proyecto']);
  }
}
