<script setup lang="ts">
const { getBestBooks } = useWrappedStore();

const { data: bestBooks } = useAsyncData("wrappedBestBooks", () =>
  getBestBooks(),
);

const topThreeBooks = computed(() => {
  if (!bestBooks.value || bestBooks.value.length < 3) return [];
  return bestBooks.value.slice(0, 3);
});

const remainingBooks = computed(() => {
  if (!bestBooks.value) return [];
  if (bestBooks.value.length > 0 && bestBooks.value.length < 3)
    return bestBooks.value;
  if (bestBooks.value.length > 3) return bestBooks.value.slice(3);
});
</script>

<template>
  <div>
    <p class="text-center text-4xl">Tus mejores libros de este año</p>
    <section class="grid grid-cols-3 mt-8" v-if="topThreeBooks.length">
      <div class="relative col-span-3 col-start-2 col-end-2">
        <WrappedBestBooksItem :book="topThreeBooks[0]" :index="1">
          <template v-slot:icon>
            <Icon
              name="mdi:crown"
              class="absolute -right-6 -top-8 rotate-12 text-yellow-500"
              size="4rem"
            />
          </template>
        </WrappedBestBooksItem>
      </div>
    </section>
    <section class="grid grid-cols-3 mt-4 px-4" v-if="topThreeBooks.length">
      <div class="relative col-span-1">
        <WrappedBestBooksItem :book="topThreeBooks[1]" :index="2" />
      </div>
      <div class="relative col-span-1"></div>
      <div class="relative col-span-1">
        <WrappedBestBooksItem :book="topThreeBooks[2]" :index="3" />
      </div>
    </section>
    <section
      v-if="remainingBooks && remainingBooks.length"
      class="grid grid-cols-3 gap-4 mt-4"
    >
      <article
        v-for="(book, index) in remainingBooks"
        :key="book.id"
        class="relative mx-2"
      >
        <WrappedBestBooksItem :book="book" :index="index + 4" />
      </article>
    </section>
  </div>
</template>
