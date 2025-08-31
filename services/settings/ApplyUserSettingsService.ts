import { LocaleEnum } from "~/enums/LocaleEnum";
import { ThemeEnum } from "~/enums/ThemeEnum";

export default class ApplyUserSettingsService {
  static async execute(
    i18n: any,
    settings: Awaited<ReturnType<typeof useSettings>>,
    theme: ReturnType<typeof useTheme>
  ) {
    if (!settings.value) return;

    i18n.setLocale(settings.value.locale || LocaleEnum.DEFAULT);

    const { currentTheme } = theme;

    currentTheme.value = settings.value.theme || ThemeEnum.DEFAULT;
  }
}
