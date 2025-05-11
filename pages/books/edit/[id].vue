<script setup lang="ts">
import type { Row } from "~/interfaces/database";
import { useBooksStore } from "~/stores/books";
import { type Category } from "~/types/category";

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

const { updateBook } = useBooksStore();
const selectedCategories = ref<Category[]>([]);

const handleUpdateBook = async (values: Exclude<Row<"books">, "id">) => {
  try {
    values.categories = selectedCategories.value.map(
      (category) => category.value
    );

    if (isEmpty(values.end_date)) {
      values.end_date = null;
    }

    await updateBook(book.value!.id, values);

    await navigateTo(`/books/${book.value!.id}`);
  } catch (err: any) {
    console.error(err.message);
  }
};
</script>

<template>
  <main>
    <GothamContainer>
      <BooksFormComponent :book="book!" @on-form-submit="handleUpdateBook" v-model="selectedCategories" :submitLabel="$t('app.editBook')" />
    </GothamContainer>
  </main>
</template>
