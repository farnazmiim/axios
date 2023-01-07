// Client specific types
type QueryParams = Record<string, any> | URLSearchParams;

export enum EMethod {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch',
  PUT = 'put',
}

export type RequestParameters<IBody = Record<string, unknown>> = {
  path: string;
  method: EMethod;
  query?: QueryParams;
  body?: IBody;
  headers?: Record<string, string>;
};

export interface IClientOptions {
  baseURL: string;
  storageKey?: string;
}
