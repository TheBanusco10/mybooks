export const FILTER_CATEGORIES_ID = "categories";
export const FILTER_SCORE_ID = "score";
export const FILTER_STATUS_ID = "status";
export const FILTER_TYPE_ID = "type";
export const FILTER_AUTHOR_ID = "author";

interface Filter {
  id: string;
  values: string[] | number;
}

interface FiltersFormData {
  categories: string[];
  score: number;
}

export type { Filter, FiltersFormData };
