import AchievementsService from "~/services/achievements/AchievementsService";

// Using .client plugin to avoid errors with code running outside nuxt context
export default defineNuxtPlugin({
  name: "check-achievements",
  async setup() {
    // await AchievementsService.execute();
  },
});
