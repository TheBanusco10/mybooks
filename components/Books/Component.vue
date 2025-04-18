<script setup lang="ts">
import { BOOKS_RANGE_ERROR_CODE, type BooksError } from "~/errors/books";
import { useBooksStore } from "~/stores/books";
import { useFiltersStore } from "~/stores/filters";

const { getBooks } = useBooksStore();
const filtersStore = useFiltersStore();
const { filteredBooks } = storeToRefs(filtersStore);

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
    <GothamPagination
      v-if="books?.results.length"
      :current-page="currentPage"
      @on-page-changed="(newPage) => (currentPage = newPage)"
      :is-fetching="isFetching"
      :total-items="books?.total || 0"
    >
      <BooksList :books="books?.results" />
    </GothamPagination>
    <p v-else>
      {{ $t("app.libraryEmpty") }}
    </p>
  </section>
  <BooksSearchedComponent v-else />
</template>
