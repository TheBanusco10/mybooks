import OwnCertainBooksService from "~/services/achievements/ownCertainBooksService";
import type { Achievement } from "~/types/achievements";

export default () => {
  const { t } = useI18n();

  const ACHIEVEMENTS = computed<Achievement[]>(() => [
    {
      code: "books_1",
      label: t("achievements.books_1_label"),
      description: t("achievements.books_1_description"),
      condition: async (supabase: any) =>
        OwnCertainBooksService.execute(supabase, 1),
    },
    {
      code: "books_20",
      label: t("achievements.books_20_label"),
      description: t("achievements.books_20_description"),
      condition: async (supabase: any) =>
        OwnCertainBooksService.execute(supabase, 20),
    },
    {
      code: "books_40",
      label: t("achievements.books_40_label"),
      description: t("achievements.books_40_description"),
      condition: async (supabase: any) =>
        OwnCertainBooksService.execute(supabase, 40),
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
