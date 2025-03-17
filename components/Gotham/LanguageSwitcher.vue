<script setup lang="ts">
const { locales, setLocale, locale: currentLocale } = useI18n();

const localeIconsMapping = {
  es: {
    icon: "material-symbols-light:language-spanish-rounded",
    isIcon: true,
  },
  en: {
    icon: "material-symbols-light:language-gb-english-rounded",
    isIcon: true,
  },
  fr: {
    icon: "material-symbols-light:language-french-rounded",
    isIcon: true,
  },
  pt: {
    icon: "PT",
    isIcon: false,
  },
};

const localesInformation = locales.value.map((locale) => {
  return {
    ...locale,
    iconData: localeIconsMapping[locale.code],
  };
});
</script>

<template>
  <ul class="flex flex-wrap gap-2 items-center">
    <li v-for="locale in locales" @click="setLocale(locale.code)">
      <p
        class="font-thin"
        :class="{
          'bg-base-300': locale.code === currentLocale,
        }"
      >
        {{ locale.name }}
      </p>
    </li>
  </ul>
</template>
