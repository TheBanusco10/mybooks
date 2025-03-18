import {
  FILTERS_SEARCH_BY_TITLE_ERROR_MESSAGE,
  FILTER_BOOKS_ERROR_MESSAGE,
  FiltersError,
} from "~/errors/filters";
import FiltersService from "~/services/filtersService";
import type { BooksResult } from "~/types/books";
import type { FiltersFormData } from "~/types/filters";
import { reset } from "@formkit/core";

export const useFiltersStore = defineStore("filters", () => {
  const { FILTERS, getFilterLabel } = useBookFilters();
  const supabase = useSupabaseClient();

  const filteredBooks = ref<BooksResult | null>(null);

  const selectedFilters = ref<Record<string, any>>({});

  const appliedFilters = ref<string[]>([]);
  const appliedFiltersLabels = computed(() =>
    appliedFilters.value.map((filterKey) => getFilterLabel(filterKey))
  );

  const filtersFormData = ref<FiltersFormData | null>(null);
  const searchedBookInput = ref("");

  const filterBooks = async (from: number, to: number): Promise<void> => {
    if (!filtersFormData.value) return;

    const queryObj = {
      query: supabase
        .from("books")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false }),
    };

    const route = useRouter();
    const queryRoute: any = {};

    useForEach(filtersFormData.value, (values, key) => {
      if (isEmpty(values) || isUndefined(values)) return;

      if (!appliedFilters.value?.includes(key)) {
        appliedFilters.value.push(key);
      }

      const urlValue = isArray(values) ? values : [values];
      queryRoute[key] = urlValue.join("|");

      FiltersService.buildQuery({ id: key, values }, queryObj);
    });

    if (isEmpty(selectedFilters.value)) {
      filteredBooks.value = null;
      return;
    }

    route.push({
      path: "/",
      query: queryRoute,
    });

    queryObj.query.range(from, to);

    const { data: books, error, count } = await queryObj.query;

    if (error) throw new FiltersError(FILTER_BOOKS_ERROR_MESSAGE);

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

    useRouter().push({
      path: useRoute().path,
      query: undefined,
    });
    filteredBooks.value = null;
    appliedFilters.value = [];
    // Clear filters
    useEach(FILTERS.value, (_, key) => {
      selectedFilters.value[key] = [];
    });
  };

  return {
    selectedFilters,
    appliedFiltersLabels,
    filteredBooks,
    filtersFormData,
    searchedBookInput,
    filterBooks,
    resetFilteredBooks,
    filterBooksBySearch,
    appliedFilters,
  };
});
