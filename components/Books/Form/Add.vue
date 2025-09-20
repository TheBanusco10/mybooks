<script setup lang="ts">
import type { Category } from "~/types/category";
import type { Row } from "~/interfaces/database";
import type { BookFormInformationType } from "~/types/books";
import AchievementsService from "~/services/achievements/AchievementsService";

interface Props {
  book?: BookFormInformationType;
}

defineProps<Props>();

const selectedCategories = ref<Category[]>([]);
const { addBook } = useBooksStore();

const handleAddBook = async (values: Exclude<Row<"books">, "id">) => {
  try {
    values.categories = selectedCategories.value.map(
      (category) => category.value
    );

    values = useOmitBy(values, isEmpty) as Exclude<Row<"books">, "id">;

    await addBook(values);

    await AchievementsService.execute();

    await navigateTo("/");
  } catch (err: any) {
    console.error(err.message);
  }
};
</script>

<template>
  <BooksFormComponent
    :book="book"
    @on-form-submit="handleAddBook"
    v-model="selectedCategories"
    :submitLabel="$t('app.addBook')"
  />
</template>
