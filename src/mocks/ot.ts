import {
  AreaDeNegocio,
  Comuna,
  OficinaCentralWithAgenciaModel,
  PlanProyecto,
  Response,
  Sitio,
  SolicitadoPor,
  TipoDeRed,
  TipoDeTrabajo,
  TipoNumeroInterno,
} from '@model';

export let CreateOT: Response<{ ot_id: number }> = {
  status: { code: 0, desc: 'OK' },
  data: { ot_id: 1 },
};
export let CentralesMOCK200ok: Response<{
  items: OficinaCentralWithAgenciaModel[];
}> = {
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
        tipo_trabajo_id: 1,
        tipo_trabajo_codigo: 'AMPLIA',
        tipo_trabajo_descripcion: 'Ampliacion',
      },
      {
        tipo_trabajo_id: 2,
        tipo_trabajo_codigo: 'CTOVERDE',
        tipo_trabajo_descripcion: 'Ampliacion Cajas Verdes',
      },
      {
        tipo_trabajo_id: 3,
        tipo_trabajo_codigo: 'AUTO',
        tipo_trabajo_descripcion: 'Autofinanciados',
      },
      {
        tipo_trabajo_id: 4,
        tipo_trabajo_codigo: 'CONFI',
        tipo_trabajo_descripcion: 'Confiabilidad',
      },
      {
        tipo_trabajo_id: 5,
        tipo_trabajo_codigo: 'DESFTTX',
        tipo_trabajo_descripcion: 'Despliegue FTTX',
      },
      {
        tipo_trabajo_id: 6,
        tipo_trabajo_codigo: 'DTHE',
        tipo_trabajo_descripcion: 'DTH-Empresa',
      },
      {
        tipo_trabajo_id: 7,
        tipo_trabajo_codigo: 'FOI',
        tipo_trabajo_descripcion: 'FO Intercentrales',
      },
      {
        tipo_trabajo_id: 9,
        tipo_trabajo_codigo: 'FOPINT',
        tipo_trabajo_descripcion: 'FO Planta Interna',
      },
      {
        tipo_trabajo_id: 10,
        tipo_trabajo_codigo: 'FOMV',
        tipo_trabajo_descripcion: 'FO Traslado Vial',
      },
      {
        tipo_trabajo_id: 11,
        tipo_trabajo_codigo: 'FOVDSL',
        tipo_trabajo_descripcion: 'FO VDSL',
      },
      {
        tipo_trabajo_id: 12,
        tipo_trabajo_codigo: 'FTTB',
        tipo_trabajo_descripcion: 'FTTB cobre',
      },
      {
        tipo_trabajo_id: 13,
        tipo_trabajo_codigo: 'FTTX',
        tipo_trabajo_descripcion: 'FTTX',
      },
      {
        tipo_trabajo_id: 14,
        tipo_trabajo_codigo: 'HBTS',
        tipo_trabajo_descripcion: 'HOTEL BTS',
      },
      {
        tipo_trabajo_id: 15,
        tipo_trabajo_codigo: 'INFRA',
        tipo_trabajo_descripcion: 'Infraestructura',
      },
      {
        tipo_trabajo_id: 16,
        tipo_trabajo_codigo: 'INMOBVDSL',
        tipo_trabajo_descripcion: 'Inmobiliario VDSL',
      },
      {
        tipo_trabajo_id: 17,
        tipo_trabajo_codigo: 'INMO',
        tipo_trabajo_descripcion: 'Inmobiliarios',
      },
      {
        tipo_trabajo_id: 18,
        tipo_trabajo_codigo: '1INMOBITI',
        tipo_trabajo_descripcion: 'Inmobiliarios (ITI)',
      },
      {
        tipo_trabajo_id: 19,
        tipo_trabajo_codigo: 'INMOBFTTA',
        tipo_trabajo_descripcion: 'Inmobiliarios FTTA',
      },
      {
        tipo_trabajo_id: 20,
        tipo_trabajo_codigo: 'MFO',
        tipo_trabajo_descripcion: 'Mejoramiento Fibra Optica',
      },
      {
        tipo_trabajo_id: 21,
        tipo_trabajo_codigo: 'MINERA',
        tipo_trabajo_descripcion: 'Mineras',
      },
      {
        tipo_trabajo_id: 22,
        tipo_trabajo_codigo: 'MINERAS',
        tipo_trabajo_descripcion: 'Mineras',
      },
      {
        tipo_trabajo_id: 24,
        tipo_trabajo_codigo: 'OOTT',
        tipo_trabajo_descripcion: 'OOTT',
      },
      {
        tipo_trabajo_id: 25,
        tipo_trabajo_codigo: 'Otros',
        tipo_trabajo_descripcion: 'Otros',
      },
      {
        tipo_trabajo_id: 26,
        tipo_trabajo_codigo: 'PM',
        tipo_trabajo_descripcion: 'Proyecto Menor',
      },
      {
        tipo_trabajo_id: 27,
        tipo_trabajo_codigo: 'PC',
        tipo_trabajo_descripcion: 'Proyectos Complejos',
      },
      {
        tipo_trabajo_id: 28,
        tipo_trabajo_codigo: 'REPLIEGUE',
        tipo_trabajo_descripcion: 'Repliegue de Cobre',
      },
      {
        tipo_trabajo_id: 29,
        tipo_trabajo_codigo: 'SSPP',
        tipo_trabajo_descripcion: 'SSPP',
      },
      {
        tipo_trabajo_id: 31,
        tipo_trabajo_codigo: 'VIAL',
        tipo_trabajo_descripcion: 'Viales',
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
      { id: 8, nombre: 'QUICKBASE' },
    ],
  },
};

export let PlanProyectoMOCK200ok: Response<{ items: PlanProyecto[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    items: [
      {
        id: 1,
        nombre: '3G',
        estado: true,
        created_at: null,
      },
      {
        id: 2,
        nombre: '3P',
        estado: true,
        created_at: null,
      },
      {
        id: 3,
        nombre: '4P',
        estado: true,
        created_at: null,
      },
      {
        id: 4,
        nombre: 'EMPRESAS',
        estado: true,
        created_at: null,
      },
      {
        id: 5,
        nombre: 'HBTS',
        estado: true,
        created_at: null,
      },
      {
        id: 6,
        nombre: 'INDOOR MASIVO - ALTA ESCALA',
        estado: true,
        created_at: null,
      },
      {
        id: 7,
        nombre: 'INDOOR MASIVO - BAJA ESCALA',
        estado: true,
        created_at: null,
      },
      {
        id: 8,
        nombre: 'INDOOR MASIVO - MEDIA ESCALA',
        estado: true,
        created_at: null,
      },
      {
        id: 9,
        nombre: 'LTE 1900',
        estado: true,
        created_at: null,
      },
      {
        id: 10,
        nombre: 'LTE 2600',
        estado: true,
        created_at: null,
      },
      {
        id: 11,
        nombre: 'LTE 2600 MIMO 4x4',
        estado: true,
        created_at: null,
      },
      {
        id: 12,
        nombre: 'LTE 700 - COMERCIAL',
        estado: true,
        created_at: null,
      },
      {
        id: 13,
        nombre: 'LTE 700 - REGULATORIO',
        estado: true,
        created_at: null,
      },
      {
        id: 14,
        nombre: 'LTE TDD',
        estado: true,
        created_at: null,
      },
      {
        id: 15,
        nombre: 'MINERAS',
        estado: true,
        created_at: null,
      },
      {
        id: 16,
        nombre: 'POLÍGONOS 700',
        estado: true,
        created_at: null,
      },
      {
        id: 17,
        nombre: 'REING, TRASLADOS Y REINTEGRACIONES',
        estado: true,
        created_at: null,
      },
      {
        id: 18,
        nombre: 'REPOSICIONES DE HW',
        estado: true,
        created_at: null,
      },
      {
        id: 19,
        nombre: 'SALTOS TX',
        estado: true,
        created_at: null,
      },
      {
        id: 20,
        nombre: 'SECTORES ADICIONALES',
        estado: true,
        created_at: null,
      },
      {
        id: 21,
        nombre: 'SECTORES ADICIONALES 2600',
        estado: true,
        created_at: null,
      },
      {
        id: 22,
        nombre: 'SINGLE RAN - NEW',
        estado: true,
        created_at: null,
      },
      {
        id: 23,
        nombre: 'SINGLE RAN 2G',
        estado: true,
        created_at: null,
      },
      {
        id: 24,
        nombre: 'SINGLE RAN 2G - SIN HW',
        estado: true,
        created_at: null,
      },
      {
        id: 25,
        nombre: 'SMALL CELLS OUTDOOR',
        estado: true,
        created_at: null,
      },
      {
        id: 26,
        nombre: 'SWAP VENDOR LTE',
        estado: true,
        created_at: null,
      },
      {
        id: 27,
        nombre: 'TRIAL',
        estado: true,
        created_at: null,
      },
      {
        id: 28,
        nombre: 'VOZ POLIGONOS SATELITALES',
        estado: true,
        created_at: null,
      },
    ],
  },
};

export let SitoMOCK200ok: Response<{ items: Sitio[] }> = {
  status: { code: 0, desc: '' },
  data: {
    items: [
      {
        id: 1,
        plan_id: 1,
        codigo: 'NEWUMTS0002F10',
        metas: '1.- 2017',
        nombre: 'TEMUCO LAURA WILSON',
        nemonico: 'TMCLW',
        region_id: 9,
        comuna: 'TEMUCO',
        direccion: '0 - N/A',
        geo_lat: -38.721389,
        geo_lon: -72.604722,
        vendor: 'HWI',
        tipo: 'NEW',
        duenno_estructura: '09_643',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 9,
          nombre: 'Región de La Araucanía',
          codigo: 'IX',
        },
      },
      {
        id: 2,
        plan_id: 1,
        codigo: 'NEWUMTS0008F7',
        metas: '1.- 2017',
        nombre: 'LIDER DE ANTOFAGASTA',
        nemonico: 'LDANT',
        region_id: 2,
        comuna: 'ANTOFAGASTA',
        direccion: '0 - N/A',
        geo_lat: -23.564516,
        geo_lon: -70.39041,
        vendor: 'HWI',
        tipo: 'NEW',
        duenno_estructura: 'LDANT',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 2,
          nombre: 'Región de Antofagasta',
          codigo: 'II',
        },
      },
      {
        id: 3,
        plan_id: 1,
        codigo: 'NEWUMTS0026F8',
        metas: '1.- 2017',
        nombre: 'EDIFICIO MIRADOR QUILPUÉ',
        nemonico: 'EMIRQ',
        region_id: 5,
        comuna: 'QUILPUE',
        direccion: '0 - N/A',
        geo_lat: -33.045756,
        geo_lon: -71.43281,
        vendor: 'NSN',
        tipo: 'NEW',
        duenno_estructura: 'EMIRQ',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 5, nombre: 'Región de Valparaíso', codigo: 'V' },
      },
      {
        id: 4,
        plan_id: 1,
        codigo: 'NEWUMTS0033F10',
        metas: '1.- 2017',
        nombre: 'OC TEODORO SCHMIDT',
        nemonico: 'OCTEO',
        region_id: 9,
        comuna: 'TEODORO SCHMIDT',
        direccion: '0 - N/A',
        geo_lat: -38.995111,
        geo_lon: -73.087389,
        vendor: 'HWI',
        tipo: 'NEW',
        duenno_estructura: '149506',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 9,
          nombre: 'Región de La Araucanía',
          codigo: 'IX',
        },
      },
      {
        id: 5,
        plan_id: 1,
        codigo: 'NEWUMTS0061F7',
        metas: '1.- 2017',
        nombre: 'SAN PEDRO - CORONEL 1 RUTA COSITE',
        nemonico: 'SPCR1',
        region_id: 8,
        comuna: 'SAN PEDRO DE LA PAZ',
        direccion: '0 - N/A',
        geo_lat: -36.90827,
        geo_lon: -73.143177,
        vendor: 'HWI',
        tipo: 'NEW',
        duenno_estructura: '08_095',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 8, nombre: 'Región del Bíobío', codigo: 'VIII' },
      },
      {
        id: 6,
        plan_id: 1,
        codigo: 'NEWUMTS0064F8',
        metas: '1.- 2017',
        nombre: 'ANGOL - ALEMANIA',
        nemonico: 'ANGAL',
        region_id: 9,
        comuna: 'ANGOL',
        direccion: '0 - N/A',
        geo_lat: -37.806924,
        geo_lon: -72.701425,
        vendor: 'HWI',
        tipo: 'NEW',
        duenno_estructura: '09_581',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 9,
          nombre: 'Región de La Araucanía',
          codigo: 'IX',
        },
      },
      {
        id: 7,
        plan_id: 1,
        codigo: 'NEWUMTS0102F7',
        metas: '1.- 2017',
        nombre: 'GASTON ARASME',
        nemonico: 'GASAR',
        region_id: 11,
        comuna: 'COYHAIQUE',
        direccion: '0 - N/A',
        geo_lat: -45.589551,
        geo_lon: -72.052514,
        vendor: 'HWI',
        tipo: 'NEW',
        duenno_estructura: 'CI286',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 11,
          nombre: 'Región de Aysén del General Carlos Ibáñez del Campo',
          codigo: 'XI',
        },
      },
      {
        id: 8,
        plan_id: 1,
        codigo: 'NEWUMTS0038F8',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'EL PILLÁN',
        nemonico: 'EPILL',
        region_id: 6,
        comuna: 'RENGO',
        direccion: '0 - N/A',
        geo_lat: -34.403029,
        geo_lon: -70.853245,
        vendor: 'HWI',
        tipo: 'NEW',
        duenno_estructura: 'CH01514CG',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 6,
          nombre: "Región del Libertador General Bernardo O'Higgins",
          codigo: 'VI',
        },
      },
      {
        id: 9,
        plan_id: 1,
        codigo: 'NEWUMTS0040F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'CHONCHI BS',
        nemonico: 'CHOBS',
        region_id: 10,
        comuna: 'CHONCHI',
        direccion: '0 - N/A',
        geo_lat: -42.622197,
        geo_lon: -73.778825,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'CHOBS',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 10, nombre: 'Región de Los Lagos', codigo: 'X' },
      },
      {
        id: 10,
        plan_id: 1,
        codigo: 'NEWUMTS0041F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'SALAMANCA PONIENTE',
        nemonico: 'SLAPO',
        region_id: 4,
        comuna: 'SALAMANCA',
        direccion: 'CAMPO SECANO S/N TAHUINCO',
        geo_lat: -31.767289,
        geo_lon: -71.077249,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'SLAPO',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 4, nombre: 'Región de Coquimbo', codigo: 'IV' },
      },
      {
        id: 11,
        plan_id: 1,
        codigo: 'NEWUMTS0042F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'VALLE PISCO ELQUI',
        nemonico: 'ELQUI',
        region_id: 4,
        comuna: 'PAIGUANO',
        direccion: '0 - N/A',
        geo_lat: -30.230556,
        geo_lon: -70.499167,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'ELQUI',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 4, nombre: 'Región de Coquimbo', codigo: 'IV' },
      },
      {
        id: 12,
        plan_id: 1,
        codigo: 'NEWUMTS0043F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'PUERTO DOMINGUEZ LTE',
        nemonico: 'PDOMI',
        region_id: 9,
        comuna: 'SAAVEDRA',
        direccion: 'RUTA S-46 PUERTO DOMINGUEZ',
        geo_lat: -38.900962,
        geo_lon: -73.256906,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: '09_350',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 9,
          nombre: 'Región de La Araucanía',
          codigo: 'IX',
        },
      },
      {
        id: 13,
        plan_id: 1,
        codigo: 'NEWUMTS0044F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'CALETA BUENA',
        nemonico: 'CABUF',
        region_id: 2,
        comuna: 'ANTOFAGASTA',
        direccion: 'SECTOR CUESTA EL ACHA',
        geo_lat: -22.455189,
        geo_lon: -70.251686,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'CH00151AG (CH00165AG)',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 2,
          nombre: 'Región de Antofagasta',
          codigo: 'II',
        },
      },
      {
        id: 14,
        plan_id: 1,
        codigo: 'NEWUMTS0045F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'CERRO TAMARICO',
        nemonico: 'CTMCO',
        region_id: 3,
        comuna: 'VALLENAR',
        direccion: 'RUTA 5 NORTE KM 678 HACIA EL PONIENTE',
        geo_lat: -28.482944,
        geo_lon: -70.781472,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: '150662',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 3, nombre: 'Región de Atacama', codigo: 'III' },
      },
      {
        id: 15,
        plan_id: 1,
        codigo: 'NEWUMTS0046F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'POZO ALMONTE',
        nemonico: 'POZOF',
        region_id: 1,
        comuna: 'POZO ALMONTE',
        direccion: 'CERRO SAN ESTEBAN',
        geo_lat: -20.325178,
        geo_lon: -69.775352,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'POZOF',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 1, nombre: 'Región de Tarapacá', codigo: 'I' },
      },
      {
        id: 16,
        plan_id: 1,
        codigo: 'NEWUMTS0047F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'CHADA',
        nemonico: 'CHADA',
        region_id: 6,
        comuna: 'MOSTAZAL',
        direccion: 'CERRO CUESTA CHADA S/N',
        geo_lat: -33.934956,
        geo_lon: -70.651291,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: '150587',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 6,
          nombre: "Región del Libertador General Bernardo O'Higgins",
          codigo: 'VI',
        },
      },
      {
        id: 17,
        plan_id: 1,
        codigo: 'NEWUMTS0048F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'COLEGUAL',
        nemonico: 'CGUAL',
        region_id: 10,
        comuna: 'LLANQUIHUE',
        direccion: 'RUTA V-30 COLEGUAL',
        geo_lat: -41.226207,
        geo_lon: -73.224365,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: '10_201',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 10, nombre: 'Región de Los Lagos', codigo: 'X' },
      },
      {
        id: 18,
        plan_id: 1,
        codigo: 'NEWUMTS0049F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'RUTA SAN PEDRO / CALAMA / UNO',
        nemonico: 'RSPCU',
        region_id: 2,
        comuna: 'CALAMA',
        direccion: '0 - N/A',
        geo_lat: -22.748028,
        geo_lon: -68.404028,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'RSPCU',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 2,
          nombre: 'Región de Antofagasta',
          codigo: 'II',
        },
      },
      {
        id: 19,
        plan_id: 1,
        codigo: 'NEWUMTS0050F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'CUNCO',
        nemonico: 'CUNG1',
        region_id: 9,
        comuna: 'CUNCO',
        direccion: 'CERRO ALTO HUERERE',
        geo_lat: -39.00753,
        geo_lon: -71.99132,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: '150665',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 9,
          nombre: 'Región de La Araucanía',
          codigo: 'IX',
        },
      },
      {
        id: 20,
        plan_id: 1,
        codigo: 'NEWUMTS0051F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'ADUANA CUYA',
        nemonico: 'ACUYA',
        region_id: 15,
        comuna: 'ARICA',
        direccion: 'CONTROL ADUANA CUYA S/N',
        geo_lat: -19.159472,
        geo_lon: -70.180167,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'ACUYA',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: {
          id: 15,
          nombre: 'Región de Arica y Parinacota',
          codigo: 'XV',
        },
      },
      {
        id: 21,
        plan_id: 1,
        codigo: 'NEWUMTS0052F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'TERRADO CLUB',
        nemonico: 'TRRDC',
        region_id: 1,
        comuna: 'IQUIQUE',
        direccion: 'AV. AEROPUERTO 2873',
        geo_lat: -20.240583,
        geo_lon: -70.1435,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'TRRDC',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 1, nombre: 'Región de Tarapacá', codigo: 'I' },
      },
      {
        id: 22,
        plan_id: 1,
        codigo: 'NEWUMTS0053F10',
        metas: '4.- TRABAJO CALIDAD U O\u0026M',
        nombre: 'HUANTA PUEBLO',
        nemonico: 'MHUAN',
        region_id: 4,
        comuna: 'VICUÑA',
        direccion: 'CERRO LECHUZA',
        geo_lat: -29.84644,
        geo_lon: -70.41675,
        vendor: 'HWI',
        tipo: 'EXISTENTE',
        duenno_estructura: 'MHUAN',
        fecha_liberacion: null,
        fecha_termino: null,
        created_at: null,
        model_plan_id: {
          id: 1,
          nombre: '3G',
          estado: true,
          created_at: null,
        },
        model_region_id: { id: 4, nombre: 'Región de Coquimbo', codigo: 'IV' },
      },
    ],
  },
};
