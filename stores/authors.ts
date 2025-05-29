import {
  AuthorsError,
  GET_DISTINCT_AUTHORS_ERROR_MESSAGE,
} from "~/errors/authors";
import type { Author } from "~/types/authors";
import type { Database } from "~/types/database.types";

export const useAuthorsStore = defineStore("authors", () => {
  const supabase = useSupabaseClient<Database>();

  const getDistinctAuthors = async (): Promise<Author[]> => {
    const { data, error } = await supabase
      .from("books")
      .select("author, count()")
      .overrideTypes<Author[], { merge: false }>();

    if (error) throw new AuthorsError(GET_DISTINCT_AUTHORS_ERROR_MESSAGE);

    return data;
  };

  return {
    getDistinctAuthors,
  };
});
