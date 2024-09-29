<script setup lang="ts">
const { statuses } = useBookStatus();
const { selectedFilters } = useFiltersStore();
</script>

<template>
  <FormKit
    type="radio"
    name="status"
    :options="statuses"
    v-model="selectedFilters.status"
  />
</template>
