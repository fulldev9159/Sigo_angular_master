import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { CubicacionService } from './cubicacion.service';
import { AuthService } from './auth.service';
import * as CubicacionModel from '@coreOT/models/cubicacion.model';
import { Response } from '@coreOT/models/main.model';

describe('CubicacionService', () => {
  let service: CubicacionService;
  let authService: AuthService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: 'environment', useValue: {} }, CubicacionService],
    });
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(CubicacionService);
    authService = TestBed.inject(AuthService);
    let store: { [key: string]: string } = {};
    const mockLocalStorage = {
      getItem: (key: string): string | null => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return contratos', () => {
    authService.setItemStorage('username', 'carloscj');
    authService.setItemStorage('otec_token', 'dummytoken');
    const dummyLoginResponse: Response<CubicacionModel.DataContrato> = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        contratos_marco: [
          {
            id: 1,
            nombre: 'SBE',
            tipo_contrato: 'Movil',
          },
          {
            id: 2,
            nombre: 'RAN',
            tipo_contrato: 'Ordinario',
          },
        ],
      },
    };
    service.getContratos().subscribe((response) => {
      expect(response).toEqual(dummyLoginResponse);
    });
    const req = httpMock.expectOne('http://localhost:4040/getContratosMarco');
    expect(req.request.method).toBe('POST');
    req.flush(dummyLoginResponse);
  });

  it('should return proveedores', () => {
    authService.setItemStorage('username', 'carloscj');
    authService.setItemStorage('otec_token', 'dummytoken');
    const contratoMarco = 1;
    const dummyLoginResponse: Response<CubicacionModel.DataProveedor> = {
      status: {
        responseCode: 0,
        description: 'Ok',
      },
      data: {
        proveedores: [
          {
            id: 1,
            nombre: 'ERICSSON CHILE S.A',
            subcontrato_id: [1],
          },
        ],
      },
    };
    service.getProveedoresSubcontrato(contratoMarco).subscribe((response) => {
      expect(response).toEqual(dummyLoginResponse);
    });
    const req = httpMock.expectOne(
      'http://localhost:4040/getProveedoresSubcontratos'
    );
    expect(req.request.method).toBe('POST');
    req.flush(dummyLoginResponse);
  });

  // it('should return Regiones', () => {
  //   const user = 'carloscj';
  //   const token = 'dummytoken';
  //   const subcontratos = 1;
  //   const dummyLoginResponse: CubicacionModel.ResponseRegion = {
  //     status: {
  //       responseCode: 0,
  //       description: 'Ok',
  //     },
  //     data: {
  //       regiones: [
  //         {
  //           id: 1,
  //           nombre: 'Región Metropolitana',
  //           codigo: 'XVIII',
  //         },
  //       ],
  //     },
  //   };
  //   service
  //     .getRegionesSubcontrato(user, token, subcontratos)
  //     .subscribe((response) => {
  //       expect(response).toEqual(dummyLoginResponse);
  //     });
  //   const req = httpMock.expectOne(
  //     'http://localhost:4040/getRegionesSubcontratos'
  //   );
  //   expect(req.request.method).toBe('POST');
  //   req.flush(dummyLoginResponse);
  // });

  // it('should return Tipo Servicio', () => {
  //   const user = 'carloscj';
  //   const token = 'dummytoken';
  //   const subcontratos = 1;
  //   const region = 1;
  //   const dummyLoginResponse: CubicacionModel.ResponseTipoServicioSubContrato = {
  //     status: {
  //       responseCode: 0,
  //       description: 'Ok',
  //     },
  //     data: {
  //       prooveedores: [
  //         {
  //           id: 1,
  //           nombre: 'CD1',
  //         },
  //       ],
  //     },
  //   };
  //   service
  //     .getTipoServicioSubcontrato(user, token, subcontratos, region)
  //     .subscribe((response) => {
  //       expect(response).toEqual(dummyLoginResponse);
  //     });
  //   const req = httpMock.expectOne(
  //     'http://localhost:4040/getTiposServiciosSubcontrato'
  //   );
  //   expect(req.request.method).toBe('POST');
  //   req.flush(dummyLoginResponse);
  // });

  // it('should return Tipo Servicio', () => {
  //   const user = 'carloscj';
  //   const token = 'dummytoken';
  //   const subcontratos = 1;
  //   const region = 1;
  //   const tipoServicio = 1;
  //   const dummyLoginResponse: CubicacionModel.ResponseServicioContrato = {
  //     status: {
  //       responseCode: 0,
  //       description: 'Ok',
  //     },
  //     data: {
  //       servicios: [
  //         {
  //           id_lpu: 1,
  //           nombre: 'CD1',
  //           precio: 9999,
  //           tipo_moneda: 'Pesos',
  //           numero_producto: 'CD1asda',
  //         },
  //       ],
  //     },
  //   };
  //   service
  //     .getServicioSubcontrato(user, token, subcontratos, region, tipoServicio)
  //     .subscribe((response) => {
  //       expect(response).toEqual(dummyLoginResponse);
  //     });
  //   const req = httpMock.expectOne(
  //     'http://localhost:4040/getServiciosSubcontrato'
  //   );
  //   expect(req.request.method).toBe('POST');
  //   req.flush(dummyLoginResponse);
  // });

  // it('should send cubicacion for save', () => {
  //   const user = 'carloscj';
  //   const token = 'dummytoken';
  //   const nombreC = 'cubicaciontest';
  //   const total = 1000;
  //   const regionID = 1;
  //   const regionC = '1Region';
  //   const contratoMarcoC = 'SBE';
  //   const proveedorID = 1;
  //   const proveedor = 'ERICSON';

  //   const lpus: CubicacionModel.Product[] = [
  //     {
  //       id_lpu: 1,
  //       nombre: 'servicio1',
  //       precio: 11000,
  //       tipo_moneda: 'PESOS',
  //       // numero_producto: 'asdasd',
  //       cantidad: 1,
  //       unidad: 'Unidad',
  //       region: '1 region',
  //       tiposervicio: 'CD1',
  //     },
  //   ];
  //   const dummyResponse: CubicacionModel.ResponseSaveCubicacion = {
  //     status: {
  //       responseCode: 0,
  //       description: 'Ok',
  //     },
  //     data: '',
  //   };

  //   service
  //     .saveCubicacion(
  //       token,
  //       user,
  //       nombreC,
  //       total,
  //       regionID,
  //       regionC,
  //       contratoMarcoC,
  //       proveedor,
  //       proveedorID,
  //       lpus
  //     )
  //     .subscribe((response) => {
  //       expect(response).toEqual(dummyResponse);
  //     });
  //   const req = httpMock.expectOne('http://localhost:4040/saveEditCubicacion');
  //   expect(req.request.method).toBe('POST');
  //   req.flush(dummyResponse);
  // });
});
