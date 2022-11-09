import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegistroLibroDeObras } from '@model';
import { environment } from '@environment';

// 170 TODO: MIGRAR ANEXOS COMPONENT
@Component({
  selector: 'zwc-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss'],
})
export class AnexosComponent {

  subscription : Subscription = new Subscription();
  registrosLibroDeObras: RegistroLibroDeObras[] = [];
  API_URL = '';

  constructor(private route: ActivatedRoute) {
    this.API_URL = environment.api;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.data.subscribe(({ registroLibroObras }) => {        
        this.registrosLibroDeObras = registroLibroObras?.data;        
      })
    );
  }

  ngOnDestroy(): void {


  }

}
