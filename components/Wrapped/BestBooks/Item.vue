<script setup lang="ts">
import type { BestBook } from "~/types/wrapped/books";

interface Props {
  book: BestBook;
  index: number;
}

defineProps<Props>();
</script>

<template>
  <article class="relative">
    <p
      class="absolute -bottom-2 -right-2 flex justify-center items-center p-5 bg-primary text-primary-content w-8 h-8 rounded-full text-2xl italic font-thin"
    >
      {{ index }}
    </p>
    <slot name="icon" />
    <img :src="book.image_url!" :alt="book.title!" class="w-28 h-full object-cover rounded" />
  </article>
</template>
