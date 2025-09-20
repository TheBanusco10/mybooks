import { LocaleEnum } from "~/enums/LocaleEnum";
import { ThemeEnum } from "~/enums/ThemeEnum";

export default async (i18n: any) => {
  const settings = await useSettings();

  if (!settings.value) return;

  const { currentTheme } = useTheme(i18n.t);

  i18n.setLocale(settings.value.locale || LocaleEnum.DEFAULT);

  currentTheme.value = settings.value.theme || ThemeEnum.DEFAULT;
};
