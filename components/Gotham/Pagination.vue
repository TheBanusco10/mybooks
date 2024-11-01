<script setup lang="ts">
interface Props {
  currentPage?: number;
  itemsPerPage?: number;
  isFetching?: boolean;
  totalItems?: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: DEFAULT_PAGE,
  itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  isFetching: false,
  totalItems: 0,
});

const emits = defineEmits(["onPageChanged"]);

const lastPage = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const handlePreviousPage = () => {
  if (props.currentPage > 1) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(props.currentPage - 1));
    history.pushState(null, "", url);

    emits("onPageChanged", props.currentPage - 1);
  }
};

const handleNextPage = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(props.currentPage + 1));
  history.pushState(null, "", url);

  emits("onPageChanged", props.currentPage + 1);
};
</script>

<template>
  <div class="flex flex-col gap-8">
    <section>
      <slot />
    </section>

    <div class="join justify-center m-auto">
      <button
        class="join-item btn"
        :disabled="currentPage === 1 || isFetching"
        @click="handlePreviousPage"
      >
        «
      </button>
      <div class="join-item btn pointer-events-none">
        Página {{ currentPage }}
      </div>
      <button
        class="join-item btn"
        :disabled="currentPage === lastPage || isFetching"
        @click="handleNextPage"
      >
        »
      </button>
    </div>
    <div class="mb-4">
      <p class="text-xs text-center">{{ totalItems }} resultado/s en total</p>
    </div>
  </div>
</template>
