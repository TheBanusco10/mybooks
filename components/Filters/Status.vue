<script setup lang="ts">
const { statuses } = useBookStatus();
</script>

<template>
  <FormKit type="radio" name="status" :options="statuses" />
</template>
