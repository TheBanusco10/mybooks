<script setup lang="ts">
import type { OpenLibraryBook } from "~/types/books";

interface Props {
  bookTemplates: OpenLibraryBook[];
}

defineProps<Props>();

const selectedBookTemplate = useState<OpenLibraryBook | null>(
  "selectedBookTemplate",
  () => null
);

const selectBookTemplate = async (book: OpenLibraryBook) => {
  selectedBookTemplate.value = book;

  await navigateTo("/templates/view");
};
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <TemplatesItem
      v-for="(book, index) in bookTemplates"
      :book-template="book"
      :key="index"
      @click="selectBookTemplate(book)"
    />
  </div>
</template>
