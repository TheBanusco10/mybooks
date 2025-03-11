import { ErrorBase } from "~/interfaces/errorBase";

export class OpenLibraryRepositoryError extends ErrorBase {
  override name = "OpenLibraryRepositoryError";
}

export const GET_BOOKS_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener los libros de OpenLibrary";
export const BOOKS_NOT_FOUND_ERROR_MESSAGE = "No hemos podido encontrar libros";
