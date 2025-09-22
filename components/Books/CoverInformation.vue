<script setup lang="ts">
interface Props {
  status: string;
  type: string;
}

defineProps<Props>();

const { getTypeIcon } = useBookType();
const { getStatusBackgroundColor } = useBookStatus();
</script>

<template>
  <div
    class="absolute top-0 right-0 flex justify-between w-full items-center py-1 px-2 bg-black/30"
  >
    <div
      class="w-3 h-3 rounded-full"
      :class="`${getStatusBackgroundColor(status)}`"
    ></div>
    <Icon :name="getTypeIcon(type)" class="text-white" size="20px" />
  </div>
</template>
