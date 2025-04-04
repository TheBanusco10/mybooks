<script setup lang="ts">
interface Props {
  showBackButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showBackButton: true,
});

const backButton = ref(null);
const hideButton = ref(false);
const lastScrollTop = ref(0);
const scrollThreshold = 10; // Minimum scroll amount to trigger hide/show

const handleScroll = () => {
  // Don't apply scroll behavior on medium screens and up (where button is not fixed)
  if (window.innerWidth >= 768) {
    hideButton.value = false;
    return;
  }

  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

  // Check if we've scrolled more than the threshold
  if (Math.abs(lastScrollTop.value - currentScrollTop) <= scrollThreshold)
    return;

  // Scrolling down
  if (currentScrollTop > lastScrollTop.value) {
    hideButton.value = true;
  }
  // Scrolling up
  else {
    hideButton.value = false;
  }

  lastScrollTop.value = currentScrollTop;
};

onMounted(() => {
  if (!props.showBackButton) return;

  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  if (!props.showBackButton) return;

  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="container mx-auto">
    <section v-if="showBackButton">
      <button
        :class="[
          'fixed left-4 bottom-0 z-50 md:relative md:left-0 md:top-0 btn btn-primary rounded-full md:rounded mb-4 transition-transform ease-in-out duration-300',
          { 'translate-y-20 md:translate-y-0': hideButton },
        ]"
        @click="$router.back()"
        ref="backButton"
      >
        <Icon name="mdi:chevron-left" class="scale-150 md:scale-125" />
        <span class="hidden md:inline"> {{ $t("app.goBack") }} </span>
      </button>
    </section>
    <slot />
  </div>
</template>
