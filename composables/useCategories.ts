import type { Category } from "~/types/category";
import { CATEGORIES as categories } from "~/constants/categories";

export default () => {
  const getCategory = (categoryValue: string): Category => {
    return (
      categories.find((category) => category.value === categoryValue) ||
      categories.at(0)!
    );
  };

  return {
    categories,
    getCategory,
  };
};
