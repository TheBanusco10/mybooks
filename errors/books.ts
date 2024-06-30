export const BOOKS_RANGE_ERROR_CODE = "PGRST103";

export class BooksError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "BooksError";
    this.code = code;
  }
}
