import type { Settings } from "~/types/settings";
import type { Json } from "~/types/database.types";

export const useSettingsStore = defineStore("settings", () => {
  const supabase = useSupabaseClient();

  const getSettings = async () => {
    const user = useSupabaseUser();

    if (!user.value) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("settings")
      .eq("id", user.value.id)
      .single();

    if (error) throw error;

    return data.settings as Settings;
  };

  const updateSettings = useDebounce(async (settings: Settings) => {
    const user = useSupabaseUser();
    const previousSettings = await useSettings();

    if (!user.value) return;

    const newSettings = {
      ...previousSettings.value,
      ...settings,
    };

    const { error } = await supabase
      .from("profiles")
      .update({
        settings: newSettings,
      })
      .eq("id", user.value.id);

    if (error) throw error;

    previousSettings.value = newSettings;
  }, 500);

  return {
    getSettings,
    updateSettings,
  };
});
