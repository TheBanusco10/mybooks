<script setup lang="ts">
interface Props {
  category: string;
  count: number;
}

defineProps<Props>();

const { getCategory } = useCategories();
</script>

<template>
  <NuxtLink
    :to="{
      path: '/',
      query: {
        categories: category,
      },
    }"
    class="relative flex items-center justify-center w-auto min-w-40 h-24 rounded p-2 before:content before:absolute before:bottom-0 before:left-0 before:bg-primary before:h-0 before:w-full overflow-hidden hover:before:h-full before:transition-all before:duration-200 hover:text-white transition-all duration-200"
  >
    <span class="relative text-8xl font-thin opacity-20 font-outline">
      {{ count }}
    </span>
    <span class="absolute text-2xl z-10 text-center">
      {{ getCategory(category).label }}
    </span>
  </NuxtLink>
</template>
