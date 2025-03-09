<script setup lang="ts">
useHead({
  title: "Añadir libro",
});
</script>

<template>
  <main>
    <GothamContainer>
      <NuxtLink
        to="/templates"
        class="w-full md:w-fit md:mx-auto btn btn-primary btn-sm my-4"
      >
        <Icon name="mdi:book-plus" />
        Añadir desde plantilla
      </NuxtLink>
      <BooksFormAdd />
    </GothamContainer>
  </main>
</template>
