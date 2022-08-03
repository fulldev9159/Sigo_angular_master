import { Response, Login, PerfilesUsuario } from '@model';

export let LoginMock200OK: Response<Login> = {
  status: { code: 0, desc: 'OK' },
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg5NzcxNDQsImlzcyI6InNpZ28iLCJuYmYiOjE2NTg5NzM1NDQsInNpZ29fcHJveHlfaWQiOi0xLCJzaWdvX3VzZXJfaWQiOjIsInNpZ29fcGVyZmlsX2lkIjotMX0.P59Wb-rm-bSS-Wc4geOchYlzAfZQZH0Hvqu_O292-dk',
    usuario_id: 2,
    usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
  },
};

export let PerfilUserMock200OK: Response<{ perfiles: PerfilesUsuario[] }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    perfiles: [
      {
        id: 2,
        usuario_orig: 2,
        usuario_id: 2,
        perfil_id: 8,
        superior_proxy_id: 1034,
        created_at: null,
        updated_at: null,
        perfil_propio: true,
        model_usuario_orig: {
          id: 2,
          username: 'mgestor1',
          rut: '1173606344',
          nombres: 'Gestor Jessica',
          apellidos: 'Castillo',
          celular: '5696263509644',
          estado: true,
          proveedor_id: 1,
          area_id: 1,
          email: 'jessica.castillo@telefonica.com',
          firma_archivo_id: null,
          eliminable: true,
          created_at: null,
          updated_at: null,
        },
        model_usuario_id: {
          id: 2,
          username: 'mgestor1',
          rut: '1173606344',
          nombres: 'Gestor Jessica',
          apellidos: 'Castillo',
          celular: '5696263509644',
          estado: true,
          proveedor_id: 1,
          area_id: 1,
          email: 'jessica.castillo@telefonica.com',
          firma_archivo_id: null,
          eliminable: true,
          created_at: null,
          updated_at: null,
        },
        model_perfil_id: {
          id: 8,
          nombre: 'Gestor/JP',
          descripcion: 'Gestor de proyectos de telefónica',
          eliminable: true,
          created_at: null,
          updated_at: null,
          rol_id: 2,
          model_rol_id: {
            id: 2,
            slug: 'GESTOR',
            nombre: 'Gestor/JP (Telefónica)',
            jerarquia: '6,7',
          },
        },
        model_superior_proxy_id: {
          id: 1034,
          usuario_orig: 1024,
          usuario_id: 1024,
          perfil_id: 9,
          superior_proxy_id: 17,
          created_at: null,
          updated_at: null,
          model_usuario_id: {
            id: 1024,
            username: 'msupervisor1',
            rut: '12312312312',
            nombres: 'Supervisor Josefa',
            apellidos: 'Antonella',
            celular: '22222222222',
            estado: true,
            proveedor_id: 1,
            area_id: 1,
            email: 'asdasdas@asdasd.com',
            firma_archivo_id: null,
            eliminable: true,
            created_at: null,
            updated_at: null,
          },
        },
      },
    ],
  },
};

export let LoginRefreshMock200OK: Response<{ token: string }> = {
  status: { code: 0, desc: 'OK' },
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTk1NDg5OTYsImlzcyI6InNpZ28iLCJuYmYiOjE2NTk1NDUzOTYsInNpZ29fcHJveHlfaWQiOjIsInNpZ29fdXNlcl9pZCI6Miwic2lnb19wZXJmaWxfaWQiOjh9.PBSB2fmv55Jq7GLp5R1ETQLtRjQWQKXpyGfKKbpQGLA',
  },
};
