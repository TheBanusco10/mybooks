<script setup lang="ts">
useHead({
  titleTemplate: (title) => (!isEmpty(title) ? `${title} - Booksy` : "Booksy"),
});
</script>

<template>
  <GothamNavbar>
    <NuxtPage />
  </GothamNavbar>
</template>
