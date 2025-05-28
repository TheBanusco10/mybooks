// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@nuxtjs/supabase",
    "nuxt-icon",
    "@pinia/nuxt",
    "nuxt-lodash",
    "@nuxt/image",
    "@nuxtjs/i18n",
    // "@vite-pwa/nuxt",
  ],

  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },

  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/login/confirm"],
    },
  },

  runtimeConfig: {
    public: {
      appVersion: process.env.npm_package_version,
    },
  },

  tailwindcss: {
    cssPath: ["~/public/css/index.css", { injectPosition: "first" }],
  },

  i18n: {
    locales: [
      { code: "es", language: "es-ES", name: "Español", file: "es-ES.ts" },
      { code: "en", language: "en-US", name: "English", file: "en-US.ts" },
      { code: "fr", language: "fr-FR", name: "Français", file: "fr-FR.ts" },
      { code: "pt", language: "pt-PT", name: "Português", file: "pt-PT.ts" },
    ],
    defaultLocale: "es",
    lazy: true,
    strategy: "no_prefix",
  },

  pwa: {
    devOptions: {
      enabled: false,
    },
  },

  compatibilityDate: "2025-03-10",
});