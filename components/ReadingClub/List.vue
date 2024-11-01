<script setup lang="ts">
import { ReadingClubsError } from "~/errors/readingClubs";

const { getPublicReadingClubs } = useReadingClubsStore();

const { getFromQueryParam, currentPage, getRange } = usePagination();
const { from, to } = getFromQueryParam();

const { data: readingClubs } = await useAsyncData(() =>
  getPublicReadingClubs(from, to)
);

watch(currentPage, async () => {
  try {
    const { from, to } = getRange(currentPage.value);

    readingClubs.value = await getPublicReadingClubs(from, to);
  } catch (err: any) {
    const error: ReadingClubsError = err;

    console.error(error.message);
  }
});
</script>

<template>
  <section v-if="readingClubs?.total" class="mt-4">
    <GothamPagination
      :current-page="currentPage"
      :total-items="readingClubs.total"
      @on-page-changed="(newPage) => (currentPage = newPage)"
    >
      <ReadingClubItem
        v-for="readingClub in readingClubs.results"
        :reading-club="readingClub"
      />
    </GothamPagination>
  </section>
  <section v-else>
    <p>No hemos encontrado ningún club de lectura público en este momento.</p>
  </section>
</template>
