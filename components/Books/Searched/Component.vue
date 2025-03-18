<script setup lang="ts">
import { useFiltersStore } from "~/stores/filters";

const filtersStore = useFiltersStore();
const { filteredBooks, appliedFiltersLabels } = storeToRefs(filtersStore);
const { filterBooks } = filtersStore;

const { currentPage, getRange } = usePagination();

const isFetching = ref(false);

watch(currentPage, async () => {
  try {
    const { from, to } = getRange(currentPage.value);

    isFetching.value = true;

    await filterBooks(from, to);
  } catch (err: any) {
    console.error(err.message);
  } finally {
    isFetching.value = false;
  }
});
</script>

<template>
  <section class="flex flex-col gap-4">
    <div v-if="appliedFiltersLabels.length" class="flex gap-2">
      {{ $t("app.searching_by") }}:
      <GothamBadgeList :items="appliedFiltersLabels" />
    </div>
    <GothamPagination
      v-if="filteredBooks?.results.length || 0"
      :current-page="currentPage"
      @on-page-changed="(newPage) => (currentPage = newPage)"
      :is-fetching="isFetching"
      :total-items="filteredBooks?.total || 0"
    >
      <BooksList :books="filteredBooks!.results" />
    </GothamPagination>
    <p v-else>No se encontraron libros</p>
  </section>
</template>
