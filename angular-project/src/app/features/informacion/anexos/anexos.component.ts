import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as Data from '@data';
@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss'],
})
export class AnexosComponent implements OnInit, OnDestroy {
  apiUrl = '';
  subscription: Subscription = new Subscription();
  registosLibroDeObras$: Observable<Data.RegistroLibroObra[]>;
  adjuntos: Data.AdjuntosArray[] = [];

  constructor(
    @Inject('environment') environment,
    private otFacade: OtFacade,
    private rutaActiva: ActivatedRoute
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  ngOnInit(): void {
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          console.log('ANEXOS:', params.id);
          this.otFacade.getRegistrosLibroObras(+params.id);
        }
      })
    );
    // this.registosLibroDeObras$ = this.otFacade.getRegistrosLibroObras$();
    this.subscription.add(
      this.registosLibroDeObras$.subscribe(registros => {
        registros.forEach(registro => {
          const temp: Data.AdjuntosArray[] = registro.archivos_adjuntos.map(
            adjunto => ({
              autor: registro.usuario_nombre,
              fecha: registro.created_at,
              extension: adjunto.extension,
              nombre_original: adjunto.nombre_original,
              size: adjunto.size,
              url: adjunto.url,
            })
          );
          this.adjuntos.push(...temp);
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUrl(url: string): string {
    return `${this.apiUrl}${url}`;
  }
}
