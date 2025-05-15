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
        <GothamFloatButton button-type="link" button-position="bottom-right" to="/books/add" class="md:btn-sm md:my-4">
          <template v-slot:icon>
            <Icon name="mdi:book-plus" />
          </template>
          <template v-slot:label>
            {{ $t("app.addBook") }}
          </template>
        </GothamFloatButton>
        <GothamFilters class="hidden md:block" />
      </section>
      <section class="flex flex-wrap justify-end items-center gap-x-4 mb-4 md:mb-0 md:flex-row">
        <FiltersSearch class="flex-1" />
        <GothamFilters class="block md:hidden" />
      </section>
      <BooksComponent />
    </GothamContainer>
  </main>
</template>
