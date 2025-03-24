<script setup lang="ts">
const { getBestBooks } = useWrappedStore();

const { data: bestBooks } = useAsyncData("wrappedBestBooks", () =>
  getBestBooks(),
);
</script>

<template>
  <div>
    <p class="text-center text-4xl">Tus mejores libros de este año</p>
    <ul>
      <li v-for="book in bestBooks" :key="book.id">
        {{ book.score }}. {{ book.title }}
      </li>
    </ul>
  </div>
</template>
