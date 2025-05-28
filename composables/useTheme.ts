import { addYear } from "@formkit/tempo";
import { getRgbColorFromOklch } from "~/utils/cssVariables";

const DEFAULT_PRIMARY_COLOR = "#27cf80";

export default () => {
  const { t } = useI18n();

  const currentTheme = useCookie("mybooks-theme", {
    default: () => "mybooks",
    expires: addYear(new Date()),
  });
  const currentPrimaryColor = useCookie("mybooks-primary-color", {
    default: () => DEFAULT_PRIMARY_COLOR,
    expires: addYear(new Date()),
  });

  const themes = computed(() => [
    {
      icon: "mdi:white-balance-sunny",
      value: "mybooks",
      label: t("themes.light"),
    },
    {
      icon: "mdi:moon-waxing-crescent",
      value: "dark",
      label: t("themes.dark"),
    },
    {
      icon: "mingcute:pumpkin-lantern-fill",
      value: "halloween",
      label: t("themes.halloween"),
    },
    {
      icon: "famicons:rose-outline",
      value: "valentine",
      label: t("themes.valentine"),
    },
    {
      icon: "lineicons:coffee-cup",
      value: "coffee",
      label: t("themes.coffee"),
    },
  ]);

  const changeTheme = (theme: string) => {
    currentTheme.value = theme;

    setTimeout(() => {
      currentPrimaryColor.value = getRgbColorFromOklch("--p") || DEFAULT_PRIMARY_COLOR;
    }, 100);
  };

  return {
    currentTheme,
    currentPrimaryColor,
    changeTheme,
    themes,
  };
};
