<script setup lang="ts">
interface Props {
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "Buscar...",
});

const model = defineModel({ default: "" });
</script>

<template>
  <label class="input input-bordered flex items-center gap-2 my-4">
    <input
      type="search"
      class="grow border-none focus:ring-0"
      v-model="model"
      :placeholder="placeholder"
    />
    <Icon name="mdi:magnify" size="1.2rem" />
  </label>
</template>
