<script setup lang="ts">
const { getTopCategories } = useStatisticsStore();
const { data: categories } = await useAsyncData(() => getTopCategories());
</script>

<template>
  <GothamHeader label="Las categorías que te encantan" />
  <ProfileTabsStatisticsTopCategoriesItemsList
    v-if="!isEmpty(categories)"
    class="mt-4"
    :categories="categories!"
  />
  <p v-else>No hemos podido encontrar categorías.</p>
</template>
