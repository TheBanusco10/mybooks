// formkit.config.ts
import { defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { es } from "@formkit/i18n";
import theme from "./formkit-theme.js";
import { addAsteriskPlugin } from "./formkit/plugins/addAsterisks.js";

export default defaultConfig({
  config: {
    classes: generateClasses(theme),
  },
  plugins: [addAsteriskPlugin],
  locales: { es },
  locale: "es",
});
