export const AUTHORS_ERROR_ID = "AuthorsError";

export class AuthorsError extends Error {
  code?: string;
  originalError?: string;

  constructor(message: string, originalError?: string; code?: string) {
    super(message);
    this.name = AUTHORS_ERROR_ID;
    this.code = code;
    this.originalError = originalError;
  }
}

export const GET_DISTINCT_AUTHORS_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener tus autores.";
