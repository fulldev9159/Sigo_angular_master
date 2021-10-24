import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-informe-avance',
  templateUrl: './informe-avance.component.html',
  styleUrls: ['./informe-avance.component.scss'],
})
export class InformeAvanceComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  data = [
    {
      cor: 10,
      direccion: 'APOQUINDO - ESTEBAN DEL ORTO',
      clave: 'C022',
      codigo: 'J770',
      descripcion: 'PREPARAR TUBO/S CABLE DE F.O(EN PUNTA O CON SANGRADO)',
      cub: 2,
    },
    {
      cor: 20,
      direccion: 'APOQUINDO - ESTEBAN DEL ORTO',
      clave: 'C002',
      codigo: 'J765',
      descripcion: 'MANUPULAR CABLE O ELEMENTO DE F.O (EMR., TERM.,ASOC.)',
      cub: 1,
    },
    {
      cor: 30,
      direccion: 'APOQUINDO - ESTEBAN DEL ORTO',
      clave: 'C002',
      codigo: 'J791',
      descripcion: 'EMPALMAR MODULO DE 4 F.O.',
      cub: 1,
    },
    {
      cor: 40,
      direccion: 'APOQUINDO - ESTEBAN DEL ORTO',
      clave: 'C002',
      codigo: 'J158',
      descripcion: 'INSTALAR AMARRAS PLASTICAS DE TODO TIPO',
      cub: 5,
    },
    {
      cor: 50,
      direccion: 'APOQUINDO - MANQUEHUE',
      clave: 'C022',
      codigo: 'J770',
      descripcion: 'PREPARAR TUBO/S CABLE DE F.O(EN PUNTA O CON SANGRADO)',
      cub: 2,
    },

    {
      cor: 60,
      direccion: 'APOQUINDO - MANQUEHUE',
      clave: 'C002',
      codigo: 'J765',
      descripcion: 'MANUPULAR CABLE O ELEMENTO DE F.O (EMR., TERM.,ASOC.)',
      cub: 1,
    },
    {
      cor: 30,
      direccion: 'APOQUINDO - MANQUEHUE',
      clave: 'C002',
      codigo: 'J791',
      descripcion: 'EMPALMAR MODULO DE 4 F.O.',
      cub: 1,
    },
    {
      cor: 40,
      direccion: 'APOQUINDO - MANQUEHUE',
      clave: 'C002',
      codigo: 'J158',
      descripcion: 'INSTALAR AMARRAS PLASTICAS DE TODO TIPO',
      cub: 5,
    },
  ];

  constructor(private rutaActiva: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          console.log('INFORME AVANCES:', params.id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
