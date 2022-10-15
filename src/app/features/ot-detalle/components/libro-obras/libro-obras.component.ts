import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environment';
import { RegistroLibroDeObras } from '@model';
import { Subscription } from 'rxjs';

// 172 TODO: MEJORAR CSS
@Component({
  selector: 'zwc-libro-obras',
  templateUrl: './libro-obras.component.html',
  styleUrls: ['./libro-obras.component.scss'],
})
export class LibroObrasComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  registrosLibroDeObras: RegistroLibroDeObras[] = [];
  API_URL: string;

  icons = {
    '.docx': 'pi-file',
    '.pdf': 'pi-file',
    '.txt': 'pi-file',
    '.json': 'pi-file',
    '.jpg': 'pi-image',
    '.jpeg': 'pi-image',
    '.png': 'pi-image',
    '.xls': 'pi-file-excel',
    '.csv': 'pi-file-excel',
  };
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

  getUrl(url: string): string {
    return `${this.API_URL}${url}`;
  }

  getColor(extension: string): string {
    if (extension === '.xls' || extension === '.csv') {
      return '#047004';
    }
    if (
      extension === '.docx' ||
      extension === '.txt' ||
      extension === '.json'
    ) {
      return '#0d0d5a';
    }

    if (extension === '.pdf') {
      return '#ab0e0e';
    }

    if (extension === '.jpeg' || extension === '.jpg' || extension === '.PNG') {
      return '#01a5a5';
    }

    return '';
  }

  getMetadata(evento: string, metadata: string): string {
    console.log(JSON.parse(metadata));
    const objMeta = JSON.parse(metadata);
    if (evento === 'CAMBIO_ESTADO') {
      return `desde ${objMeta.from.tipo_etapa.nombre} a ${objMeta.to.tipo_etapa.nombre}`;
    }

    return '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
