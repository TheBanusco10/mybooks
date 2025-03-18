import type { Category } from "~/types/category";

export default () => {
  const { t } = useI18n();

  const CATEGORIES = computed<Category[]>(() => {
    return [
      { value: "fiction", label: t("books.categories.fiction") },
      { value: "mystery", label: t("books.categories.mystery") },
      { value: "autobiography", label: t("books.categories.autobiography") },
      { value: "history", label: t("books.categories.history") },
      { value: "science", label: t("books.categories.science") },
      { value: "drama", label: t("books.categories.drama") },
      { value: "poetry", label: t("books.categories.poetry") },
      { value: "terror", label: t("books.categories.terror") },
      { value: "romance", label: t("books.categories.romance") },
      { value: "comedy", label: t("books.categories.comedy") },
      { value: "children", label: t("books.categories.children") },
      { value: "story", label: t("books.categories.story") },
      { value: "politics", label: t("books.categories.politics") },
      { value: "philosophy", label: t("books.categories.philosophy") },
      { value: "religion", label: t("books.categories.religion") },
      { value: "essay", label: t("books.categories.essay") },
      { value: "biography", label: t("books.categories.biography") },
      { value: "cooking", label: t("books.categories.cooking") },
      { value: "guide", label: t("books.categories.guide") },
      { value: "fantasy", label: t("books.categories.fantasy") },
      { value: "film", label: t("books.categories.film") },
      { value: "music", label: t("books.categories.music") },
      { value: "design", label: t("books.categories.design") },
      { value: "programming", label: t("books.categories.programming") },
      { value: "business", label: t("books.categories.business") },
      { value: "health", label: t("books.categories.health") },
      {
        value: "interior_design",
        label: t("books.categories.interior_design"),
      },
      { value: "travel", label: t("books.categories.travel") },
      { value: "adventure", label: t("books.categories.adventure") },
      { value: "thriller", label: t("books.categories.thriller") },
      { value: "crime_novel", label: t("books.categories.crime_novel") },
      {
        value: "psychological_thriller",
        label: t("books.categories.psychological_thriller"),
      },
      {
        value: "tales_of_the_occult",
        label: t("books.categories.tales_of_the_occult"),
      },
    ];
  });

  const getCategory = (categoryValue: string): Category => {
    return (
      CATEGORIES.value.find((category) => category.value === categoryValue) ||
      CATEGORIES.value.at(0)!
    );
  };

  return {
    categories: computed(() => CATEGORIES.value),
    getCategory,
  };
};
