<script setup lang="ts">
import type { BookRead } from "~/types/wrapped/booksRead";

interface Props {
  book: BookRead;
}

defineProps<Props>();
</script>

<template>
  <NuxtImg
    class="w-36 h-52 md:w-40 md:h-60 object-cover rounded shadow-md"
    :key="book.id"
    :src="book.image_url"
    :alt="book.title"
    width="144px"
    height="208px"
    sizes="144px"
  />
</template>
