import HasReadCertainAmountPagesService from "~/services/achievements/HasReadCertainAmountPagesService";
import OwnCertainAmountBooksService from "~/services/achievements/OwnCertainAmountBooksService";
import type { Achievement } from "~/types/achievements";

export default () => {
  const { $i18n } = useNuxtApp();
  const { t } = $i18n;

  const ACHIEVEMENTS = computed<Achievement[]>(() => [
    {
      code: "books_1",
      label: t("achievements.books_1_label"),
      description: t("achievements.books_1_description"),
      condition: async (supabase: any) =>
        OwnCertainAmountBooksService.execute(supabase, 1),
    },
    {
      code: "books_20",
      label: t("achievements.books_20_label"),
      description: t("achievements.books_20_description"),
      condition: async (supabase: any) =>
        OwnCertainAmountBooksService.execute(supabase, 20),
    },
    {
      code: "books_40",
      label: t("achievements.books_40_label"),
      description: t("achievements.books_40_description"),
      condition: async (supabase: any) =>
        OwnCertainAmountBooksService.execute(supabase, 40),
    },
    {
      code: "pages_count_5k",
      label: t("achievements.pages_count_5k_label"),
      description: t("achievements.pages_count_5k_description"),
      condition: async (_supabase: any) =>
        HasReadCertainAmountPagesService.execute(1),
    },
    {
      code: "pages_count_40k",
      label: t("achievements.pages_count_40k_label"),
      description: t("achievements.pages_count_40k_description"),
      condition: async (_supabase: any) =>
        HasReadCertainAmountPagesService.execute(2),
    },
    {
      code: "pages_count_100k",
      label: t("achievements.pages_count_100k_label"),
      description: t("achievements.pages_count_100k_description"),
      condition: async (_supabase: any) =>
        HasReadCertainAmountPagesService.execute(3),
    },
  ]);

  const getAchievementFromCode = (code: string) => {
    return ACHIEVEMENTS.value.find((achievement) => achievement.code === code);
  };

  return {
    ACHIEVEMENTS,
    getAchievementFromCode,
  };
};
