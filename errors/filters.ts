export const FILTERS_SEARCH_BY_TITLE_ERROR_MESSAGE =
  "Ha ocurrido un error al realizar la búsqueda. Por favor, intentelo de nuevo.";

export class FiltersError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = "FiltersError";
    this.code = code;
  }
}
