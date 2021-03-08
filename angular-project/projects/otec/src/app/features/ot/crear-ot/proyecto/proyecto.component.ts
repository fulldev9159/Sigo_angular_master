import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OtService } from '../../../../core/services/ot.service';
import { CubicacionService } from '../../../../core/services/cubicacion.service';
import { AuthService } from '../../../../core/services/auth.service';
import { SharedService } from '../../../../core/services/shared.service';
import * as OTModel from '../../../ot/ot.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'otec-proyecto-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent implements OnInit {
  public PlanInfomation: any;
  public username = this.authService.getItemStorage('username') as string;
  public token = this.authService.getItemStorage('otec_token') as string;
  public SitiosArr: OTModel.Sitios[] = [];

  constructor(
    private router: Router,
    private otService: OtService,
    private cubicacionService: CubicacionService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.PlanInfomation = this.otService.getOTInformation().plan;
  }

  selectedPlan(): void {
    this.otService
      .getSitios(
        this.username,
        this.token,
        this.PlanInfomation.plandespliegue.plan_despliegue_id
      )
      .subscribe((sitios) => {
        const id = 'sitios';
        this.SitiosArr = sitios.data[id];
      });
  }

  selectedSitio(): void {
    const sitioSelected = this.SitiosArr.filter(
      (x) => x.sitio_id === parseInt(this.PlanInfomation.sitio.sitio_id, 10)
    );
    this.PlanInfomation.sitio = {
      sitio_id: sitioSelected[0].sitio_id,
      codigo: sitioSelected[0].codigo,
      nombre_sitio: sitioSelected[0].nombre_sitio,
      latitud: sitioSelected[0].latitud,
      longitud: sitioSelected[0].longitud,
      direccion: sitioSelected[0].direccion,
    };
  }
  next(): void {
    this.router.navigate(['dashboard/ot/crear-ot/pep2']);
  }

  back(): void {
    this.router.navigate(['dashboard/ot/crear-ot/cubicacion-proyecto']);
  }
}
