export const FILTER_CATEGORIES_ID = "categories";
export const FILTER_SCORE_ID = "score";

interface Filter {
  id: string;
  values: string[] | number;
}

interface FiltersFormData {
  categories: string[];
  score: number;
}

export type { Filter, FiltersFormData };
