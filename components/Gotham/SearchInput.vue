<script setup lang="ts">
interface Props {
  placeholder?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "Buscar...",
});

const model = defineModel({ default: "" });

defineEmits(["onInputChange"]);
</script>

<template>
  <label class="input input-bordered flex items-center gap-2 my-4">
    <input
      type="search"
      class="grow border-none focus:ring-0 placeholder:text-base-content"
      v-model="model"
      :placeholder="placeholder"
      @input="$emit('onInputChange', model)"
    />
    <Icon name="mdi:magnify" size="1.2rem" />
  </label>
</template>
