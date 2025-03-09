<script setup lang="ts">
import type { OpenLibraryBook } from "~/types/books";

const selectedBookTemplate = useState<OpenLibraryBook | null>(
  "selectedBookTemplate",
  () => null
);

if (!selectedBookTemplate || !selectedBookTemplate.value) {
  await navigateTo("/");
}

console.log(selectedBookTemplate.value);
</script>

<template>
  <main>
    <GothamContainer>
      <BooksFormAdd
        :cover="selectedBookTemplate?.cover || ''"
        :author="selectedBookTemplate?.author"
        :title="selectedBookTemplate?.title"
        :description="selectedBookTemplate?.description"
      />
    </GothamContainer>
  </main>
</template>
