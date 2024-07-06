<script setup lang="ts">
interface Props {
  items: string[];
}

defineProps<Props>();
</script>

<template>
  <ul class="flex gap-1">
    <li v-for="item in items" :key="item">
      <span class="badge badge-primary badge-outline badge-sm">
        {{ item }}
      </span>
    </li>
  </ul>
</template>
