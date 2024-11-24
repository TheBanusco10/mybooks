// formkit.config.ts
import { defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { es } from "@formkit/i18n";
import theme from "./formkit-theme.js";
import { addAsteriskPlugin } from "./formkit/plugins/addAsterisks.js";
import { createProPlugin, toggle } from "@formkit/pro";

const proPlugin = createProPlugin("fk-7836483c4de", {
  toggle,
});

export default defaultConfig({
  config: {
    classes: generateClasses(theme),
  },
  plugins: [addAsteriskPlugin, proPlugin],
  locales: { es },
  locale: "es",
});
