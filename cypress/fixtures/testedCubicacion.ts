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
      tipo_servicio: 'Cables',
      actividad: 'Matriz',
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
      tipo_servicio: 'Cables',
      actividad: 'Matriz',
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
      tipo_servicio: 'Lineas',
      actividad: 'Matriz',
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
      tipo_servicio: 'Proyectos',
      actividad: 'Fttx',
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
      tipo_servicio: 'Lineas',
      actividad: 'Fibra Optica',
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
