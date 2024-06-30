<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  book: Row<"books">;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="{ name: 'books-id', params: { id: book.id } }"
    class="relative rounded shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
  >
    <img
      class="w-40 h-60 object-cover"
      :src="book.image_url!"
      :alt="book.title!"
    />
    {{ book.title }}
    <BooksCoverInformation :status="book.status!" :type="book.type!" />
  </NuxtLink>
</template>
