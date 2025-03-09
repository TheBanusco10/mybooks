import {
  BOOKS_NOT_FOUND_ERROR_MESSAGE,
  GET_BOOKS_ERROR_MESSAGE,
  OpenLibraryRepositoryError,
} from "~/errors/services/books/openLibraryRepositoryError";
import type { OpenLibraryBook } from "~/types/books";

export default class OpenLibraryRepository {
  static MAX_RESULTS: number = 8;
  static BASE_URL: string = "https://openlibrary.org/search.json";

  static async getBooksByTitle(
    title: string
  ): Promise<OpenLibraryBook[] | OpenLibraryRepositoryError> {
    try {
      const searchUrl = `${this.BASE_URL}${this.getRouteParams(title)}`;
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();

      if (!searchData.docs.length) {
        return new OpenLibraryRepositoryError(BOOKS_NOT_FOUND_ERROR_MESSAGE);
      }

      // Getting details of each book
      const books: OpenLibraryBook[] = searchData.docs.map((book: any) => ({
        title: book.title || "Título no disponible",
        author: book.author_name ? book.author_name[0] : "Autor desconocido",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : null,
        key: book.key, // Needed to get the description later
      }));

      // Getting sinopsis of each book using "key"
      const detailedBooks = await Promise.all(
        books.map(async (book: OpenLibraryBook) => {
          const detailsUrl = `https://openlibrary.org${book.key}.json?fields=description`;
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();

          // Handle description (potentially string or an object with "value")
          let description = "Sin sinopsis disponible";
          if (detailsData.description) {
            description =
              typeof detailsData.description === "string"
                ? detailsData.description
                : detailsData.description.value || "Sin sinopsis disponible";
          }

          return { ...book, description };
        })
      );

      return detailedBooks;
    } catch (error: Error | any) {
      return new OpenLibraryRepositoryError(
        GET_BOOKS_ERROR_MESSAGE,
        error.message
      );
    }
  }

  static getRouteParams(title: string) {
    const params = {
      title: encodeURIComponent(title),
      fields: "title,author_name,cover_i,key",
      limit: this.MAX_RESULTS,
      lang: "es",
    };

    let paramsString = "?";

    for (const [key, value] of Object.entries(params)) {
      paramsString += `${key}=${value}&`;
    }

    return paramsString.slice(0, -1);
  }

  // Limits function to run only 1 time in 1 second (1000ms / 1 = 1000ms)
  static getBooksByTitleThrottled = useThrottle(
    OpenLibraryRepository.getBooksByTitle,
    1000
  );
}
