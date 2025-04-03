<script setup lang="ts">
const { getMostReadCategories } = useWrappedStore();

const { data: mostReadCategories, error } = useAsyncData(
  "wrappedMostReadCategories",
  () => getMostReadCategories(),
);

if (error.value) {
  console.error(error.value);
}

const totalCategories = computed(() => mostReadCategories.value?.length || 0);
</script>

<template>
  <div class="">
    <p class="text-center text-4xl">Tus categorías más leídas</p>
    <WrappedMostReadCategoriesList
      v-if="mostReadCategories?.length"
      :categories="mostReadCategories"
    />
    <p class="text-center">
      Has leído
      <span class="font-bold text-xl italic">{{ totalCategories }}</span>
      categoría(s) diferente(s) en total este año
    </p>
  </div>
</template>
