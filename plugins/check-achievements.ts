import AchievementsService from "~/services/achievements/AchievementsService";

export default defineNuxtPlugin({
  name: "check-achievements",
  async setup() {
    await AchievementsService.execute();
  },
});
