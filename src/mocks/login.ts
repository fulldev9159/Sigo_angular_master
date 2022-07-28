import { Response, Login } from '@model';

export let LoginMock200OK: Response<Login> = {
  status: { code: 0, desc: 'OK' },
  data: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTg5NzcxNDQsImlzcyI6InNpZ28iLCJuYmYiOjE2NTg5NzM1NDQsInNpZ29fcHJveHlfaWQiOi0xLCJzaWdvX3VzZXJfaWQiOjIsInNpZ29fcGVyZmlsX2lkIjotMX0.P59Wb-rm-bSS-Wc4geOchYlzAfZQZH0Hvqu_O292-dk',
    usuario_id: 2,
    usuario_nombre: 'JESSICA MOVISTAR CASTILLO 1',
  },
};
