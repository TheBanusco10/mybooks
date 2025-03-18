<script setup lang="ts">
const { getTotalReadPages } = useStatisticsStore();

const { data: totalPages } = await useAsyncData(() => getTotalReadPages());

const { formatNumber } = useFormatter();
</script>

<template>
  <p
    v-if="totalPages"
    v-html="
      $t('app.totalPagesRead', {
        count: `<span class='mx-1 text-2xl font-bold italic'>${formatNumber(
          totalPages.sum
        )}</span>`,
      })
    "
  ></p>
</template>
