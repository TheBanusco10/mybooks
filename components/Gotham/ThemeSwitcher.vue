<script setup lang="ts">
const { t } = useI18n();

const { currentTheme, themes, changeTheme } = useTheme(t);
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
        @click="changeTheme(theme.value)"
      >
        <Icon :name="theme.icon" />
      </button>
    </div>
  </section>
</template>
