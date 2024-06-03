<script setup lang="ts">
interface Props {
  categories: string[];
  spanClasses?: string;
}

defineProps<Props>();

const { getCategory } = useCategories();
</script>

<template>
  <ul v-if="categories.length > 0" class="flex flex-wrap gap-1">
    <li v-for="category in categories">
      <span class="badge badge-primary badge-outline" :class="spanClasses">
        {{ getCategory(category)?.label }}
      </span>
    </li>
  </ul>
</template>
