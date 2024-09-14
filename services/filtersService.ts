import {
  FILTER_AUTHOR_ID,
  FILTER_CATEGORIES_ID,
  FILTER_SCORE_ID,
  FILTER_STATUS_ID,
  FILTER_TYPE_ID,
  type Filter,
} from "~/types/filters";

const buildQuery = (filter: Filter, queryObj: any): void => {
  const { id, values } = filter;

  switch (id) {
    case FILTER_CATEGORIES_ID:
      queryObj.query.overlaps(FILTER_CATEGORIES_ID, values);
      break;
    case FILTER_SCORE_ID:
      queryObj.query.eq(FILTER_SCORE_ID, values);
      break;
    case FILTER_STATUS_ID:
      queryObj.query.eq(FILTER_STATUS_ID, values);
      break;
    case FILTER_TYPE_ID:
      queryObj.query.eq(FILTER_TYPE_ID, values);
      break;
    case FILTER_AUTHOR_ID:
      if (isArray(values)) {
        queryObj.query.in(FILTER_AUTHOR_ID, values);
      }
      break;
    default:
  }
};

export default { buildQuery };
