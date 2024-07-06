<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  books: Row<"books">[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center md:justify-start">
    <BooksItem v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>
