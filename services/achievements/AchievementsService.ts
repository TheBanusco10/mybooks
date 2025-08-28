export default class AchievementsService {
  static async execute() {
    const { ACHIEVEMENTS } = useAchievements();
    const supabase = useSupabaseClient();
    const publicUser = await usePublicUser();

    if (!publicUser.value) return;

    let unlockedAchievements: string[] = publicUser.value?.achievements ?? [];

    try {
      for (const achievement of ACHIEVEMENTS.value) {
        const conditionMet = await achievement.condition(supabase);

        if (conditionMet) {
          const alreadyUnlocked = unlockedAchievements.includes(
            achievement.code
          );

          if (alreadyUnlocked) continue;

          unlockedAchievements = await this.unlockAchievement(
            supabase,
            achievement.code,
            unlockedAchievements,
            publicUser.value.id
          );
        }
      }
      // TODO Show notification if any achievement was unlocked
      publicUser.value.achievements = unlockedAchievements;
    } catch (err: any) {
      console.error(err.message);
    }
  }

  static async unlockAchievement(
    supabase: any,
    achievementCode: string,
    unlockedAchievements: string[],
    publicUserId: string
  ): Promise<string[]> {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        achievements: [...unlockedAchievements, achievementCode],
      })
      .eq("id", publicUserId)
      .select("achievements")
      .single();

    if (error) throw error;

    return data.achievements ?? [];
  }
}
