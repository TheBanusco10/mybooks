<script setup lang="ts">
import { useBooksStore } from "~/stores/books";

const { getBookById } = useBooksStore();
const route = useRoute();

const { data: book } = await useAsyncData(() =>
  getBookById(Number(route.params.id))
);

const { getCategory } = useCategories();
</script>

<template>
  <div>
    <GothamContainer class="flex flex-col lg:flex-row gap-4">
      <section class="flex-[10%]">
        <NuxtImg
          :src="book?.image_url || ''"
          width="160px"
          height="auto"
          class="object-cover rounded shadow w-40 h-auto max-h-64 mx-auto lg:ml-auto"
        />
        <p class="text-gray-500 text-center italic">
          {{ book?.author }}
        </p>
        <BooksCategoryBadgesList
          :categories="book?.categories || []"
          span-classes="badge-primary badge-outline"
          class="mt-2"
        />
      </section>
      <section class="flex-[90%]">
        <h1 class="text-3xl font-bold">{{ book?.title }}</h1>
        <p class="text-gray-700">
          {{ book?.description }}
        </p>
      </section>
    </GothamContainer>
  </div>
</template>
