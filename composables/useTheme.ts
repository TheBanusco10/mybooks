import { addYear } from "@formkit/tempo";

export default () => {
  const { t } = useI18n();

  const currentTheme = useCookie("mybooks-theme", {
    default: () => "mybooks",
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
