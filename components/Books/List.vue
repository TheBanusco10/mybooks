<script setup lang="ts">
import { BOOKS_RANGE_ERROR_CODE, type BooksError } from "~/errors/books";
import { useBooksStore } from "~/stores/books";
import { useFiltersStore } from "~/stores/filters";

const { getBooks } = useBooksStore();
const { filteredBooks, selectedFilters } = storeToRefs(useFiltersStore());
const { getFilterLabel } = useBookFilters();

const { currentPage, getRange, getFromQueryParam } = usePagination();

const { from, to } = getFromQueryParam();
const { data: books } = await useAsyncData(() =>
  getBooks(from, to).catch(async (error: BooksError) => {
    if (error.code === BOOKS_RANGE_ERROR_CODE) {
      currentPage.value = DEFAULT_PAGE;
    }
  })
);

const isFetching = ref(false);

watch(currentPage, async () => {
  const { from, to } = getRange(currentPage.value);

  try {
    isFetching.value = true;
    books.value = await getBooks(from, to);
  } catch (err: any) {
    console.error(err.message);
  } finally {
    isFetching.value = false;
  }
});
</script>

<template>
  <section v-if="isNull(filteredBooks)">
    <div v-if="books?.results.length" class="flex flex-col gap-8">
      <div class="flex flex-wrap gap-4 justify-center md:justify-start">
        <BooksItem v-for="book in books.results" :key="book.id" :book="book" />
      </div>
      <GothamPagination
        :current-page="currentPage"
        @on-next-page="(newPage) => (currentPage = newPage)"
        @on-previous-page="(newPage) => (currentPage = newPage)"
        :is-fetching="isFetching"
        :total-items="books?.total || 0"
      />
    </div>
    <p v-else>Aún no tienes ningún libro en tu biblioteca</p>
  </section>
  <section class="flex flex-col gap-4" v-else>
    <div v-if="selectedFilters.length" class="flex gap-2">
      Buscando por:
      <ul>
        <li v-for="filter in selectedFilters" :key="filter">
          <span class="badge badge-primary badge-outline badge-sm">
            {{ getFilterLabel(filter) }}
          </span>
        </li>
      </ul>
    </div>
    <div class="flex flex-wrap gap-4 justify-center md:justify-start">
      <BooksItem
        v-if="filteredBooks.length"
        v-for="book in filteredBooks"
        :key="book.id"
        :book="book"
      />
      <p v-else>No se encontraron libros</p>
    </div>
  </section>
</template>
