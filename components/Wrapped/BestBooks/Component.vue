<script setup lang="ts">
const { getBestBooks } = useWrappedStore();

const { data: bestBooks } = useAsyncData("wrappedBestBooks", () =>
  getBestBooks(),
);

// const topThreeBooks = computed(() => {
//   if (!bestBooks.value || bestBooks.value.length < 3) return [];
//   return bestBooks.value.slice(0, 3);
// });

// const remainingBooks = computed(() => {
//   if (!bestBooks.value) return [];
//   if (bestBooks.value.length > 0 && bestBooks.value.length < 3)
//     return bestBooks.value;
//   if (bestBooks.value.length > 3) return bestBooks.value.slice(3);
// });
</script>

<template>
  <div class="px-4">
    <p class="text-center text-4xl">Tus mejores libros de este año</p>
    <section class="flex flex-wrap justify-center gap-8 mt-8" v-if="bestBooks?.length">
      <WrappedBestBooksItem v-for="(book, index) in bestBooks" :book="book" :index="index + 1" :key="index">
        <template v-if="index === 0" v-slot:icon>
          <Icon
            name="mdi:star"
            class="absolute -right-6 -top-8 rotate-12 text-yellow-500"
            size="4rem"
          />
        </template>
      </WrappedBestBooksItem>
    </section>
  </div>
</template>
