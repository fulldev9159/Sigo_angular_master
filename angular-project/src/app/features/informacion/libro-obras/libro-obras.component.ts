import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-libro-obras',
  templateUrl: './libro-obras.component.html',
  styleUrls: ['./libro-obras.component.scss'],
})
export class LibroObrasComponent implements OnInit {
  subscription: Subscription = new Subscription();

  constructor(private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          console.log('LIBRO OBRAS:', params.id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
