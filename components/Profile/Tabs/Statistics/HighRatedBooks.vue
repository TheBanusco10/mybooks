<script setup lang="ts">
const { getHighRatedBooks } = useStatisticsStore();
const { data } = await useAsyncData("highRatedBooks", () =>
  getHighRatedBooks(),
);
</script>

<template>
  <GothamHeader>
    <template v-slot:content>
      <p class="text-2xl font-thin">
        Tus <span class="text-3xl font-bold">5</span> mejores libros
      </p>
    </template>
  </GothamHeader>
  <GothamCarousel v-if="!isEmpty(data)" align="center">
    <GothamCarouselItem v-for="book in data" :key="book.id">
      <BooksItem :book="book">
        <template v-slot:after>
          <p
            class="w-12 h-12 flex items-center justify-center text-white absolute bottom-2 right-2 bg-primary p-2 rounded-full text-2xl font-thin italic"
          >
            {{ book.score }}
          </p>
        </template>
      </BooksItem>
    </GothamCarouselItem>
  </GothamCarousel>
  <p v-else>No hemos podido encontrar ningún libro.</p>
</template>
