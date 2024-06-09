export const FILTER_CATEGORIES_ID = "categories";

interface Filter {
  id: string;
  values: Array<string> | string;
}

export type { Filter };
