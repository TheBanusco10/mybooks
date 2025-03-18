<script setup lang="ts">
interface Props {
  submitLabel?: string;
}

defineProps<Props>();
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
      {{ submitLabel || $t("forms.send") }}
    </FormKit>
  </FormKit>
</template>

<style>
.formkit-asterisk {
  @apply text-red-500;
}
</style>
