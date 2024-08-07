<script setup lang="ts">
import useBookType from "../../composables/useBookType";

const { types } = useBookType();
</script>

<template>
  <FormKit type="radio" name="type" :options="types" />
</template>
