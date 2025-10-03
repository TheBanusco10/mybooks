<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  checked?: boolean;
}

withDefaults(defineProps<Props>(), {
  checked: false,
});
</script>

<template>
  <input
    type="radio"
    :name="id"
    role="tab"
    class="tab"
    :aria-label="label"
    :checked="checked"
  />
  <div role="tabpanel" class="tab-content p-4 overflow-x-auto">
    <slot />
  </div>
</template>

<style lang="css" scoped>
input[type="radio"] {
  white-space: nowrap;
}
</style>
