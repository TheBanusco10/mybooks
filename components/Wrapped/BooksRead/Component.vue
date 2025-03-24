<script setup lang="ts">
import type { BookRead } from "~/types/wrapped/booksRead";

const { getBooksRead } = useWrappedStore();

const NUMBER_OF_BOOKS_TO_DISPLAY = 20;

const { data } = useAsyncData("wrappedBooksRead", () => getBooksRead());

const booksRead = computed(() => data.value?.booksRead || []);

const firstFiveBooks = computed(() => {
  const books = booksRead.value;
  return books.slice(
    0,
    books.length > NUMBER_OF_BOOKS_TO_DISPLAY
      ? NUMBER_OF_BOOKS_TO_DISPLAY
      : books.length,
  );
});

const remainingBooks = ref<BookRead[]>([]);

if (booksRead.value.length > NUMBER_OF_BOOKS_TO_DISPLAY) {
  remainingBooks.value = booksRead.value.slice(NUMBER_OF_BOOKS_TO_DISPLAY);
}
</script>

<template>
  <div>
    <p class="text-center text-4xl mb-8">
      Has leído {{ booksRead.length }} libro(s) este año
    </p>
    <WrappedBooksReadList
      v-if="booksRead.length > 0"
      :firstFiveBooks="firstFiveBooks"
      :remainingBooks="remainingBooks"
    />
    <section v-else>
      <p>
        Parece que no has leído ningún libro este año, pero seguro que arrasarás
        en el siguiente
      </p>
    </section>
  </div>
</template>
