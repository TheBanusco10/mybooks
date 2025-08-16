import { ThemeEnum } from "~/enums/ThemeEnum";
import { LocaleEnum } from "~/enums/LocaleEnum";

export default defineNuxtPlugin({
  name: "apply-user-settings",
  async setup() {
    const { getSettings } = useSettingsStore();
    const settings = await getSettings();
    if (!settings) return;

    const { $i18n } = useNuxtApp();

    $i18n.setLocale(settings.locale || LocaleEnum.DEFAULT);

    const { currentTheme } = useTheme($i18n.t);

    currentTheme.value = settings.theme || ThemeEnum.DEFAULT;
  },
});
