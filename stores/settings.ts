import type { Settings } from "~/types/settings";
import type { Json } from "~/types/database.types";

export const useSettingsStore = defineStore("settings", () => {
  const supabase = useSupabaseClient();

  const getSettings = async () => {
    const user = useSupabaseUser();

    if (!user.value) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("settings")
      .eq("id", user.value.id)
      .single();

    if (error) throw error;

    return data.settings as Settings;
  };

  const updateSettings = async (settings: Settings) => {
    const user = useSupabaseUser();

    if (!user.value) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        settings: settings as Json,
      })
      .eq("id", user.value.id);

    if (error) throw error;
  };

  return {
    getSettings,
    updateSettings,
  };
});
