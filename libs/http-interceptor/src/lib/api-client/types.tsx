export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type IPostListResponse = IPost[];

export type IPostGetResponse = IPost;

export type IPostCreateResponse = IPost;

export type IPostCreateBody = {
  title: string;
  body: string;
  userId: number;
};
