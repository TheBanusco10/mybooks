<script setup lang="ts">
import { BOOKS_RANGE_ERROR_CODE, type BooksError } from "~/errors/books";
import { useBooksStore } from "~/stores/books";
import { useFiltersStore } from "~/stores/filters";

const { getBooks } = useBooksStore();
const filtersStore = useFiltersStore();
const { filteredBooks } = storeToRefs(filtersStore);

const { currentPage, getRange, getFromQueryParam } = usePagination();

const { from, to } = getFromQueryParam();
const { data: books, status } = useAsyncData(() =>
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
      :current-page="currentPage"
      @on-page-changed="(newPage) => (currentPage = newPage)"
      :is-fetching="isFetching || status === 'pending'"
      :total-items="books?.total || 0"
    >
      <BooksList :books="books!.results" />
      <!-- Fetching skeleton -->
      <template v-slot:fetching>
        <section class="flex flex-wrap gap-4 justify-center">
          <article
            v-for="index in 4"
            :key="index"
            class="skeleton w-36 h-52 md:w-40 md:h-60"
          ></article>
        </section>
      </template>
    </GothamPagination>
    <p v-if="!books?.total && status === 'success'">
      {{ $t("app.libraryEmpty") }}
    </p>
  </section>
  <BooksSearchedComponent v-else />
</template>
