import type { Row } from "~/interfaces/database";
import FiltersService from "~/services/filtersService";

export const useFiltersStore = defineStore("filters", () => {
  const supabase = useSupabaseClient();
  const filteredBooks = ref<Row<"books">[] | null>(null);
  const selectedFilters = ref<string[]>([]);

  const filterBooks = async (filters: any): Promise<void> => {
    const queryObj = {
      query: supabase.from("books").select("*"),
    };

    useForEach(filters, (values, key) => {
      selectedFilters.value?.push(key);
      FiltersService.buildQuery({ id: key, values }, queryObj);
    });

    const { data, error } = await queryObj.query;

    if (error) throw error;

    filteredBooks.value = data;
  };

  const resetFilteredBooks = (): void => {
    selectedFilters.value = [];
    filteredBooks.value = null;
  };

  return {
    selectedFilters,
    filteredBooks,
    filterBooks,
    resetFilteredBooks,
  };
});
