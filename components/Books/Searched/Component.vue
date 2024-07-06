<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";

const filtersStore = useFiltersStore();
const { filteredBooks, selectedFilters } = storeToRefs(filtersStore);
const { filterBooks } = filtersStore;

const { getFilterLabel } = useBookFilters();

const selectedFiltersLabels = computed(() =>
  selectedFilters.value.map((filterKey) => getFilterLabel(filterKey))
);

const { currentPage, getRange } = usePagination();

watch(currentPage, async () => {
  try {
    const { from, to } = getRange(currentPage.value);

    await filterBooks(from, to);
  } catch (err: any) {
    console.error(err.message);
  }
});
</script>

<template>
  <section class="flex flex-col gap-4">
    <div v-if="selectedFilters.length" class="flex gap-2">
      Buscando por:
      <GothamBadgeList :items="selectedFiltersLabels" />
    </div>
    <GothamPagination
      v-if="filteredBooks?.results.length || 0"
      :current-page="currentPage"
      @on-next-page="(newPage) => (currentPage = newPage)"
      @on-previous-page="(newPage) => (currentPage = newPage)"
      :is-fetching="false"
      :total-items="filteredBooks?.total || 0"
    >
      <BooksList :books="filteredBooks!.results" />
    </GothamPagination>
    <p v-else>No se encontraron libros</p>
  </section>
</template>
