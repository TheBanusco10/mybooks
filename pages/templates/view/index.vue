<script setup lang="ts">
import OpenLibraryMapper from "~/services/books/OpenLibraryMapper";
import type { OpenLibraryBook } from "~/types/books";

const selectedBookTemplate = useState<OpenLibraryBook | null>(
  "selectedBookTemplate",
  () => null
);

if (!selectedBookTemplate || !selectedBookTemplate.value) {
  await navigateTo("/");
}

const mappedBook = OpenLibraryMapper.map(selectedBookTemplate.value!);
</script>

<template>
  <main>
    <GothamContainer>
      <BooksFormAdd
        :book="mappedBook"
      />
    </GothamContainer>
  </main>
</template>
