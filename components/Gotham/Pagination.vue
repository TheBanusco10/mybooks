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

const emits = defineEmits(["onPreviousPage", "onNextPage"]);

const lastPage = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const handlePreviousPage = () => {
  if (props.currentPage > 1) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(props.currentPage - 1));
    history.pushState(null, "", url);

    emits("onPreviousPage", props.currentPage - 1);
  }
};

const handleNextPage = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("page", String(props.currentPage + 1));
  history.pushState(null, "", url);

  emits("onNextPage", props.currentPage + 1);
};
</script>

<template>
  <div class="join justify-center">
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
</template>
