export interface ModelPlan {
  id: number;
  nombre: string;
  estado: boolean;
  created_at: Date;
}

export interface PlanDeProyecto extends ModelPlan {}
