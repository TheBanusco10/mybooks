import OwnCertainBooksService from "~/services/achievements/ownCertainBooksService";
import type { Achievement } from "~/types/achievements";

export default () => {
  const ACHIEVEMENTS = computed<Achievement[]>(() => [
    {
      code: "books_1",
      label: "New reader",
      description: "Add your first book to your library", // TODO Translate it
      condition: async (supabase: any) =>
        OwnCertainBooksService.execute(supabase, 1),
    },
    {
      code: "books_20",
      label: "Mid reader",
      description: "Add 20 books to your library",
      condition: async (supabase: any) =>
        OwnCertainBooksService.execute(supabase, 20),
    },
    {
      code: "books_40",
      label: "Super reader",
      description: "Add 40 books to your library",
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
