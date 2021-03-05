import { Injectable, Optional, Inject } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class OtService {
  constructor() {}

  public otInformation = {
    cubicacionProyecto: {
      nombre: '',
      tipoOT: 'OT',
      cubicacion: {
        cubicacion_id: '',
        contrato: '',
        proveedor: '',
        region: '',
      },
    },
  };

  getOTInformation() {
    return this.otInformation;
  }
}
