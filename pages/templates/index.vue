<script setup lang="ts">
import { OpenLibraryRepositoryError } from "~/errors/services/books/openLibraryRepositoryError";
import OpenLibraryRepository from "~/services/books/OpenLibraryRepository";
import type { OpenLibraryBook } from "~/types/books";

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

  if (res instanceof OpenLibraryRepositoryError) {
    console.error(res.message);
    errorMessage.value = res.message;
    return;
  }

  bookTemplates.value = res;
};

watch(bookTitle, useDebounce(getBooksByTitleDebounce, 500));
</script>

<template>
  <main>
    <GothamContainer>
      <GothamHeader label="Plantillas" />
      <p class="text-sm pt-2">
        Use la API de
        <a class="link" href="https://openlibrary.org/" target="_blank"
          >OpenLibrary</a
        >
        para buscar un libro y autorellenar su información. Es posible que
        algunos campos no estén completos o que no obtenga los resultados
        esperados para su búsqueda.
      </p>
      <GothamSearchInput v-model="bookTitle" placeholder="Título del libro" />
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
