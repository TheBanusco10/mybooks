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

const carouselContainerRef = useTemplateRef("carousel-container");

const showLeftFade = ref(false);
const showRightFade = ref(false);

const checkOverflow = () => {
  if (!carouselContainerRef.value) return;

  const container = carouselContainerRef.value;
  const scrollLeft = container.scrollLeft;
  const scrollWidth = container.scrollWidth;
  const clientWidth = container.clientWidth;

  showLeftFade.value = scrollLeft > 0;

  showRightFade.value = scrollLeft < scrollWidth - clientWidth;
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (carouselContainerRef.value) {
    checkOverflow();

    carouselContainerRef.value.addEventListener("scroll", checkOverflow);

    // If container is resized, check overflow
    resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });
    resizeObserver.observe(carouselContainerRef.value);

    // Observe changes in children elements
    const mutationObserver = new MutationObserver(() => {
      // Use nextTick to ensure the DOM has been updated
      nextTick(() => {
        checkOverflow();
      });
    });

    mutationObserver.observe(carouselContainerRef.value, {
      childList: true,
      subtree: true,
    });

    // Clean up mutation observer when unmounted
    onBeforeUnmount(() => {
      mutationObserver.disconnect();
    });
  }
});

onBeforeUnmount(() => {
  if (carouselContainerRef.value) {
    carouselContainerRef.value.removeEventListener("scroll", checkOverflow);
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <div class="relative">
    <!-- Background fade izquierdo -->
    <div
      class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-base-100 to-transparent z-10 pointer-events-none transition-opacity duration-300"
      :class="{ 'opacity-100': showLeftFade, 'opacity-0': !showLeftFade }"
    />

    <!-- Background fade derecho -->
    <div
      class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-base-100 to-transparent z-10 pointer-events-none transition-opacity duration-300"
      :class="{ 'opacity-100': showRightFade, 'opacity-0': !showRightFade }"
    />

    <!-- Carousel container -->
    <div
      class="carousel w-full max-w-md lg:max-w-full space-x-4 overflow-x-auto"
      :class="[carouselAlignment[align]]"
      ref="carousel-container"
    >
      <slot />
    </div>
  </div>
</template>
