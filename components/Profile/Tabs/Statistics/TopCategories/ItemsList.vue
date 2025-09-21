<script setup lang="ts">
import type { TopCategory } from "~/types/statistics";

interface Props {
  categories: TopCategory[];
}

defineProps<Props>();
</script>

<template>
  <div
    class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 justify-center items-center lg:justify-start"
  >
    <ProfileTabsStatisticsTopCategoriesItem
      v-for="(category, index) in categories"
      :key="index"
      v-bind="category"
    />
  </div>
</template>
