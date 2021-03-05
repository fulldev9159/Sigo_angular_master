import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'otec-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrls: ['./organigrama.component.css'],
})
export class OrganigramaComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  next(): void {
    this.router.navigate(['dashboard/ot/crear-ot/confirmacion']);
  }

  back(): void {
    this.router.navigate(['dashboard/ot/crear-ot/pep2']);
  }
}
