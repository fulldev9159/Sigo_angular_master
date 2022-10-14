import { Injectable } from '@angular/core';
import {
  Accion,
  CategoriaArchivo,
  DetalleOT,
  RegistroLibroDeObras,
  RequestCreateRegistroLibroObra,
  Response,
} from '@model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as otDetalleSelectors from './ot-detalle.selectors';
import * as otDetalleActions from './ot-detalle.actions';

@Injectable({
  providedIn: 'root',
})
export class OTDetalleFacade {
  constructor(private store: Store<any>) {}

  // GET DETALLE OT
  public getDetalleOT(id: number): void {
    this.store.dispatch(otDetalleActions.getDetalleOT({ id }));
  }

  public getDetalleOTSuccess(response: Response<DetalleOT>): void {
    this.store.dispatch(otDetalleActions.getDetalleOTSuccess({ response }));
  }

  public getDetalleOTError(error: any): void {
    this.store.dispatch(otDetalleActions.getDetalleOTError({ error }));
  }

  public getDetalleOT$(): Observable<DetalleOT> {
    return this.store.select(otDetalleSelectors.detalleOT);
  }

  // GET ACCIONES OT
  public accionesOT(ot_id: number): void {
    this.store.dispatch(otDetalleActions.getAccionesOT({ ot_id }));
  }

  public accionesOTSuccess(acciones: Accion[]): void {
    this.store.dispatch(otDetalleActions.getAccionesOTSuccess({ acciones }));
  }

  public accionesOTError(error: any): void {
    this.store.dispatch(otDetalleActions.getAccionesOTTError({ error }));
  }

  public accionesOT$(): Observable<Accion[]> {
    return this.store.select(otDetalleSelectors.accionesOT);
  }

  // GET CATEGORIA DE ARCHIVOS
  public getCategoriasArchivos(): void {
    this.store.dispatch(otDetalleActions.getCategoriasArchivos());
  }

  public getCategoriasArchivosSuccess(
    categoriaArchivo: CategoriaArchivo[]
  ): void {
    this.store.dispatch(
      otDetalleActions.getCategoriasArchivosSuccess({ categoriaArchivo })
    );
  }

  public getCategoriasArchivosError(error: any): void {
    this.store.dispatch(otDetalleActions.getCategoriasArchivosError({ error }));
  }

  public getCategoriasArchivos$(): Observable<CategoriaArchivo[]> {
    return this.store.select(otDetalleSelectors.categoriaArchivo);
  }

  // SUBIR ARCHIVO/REGISTRO LIBRO OBRAS
  public subirArchivoLibroObrasYregistrarLibroObras(
    tipo: number,
    files: any,
    request_libroobras: RequestCreateRegistroLibroObra
  ): void {
    this.store.dispatch(
      otDetalleActions.subirArchivoLibroObrasYregistrarLibroObras({
        categoria_id: tipo,
        files,
        request_libroobras,
      })
    );
  }

  // CREATE REGISTRO LIBRO OBRAS
  public createRegistroLibroObras(
    request: RequestCreateRegistroLibroObra
  ): void {
    this.store.dispatch(otDetalleActions.createRegistroLibroObras({ request }));
  }

  // GET REGISTROS LIBRO DE OBRAS
  public getLibroObras(ot_id: number): void {
    this.store.dispatch(otDetalleActions.getLibroObras({ ot_id }));
  }

  public getLibroObrassSuccess(
    registrosLibroObras: RegistroLibroDeObras[]
  ): void {
    this.store.dispatch(
      otDetalleActions.getLibroObrasSuccess({ registrosLibroObras })
    );
  }

  public getLibroObrasError(error: any): void {
    this.store.dispatch(otDetalleActions.getLibroObrasError({ error }));
  }

  public getLibroObras$(): Observable<RegistroLibroDeObras[]> {
    return this.store.select(otDetalleSelectors.registrosLibroObras);
  }
}
