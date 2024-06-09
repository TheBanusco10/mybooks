import type { Row } from "~/interfaces/database";
import FiltersService from "~/services/filtersService";

export const useFiltersStore = defineStore("filters", () => {
  const supabase = useSupabaseClient();
  const filteredBooks = ref<Row<"books">[]>([]);

  const filterBooks = async (filters: any): Promise<void> => {
    const queryObj = {
      query: supabase.from("books").select("*"),
    };

    useForEach(filters, (values, key) => {
      FiltersService.buildQuery({ id: key, values }, queryObj);
    });

    const { data, error } = await queryObj.query;

    if (error) throw error;

    filteredBooks.value = data;
  };

  const resetFilteredBooks = (): void => {
    filteredBooks.value = [];
  };

  return {
    filteredBooks,
    filterBooks,
    resetFilteredBooks,
  };
});
