<script setup lang="ts">
import { FILTERS_FORM_ID } from "~/constants/filters";
import { FiltersError } from "~/errors/filters";
import { useFiltersStore } from "~/stores/filters";

const { filterBooksBySearch, resetFilteredBooks } = useFiltersStore();

const bookTitle = ref("");
const handleSearchBooks = useDebounce(async () => {
  try {
    if (!bookTitle.value || bookTitle.value.length < 2) {
      resetFilteredBooks(FILTERS_FORM_ID);

      return;
    }

    await filterBooksBySearch(bookTitle.value);
  } catch (err: any) {
    const error: FiltersError = err;

    console.error(error.message);
  }
}, 500);

watch(bookTitle, handleSearchBooks);
</script>

<template>
  <GothamSearchInput v-model="bookTitle" placeholder="Buscar por título..." />
</template>
