export interface IResponse<T> {
  message?: string;
  info?: string;
  statusCode?: number;
  data?: T;
}
