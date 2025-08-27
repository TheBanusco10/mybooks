<script setup lang="ts">
interface Props {
  tooltip: string;
}

defineProps<Props>();
</script>

<template>
  <div class="tooltip before:z-[999]" :data-tip="tooltip">
    <slot />
  </div>
</template>
