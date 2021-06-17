export interface Response<T> {
  data: T;
  status: {
    responseCode: number;
    description: string;
  };
}

export interface TableComponetType {
  header: boolean;
  headerConfig: {
    title: string;
    searchText: string;
    paginator: boolean;
    actionsType: string;
  };
  body: {
    headers: Header[];
    sort: string[];
    actions: Action[];
  };
}

export interface Header {
  field: string;
  type: string;
  sort?: string;
  header: string;
  width?: string;
  editable?: boolean;
  onchange?: any;
}

export interface Action {
  icon: string;
  class: string;
  onClick: any;
}
