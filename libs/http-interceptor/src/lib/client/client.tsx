import axios from 'axios';
import { ClientError } from './errors';
import { IClientOptions, RequestParameters } from './types';
import { MESSAGES } from './constants';

const DEFAULT_STORAGE_KEY = '_app_storage';

export class Client {
  private baseURL: string;
  private storageKey: string;

  constructor({ baseURL, storageKey }: IClientOptions) {
    if (!baseURL) {
      throw new ClientError(MESSAGES.REQUIRED_URL);
    }
    this.baseURL = baseURL;
    this.storageKey = storageKey || DEFAULT_STORAGE_KEY;
  }

  getToken(): string {
    return localStorage.getItem(this.storageKey) || '';
  }

  setToken(value: string) {
    localStorage.setItem(this.storageKey, value);
  }

  // make and send request
  protected async request<Res = Record<string, unknown>, Req = void>({
    path,
    method,
    query,
    body,
    headers,
  }: RequestParameters<Req>): Promise<Res> {
    // get token from localstorage and set headers
    const token = this.getToken();
    const _headers = {
      Authorization: token ? `Bearer ${token}` : '',
      ...headers,
    };

    // parse search params
    // in future we can use `querystring` package if queries become complecated
    const searchParams = new URLSearchParams();
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== '') {
          searchParams.append(key, String(value));
        }
      }
    }
    const params = searchParams.toString();

    // attach query params to the path if exists
    const pathWithParams = params ? `${path}?${params}` : path;

    // generate request url
    const url = this.baseURL + pathWithParams;

    try {
      // validate url
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      new URL(pathWithParams, this.baseURL).href;

      const response = await axios.request<Res>({
        method,
        url,
        headers: _headers,
        data: body,
        withCredentials: true,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response?.data) {
          //   throw new ClientAPIError(
          //     pathWithParams,
          //     error.response.data.message,
          //     error.response.status
          //   );
          throw new ClientError(MESSAGES.UNEXPECTED_ERROR);
        }
      } else if (error.request) {
        throw new ClientError(MESSAGES.SERVER_DOWN);
      } else {
        throw new ClientError(MESSAGES.NETWORK_DISCONNECT);
      }

      throw new ClientError(MESSAGES.UNEXPECTED_ERROR);
    }
  }
}
