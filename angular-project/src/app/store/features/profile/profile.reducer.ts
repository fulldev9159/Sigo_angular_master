import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
import * as Model from './profile.model';

export const ProfileFeatureKey = 'profile';

export interface StateProfile {
  items: Model.Profile[];
}

export const initialStateProfile: StateProfile = {
  items: [
    {
      id: 1,
      name: 'Gestor',
      descripcion:'Perfil que gestiona las Cubicaciones y OTs',
      fecha_creacion: new Date("2021-03-01T03:00:00.000Z"),
      fecha_actualizacion:new Date("2021-03-28T03:00:00.000Z"),
      permissions: [
        {
          permiso_id: 1,
          permiso_slug: 'OT_LIST',
        },
        {
          permiso_id: 2,
          permiso_slug: 'OT_CREATE',
        },
        {
          permiso_id: 3,
          permiso_slug: 'OT_EDIT',
        },
        {
          permiso_id: 6,
          permiso_slug: 'OT_DELETE',
        },
        {
          permiso_id: 7,
          permiso_slug: 'CUBAGE_LIST',
        },
        {
          permiso_id: 8,
          permiso_slug: 'CUBAGE_CREATE',
        },
        {
          permiso_id: 11,
          permiso_slug: 'CUBAGE_EDIT',
        },
      ],
    },
    {
      id: 2,
      name: 'Administrador de contrato',
      descripcion:'Perfil para quien de parte del proveedor asignado gestione el equipo que ejecutará los trabajos',
      fecha_creacion: new Date("2021-03-01T03:00:00.000Z"),
      fecha_actualizacion:new Date("2021-03-28T03:00:00.000Z"),
      permissions: [
        {
          permiso_id: 1,
          permiso_slug: 'OT_LIST',
        },
        {
          permiso_id: 3,
          permiso_slug: 'OT_ACCEPT',
        },
        {
          permiso_id: 4,
          permiso_slug: 'OT_REJECT',
        },
      ],
    },
  ],
};

export const reducerProfile = createReducer(
  initialStateProfile,

  on(ProfileActions.getProfile, (state) => state),
  on(ProfileActions.getProfileSuccess, (state, payload) => ({
    ...state,
    items: payload.profile,
  })),
  on(ProfileActions.deleteProfile, (state, payload) => ({
    ...state,
    items: [
      ...state.items.slice(0, payload.profilePosition),
      ...state.items.slice(payload.profilePosition + 1)
    ],
  })),
);
