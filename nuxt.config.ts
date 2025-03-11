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

  compatibilityDate: "2025-03-10",
});