<script setup lang="ts">
import type { ThemeEnum } from "~/enums/ThemeEnum";
import type { SettingsError } from "~/errors/settings";

const { t } = useI18n();

const { currentTheme, themes, changeTheme } = useTheme(t);
const { updateSettings } = useSettingsStore();

const handleUpdateTheme = async (newTheme: ThemeEnum) => {
  try {
    changeTheme(newTheme);

    await updateSettings({
      theme: newTheme,
    });
  } catch (err: any) {
    const error: SettingsError = err;

    console.error(error.message);
  }
};
</script>

<template>
  <section class="flex flex-row flex-wrap gap-4 justify-center">
    <div
      class="tooltip tooltip-left"
      v-for="(theme, index) in themes"
      :key="theme.value"
      :data-tip="theme.label"
      :class="{ 'tooltip-right': index === 0 }"
    >
      <button
        class="btn btn-circle btn-sm"
        :class="{ 'bg-base-100': currentTheme === theme.value }"
        @click="handleUpdateTheme(theme.value)"
      >
        <Icon :name="theme.icon" />
      </button>
    </div>
  </section>
</template>
