<script setup lang="ts">
useHead({
  title: "Biblioteca",
});
</script>

<template>
  <main>
    <GothamContainer>
      <p class="text-3xl">Tus libros</p>
      <section class="flex justify-between items-center">
        <NuxtLink to="/books/add" class="btn btn-primary btn-sm my-4">
          <Icon name="mdi:book-plus" />
          Añadir libro
        </NuxtLink>
        <GothamFilters />
      </section>
      <FiltersSearch />
      <BooksComponent />
    </GothamContainer>
  </main>
</template>
