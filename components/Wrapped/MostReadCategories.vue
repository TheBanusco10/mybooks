<script setup lang="ts">
const { getMostReadCategories } = useWrappedStore();

const { data: mostReadCategories } = useAsyncData(
  "wrappedMostReadCategories",
  () => getMostReadCategories(),
);

const { getCategory } = useCategories();

const totalCategories = computed(() => mostReadCategories.value?.length || 0);
</script>

<template>
  <div>
    <p class="text-center text-4xl">Tus categorías más leídas</p>
    <ul>
      <li v-for="{ category, count } in mostReadCategories" :key="category">
        {{ count }}. {{ getCategory(category).label }}
      </li>
    </ul>
    <p>Has leído {{ totalCategories }} categoría(s) en total este año</p>
  </div>
</template>
