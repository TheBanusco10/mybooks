import {
  FILTERS_SEARCH_BY_TITLE_ERROR_MESSAGE,
  FiltersError,
} from "~/errors/filters";
import FiltersService from "~/services/filtersService";
import type { BooksResult } from "~/types/books";
import type { FiltersFormData } from "~/types/filters";
import { reset } from "@formkit/core";

export const useFiltersStore = defineStore("filters", () => {
  const supabase = useSupabaseClient();
  const filteredBooks = ref<BooksResult | null>(null);
  const selectedFilters = ref<string[]>([]);
  const filtersFormData = ref<FiltersFormData | null>(null);
  const searchedBookInput = ref("");

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

  const filterBooksBySearch = async (input: string): Promise<void> => {
    const { data, error, count } = await supabase
      .from("books")
      .select("*", { count: "exact" })
      .ilike("title", `%${input}%`);

    if (error) throw new FiltersError(FILTERS_SEARCH_BY_TITLE_ERROR_MESSAGE);

    filteredBooks.value = {
      results: data,
      total: count || 0,
    };
  };

  const resetFilteredBooks = (formId?: string): void => {
    if (formId) {
      reset(formId);
    }

    selectedFilters.value = [];
    filteredBooks.value = null;
  };

  return {
    selectedFilters,
    filteredBooks,
    filtersFormData,
    searchedBookInput,
    filterBooks,
    resetFilteredBooks,
    filterBooksBySearch,
  };
});
