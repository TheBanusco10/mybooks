export default () => {
  const currentTheme = useCookie("mybooks-theme", { default: () => "mybooks" });
  const themes = [
    {
      icon: "mdi:white-balance-sunny",
      value: "mybooks",
      label: "Claro",
    },
    {
      icon: "mdi:moon-waxing-crescent",
      value: "dark",
      label: "Oscuro",
    },
    {
      icon: "mingcute:pumpkin-lantern-fill",
      value: "halloween",
      label: "Halloween",
    },
    {
      icon: "famicons:rose-outline",
      value: "valentine",
      label: "San Valentín",
    },
    {
      icon: "lineicons:coffee-cup",
      value: "coffee",
      label: "Café",
    },
  ];

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
