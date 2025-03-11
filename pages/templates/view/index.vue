<script setup lang="ts">
import type { OpenLibraryBook } from "~/types/books";

const selectedBookTemplate = useState<OpenLibraryBook | null>(
  "selectedBookTemplate",
  () => null
);

if (!selectedBookTemplate || !selectedBookTemplate.value) {
  await navigateTo("/");
}
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
