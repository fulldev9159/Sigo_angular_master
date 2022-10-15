import { Accion, ContratosUser, Response } from '@model';
import { createAction, props } from '@ngrx/store';

// GET CONTRATOS USUARIO
export const getContratosUsuario = createAction(
  '[PERFIL] POST getContratosUsuario',
  props<{ usuario_id: number }>()
);

export const getContratosUsuarioSuccess = createAction(
  '[PERFIL] POST getContratosUsuario Success',
  props<{ response: Response<{ items: ContratosUser[] }> }>()
);

export const getContratosUsuarioError = createAction(
  '[PERFIL] POST getContratosUsuario Error',
  props<{ error: any }>()
);
