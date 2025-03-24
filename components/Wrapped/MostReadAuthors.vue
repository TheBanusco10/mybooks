<script setup lang="ts">
const { getMostReadAuthors } = useWrappedStore();

const { data: mostReadAuthors } = useAsyncData(
  "wrappedMostReadCategories",
  () => getMostReadAuthors(),
);

const totalAuthors = mostReadAuthors.value?.length || 0;
</script>

<template>
  <div>
    <p class="text-center text-4xl">Tus autores más leídos</p>
    <ul>
      <li v-for="({ author }, index) in mostReadAuthors" :key="index">
        {{ index + 1 }}. {{ author }}
      </li>
    </ul>
    <p>Has leído {{ totalAuthors }} autor(es) en total este año</p>
  </div>
</template>
