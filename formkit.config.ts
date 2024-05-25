// formkit.config.ts
import { defaultConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import theme from "./formkit-theme.js";

export default defaultConfig({
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(theme),
  },
});
