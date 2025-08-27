<script setup lang="ts">
interface Props {
  tooltip: string;
}

defineProps<Props>();
</script>

<template>
  <div class="tooltip" :data-tip="tooltip">
    <slot />
  </div>
</template>
