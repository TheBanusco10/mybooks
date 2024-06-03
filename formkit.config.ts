// formkit.config.ts
import { defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import { es } from "@formkit/i18n";
import theme from "./formkit-theme.js";

export default defaultConfig({
  config: {
    classes: generateClasses(theme),
  },
  locales: { es },
  locale: "es",
});
