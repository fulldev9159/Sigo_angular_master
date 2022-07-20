import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import {
  Cubicacion,
  Response,
  Agencias4Cub,
  Proveedores4Cub,
  Carrito,
  RequestEditCubicacion,
  RequestGetDatosServicio4Cub,
  RequestGetDatosUnidadObra4Cub,
  RequestGetServicios4Cub,
  RequestGetUnidadObra4Cub,
  Actividad4Cub,
  DetallesServicio4Cub,
  DetallesUnidadObra4Cub,
  Servicios4Cub,
  UnidadObra4Cub,
  TipoCubicacion4Cub,
  TipoServicioEspecialidad4Cub,
  DataRespCreateCubicacion,
  DataRespEditCubicacion,
  DatosUnidadObra4Cub,
  RequestCreateCubicacion,
  RequestDeleteDetallesCubicacion,
  RespDataGetDetalleCubs,
} from '@data';
@Injectable({
  providedIn: 'root',
})
export class CubicacionService {
  apiUrl = '';
  constructor(@Inject('environment') environment, private http: HttpClient) {
    this.apiUrl = environment.api || 'http://localhost:4040';
  }
  getAllCubs(): Observable<Response<{ items: Cubicacion[] }>> {
    return this.http.post<Response<{ items: Cubicacion[] }>>(
      `${this.apiUrl}/cubicacion/table_cubicaciones/get`,
      {}
    );
  }

  getDetalleCub(
    cubicacion_id: number
  ): Observable<Response<RespDataGetDetalleCubs>> {
    return this.http.post<Response<RespDataGetDetalleCubs>>(
      `${this.apiUrl}/cubicacion/detalle/get2`,
      { cubicacion_id }
    );
  }

  getAgencia4Cub(
    contrato_id: number
  ): Observable<Response<{ items: Agencias4Cub[] }>> {
    return this.http.post<Response<{ items: Agencias4Cub[] }>>(
      `${this.apiUrl}/cubicacion/agencias_from_contrato/get`,
      { contrato_id }
    );
  }

  getProveedores4Cub(
    agencia_id: number,
    contrato_id: number
  ): Observable<Response<{ items: Proveedores4Cub[] }>> {
    return this.http.post<Response<{ items: Proveedores4Cub[] }>>(
      `${this.apiUrl}/cubicacion/proveedores_from_agencia_contrato/get`,
      { agencia_id, contrato_id }
    );
  }

  getTipoCubicacion(): Observable<Response<{ items: TipoCubicacion4Cub[] }>> {
    return this.http.post<Response<{ items: TipoCubicacion4Cub[] }>>(
      `${this.apiUrl}/configuration/tipo_cubicacion/getall`,
      {}
    );
  }

  getActividades4Cub(
    cmarco_has_proveedor: number
  ): Observable<Response<{ items: Actividad4Cub[] }>> {
    return this.http.post<Response<{ items: Actividad4Cub[] }>>(
      `${this.apiUrl}/cubicacion/actividad_from_cmarco_has_proveedor/get`,
      { cmarco_has_proveedor }
    );
  }

  getTipoServicioEspecialidad4Cub(
    actividad_id: number,
    contrato_marco_id: number
  ): Observable<Response<{ items: TipoServicioEspecialidad4Cub[] }>> {
    return this.http.post<Response<{ items: TipoServicioEspecialidad4Cub[] }>>(
      `${this.apiUrl}/cubicacion/tipo_servicio/get`,
      { actividad_id, contrato_marco_id }
    );
  }

  getServicios4Cub(
    request: RequestGetServicios4Cub
  ): Observable<Response<{ items: Servicios4Cub[] }>> {
    return this.http.post<Response<{ items: Servicios4Cub[] }>>(
      `${this.apiUrl}/cubicacion/combo_servicios/get`,
      request
    );
  }

  getUnidadObra4Cub(
    request: RequestGetUnidadObra4Cub
  ): Observable<Response<{ items: UnidadObra4Cub[] }>> {
    return this.http.post<Response<{ items: UnidadObra4Cub[] }>>(
      `${this.apiUrl}/cubicacion/unidades_obra_from_servicio/get`,
      request
    );
  }

  getDatosServicio4Cub(
    request_servicio: RequestGetDatosServicio4Cub,
    request_uo: RequestGetDatosUnidadObra4Cub
  ): Observable<Carrito> {
    return this.http
      .post<Response<{ items: DetallesServicio4Cub[] }>>(
        `${this.apiUrl}/cubicacion/datos_servicio/get`,
        request_servicio
      )
      .pipe(
        concatMap(datosServicio => {
          return this.http
            .post<Response<DetallesUnidadObra4Cub>>(
              `${this.apiUrl}/cubicacion/datos_unidad_obra_material/get`,
              request_uo
            )
            .pipe(
              map(datosUO => {
                const uos: DatosUnidadObra4Cub[] = [];
                uos.push({
                  ...datosUO.data,
                });
                const carrito: Carrito = {
                  ...datosServicio.data.items[0],
                  unidades_obras: uos,
                };
                return carrito;
              })
            );
        })
      );
  }

  getDatosUnidadObra4Cub(
    request: RequestGetDatosUnidadObra4Cub
  ): Observable<Response<DetallesUnidadObra4Cub>> {
    return this.http.post<Response<DetallesUnidadObra4Cub>>(
      `${this.apiUrl}/cubicacion/datos_unidad_obra_material/get`,
      request
    );
  }

  createCubicacion(
    request: RequestCreateCubicacion
  ): Observable<Response<DataRespCreateCubicacion>> {
    return this.http.post<Response<DataRespCreateCubicacion>>(
      `${this.apiUrl}/cubicacion/cubicacion/save`,
      request
    );
  }

  editCubicacion(
    request: RequestEditCubicacion
  ): Observable<Response<DataRespEditCubicacion>> {
    return this.http.post<Response<DataRespEditCubicacion>>(
      `${this.apiUrl}/cubicacion/cubicacion/save`,
      request
    );
  }

  deleteCubicacion(cubicacion_id: number): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/cubicacion/cubicacion/delete`,
      { cubicacion_id }
    );
  }

  deleteServicioUOCarrito(
    request: RequestDeleteDetallesCubicacion
  ): Observable<Response<any>> {
    return this.http.post<Response<any>>(
      `${this.apiUrl}/cubicacion/detalles_cubicacion/delete`,
      request
    );
  }
}
