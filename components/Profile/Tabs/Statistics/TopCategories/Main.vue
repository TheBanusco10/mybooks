<script setup lang="ts">
const { getTopCategories } = useStatisticsStore();
const { data: categories } = await useAsyncData(() => getTopCategories());
</script>

<template>
  <section v-if="categories">
    <GothamHeader label="Las categorías que te encantan" />
    <ProfileTabsStatisticsTopCategoriesItemsList
      class="mt-4"
      :categories="categories"
    />
  </section>
</template>
