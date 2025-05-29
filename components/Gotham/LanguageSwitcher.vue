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
  <div class="w-full dropdown dropdown-hover dropdown-top">
    <div
      tabindex="0"
      role="button"
      class="w-full btn bg-base-300 mt-2 justify-start"
    >
      {{ $t("app.language") }}: {{ currentLocale.toLocaleUpperCase() }}
    </div>
    <ul
      tabindex="0"
      class="w-full dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow gap-2"
    >
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
  </div>
</template>
