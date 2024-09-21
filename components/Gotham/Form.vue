<script setup lang="ts">
interface Props {
  submitLabel?: string;
}

withDefaults(defineProps<Props>(), {
  submitLabel: "Enviar",
});
</script>

<template>
  <FormKit type="form" :actions="false" #default="{ state, disabled }">
    <slot />
    <FormKit
      type="submit"
      :disabled="disabled as boolean"
      wrapper-class="flex justify-end"
    >
      <span v-if="state.loading" class="loading loading-spinner"></span>
      {{ submitLabel }}
    </FormKit>
  </FormKit>
</template>
