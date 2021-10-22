import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-info-costeo',
  templateUrl: './info-costeo.component.html',
  styleUrls: ['./info-costeo.component.scss'],
})
export class InfoCosteoComponent implements OnInit {
  subscription: Subscription = new Subscription();

  constructor(private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          console.log('COSTEO:', params.id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
