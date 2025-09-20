import type { Settings } from "~/types/settings";

export default async () => {
  const settings = useState<Settings | null>("settings", () => null);

  const { getSettings } = useSettingsStore();

  if (settings.value) return settings;

  settings.value = await getSettings();

  return settings;
};
