export interface Response<T> {
  data: T;
  status: {
    responseCode: number;
    description: string;
  };
}
