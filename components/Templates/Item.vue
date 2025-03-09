<script setup lang="ts">
import type { OpenLibraryBook } from "~/types/books";

interface Props {
  bookTemplate: OpenLibraryBook;
}

defineProps<Props>();
</script>

<template>
  <article
    class="col-span-full md:col-span-1 flex rounded shadow overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300"
  >
    <NuxtImg
      class="w-24 h-36"
      :class="[bookTemplate.cover ? 'object-cover' : 'object-contain']"
      :src="bookTemplate.cover || '/images/no-cover.svg'"
      :alt="bookTemplate.title"
      width="96px"
      height="144px"
    />
    <div class="flex flex-col gap-1 px-4">
      <p class="pt-2 font-bold">
        {{ bookTemplate.title }}
        <span class="text-gray-500 italic text-xs font-normal">{{
          bookTemplate.author
        }}</span>
      </p>
      <p class="text-ellipsis overflow-hidden line-clamp-3 text-sm">
        {{ bookTemplate.description }}
      </p>
    </div>
  </article>
</template>
