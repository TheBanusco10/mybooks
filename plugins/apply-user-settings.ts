import { ThemeEnum } from "~/enums/ThemeEnum";
import { LocaleEnum } from "~/enums/LocaleEnum";

export default defineNuxtPlugin({
  name: "apply-user-settings",
  async setup() {
    const settings = await useSettings();

    if (!settings.value) return;

    const { $i18n } = useNuxtApp();

    $i18n.setLocale(settings.value.locale || LocaleEnum.DEFAULT);

    const { currentTheme } = useTheme($i18n.t);

    currentTheme.value = settings.value.theme || ThemeEnum.DEFAULT;
  },
});
