<script setup lang="ts">
import { useBooksStore } from "~/stores/books";
import { useFiltersStore } from "~/stores/filters";

const { getBooks } = useBooksStore();
const { filteredBooks, selectedFilters } = storeToRefs(useFiltersStore());
const { getFilterLabel } = useBookFilters();

const { data: books } = await useAsyncData(() =>
  getBooks().catch(console.error)
);
</script>

<template>
  <section
    class="flex flex-wrap gap-4 justify-center md:justify-start"
    v-if="isNull(filteredBooks)"
  >
    <BooksItem v-for="book in books" :key="book.id" :book="book" />
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
