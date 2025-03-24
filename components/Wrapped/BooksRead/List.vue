<script setup lang="ts">
import { WrappedBooksReadItem } from "#components";
import type { BookRead } from "~/types/wrapped/booksRead";

interface Props {
  firstFiveBooks: BookRead[];
  remainingBooks: BookRead[];
}

defineProps<Props>();

const showMore = ref(false);
</script>

<template>
  <section>
    <div class="flex gap-4 flex-wrap justify-center">
      <WrappedBooksReadItem
        v-for="book in firstFiveBooks"
        :key="book.id"
        :book="book"
      />
      <WrappedBooksReadItem
        v-if="showMore"
        v-for="book in remainingBooks"
        :key="book.id"
        :book="book"
        class="animate__animated animate__fadeIn"
      />
    </div>
    <div
      v-if="remainingBooks.length > 0"
      class="text-center my-4"
      v-show="!showMore"
    >
      <button class="btn btn-neutral btn-wide" @click="showMore = true">
        Ver todo
      </button>
    </div>
  </section>
</template>
