<script setup lang="ts">
import type { TopCategory } from "~/types/statistics";

interface Props {
  categories: TopCategory[];
}

defineProps<Props>();
</script>
<template>
  <ul class="shadow-md bg-base-100/50 rounded my-4">
    <WrappedMostReadCategoriesItem
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
      :index="index"
    />
  </ul>
</template>
