export interface IResponse<T = any> {
  message?: string;
  info?: string;
  statusCode?: number;
  data?: T;
}

export interface ExceptionOptions {
  message?: string;
  issues?: { path?: string; info?: string }[];
  info?: string;
  err?: any;
}
