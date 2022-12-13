import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environment';
import {
  faBan,
  faCircleCheck,
  faCircleXmark,
  faDoorClosed,
  faFileImport,
  faInbox,
  faPause,
  faPlay,
  IconDefinition,
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
  banIcon = faBan;
  fileIcon = faFileImport;
  pauseIcon = faPause;

  titleArray: {
    [key: string]: {
      icon: IconDefinition;
      text: string;
    };
  };

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

    this.titleArray = {
      CAMBIO_ESTADO: {
        icon: this.playIcon,
        text: 'Registro de Evento',
      },
      ACEPTACION_INICIAL: {
        icon: this.inboxIcon,
        text: 'Aprobación Incial de OT',
      },
      ANULACION_INICIAL_OT: {
        icon: this.banIcon,
        text: 'Anulación de la OT en etapa inicial',
      },
      ANULACION_PROVEEDOR_OT: {
        icon: this.banIcon,
        text: 'Anulación de la OT por proveedor',
      },
      ACEPTACION_EECC: {
        icon: this.inboxIcon,
        text: ' Aprobación de la OT por proveedor',
      },
      ENVIAR_INFORME_AVANCE: {
        icon: this.fileIcon,
        text: 'Envío de informe de avance',
      },
      APROBACION_INFORME_AVANCE: {
        icon: this.inboxIcon,
        text: 'Aprobación del informe de avance',
      },
      INF_TRAB_FIN_ACTA: {
        icon: this.fileIcon,
        text: 'Generación de Acta',
      },
      APROBACION_OPERACIONES: {
        icon: this.inboxIcon,
        text: ' Aprobación de la OT por operaciones',
      },
      CONFIRMAR_RECHAZO_OPERACIONES: {
        icon: this.inboxIcon,
        text: 'Confirmación de rechazo operaciones',
      },
      SOLICITUD_INFORME_FIN_TRABAJO: {
        icon: this.inboxIcon,
        text: 'Solicitud de Informe de fin de trabajos',
      },
      ENVIO_RESULTADO_INGENIERIA: {
        icon: this.inboxIcon,
        text: 'Envío de resultado de ingeniería',
      },
      AUTORIZACION_RESULTADO_ING: {
        icon: this.inboxIcon,
        text: 'Valicación del resultado de ingeniería',
      },
      SOLICITUD_QUIEBRE: {
        icon: this.inboxIcon,
        text: 'Solicitud de quiebre por parte del proveedor',
      },
      SOLICITUD_QUIEBRE_APROBACION: {
        icon: this.inboxIcon,
        text: 'Aprobación de solicitud de quibre',
      },
      QUIEBRE: {
        icon: this.pauseIcon,
        text: 'Quiebre de la OT',
      },
      DESQUIEBRE: {
        icon: this.inboxIcon,
        text: 'Desquiebre de la OT',
      },
      CIERRE_ADMINISTRATIVO: {
        icon: this.inboxIcon,
        text: 'Cierre Administrativo',
      },
      CERRAR_OT: {
        icon: faDoorClosed,
        text: 'Cierre de la OT',
      },
    };
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
      return `Hubo un cambio de estado desde la etapa <strong><i>${
        objMeta.from.tipo_etapa.nombre === 'Etapa Desconocida'
          ? 'Creación de OT'
          : objMeta.from.tipo_etapa.nombre.toUpperCase()
      }</i></strong> a la etapa <strong><i>${objMeta.to.tipo_etapa.nombre.toUpperCase()}</i></strong>`;
    }
    return '';
  }

  getTitulo(evento: string, rol: number): string {
    let titulo = '';
    if (evento === 'INF_TRAB_FIN_ACTA' && rol === 3) {
      titulo = 'Generación de acta';
    } else if (evento === 'INF_TRAB_FIN_ACTA' && rol === 5) {
      titulo = 'Envío de Informe de trabajos finalizados';
    } else {
      titulo = this.titleArray[evento]?.text
        ? this.titleArray[evento].text
        : 'evento no definido';
    }

    return titulo;
  }

  getMetadata(metadata: string): object {
    return JSON.parse(metadata);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
