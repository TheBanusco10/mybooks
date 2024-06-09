<script setup lang="ts">
import { useBooksStore } from "~/stores/books";
import { useFiltersStore } from "~/stores/filters";

const { getBooks } = useBooksStore();
const { filteredBooks } = storeToRefs(useFiltersStore());

const { data: books } = await useAsyncData(() =>
  getBooks().catch(console.error)
);
</script>

<template>
  <section
    class="flex flex-wrap gap-4 justify-center md:justify-start"
    v-if="!filteredBooks.length"
  >
    <BooksItem v-for="book in books" :key="book.id" :book="book" />
  </section>
  <section class="flex flex-wrap gap-4 justify-center md:justify-start" v-else>
    <BooksItem v-for="book in filteredBooks" :key="book.id" :book="book" />
  </section>
</template>
