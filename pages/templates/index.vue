<script setup lang="ts">
import { OpenLibraryRepositoryError } from "~/errors/services/books/openLibraryRepositoryError";
import OpenLibraryRepository from "~/services/books/OpenLibraryRepository";
import type { OpenLibraryBook } from "~/types/books";

const { t } = useI18n();

useHead({
  title: () => t("app.templates"),
});

const bookTitle = ref("");
const bookTemplates = ref<OpenLibraryBook[]>([]);
const isLoading = ref(false);
const errorMessage = ref("");

const getBooksByTitleDebounce = async () => {
  bookTemplates.value = [];
  errorMessage.value = "";

  if (!bookTitle.value || bookTitle.value.length < 2) return;

  isLoading.value = true;

  const res = await OpenLibraryRepository.getBooksByTitleThrottled(
    bookTitle.value
  );

  isLoading.value = false;

  // TODO: Find a way to translate errors
  if (res instanceof OpenLibraryRepositoryError) {
    console.error(res.message);
    errorMessage.value = t("errors.books.booksNotFound");
    return;
  }

  bookTemplates.value = res;
};

watch(bookTitle, useDebounce(getBooksByTitleDebounce, 500));
</script>

<template>
  <main>
    <GothamContainer>
      <GothamHeader :label="$t('app.templates')" />
      <p
        class="text-sm pt-2"
        v-html="
          $t('app.templatesHelp', {
            name: `<a class='link' href='https://openlibrary.org/' target='_blank'
          >OpenLibrary</a
        >`,
          })
        "
      ></p>
      <GothamSearchInput
        v-model="bookTitle"
        :placeholder="$t('app.searchByTitle')"
      />
      <section>
        <div class="text-center">
          <GothamLoading v-if="isLoading" size="lg" />
        </div>
        <TemplatesList
          v-if="!isLoading && bookTemplates.length"
          :book-templates="bookTemplates"
        />
        <p v-if="errorMessage">
          {{ errorMessage }}
        </p>
      </section>
    </GothamContainer>
  </main>
</template>
