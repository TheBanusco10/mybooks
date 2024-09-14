<script setup>
const { categories } = useCategories();
</script>

<template>
  <FormKit type="checkbox" name="categories" :options="categories" />
</template>
