import { FILTER_CATEGORIES_ID } from "~/types/filters";

export default () => {
  const FILTERS: Record<string, string> = {
    [FILTER_CATEGORIES_ID]: "Categorías",
  };

  const getFilterLabel = (filterKey: string): string => {
    return FILTERS[filterKey] || useCapitalize(filterKey);
  };

  return {
    getFilterLabel,
  };
};
