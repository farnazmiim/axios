import Client, { EMethod, IClientOptions } from '../client';
import {
  IPostCreateBody,
  IPostCreateResponse,
  IPostGetResponse,
  IPostListResponse,
} from './types';

export class AppClient extends Client {
  constructor(options: IClientOptions) {
    super(options);
  }

  public readonly post = {
    list: () =>
      this.request<IPostListResponse>({
        path: '/posts',
        method: EMethod.GET,
      }),

    get: (postId: string) =>
      this.request<IPostGetResponse>({
        path: `/posts/${postId}`,
        method: EMethod.GET,
      }),

    create: (body: IPostCreateBody) =>
      this.request<IPostCreateResponse, IPostCreateBody>({
        path: '/order/',
        method: EMethod.POST,
        body,
      }),

    delete: (postId: string) =>
      this.request<void>({
        path: `/posts/${postId}`,
        method: EMethod.DELETE,
      }),
  };
}

export const clientUrl = new AppClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
