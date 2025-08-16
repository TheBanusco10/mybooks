<script setup lang="ts">
import type { LocaleEnum } from "~/enums/LocaleEnum";
import type { SettingsError } from "~/errors/settings";

const { locales, setLocale, locale: currentLocale } = useI18n();
const { updateSettings } = useSettingsStore();

const handleUpdateLocale = async (newLocale: LocaleEnum) => {
  try {
    setLocale(newLocale);

    await updateSettings({
      locale: newLocale,
    });
  } catch (err: any) {
    const error: SettingsError = err;

    console.error(error.message);
  }
};
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
      <li
        v-for="locale in locales"
        @click="handleUpdateLocale(locale.code as LocaleEnum)"
      >
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
