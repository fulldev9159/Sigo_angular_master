import { ValidatorFn } from '@angular/forms';

export interface HeaderConfig {
  title: string;
  searchText: string;
  actionsType: string;
  paginator: boolean;
}

export interface Header {
  field: string;
  type: string;
  sort: string;
  header: string;
  width: string;
  editable: boolean;
  onchange: (event, item) => void;
  validators?: ValidatorFn[];
  errorMessageFn?: (errors) => string;
}

export interface Action {
  icon: string;
  class: string;
  label: string;
  onClick: (item, event) => void;
}

export interface Config {
  header: boolean;
  headerConfig: HeaderConfig;
  body: {
    headers: Header[];
    sort: string[];
    actions: Action[] | ((item) => Action[]);
  };
}
