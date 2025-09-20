import ApplyUserSettingsService from "~/services/settings/ApplyUserSettingsService";

export default defineNuxtPlugin({
  name: "apply-user-settings",
  async setup() {
    const { $i18n } = useNuxtApp();

    const theme = useTheme($i18n.t);
    const settings = await useSettings();

    await ApplyUserSettingsService.execute($i18n, settings, theme);
  },
});
