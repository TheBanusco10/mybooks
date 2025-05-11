import type { BookFormInformationType, OpenLibraryBook } from "~/types/books";

export default class OpenLibraryMapper {
    static map(openLibraryBook: OpenLibraryBook): BookFormInformationType {
        return {
            author: openLibraryBook.author,
            description: openLibraryBook.description,
            end_date: null,
            image_url: openLibraryBook.cover,
            number_pages: null,
            score: null,
            status: "reading",
            title: openLibraryBook.title,
            type: "paper",
            categories: []
        }
    }
}