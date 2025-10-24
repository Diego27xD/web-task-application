export interface CustomResponse<T> {
  header: {
    statusCode: number;
    message: string;
    ok: boolean;
  };
  body: T;
}
