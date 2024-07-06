import { FILTER_CATEGORIES_ID, FILTER_SCORE_ID } from "~/types/filters";

export default () => {
  const FILTERS: Record<string, string> = {
    [FILTER_CATEGORIES_ID]: "Categorías",
    [FILTER_SCORE_ID]: "Puntuación",
  };

  const getFilterLabel = (filterKey: string): string => {
    return FILTERS[filterKey] || useCapitalize(filterKey);
  };

  return {
    getFilterLabel,
  };
};
