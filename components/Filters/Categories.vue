<script setup>
const { categories } = useCategories();
</script>

<template>
  <FormKit
    type="checkbox"
    name="categories"
    :options="categories"
    option-class="mb-1"
  />
</template>
