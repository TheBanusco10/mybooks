import type { Row } from "~/interfaces/database";
import FiltersService from "~/services/filtersService";
import type { BooksResult } from "~/types/books";
import type { FiltersFormData } from "~/types/filters";

export const useFiltersStore = defineStore("filters", () => {
  const supabase = useSupabaseClient();
  const filteredBooks = ref<BooksResult | null>(null);
  const selectedFilters = ref<string[]>([]);
  const filtersFormData = ref<FiltersFormData | null>(null);

  const filterBooks = async (from: number, to: number): Promise<void> => {
    if (!filtersFormData.value) return;

    const queryObj = {
      query: supabase.from("books").select("*", { count: "exact" }),
    };

    useForEach(filtersFormData.value, (values, key) => {
      if (isEmpty(values)) return;

      if (!selectedFilters.value?.includes(key)) {
        selectedFilters.value?.push(key);
      }

      FiltersService.buildQuery({ id: key, values }, queryObj);
    });

    if (isEmpty(selectedFilters.value)) {
      filteredBooks.value = null;
      return;
    }

    queryObj.query.range(from, to);

    const { data: books, error, count } = await queryObj.query;

    if (error) throw error;

    filteredBooks.value = {
      results: books,
      total: count || 0,
    };
  };

  const resetFilteredBooks = (): void => {
    selectedFilters.value = [];
    filteredBooks.value = null;
  };

  return {
    selectedFilters,
    filteredBooks,
    filtersFormData,
    filterBooks,
    resetFilteredBooks,
  };
});
