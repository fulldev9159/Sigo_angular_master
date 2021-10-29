export interface ResponseRegionSubContrato4Cub {
  data: {
    items: RegionSubcontrato4Cub[];
  };

  status: {
    description: string;
    responseCode: number;
  };
}

export interface RegionSubcontrato4Cub {
  id: number;
  nombre: string;
  codigo: string;
}
