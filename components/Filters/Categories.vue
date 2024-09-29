<script setup lang="ts">
import type { FilterComponentProps } from "~/types/filters";

defineProps<FilterComponentProps>();

const { categories } = useCategories();
const { selectedFilters } = useFiltersStore();
</script>

<template>
  <FormKit
    type="checkbox"
    :name="id"
    :options="categories"
    v-model="selectedFilters.categories"
  />
</template>
