<script setup lang="ts">
const { getTotalBooksNumber } = useStatisticsStore();

const { data } = await useAsyncData("totalBooksNumber", () =>
  getTotalBooksNumber()
);

if (!data.value) data.value = 0;
</script>

<template>
  <p>
    {{ $t("app.totalBooks") }}
    <span class="ml-1 text-2xl font-bold italic">{{ data }}</span>
  </p>
</template>
