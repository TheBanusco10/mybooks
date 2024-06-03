<script setup lang="ts">
import type { Row } from "~/interfaces/database";

interface Props {
  book: Row<"books">;
}

defineProps<Props>();

const { getTypeIcon } = useBookType();
const { getStatusBackgroundColor } = useBookStatus();
</script>

<template>
  <NuxtLink
    :to="{ name: 'books-id', params: { id: book.id } }"
    class="relative rounded shadow overflow-hidden hover:shadow-md transition-shadow"
  >
    <img
      class="w-40 h-auto object-cover"
      :src="book.image_url!"
      :alt="book.title!"
    />
    <div
      class="absolute top-0 right-0 flex justify-between w-full items-center pt-1 px-2"
    >
      <div
        class="w-3 h-3 rounded-full"
        :class="`${getStatusBackgroundColor(book.status!)}`"
      ></div>
      <Icon :name="getTypeIcon(book.type!)" class="w-6 h-6 text-white" />
    </div>
  </NuxtLink>
</template>
