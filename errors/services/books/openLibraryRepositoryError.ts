import { ErrorBase } from "~/interfaces/errorBase";

export class OpenLibraryRepositoryError extends ErrorBase {
  name = "OpenLibraryRepositoryError";
}

export const GET_BOOKS_ERROR_MESSAGE = "Error fetching books from API";
export const BOOKS_NOT_FOUND_ERROR_MESSAGE = "We couldn't find any books";
