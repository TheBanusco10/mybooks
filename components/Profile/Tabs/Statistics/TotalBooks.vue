<script setup lang="ts">
const { getTotalBooksNumber } = useStatisticsStore();

const { data } = await useAsyncData("totalBooksNumber", () =>
  getTotalBooksNumber(),
);

if (!data.value) data.value = 0;
</script>

<template>
  <p class="font-bold">
    Nº total de libros
    <span class="ml-2 text-3xl font-thin italic">{{ data }}</span>
  </p>
</template>
