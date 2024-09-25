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
    class="w-36 h-full block relative rounded shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
  >
    <img
      class="w-36 h-52 md:w-40 md:h-60 object-cover"
      :src="book.image_url!"
      :alt="book.title!"
    />
    <BooksCoverInformation :status="book.status!" :type="book.type!" />
    <slot name="after" />
  </NuxtLink>
</template>
