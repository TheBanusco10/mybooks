<script setup lang="ts">
interface Props {
  image?: string;
  name?: string;
  description?: string;
  is_private?: boolean;
  submitLabel?: string;
}
withDefaults(defineProps<Props>(), {
  image: "",
  name: "",
  description: "",
  is_private: true,
  submitLabel: "Crear",
});

defineEmits(["onSubmit"]);
</script>

<template>
  <GothamForm
    :submitLabel="submitLabel"
    @submit="(values) => $emit('onSubmit', values)"
  >
    <FormKit
      name="image"
      label="Imagen de club"
      help="Añade una URL para la imagen del club"
      :value="image"
    />
    <FormKit name="name" label="Título" validation="required" :value="name" />
    <FormKit
      name="description"
      type="textarea"
      label="Descripción"
      :value="description"
    />
    <FormKit
      type="toggle"
      name="is_private"
      label="Club privado"
      :value="is_private"
      help="Si la opción está activada, el club se creará como privado y no aparecerá en la lista de Clubes. Se necesita unir manualmente a los usuarios deseados."
    />
  </GothamForm>
</template>
