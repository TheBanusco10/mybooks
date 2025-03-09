<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  books: Row<"books">[];
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-wrap gap-4 justify-center">
    <BooksItem v-for="(book, index) in books" :key="book.id" :book="book" />
  </div>
</template>
