<script setup lang="ts">
const score = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const { selectedFilters } = useFiltersStore();
</script>

<template>
  <FormKit
    type="radio"
    name="score"
    :options="score"
    v-model="selectedFilters.score"
  />
</template>
