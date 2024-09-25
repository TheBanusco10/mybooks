<script setup lang="ts">
import type { TopCategory } from "~/types/statistics";

interface Props {
  categories: TopCategory[];
}

defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-wrap gap-4 justify-center items-center lg:justify-start"
  >
    <ProfileTabsStatisticsTopCategoriesItem
      v-for="(category, index) in categories"
      :key="index"
      v-bind="category"
    />
  </div>
</template>
