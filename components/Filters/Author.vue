<script setup lang="ts">
import { FILTER_AUTHOR_ID } from "~/types/filters";
const { getDistinctAuthors } = useAuthorsStore();
const { data: authors } = await useAsyncData(() => getDistinctAuthors());
</script>

<template>
  <FormKit
    v-if="authors"
    type="checkbox"
    :name="FILTER_AUTHOR_ID"
    :options="authors.map(({ author }) => author)"
  />
</template>
