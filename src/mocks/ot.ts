import {
  AreaDeNegocio,
  Comuna,
  OficinaCentral,
  Response,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  TipoNumeroInterno,
} from '@model';

export let CentralesMOCK200ok: Response<{ items: OficinaCentral[] }> = {
  status: { code: 0, desc: '' },
  data: {
    items: [
      {
        id: 278,
        descripcion: 'S.FCO LAS CONDES',
        agencia_id: 20,
        idafac: '0189',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 279,
        descripcion: 'LO BARNECHEA',
        agencia_id: 20,
        idafac: '0192',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 280,
        descripcion: 'LA PARVA',
        agencia_id: 20,
        idafac: '0267',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 281,
        descripcion: 'APOQUINDO',
        agencia_id: 20,
        idafac: '0874',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 282,
        descripcion: 'LOS BENEDICTINOS',
        agencia_id: 20,
        idafac: '0907',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 283,
        descripcion: 'LA DEHESA',
        agencia_id: 20,
        idafac: '1494',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 284,
        descripcion: 'EL ARRAYAN',
        agencia_id: 20,
        idafac: '1971',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 285,
        descripcion: 'KENNEDY PTE.',
        agencia_id: 20,
        idafac: '2336',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 286,
        descripcion: 'EL TROVADOR',
        agencia_id: 20,
        idafac: '2567',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 287,
        descripcion: 'VITACURA',
        agencia_id: 20,
        idafac: '8002',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 288,
        descripcion: 'LAS CONDES',
        agencia_id: 20,
        idafac: '8003',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 289,
        descripcion: 'KENNEDY MALL',
        agencia_id: 20,
        idafac: '8009',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 290,
        descripcion: 'CERRO EL PLOMO',
        agencia_id: 20,
        idafac: '9279',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 291,
        descripcion: 'Todas',
        agencia_id: 20,
        idafac: 'FULL',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 292,
        descripcion: 'PORTAL AL DEHESA',
        agencia_id: 20,
        idafac: 'PLDE',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
      {
        id: 293,
        descripcion: 'SANTA ANITA',
        agencia_id: 20,
        idafac: 'SANN',
        model_agencia_id: {
          id: 20,
          region_id: 13,
          codigo: '20',
          nombre: 'APOQUINDO',
          estado: true,
        },
      },
    ],
  },
};

export let SolicitadoPorMOCK200ok: Response<{ items: SolicitadoPor[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 1, descripcion: 'Telefonica Empresa' },
      { id: 2, descripcion: 'MOP' },
      { id: 3, descripcion: 'Servicio de Red' },
      { id: 4, descripcion: 'Telefonica Movil' },
      { id: 5, descripcion: 'Particulares' },
      { id: 6, descripcion: 'PYMES' },
      { id: 7, descripcion: 'Proyectos Complejos' },
      { id: 8, descripcion: 'MARKETING' },
      { id: 9, descripcion: 'Negocio Inmobiliario' },
      { id: 10, descripcion: 'AREA IRT' },
      { id: 11, descripcion: 'ATC' },
      { id: 12, descripcion: 'SERVIU' },
      { id: 13, descripcion: 'Municipalidad' },
      { id: 14, descripcion: 'INFRACO' },
      { id: 15, descripcion: 'INVENTARIO' },
      { id: 16, descripcion: 'SOLICITUD ESPECIAL' },
    ],
  },
};

export let ComunasMOCK200ok: Response<{ items: Comuna[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { comuna_id: 295, comuna_nombre: 'Santiago' },
      { comuna_id: 296, comuna_nombre: 'Cerrillos' },
      { comuna_id: 297, comuna_nombre: 'Cerro Navia' },
      { comuna_id: 298, comuna_nombre: 'Conchalí' },
      { comuna_id: 299, comuna_nombre: 'El Bosque' },
      { comuna_id: 300, comuna_nombre: 'Estación Central' },
      { comuna_id: 301, comuna_nombre: 'Huechuraba' },
      { comuna_id: 302, comuna_nombre: 'Independencia' },
      { comuna_id: 303, comuna_nombre: 'La Cisterna' },
      { comuna_id: 304, comuna_nombre: 'La Florida' },
      { comuna_id: 305, comuna_nombre: 'La Granja' },
      { comuna_id: 306, comuna_nombre: 'La Pintana' },
      { comuna_id: 307, comuna_nombre: 'La Reina' },
      { comuna_id: 308, comuna_nombre: 'Las Condes' },
      { comuna_id: 309, comuna_nombre: 'Lo Barnechea' },
      { comuna_id: 310, comuna_nombre: 'Lo Espejo' },
      { comuna_id: 311, comuna_nombre: 'Lo Prado' },
      { comuna_id: 312, comuna_nombre: 'Macul' },
      { comuna_id: 313, comuna_nombre: 'Maipú' },
      { comuna_id: 314, comuna_nombre: 'Ñuñoa' },
      { comuna_id: 315, comuna_nombre: 'Pedro Aguirre Cerda' },
      { comuna_id: 316, comuna_nombre: 'Peñalolén' },
      { comuna_id: 317, comuna_nombre: 'Providencia' },
      { comuna_id: 318, comuna_nombre: 'Pudahuel' },
      { comuna_id: 319, comuna_nombre: 'Quilicura' },
      { comuna_id: 320, comuna_nombre: 'Quinta Normal' },
      { comuna_id: 321, comuna_nombre: 'Recoleta' },
      { comuna_id: 322, comuna_nombre: 'Renca' },
      { comuna_id: 323, comuna_nombre: 'San Joaquín' },
      { comuna_id: 324, comuna_nombre: 'San Miguel' },
      { comuna_id: 325, comuna_nombre: 'San Ramón' },
      { comuna_id: 326, comuna_nombre: 'Vitacura' },
      { comuna_id: 327, comuna_nombre: 'Puente Alto' },
      { comuna_id: 328, comuna_nombre: 'Pirque' },
      { comuna_id: 329, comuna_nombre: 'San José de Maipo' },
      { comuna_id: 330, comuna_nombre: 'Colina' },
      { comuna_id: 331, comuna_nombre: 'Lampa' },
      { comuna_id: 332, comuna_nombre: 'Tiltil' },
      { comuna_id: 333, comuna_nombre: 'San Bernardo' },
      { comuna_id: 334, comuna_nombre: 'Buin' },
      { comuna_id: 335, comuna_nombre: 'Calera de Tango' },
      { comuna_id: 336, comuna_nombre: 'Paine' },
      { comuna_id: 337, comuna_nombre: 'Melipilla' },
      { comuna_id: 338, comuna_nombre: 'Alhué' },
      { comuna_id: 339, comuna_nombre: 'Curacaví' },
      { comuna_id: 340, comuna_nombre: 'María Pinto' },
      { comuna_id: 341, comuna_nombre: 'San Pedro' },
      { comuna_id: 342, comuna_nombre: 'Talagante' },
      { comuna_id: 343, comuna_nombre: 'El Monte' },
      { comuna_id: 344, comuna_nombre: 'Isla de Maipo' },
      { comuna_id: 345, comuna_nombre: 'Padre Hurtado' },
      { comuna_id: 346, comuna_nombre: 'Peñaflor' },
    ],
  },
};

export let TipoRedMOCK200ok: Response<{ items: TipoDeRed[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 1, descripcion: 'Cobre', estado: true },
      { id: 2, descripcion: 'Fibra Optica', estado: true },
      { id: 3, descripcion: 'ATP', estado: true },
      { id: 4, descripcion: 'INFRACO', estado: true },
    ],
  },
};

export let TipoDeTrabajoMOCK200ok: Response<{ items: TipoDeTrabajo[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        tipo_trabajo_id: 8,
        tipo_trabajo_codigo: 'FOE',
        tipo_trabajo_descripcion: 'FO Empresa',
      },
      {
        tipo_trabajo_id: 23,
        tipo_trabajo_codigo: 'MOVIL_C',
        tipo_trabajo_descripcion: 'PROYECTO FO MOVIL',
      },
      {
        tipo_trabajo_id: 30,
        tipo_trabajo_codigo: 'TIEMPO',
        tipo_trabajo_descripcion: '@TIEMPO',
      },
      {
        tipo_trabajo_id: 32,
        tipo_trabajo_codigo: 'VYAS',
        tipo_trabajo_descripcion: 'VYAS-VPN',
      },
    ],
  },
};

export let AreaNegocioMOCK200ok: Response<{ items: AreaDeNegocio[] }> = {
  status: { code: 0, desc: '' },
  data: {
    items: [
      { id: 1, descripcion: 'NORMAL' },
      { id: 2, descripcion: 'PREMIUM' },
    ],
  },
};

export let TipoDeNumeroInternoMOCK200ok: Response<{
  items: TipoNumeroInterno[];
}> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      { id: 1, nombre: 'ABVA' },
      { id: 2, nombre: '@TIEMPOS' },
      { id: 3, nombre: 'COMPLEJOS' },
      { id: 4, nombre: 'GANNO' },
      { id: 5, nombre: 'N° SOLICITUD' },
      { id: 6, nombre: 'CODIGO DE SITIO' },
      { id: 7, nombre: 'FOLIO PROYECTO' },
    ],
  },
};
