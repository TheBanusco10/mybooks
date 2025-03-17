import {
  FILTER_CATEGORIES_ID,
  FILTER_SCORE_ID,
  FILTER_STATUS_ID,
  FILTER_TYPE_ID,
  FILTER_AUTHOR_ID,
} from "~/types/filters";

export default () => {
  const { t } = useI18n();

  const FILTERS = computed<Record<string, string>>(() => {
    return {
      [FILTER_CATEGORIES_ID]: t("app.categories"),
      [FILTER_SCORE_ID]: t("app.rating"),
      [FILTER_STATUS_ID]: t("app.status"),
      [FILTER_TYPE_ID]: t("app.type"),
      [FILTER_AUTHOR_ID]: t("app.author"),
    };
  });

  const getFilterLabel = (filterKey: string): string => {
    return FILTERS.value[filterKey] || useCapitalize(filterKey);
  };

  return {
    FILTERS,
    getFilterLabel,
  };
};
