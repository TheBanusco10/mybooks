<script setup lang="ts">
import type { FilterComponentProps } from "~/types/filters";

defineProps<FilterComponentProps>();

const { categories } = useCategories();
</script>

<template>
  <FormKit type="checkbox" :name="id" :options="categories" />
</template>
