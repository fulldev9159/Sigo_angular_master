import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { ProyectosFacade } from '@storeOT/proyectos/proyectos.facades';
import { Proyecto, DetalleProyectoTablaDebitado, SessionData } from '@model';
import { faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { LoadingsFacade } from '@storeOT/loadings/loadings.facade';

@Component({
  selector: 'zwc-list-proyectos-container',
  templateUrl: './list-proyectos-container.component.html',
  styleUrls: ['./list-proyectos-container.component.scss'],
})
export class ListProyectosContainerComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  sessionData: SessionData = JSON.parse(localStorage.getItem('auth'))
    .sessionData;

  // DATOS A USAR
  proyectos$: Observable<Proyecto[]> = this.proyectoFacade.getProyectos$();
  detalle$: Observable<DetalleProyectoTablaDebitado[]> =
    this.proyectoFacade.getProyectoOTs$();

  // LOADINGS
  loadingGetProyectos$: Observable<boolean> =
    this.loadingFacade.sendingGetProyectos$();

  // DISPLAY MODALS
  displayProyectoOTs = false;
  displayModalEliminarProyecto = false;

  // EXTRAS
  proyecto_id: number | null = null;

  // ICONS
  detallesIcon = faEye;
  editIcon = faPencil;
  trashICon = faTrash;

  // CONSTRUCTOR
  constructor(
    private proyectoFacade: ProyectosFacade,
    private loadingFacade: LoadingsFacade
  ) {}

  ngOnInit(): void {
    this.proyectoFacade.resetData();
    this.proyectoFacade.getProyectos();
  }

  closeModalProyectoOTs(): void {
    this.proyectoFacade.resetProyectoOTs();
    this.displayProyectoOTs = false;
  }

  closeModalEliminarProyecto(): void {
    this.displayModalEliminarProyecto = false;
    this.proyecto_id = null;
  }

  EliminarProyecto(): void {
    if (this.proyecto_id) {
      this.proyectoFacade.deleteProyecto(this.proyecto_id);
      this.closeModalEliminarProyecto();
      setTimeout(() => {
        this.proyectoFacade.getProyectos();
      }, 700);
    }
  }

  verOTsAsignadas(proyecto: Proyecto): void {
    this.displayProyectoOTs = true;
    this.proyectoFacade.getProyectoOTs(proyecto.id);
  }

  eliminar(proyecto: Proyecto): void {
    this.displayModalEliminarProyecto = true;
    this.proyecto_id = proyecto.id;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get canEdit(): boolean {
    return this.sessionData?.rol_slug === 'GESTOR';
  }
}
