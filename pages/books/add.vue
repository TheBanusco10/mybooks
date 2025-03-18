<script setup lang="ts">
const { t } = useI18n();

useHead({
  title: () => t("app.addBook"),
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
        {{ $t("app.addBookFromTemplate") }}
      </NuxtLink>
      <BooksFormAdd />
    </GothamContainer>
  </main>
</template>
