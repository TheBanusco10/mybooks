<script setup lang="ts">
interface Props {
  label?: string;
}

defineProps<Props>();

const slots = useSlots();

const borderClass =
  "before:absolute before:bottom-0 before:content before:h-1 before:bg-primary before:rounded-full before:w-1/2";
</script>

<template>
  <div class="relative w-fit pb-2" :class="borderClass">
    <slot v-if="slots.content" name="content" />
    <p v-else class="text-2xl font-thin" :class="borderClass">
      {{ label }}
    </p>
  </div>
</template>
