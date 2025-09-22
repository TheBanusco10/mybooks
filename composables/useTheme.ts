import { ThemeEnum } from "~/enums/ThemeEnum";
import { addYear } from "@formkit/tempo";
import { getRgbColorFromOklch } from "~/utils/cssVariables";

const DEFAULT_PRIMARY_COLOR = "#27cf80";

export default (t: any) => {
  const currentTheme = useState("currentTheme", () => ThemeEnum.DEFAULT);

  const currentPrimaryColor = useCookie("mybooks-primary-color", {
    default: () => DEFAULT_PRIMARY_COLOR,
    expires: addYear(new Date()),
  });

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

    console.log(getRgbColorFromOklch("--p"));

    setTimeout(() => {
      currentPrimaryColor.value =
        getRgbColorFromOklch("--p") || DEFAULT_PRIMARY_COLOR;
    }, 100);
  };

  return {
    currentTheme,
    currentPrimaryColor,
    changeTheme,
    themes,
  };
};
