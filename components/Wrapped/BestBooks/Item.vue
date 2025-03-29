<script setup lang="ts">
import type { BestBook } from "~/types/wrapped/books";

const props = defineProps<{
  book: BestBook;
  index: number;
}>();
</script>

<template>
  <p
    class="absolute -top-2 -left-2 flex justify-center items-center p-1 bg-primary text-primary-content w-8 h-8 rounded-full text-lg"
  >
    {{ index }}
  </p>
  <slot name="icon" />
  <img :src="book.image_url!" :alt="book.title!" class="w-28 rounded" />
</template>
