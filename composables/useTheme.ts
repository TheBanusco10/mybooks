export default () => {
  const currentTheme = useCookie("mybooks-theme", { default: () => "custom" });

  const changeTheme = (theme: string) => {
    currentTheme.value = theme;

    const $html = document.querySelector("html");

    if (!$html) return;

    $html.setAttribute("data-theme", currentTheme.value);
  };

  return {
    currentTheme,
    changeTheme,
  };
};
