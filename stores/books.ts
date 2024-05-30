import type { Row } from "~/interfaces/database";
import type { Database } from "~/types/database.types";

export const useBooksStore = defineStore("books", () => {
  const supabase = useSupabaseClient<Database>();

  const getBooks = async (): Promise<Row<"books">[]> => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  };

  return {
    getBooks,
  };
});
