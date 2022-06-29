export interface ModelPlan {
  id: number;
  nombre: string;
  estado: boolean;
  created_at: Date;
}

// tslint:disable-next-line
export interface PlanDeProyecto extends ModelPlan {}
