<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: () => t("app.library"),
});
</script>

<template>
  <main>
    <GothamContainer>
      <p class="text-3xl">
        {{ $t("app.yourBooks") }}
      </p>
      <section class="flex justify-between items-center">
        <NuxtLink to="/books/add" class="btn btn-primary btn-sm my-4">
          <Icon name="mdi:book-plus" />
          {{ $t("app.addBook") }}
        </NuxtLink>
        <GothamFilters />
      </section>
      <FiltersSearch />
      <BooksComponent />
    </GothamContainer>
  </main>
</template>
