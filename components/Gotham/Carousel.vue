<script setup lang="ts">
interface Props {
  align?: "start" | "center" | "end";
}

withDefaults(defineProps<Props>(), {
  align: "start",
});

const carouselAlignment = {
  start: "carousel-start",
  center: "carousel-center",
  end: "carousel-end",
};
</script>

<template>
  <div
    class="carousel max-w-md lg:max-w-full space-x-4"
    :class="[carouselAlignment[align]]"
  >
    <slot />
  </div>
</template>
