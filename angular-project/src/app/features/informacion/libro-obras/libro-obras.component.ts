import { Component, OnInit, Inject } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { OtFacade } from '@storeOT/features/ot/ot.facade';
import * as Data from '@data';

interface Icon {
  [st: string]: string;
}
@Component({
  selector: 'app-libro-obras',
  templateUrl: './libro-obras.component.html',
  styleUrls: ['./libro-obras.component.scss'],
})
export class LibroObrasComponent implements OnInit {
  apiUrl = '';
  subscription: Subscription = new Subscription();
  registosLibroDeObras$: Observable<Data.RegistroLibroObra[]>;
  icons: Icon[] = [];
  constructor(
    @Inject('environment') environment,
    private otFacade: OtFacade,
    private rutaActiva: ActivatedRoute
  ) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }

  ngOnInit(): void {
    const docx = 'docx';
    const jpg = 'jpg';
    const jpeg = 'jpeg';
    const pdf = 'pdf';
    const png = 'PNG';
    const json = 'json';
    const txt = 'txt';
    const xls = 'xls';
    const csv = 'csv';
    this.icons[docx] = 'pi-file';
    this.icons[json] = 'pi-file';
    this.icons[txt] = 'pi-file';
    this.icons[jpg] = 'pi-image';
    this.icons[jpeg] = 'pi-image';
    this.icons[png] = 'pi-image';
    this.icons[pdf] = 'pi-file-pdf';
    this.icons[xls] = 'pi-file-excel';
    this.icons[csv] = 'pi-file-excel';
    this.subscription.add(
      this.rutaActiva.params.subscribe((params: Params) => {
        if (params.id) {
          console.log('LIBRO OBRAS:', params.id);
          this.otFacade.getRegistrosLibroObras(+params.id);
        }
      })
    );
    this.registosLibroDeObras$ = this.otFacade.getRegistrosLibroObras$();
  }

  getIcon(type: string): void {
    return this.icons[type];
  }

  getUrl(url: string): string {
    return `${this.apiUrl}${url}`;
  }

  getColor(extension: string): string {
    if (extension === 'xls' || extension === 'csv') {
      return '#047004';
    }
    if (extension === 'docx' || extension === 'txt' || extension === 'json') {
      return '#0d0d5a';
    }

    if (extension === 'pdf') {
      return '#ab0e0e';
    }

    if (extension === 'jpeg' || extension === 'jpg' || extension === 'PNG') {
      return '#01a5a5';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
