<script setup lang="ts">
import type { Category } from "~/types/category";

const selectedCategories = ref<Category[]>([]);
</script>

<template>
  <FormKit type="form" submit-label="Añadir libro" form-class="w-[40%]">
    <FormKit
      type="url"
      name="image_url"
      label="Imagen"
      placeholder="https://imgur.com/my_image.jpg"
      validation="required|url"
    />
    <FormKit type="text" name="title" label="Título" validation="required" />
    <FormKit type="text" name="author" label="Autor" validation="required" />
    <FormKit
      type="textarea"
      name="description"
      label="Descripción"
      validation="required"
    />
    <GothamCategories
      @on-select-category="(categories) => (selectedCategories = categories)"
    />
  </FormKit>
</template>
