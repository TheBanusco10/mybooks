<script setup lang="ts">
import { useBooksStore } from "~/stores/books";

const { getBooks } = useBooksStore();

const { data: books } = await useAsyncData(() =>
  getBooks().catch(console.error)
);
</script>

<template>
  <section class="flex flex-wrap gap-4 justify-center md:justify-start">
    <BooksItem v-for="book in books" :key="book.id" :book="book" />
  </section>
</template>
