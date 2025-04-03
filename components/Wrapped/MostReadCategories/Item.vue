<script setup lang="ts">
import type { TopCategory } from "~/types/statistics";

interface Props {
  category: TopCategory;
  index: number;
}

defineProps<Props>();

const { getCategory } = useCategories();
</script>

<template>
  <li
    class="flex items-center gap-1 py-4 px-2 border-b-2 border-b-primary last:border-0"
  >
    {{ index + 1 }}.
    <Icon :name="getCategory(category.category).icon" />
    <span class="font-bold text-lg">{{
      getCategory(category.category).label
    }}</span>
    -
    <span class="text-sm italic">{{ category.count }} en total</span>
  </li>
</template>
