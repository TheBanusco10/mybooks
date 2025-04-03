import type { Category } from "~/types/category";

export default () => {
  const { t } = useI18n();

  const CATEGORIES = computed<Category[]>(() => {
    return [
      {
        value: "fiction",
        label: t("books.categories.fiction"),
        icon: "material-symbols:auto-stories",
      },
      {
        value: "mystery",
        label: t("books.categories.mystery"),
        icon: "material-symbols:search",
      },
      {
        value: "autobiography",
        label: t("books.categories.autobiography"),
        icon: "material-symbols:person-book",
      },
      {
        value: "history",
        label: t("books.categories.history"),
        icon: "material-symbols:history-edu",
      },
      {
        value: "science",
        label: t("books.categories.science"),
        icon: "material-symbols:science",
      },
      {
        value: "drama",
        label: t("books.categories.drama"),
        icon: "material-symbols:theater-comedy",
      },
      {
        value: "poetry",
        label: t("books.categories.poetry"),
        icon: "material-symbols:edit-note",
      },
      {
        value: "terror",
        label: t("books.categories.terror"),
        icon: "material-symbols:skull",
      },
      {
        value: "romance",
        label: t("books.categories.romance"),
        icon: "material-symbols:favorite",
      },
      {
        value: "comedy",
        label: t("books.categories.comedy"),
        icon: "material-symbols:sentiment-very-satisfied",
      },
      {
        value: "children",
        label: t("books.categories.children"),
        icon: "material-symbols:child-care",
      },
      {
        value: "story",
        label: t("books.categories.story"),
        icon: "material-symbols:menu-book",
      },
      {
        value: "politics",
        label: t("books.categories.politics"),
        icon: "material-symbols:balance",
      },
      {
        value: "philosophy",
        label: t("books.categories.philosophy"),
        icon: "material-symbols:psychology",
      },
      {
        value: "religion",
        label: t("books.categories.religion"),
        icon: "material-symbols:church",
      },
      {
        value: "essay",
        label: t("books.categories.essay"),
        icon: "material-symbols:description",
      },
      {
        value: "biography",
        label: t("books.categories.biography"),
        icon: "material-symbols:person",
      },
      {
        value: "cooking",
        label: t("books.categories.cooking"),
        icon: "material-symbols:restaurant",
      },
      {
        value: "guide",
        label: t("books.categories.guide"),
        icon: "material-symbols:map",
      },
      {
        value: "fantasy",
        label: t("books.categories.fantasy"),
        icon: "material-symbols:castle",
      },
      {
        value: "film",
        label: t("books.categories.film"),
        icon: "material-symbols:movie",
      },
      {
        value: "music",
        label: t("books.categories.music"),
        icon: "material-symbols:music-note",
      },
      {
        value: "design",
        label: t("books.categories.design"),
        icon: "material-symbols:design-services",
      },
      {
        value: "programming",
        label: t("books.categories.programming"),
        icon: "material-symbols:code",
      },
      {
        value: "business",
        label: t("books.categories.business"),
        icon: "material-symbols:business-center",
      },
      {
        value: "health",
        label: t("books.categories.health"),
        icon: "material-symbols:health-and-safety",
      },
      {
        value: "interior_design",
        label: t("books.categories.interior_design"),
        icon: "material-symbols:chair",
      },
      {
        value: "travel",
        label: t("books.categories.travel"),
        icon: "material-symbols:flight",
      },
      {
        value: "adventure",
        label: t("books.categories.adventure"),
        icon: "material-symbols:hiking",
      },
      {
        value: "thriller",
        label: t("books.categories.thriller"),
        icon: "material-symbols:warning",
      },
      {
        value: "crime_novel",
        label: t("books.categories.crime_novel"),
        icon: "material-symbols:local-police",
      },
      {
        value: "psychological_thriller",
        label: t("books.categories.psychological_thriller"),
        icon: "material-symbols:psychology-alt",
      },
      {
        value: "tales_of_the_occult",
        label: t("books.categories.tales_of_the_occult"),
        icon: "material-symbols:ghost",
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
