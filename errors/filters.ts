export const FILTERS_SEARCH_BY_TITLE_ERROR_MESSAGE =
  "Ha ocurrido un error al realizar la búsqueda. Por favor, intentelo de nuevo.";
export const FILTER_BOOKS_ERROR_MESSAGE =
  "Ha ocurrido un error al filtrar tus libros.";

export class FiltersError extends Error {
  code?: string;
  originalError?: string;

  constructor(message: string, originalError?: string, code?: string) {
    super(message);
    this.name = "FiltersError";
    this.code = code;
    this.originalError = originalError;
  }
}
