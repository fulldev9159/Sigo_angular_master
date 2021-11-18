import { DataInformeAvance } from './informe-avance';

export interface ResponseGetInformeActa {
  data: {
    items: DataInformeAvance[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}
