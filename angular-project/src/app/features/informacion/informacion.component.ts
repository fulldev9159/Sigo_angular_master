import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.scss'],
})
export class InformacionComponent implements OnInit {
  subscription: Subscription = new Subscription();
  ot_id: number;
  constructor(private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('main');
    this.subscription.add(
      this.rutaActiva.firstChild.params.subscribe((params: Params) => {
        if (params.id) {
          this.ot_id = params.id;
          console.log('MAIN:', params.id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
