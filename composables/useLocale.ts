// https://nuxt.com/docs/examples/advanced/locale
export default () => {
  const locale = ref("en-EN");

  if (process.server) {
    const reqLocale = useRequestHeaders()["accept-language"]?.split(",")[0];
    if (reqLocale) {
      locale.value = reqLocale;
    }
  } else if (process.client) {
    const navLang = navigator.language;
    if (navLang) {
      locale.value = navLang;
    }
  }

  return locale;
};
