import { BooksError } from "~/errors/books";
import type { Row } from "~/interfaces/database";
import type { BooksResult } from "~/types/books";
import type { Database } from "~/types/database.types";

export const useBooksStore = defineStore("books", () => {
  const supabase = useSupabaseClient<Database>();

  const getBooks = async (from: number, to: number): Promise<BooksResult> => {
    const {
      data: books,
      error,
      count,
    } = await supabase
      .from("books")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new BooksError(error.message, error.code);

    return {
      results: books,
      total: count || 0,
    };
  };

  const addBook = async (
    book: Exclude<Row<"books">, "id">
  ): Promise<Row<"books">> => {
    const { data, error } = await supabase.from("books").insert(book).single();

    if (error) throw error;

    return data;
  };

  const getBookById = async (id: number): Promise<Row<"books">> => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  };

  const removeBook = async (id: number): Promise<void> => {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id)
      .single();

    if (error) throw error;
  };

  const updateBook = async (
    id: number,
    book: Exclude<Row<"books">, "id">
  ): Promise<void> => {
    const { error } = await supabase
      .from("books")
      .update(book)
      .eq("id", id)
      .single();

    if (error) throw error;
  };

  return {
    getBooks,
    addBook,
    getBookById,
    removeBook,
    updateBook,
  };
});
