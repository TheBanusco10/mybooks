<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  book: Row<"books">;
}

defineProps<Props>();
</script>

<template>
  <NuxtLink
    :to="{ name: 'books-id', params: { id: 22 } }"
    class="w-36 h-full block relative rounded shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
  >
    <NuxtImg
      class="w-36 h-52 md:w-40 md:h-60 object-cover"
      :src="book.image_url!"
      :alt="book.title!"
      width="144px"
      height="208px"
      sizes="144px"
    />
    <BooksCoverInformation :status="book.status!" :type="book.type!" />
    <slot name="after" />
  </NuxtLink>
</template>
