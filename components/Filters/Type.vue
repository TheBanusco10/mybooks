<script setup lang="ts">
import useBookType from "../../composables/useBookType";

const { types } = useBookType();
const { selectedFilters } = useFiltersStore();
</script>

<template>
  <FormKit
    type="radio"
    name="type"
    :options="types"
    v-model="selectedFilters.type"
  />
</template>
