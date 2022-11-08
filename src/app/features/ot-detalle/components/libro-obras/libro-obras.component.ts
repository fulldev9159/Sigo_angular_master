import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environment';
import {
  faCircleCheck,
  faCircleXmark,
  faInbox,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { Accion, InfoOT, RegistroLibroDeObras } from '@model';
import { Subscription } from 'rxjs';

// 172 TODO: MEJORAR CSS
@Component({
  selector: 'zwc-libro-obras',
  templateUrl: './libro-obras.component.html',
  styleUrls: ['./libro-obras.component.scss'],
})
export class LibroObrasComponent implements OnInit, OnDestroy {
  // PARA PODER AGREGAR EL BOTON DE AGREGAR REGISTRO DEL LIBRO DE OBRAS PRIMERO SE DEBE CONOCER SI EL USUARIO TIENE EL PERMISO PARA REALIZAR ESA ACCION SOBRE DICHA OT.
  // PERO ACTUALMENTE SOLO SE PUEDE SABER LAS ACCIONES SOBRE LA OT SOLO SI SE SABE EN QUE PESTAÑA DEBERÏA ESTAR, ES DECIR, QUE PARA OBTENER LA ACCION DEBO INVOCAR 5 VECES EL GET BANDEJA HASTA ENCONTRAR LA OT Y VER SUS PERMISOS

  subscription: Subscription = new Subscription();
  registrosLibroDeObras: RegistroLibroDeObras[] = [];
  API_URL: string;
  playIcon = faPlay;
  inboxIcon = faInbox;
  xmark = faCircleXmark;
  okmark = faCircleCheck;

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
      this.route.data.subscribe(({ registroLibroObras, detalleOT }) => {
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

  getText(evento: string, metadata: string): string {
    // console.log(JSON.parse(metadata));
    const objMeta = JSON.parse(metadata);
    if (evento === 'CAMBIO_ESTADO') {
      return `Hubo un cambio de estado desde la etapa ${
        objMeta.from.tipo_etapa.nombre === 'Etapa Desconocida'
          ? 'Creación de OT'
          : objMeta.from.tipo_etapa.nombre
      } a la etapa ${objMeta.to.tipo_etapa.nombre}`;
    }
    if (evento === 'ACEPTACION_INICIAL') {
    }

    return '';
  }

  getMetadata(metadata: string): object {
    return JSON.parse(metadata);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
