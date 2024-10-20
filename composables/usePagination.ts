import type { PaginationRange } from "~/types/pagination";

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 24;

export default () => {
  const currentPage = ref(DEFAULT_PAGE);

  const getRange = (
    page: number,
    itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE,
  ): PaginationRange => {
    currentPage.value = validateCurrentPage(page);

    const from = (currentPage.value - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    return { from, to };
  };

  const getFromQueryParam = (
    itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE,
  ): PaginationRange => {
    const currentPageFromParam = getPageQueryParam();

    return getRange(currentPageFromParam, itemsPerPage);
  };

  const getPageQueryParam = (): number => {
    const route = useRoute();

    return Number(route.query.page) || DEFAULT_PAGE;
  };

  const validateCurrentPage = (currentPage: number): number => {
    if (currentPage <= 0) {
      currentPage = DEFAULT_PAGE;
    }

    return currentPage;
  };

  return {
    currentPage,
    getRange,
    getFromQueryParam,
    getPageQueryParam,
  };
};
