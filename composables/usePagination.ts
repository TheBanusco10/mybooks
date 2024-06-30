import type { PaginationRange } from "~/types/pagination";

export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 20;

export default () => {
  const currentPage = ref(DEFAULT_PAGE);

  const getRange = (page: number): PaginationRange => {
    currentPage.value = validateCurrentPage(page);

    const from = (currentPage.value - 1) * DEFAULT_ITEMS_PER_PAGE;
    const to = from + DEFAULT_ITEMS_PER_PAGE - 1;

    return { from, to };
  };

  const getFromQueryParam = (): PaginationRange => {
    const currentPageFromParam = getPageQueryParam();

    return getRange(currentPageFromParam);
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
