export class ClientError extends Error {
  status?: number;

  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
  }
}

export class ClientAPIError extends ClientError {
  url?: string;
  status?: number;

  constructor(url: string, message: string, status: number) {
    super(message);
    this.name = 'ClientAPIError';
    this.url = url;
    this.status = status;
  }
}
