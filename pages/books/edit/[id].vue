<script setup lang="ts">
import { useBooksStore } from "~/stores/books";

const { t } = useI18n();

useHead({
  title: () => t("app.editBook"),
});

const { getBookById } = useBooksStore();

const route = useRoute();

const { data: book } = await useAsyncData(() =>
  getBookById(Number(route.params.id))
);

if (!book.value) {
  throw createError({
    statusCode: 404,
    message: "not found",
    fatal: true,
  });
}
</script>

<template>
  <main>
    <GothamContainer>
      <BooksFormEdit :book="book!" />
    </GothamContainer>
  </main>
</template>
