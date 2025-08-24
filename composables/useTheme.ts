import { ThemeEnum } from "~/enums/ThemeEnum";

export default (t: any) => {
  const currentTheme = useState("currentTheme", () => ThemeEnum.DEFAULT);

  const themes = computed(() => [
    {
      icon: "mdi:white-balance-sunny",
      value: ThemeEnum.DEFAULT,
      label: t("themes.light"),
    },
    {
      icon: "mdi:moon-waxing-crescent",
      value: ThemeEnum.DARK,
      label: t("themes.dark"),
    },
    {
      icon: "mingcute:pumpkin-lantern-fill",
      value: ThemeEnum.HALLOWEEN,
      label: t("themes.halloween"),
    },
    {
      icon: "famicons:rose-outline",
      value: ThemeEnum.VALENTINE,
      label: t("themes.valentine"),
    },
    {
      icon: "lineicons:coffee-cup",
      value: ThemeEnum.COFFEE,
      label: t("themes.coffee"),
    },
  ]);

  const changeTheme = (theme: ThemeEnum) => {
    currentTheme.value = theme;

    const $html = document.querySelector("html");

    if (!$html) return;

    $html.setAttribute("data-theme", currentTheme.value);
  };

  return {
    currentTheme,
    changeTheme,
    themes,
  };
};
