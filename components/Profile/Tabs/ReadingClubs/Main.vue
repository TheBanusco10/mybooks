<script setup lang="ts">
import type { ReadingClubsError } from "~/errors/readingClubs";

const { getUserReadingClubs } = useReadingClubsStore();

const { currentPage, getFromQueryParam, getRange } = usePagination();

const { from, to } = getFromQueryParam();

const { data: readingClubs } = await useAsyncData("readingClubs", () =>
  getUserReadingClubs(from, to)
);

watch(currentPage, async () => {
  try {
    const { from, to } = getRange(currentPage.value);

    readingClubs.value = await getUserReadingClubs(from, to);
  } catch (err: any) {
    const error: ReadingClubsError = err;

    console.error(error.message);
  }
});
</script>

<template>
  <section v-if="readingClubs?.total">
    <GothamPagination
      :current-page="currentPage"
      :total-items="readingClubs.total"
      @on-page-changed="(newPage) => (currentPage = newPage)"
    >
      <ReadingClubItem
        v-for="readingClub in readingClubs.results"
        :key="readingClub.id"
        :reading-club="readingClub"
      />
    </GothamPagination>
  </section>
</template>
