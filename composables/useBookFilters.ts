import {
  FILTER_CATEGORIES_ID,
  FILTER_SCORE_ID,
  FILTER_STATUS_ID,
  FILTER_TYPE_ID,
} from "~/types/filters";

export default () => {
  const FILTERS: Record<string, string> = {
    [FILTER_CATEGORIES_ID]: "Categorías",
    [FILTER_SCORE_ID]: "Puntuación",
    [FILTER_STATUS_ID]: "Estado",
    [FILTER_TYPE_ID]: "Tipo",
  };

  const getFilterLabel = (filterKey: string): string => {
    return FILTERS[filterKey] || useCapitalize(filterKey);
  };

  return {
    getFilterLabel,
  };
};
