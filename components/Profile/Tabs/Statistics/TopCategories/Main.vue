<script setup lang="ts">
const { getTopCategories } = useStatisticsStore();
const { data: categories } = await useAsyncData(() => getTopCategories());
</script>

<template>
  <GothamHeader :label="$t('app.favoriteCategories')" />
  <ProfileTabsStatisticsTopCategoriesItemsList
    v-if="!isEmpty(categories)"
    class="mt-4"
    :categories="categories!"
  />
  <p v-else>
    {{ $t("errors.categories.categoriesNotFound") }}
  </p>
</template>
