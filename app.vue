<script setup lang="ts">
const { currentTheme } = useTheme();
const config = useRuntimeConfig();

useHead({
  titleTemplate: (title) =>
    !isEmpty(title) ? `${title} - MyBooks` : "MyBooks",
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: `/site.webmanifest?v=${config.public.appVersion}` },
    { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
  ],
  meta: [
    { name: "apple-mobile-web-app-title", content: "MyBooks" },
    { name: "application-name", content: "MyBooks" },
    { name: "msapplication-TileColor", content: "#da532c" },
    { name: "theme-color", content: "#ffffff" },
  ],
  htmlAttrs: {
    "data-theme": () => currentTheme.value,
  },
});
</script>

<template>
  <GothamNavbar>
    <NuxtPage />
  </GothamNavbar>
</template>
