export const ERROR_NAME = "StatisticsError";

export class StatisticsError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.name = ERROR_NAME;
    this.code = code;
  }
}

export const GET_TOTAL_NUMBER_BOOKS_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener el número total de libros.";
export const GET_HIGH_RATED_BOOKS_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener los libros mejor puntuados.";
export const GET_TOP_CATEGORY_BOOKS_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener las categorías más usadas.";
export const GET_TOTAL_READ_PAGES_ERROR_MESSAGE =
  "Ha ocurrido un error al obtener el número de páginas total leídas.";
