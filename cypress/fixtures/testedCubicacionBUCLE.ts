export const BucleApoCobra = {
  contrato: 'BUCLE',
  agencia: 'APOQUINDO',
  proveedor: '330000659 - COBRA CHILE SERVICIOS S.A.',
  items: [
    {
      actividad: 'MATRIZ',
      tipos_servicio: [
        {
          tipo_servicio: 'CABLES',
          servicios: [
            {
              nombre:
                'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
              precio: '$180,32',
              unidad_obras: [
                {
                  nombre: 'D013 - CONECTOR ROJO CAL.24-19',
                  precio: '$56,8',
                },
                {
                  nombre: 'D012 - CONECTOR AMARILLO CAL.24-19',
                  precio: '$0',
                },
              ],
            },
            {
              nombre:
                'J456 - PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
              precio: '$4.913,72',
              unidad_obras: [
                {
                  nombre: 'D241 - BLOCK PROT.100/P QDF MONDRAGON',
                  precio: '$57.200,64',
                },
                {
                  nombre: 'D240 - MODULO PROT.GAS. QDF MONDRAGON',
                  precio: '$3.200',
                },
                {
                  nombre: 'D239 - REGLETA CORTE.10/2 QDF-E1 MOND',
                  precio: '$0',
                },
                {
                  nombre: 'D238 - REGLETA CONEX.10/2 QDF-1 MONDR',
                  precio: '$0',
                },
                {
                  nombre: 'D006 - CABLE MTA-E 600-24 (FORMAS)',
                  precio: '$0',
                },
              ],
            },
          ],
        },
        {
          tipo_servicio: 'LINEAS',
          servicios: [
            {
              nombre: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
              precio: '$471,6',
              unidad_obras: [
                {
                  nombre: 'C926 - CABLE 1800-26 PS',
                  precio: '$0',
                },
                {
                  nombre: 'C881 - CABLE FS 1212-24 SUB.',
                  precio: '$0',
                },
                {
                  nombre: 'C105 - CABLE PS 600-26 SUB.',
                  precio: '$0',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      actividad: 'FTTX',
      tipos_servicio: [
        {
          tipo_servicio: 'PROYECTOS',
          servicios: [
            {
              nombre:
                'D080 - DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
              precio: '$1.485',
              unidad_obras: [{ nombre: '0 - SIN UO', precio: '$0' }],
            },
            {
              nombre:
                'D081 - DISEÑO DE RED PARA PROYECTOS DEL TIPO GREENFIELD (CADA UIP)',
              precio: '$1.485',
              unidad_obras: [{ nombre: '0 - SIN UO', precio: '$0' }],
            },
            {
              nombre:
                'D083 - DISEÑO EN RED DE FO GPON (FTTX) BROWNFIELD (POR UIP). LEVANTAMIENTO DE INFORMACION',
              precio: '$297',
              unidad_obras: [{ nombre: '0 - SIN UO', precio: '$0' }],
            },
          ],
        },
      ],
    },
    {
      actividad: 'FIBRA OPTICA',
      tipos_servicio: [
        {
          tipo_servicio: 'LINEAS',
          servicios: [
            {
              nombre:
                'J201 - INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
              precio: '$982,5',
              unidad_obras: [
                { nombre: 'H006 - ANGULO PLANO LEGRAND 40*16', precio: '$458' },
                {
                  nombre: 'H005 - ANGULO INT./EXT.LEGRAND 40*16',
                  precio: '$369',
                },
                {
                  nombre: 'H004 - CANALETA LEGRAND 40*16*2 BLCA.',
                  precio: '$1.250',
                },
                { nombre: 'H003 - ANGULO PLANO LEGRAND 32*10', precio: '$418' },
                {
                  nombre: 'H002 - ANGULO INT./EXT.LEGRAND 32*10',
                  precio: '$295',
                },
                {
                  nombre: 'H001 - CANALETA LEGRAND 32*10*2 BLCA.',
                  precio: '$3.706',
                },
              ],
            },
            {
              nombre:
                'J726 - INST. REPARTIDOR MURAL, 1 VERTICAL, TIPO 2/3 VERTICALES',
              precio: '$22.008',
              unidad_obras: [{ nombre: '0 - SIN UO', precio: '$0' }],
            },
            {
              nombre: 'J730 - INST. ESCALERILLA SOPORTE',
              precio: '$12.851,1',
              unidad_obras: [
                {
                  nombre: 'H134 - ESCALERILLA PC TIPO NEC 200*32',
                  precio: '$0',
                },
              ],
            },
            {
              nombre: 'J728 - INST. PERFIL DE HIERRO PINTADO O GALVANIZADO',
              precio: '$1.257,6',
              unidad_obras: [{ nombre: '0 - SIN UO', precio: '$0' }],
            },
          ],
        },
      ],
    },
  ],
};

export const crearCubicacion = {
  contrato: 'BUCLE',
  agencia: 'APOQUINDO',
  proveedor: '330000659 - COBRA CHILE SERVICIOS S.A.',
  totalServicios: '$2.900.634,65',
  totalUOs: '$3.508.605,55',
  total: '$6.409.240,21',
  items: [
    {
      nombre: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      precio: '$180,32',
      cantidad: '4,53',
      total: '$816,85',
      tipo_servicio: 'CABLES',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'D013 - CONECTOR ROJO CAL.24-19',
          precio: '$56,8',
          cantidad: '10',
          total: '$568',
        },
        {
          nombre: 'D012 - CONECTOR AMARILLO CAL.24-19',
          precio: '$0',
          cantidad: '14,5',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J456 - PREPARAR EXTREMOS DE CABLES GRUPO A (HASTA 300 PRS)',
      precio: '$4.913,72',
      cantidad: '105,7',
      total: '$519.380,2',
      tipo_servicio: 'CABLES',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'D241 - BLOCK PROT.100/P QDF MONDRAGON',
          precio: '$57.200,64',
          cantidad: '5,24',
          total: '$299.731,35',
        },
        {
          nombre: 'D240 - MODULO PROT.GAS. QDF MONDRAGON',
          precio: '$3.200',
          cantidad: '1.000',
          total: '$3.200.000',
        },
        {
          nombre: 'D239 - REGLETA CORTE.10/2 QDF-E1 MOND',
          precio: '$0',
          cantidad: '5',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      precio: '$471,6',
      cantidad: '5.011',
      total: '$2.363.187,6',
      tipo_servicio: 'LINEAS',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'C926 - CABLE 1800-26 PS',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
        {
          nombre: 'C881 - CABLE FS 1212-24 SUB.',
          precio: '$0',
          cantidad: '2,3',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'D080 - DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
      precio: '$1.485',
      cantidad: '5',
      total: '$7.425',
      tipo_servicio: 'PROYECTOS',
      actividad: 'FTTX',
      unidad_obras: [
        {
          nombre: '0 - SIN UO',
          precio: '$0',
          cantidad: '0',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J201 - INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
      precio: '$982,5',
      cantidad: '10',
      total: '$9.825',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: 'H006 - ANGULO PLANO LEGRAND 40*16',
          precio: '$458',
          cantidad: '9,4',
          total: '$4.305,2',
        },
        {
          nombre: 'H002 - ANGULO INT./EXT.LEGRAND 32*10',
          precio: '$295',
          cantidad: '1',
          total: '$295',
        },
        {
          nombre: 'H001 - CANALETA LEGRAND 32*10*2 BLCA.',
          precio: '$3.706',
          cantidad: '1',
          total: '$3.706',
        },
      ],
    },
  ],
};

export const CubicacionEditada = {
  contrato: 'BUCLE',
  agencia: 'APOQUINDO',
  proveedor: '330000659 - COBRA CHILE SERVICIOS S.A.',
  totalServicios: '$2.918.880',
  totalUOs: '$48.940',
  total: '$2.967.820',
  items: [
    {
      nombre: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      precio: '$180,32',
      cantidad: '15',
      total: '$2.704,8',
      tipo_servicio: 'CABLES',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'D013 - CONECTOR ROJO CAL.24-19',
          precio: '$56,8',
          cantidad: '10',
          total: '$568',
        },
        {
          nombre: 'D012 - CONECTOR AMARILLO CAL.24-19',
          precio: '$0',
          cantidad: '14',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      precio: '$471,6',
      cantidad: '5.011',
      total: '$2.363.187,6',
      tipo_servicio: 'LINEAS',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'C926 - CABLE 1800-26 PS',
          precio: '$0',
          cantidad: '150,37',
          total: '$0',
        },
        {
          nombre: 'C881 - CABLE FS 1212-24 SUB.',
          precio: '$0',
          cantidad: '2,3',
          total: '$0',
        },
        {
          nombre: 'C105 - CABLE PS 600-26 SUB.',
          precio: '$0',
          cantidad: '80,32',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'D080 - DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
      precio: '$1.485',
      cantidad: '5',
      total: '$7.425',
      tipo_servicio: 'PROYECTOS',
      actividad: 'FTTX',
      unidad_obras: [
        {
          nombre: '0 - SIN UO',
          precio: '$0',
          cantidad: '0',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J201 - INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
      precio: '$982,5',
      cantidad: '10',
      total: '$9.825',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: 'H006 - ANGULO PLANO LEGRAND 40*16',
          precio: '$458',
          cantidad: '9',
          total: '$4.122',
        },
        {
          nombre: 'H002 - ANGULO INT./EXT.LEGRAND 32*10',
          precio: '$295',
          cantidad: '150',
          total: '$44.250',
        },
      ],
    },
    {
      nombre: 'J726 - INST. REPARTIDOR MURAL, 1 VERTICAL, TIPO 2/3 VERTICALES',
      precio: '$22.008',
      cantidad: '15',
      total: '$330.120',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: '0 - SIN UO',
          precio: '$0',
          cantidad: '0',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J730 - INST. ESCALERILLA SOPORTE',
      precio: '$12.851,1',
      cantidad: '16',
      total: '$205.617,6',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: 'H134 - ESCALERILLA PC TIPO NEC 200*32',
          precio: '$0',
          cantidad: '26',
          total: '$0',
        },
      ],
    },
  ],
};

// INFORME DE AVANCE

export const adicionalesBucle1 = {
  items: [
    {
      nombre: 'T051 - INSTALAR DIVISOR, DERIVADOR (INCLUIDO TAP DIRECCIONABLE)',
      precio: '$3.032,8',
      cantidad: '4',
      total: '$12.131,2',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT04 - SPLITTER 4 SALIDAS (SPLITTER 1X4)',
          precio: '$0',
          cantidad: '10',
          total: '$0',
        },
        {
          nombre: 'DT01 - CABLE COAXIAL RG11',
          precio: '$0',
          cantidad: '3',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'T052 - INSTALAR AMPLIFICADOR O FUENTE DE ALIMENTACION HASTA 8 AMPERIOS',
      precio: '$3.791',
      cantidad: '2',
      total: '$7.582',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT06 - CONECTOR RG11',
          precio: '$0',
          cantidad: '3',
          total: '$0',
        },
      ],
    },
  ],
};

export const adicionalesFinalesIATrabajador = {
  contrato: 'BUCLE',
  agencia: 'APOQUINDO',
  proveedor: '330000659 - COBRA CHILE SERVICIOS S.A.',
  totalServicios: '$42.610,84',
  totalUOs: '0',
  total: '$42.610,84',
  items: [
    {
      nombre: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      precio: '$471,6',
      cantidad: '0',
      total: '0',
      tipo_servicio: 'LINEAS',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'C048 - CABLE 900-26 SUB',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
        {
          nombre: 'C870 - CABLE PS 1212-26 SUB.',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'T057 - Servicio Adicional ACTIVACION DEL AMPLIFICADOR EN DIRECTA ',
      precio: '$22.897,64',
      cantidad: '1',
      total: '$22.897,64',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT09 - AMPLIFICADOR FI TELEVES',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
        {
          nombre:
            'DT07 - ANTENA SATELITAL, MARCA AZURE SHINE, MODELO AZ-120FM, S/SERIGRAFÍA.',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'T051 - INSTALAR DIVISOR, DERIVADOR (INCLUIDO TAP DIRECCIONABLE)',
      precio: '$3.032,8',
      cantidad: '4',
      total: '$12.131,2',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT04 - SPLITTER 4 SALIDAS (SPLITTER 1X4)',
          precio: '$0',
          cantidad: '10',
          total: '$0',
        },
        {
          nombre: 'DT01 - CABLE COAXIAL RG11',
          precio: '$0',
          cantidad: '3',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'T052 - INSTALAR AMPLIFICADOR O FUENTE DE ALIMENTACION HASTA 8 AMPERIOS',
      precio: '$3.791',
      cantidad: '2',
      total: '$7.582',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT06 - CONECTOR RG11',
          precio: '$0',
          cantidad: '3',
          total: '$0',
        },
      ],
    },
  ],
};

export const informeAvanceFinalTrabajador = {
  contrato: 'BUCLE',
  agencia: 'APOQUINDO',
  proveedor: '330000659 - COBRA CHILE SERVICIOS S.A.',
  totalServicios: '$3.022.590,4',
  totalUOs: '$49.224',
  total: '$3.071.814,4',
  items: [
    {
      nombre: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      precio: '$180,32',
      cantidad: '20',
      total: '$3.606,4',
      tipo_servicio: 'CABLES',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'D013 - CONECTOR ROJO CAL.24-19',
          precio: '$56,8',
          cantidad: '15',
          total: '$852',
        },
        {
          nombre: 'D012 - CONECTOR AMARILLO CAL.24-19',
          precio: '$0',
          cantidad: '14',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      precio: '$471,6',
      cantidad: '5.011',
      total: '$2.363.187,6',
      tipo_servicio: 'LINEAS',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'C926 - CABLE 1800-26 PS',
          precio: '$0',
          cantidad: '150,37',
          total: '$0',
        },
        {
          nombre: 'C881 - CABLE FS 1212-24 SUB.',
          precio: '$0',
          cantidad: '2,3',
          total: '$0',
        },
        {
          nombre: 'C105 - CABLE PS 600-26 SUB.',
          precio: '$0',
          cantidad: '80,32',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'D080 - DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
      precio: '$1.485',
      cantidad: '5',
      total: '$7.425',
      tipo_servicio: 'PROYECTOS',
      actividad: 'FTTX',
      unidad_obras: [
        {
          nombre: '0 - SIN UO',
          precio: '$0',
          cantidad: '0',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J201 - INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
      precio: '$982,5',
      cantidad: '10',
      total: '$9.825',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: 'H006 - ANGULO PLANO LEGRAND 40*16',
          precio: '$458',
          cantidad: '9',
          total: '$4.122',
        },
        {
          nombre: 'H002 - ANGULO INT./EXT.LEGRAND 32*10',
          precio: '$295',
          cantidad: '150',
          total: '$44.250',
        },
      ],
    },
    {
      nombre: 'J726 - INST. REPARTIDOR MURAL, 1 VERTICAL, TIPO 2/3 VERTICALES',
      precio: '$22.008',
      cantidad: '15',
      total: '$330.120',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: '0 - SIN UO',
          precio: '$0',
          cantidad: '0',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J730 - INST. ESCALERILLA SOPORTE',
      precio: '$12.851,1',
      cantidad: '24',
      total: '$308.426,4',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: 'H134 - ESCALERILLA PC TIPO NEC 200*32',
          precio: '$0',
          cantidad: '26',
          total: '$0',
        },
      ],
    },
  ],
};

export const InformeAvanceYadicionalesFinal = {
  contrato: 'BUCLE',
  agencia: 'APOQUINDO',
  proveedor: '330000659 - COBRA CHILE SERVICIOS S.A.',
  totalServicios: '$3.065.201,24',
  totalUOs: '$49.224',
  total: '$3.114.425,24',
  items: [
    {
      nombre: 'J451 - EMPALME DE UN PAR (CON CONECTOR INDIVIDUAL O DERIVADO)',
      precio: '$180,32',
      cantidad: '20',
      total: '$3.606,4',
      tipo_servicio: 'CABLES',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'D013 - CONECTOR ROJO CAL.24-19',
          precio: '$56,8',
          cantidad: '15',
          total: '$852',
        },
        {
          nombre: 'D012 - CONECTOR AMARILLO CAL.24-19',
          precio: '$0',
          cantidad: '14',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      precio: '$471,6',
      cantidad: '5.011',
      total: '$2.363.187,6',
      tipo_servicio: 'LINEAS',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'C926 - CABLE 1800-26 PS',
          precio: '$0',
          cantidad: '150,37',
          total: '$0',
        },
        {
          nombre: 'C881 - CABLE FS 1212-24 SUB.',
          precio: '$0',
          cantidad: '2,3',
          total: '$0',
        },
        {
          nombre: 'C105 - CABLE PS 600-26 SUB.',
          precio: '$0',
          cantidad: '80,32',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'D080 - DISEÑO DE RED PARA PROYECTOS DEL TIPO BROWNFIELD (CADA UIP)',
      precio: '$1.485',
      cantidad: '5',
      total: '$7.425',
      tipo_servicio: 'PROYECTOS',
      actividad: 'FTTX',
      unidad_obras: [
        {
          nombre: '0 - SIN UO',
          precio: '$0',
          cantidad: '0',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J201 - INSTALAR CABLES EN EDIFICIOS Y CENTRALES TELEFONICAS',
      precio: '$982,5',
      cantidad: '10',
      total: '$9.825',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: 'H006 - ANGULO PLANO LEGRAND 40*16',
          precio: '$458',
          cantidad: '9',
          total: '$4.122',
        },
        {
          nombre: 'H002 - ANGULO INT./EXT.LEGRAND 32*10',
          precio: '$295',
          cantidad: '150',
          total: '$44.250',
        },
      ],
    },
    {
      nombre: 'J726 - INST. REPARTIDOR MURAL, 1 VERTICAL, TIPO 2/3 VERTICALES',
      precio: '$22.008',
      cantidad: '15',
      total: '$330.120',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: '0 - SIN UO',
          precio: '$0',
          cantidad: '0',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J730 - INST. ESCALERILLA SOPORTE',
      precio: '$12.851,1',
      cantidad: '24',
      total: '$308.426,4',
      tipo_servicio: 'LINEAS',
      actividad: 'FIBRA OPTICA',
      unidad_obras: [
        {
          nombre: 'H134 - ESCALERILLA PC TIPO NEC 200*32',
          precio: '$0',
          cantidad: '26',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'J101 - INSTALAR CABLE EN CANALIZACION GRUPOS A Y B',
      precio: '$471,6',
      cantidad: '0',
      total: '0',
      tipo_servicio: 'LINEAS',
      actividad: 'MATRIZ',
      unidad_obras: [
        {
          nombre: 'C048 - CABLE 900-26 SUB',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
        {
          nombre: 'C870 - CABLE PS 1212-26 SUB.',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'T057 - Servicio Adicional ACTIVACION DEL AMPLIFICADOR EN DIRECTA ',
      precio: '$22.897,64',
      cantidad: '1',
      total: '$22.897,64',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT09 - AMPLIFICADOR FI TELEVES',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
        {
          nombre:
            'DT07 - ANTENA SATELITAL, MARCA AZURE SHINE, MODELO AZ-120FM, S/SERIGRAFÍA.',
          precio: '$0',
          cantidad: '1',
          total: '$0',
        },
      ],
    },
    {
      nombre: 'T051 - INSTALAR DIVISOR, DERIVADOR (INCLUIDO TAP DIRECCIONABLE)',
      precio: '$3.032,8',
      cantidad: '4',
      total: '$12.131,2',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT04 - SPLITTER 4 SALIDAS (SPLITTER 1X4)',
          precio: '$0',
          cantidad: '10',
          total: '$0',
        },
        {
          nombre: 'DT01 - CABLE COAXIAL RG11',
          precio: '$0',
          cantidad: '3',
          total: '$0',
        },
      ],
    },
    {
      nombre:
        'T052 - INSTALAR AMPLIFICADOR O FUENTE DE ALIMENTACION HASTA 8 AMPERIOS',
      precio: '$3.791',
      cantidad: '2',
      total: '$7.582',
      tipo_servicio: 'DTH',
      actividad: 'DISTRIBUCION',
      unidad_obras: [
        {
          nombre: 'DT06 - CONECTOR RG11',
          precio: '$0',
          cantidad: '3',
          total: '$0',
        },
      ],
    },
  ],
};
